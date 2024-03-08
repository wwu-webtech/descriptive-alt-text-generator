import { GoogleGenerativeAI } from "@google/generative-ai";

const handleAzureCall = () => {
  const canvas = document.getElementById("canvas");
  const headers = {
    "Content-Type": "application/octet-stream",
    "Ocp-Apim-Subscription-Key": import.meta.env.PUBLIC_MSFT_COGNITIVE_AI,
  };


  canvas.toBlob((blob) => {
    if (!blob) {
      console.error("Error: No image blob available");
      return;
    }
    fetch("https://descriptive-alt-text.cognitiveservices.azure.com/computervision/imageanalysis:analyze?api-version=2024-02-01&features=tags,read,caption,denseCaptions,smartCrops,objects,people&language=en&gender-neutral-caption=false", {
      method: "POST",
      headers: headers,
      body: blob,
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        const captionText = data.captionResult.text;

        // Update the p tag
        // const captionElement = document.getElementById("azure-caption");
        // captionElement.textContent = captionText;

        // Update the text area
        document.getElementById("azure-area").value = captionText;

        document.getElementById("results-section").scrollIntoView();
      })
      .catch((error) => {
        console.error("Error: ", error);
      });
  });
};

const handleGeminiCall = async () => {
  const canvas = document.getElementById("canvas");

  const dataURL = canvas.toDataURL("image/jpeg", 0.5);

  if (dataURL !== "data:,") {
    const genAI = new GoogleGenerativeAI(import.meta.env.PUBLIC_GEMINI_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-pro-vision" });

    const promptFieldValue = document.getElementById("prompt").value

    let prompt = "Create an english descriptive alternative text for this image. Limit the response to 240 characters and below. ";
    if (promptFieldValue !== "") {
      prompt = prompt + " This is additional information from the user: " + promptFieldValue;
    }

    console.log(prompt)

    const payload = {
      contents: [
        {
          parts: [
            { text: prompt },
            {
              inline_data: {  
                mime_type: "image/jpeg",
                data: dataURL.split(",")[1],
              },
            },
          ],
        },
      ],
    };

    try {
      const result = await model.generateContent(payload);
      const response = await result.response;
      const text = await response.text();

      // Update the p tag
      // const captionElement = document.getElementById("gemini-caption");
      // captionElement.textContent = text;

      // Update the text area
      document.getElementById("gemini-area").value = text;

    } catch (error) {
      console.error("Error during API request:", error.message);
    }
  } else {
    console.error("There is no image to evaluate!");
  }
};



export { handleAzureCall, handleGeminiCall }