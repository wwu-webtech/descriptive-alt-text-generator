import { GoogleGenerativeAI } from "@google/generative-ai";
import { OpenAIClient, AzureKeyCredential } from "@azure/openai"
// const { OpenAIClient, AzureKeyCredential } = require("@azure/openai");

const showErrorDialog = (msg) => {
  const dialog = document.getElementById("evaluate-error")
  const message = document.getElementById("evaluate-error-message")
  message.textContent = msg
  dialog.showModal();
}

const handleAzureCall = async () => {
  const canvas = document.getElementById("canvas");
  const headers = {
    "Content-Type": "application/octet-stream",
    "Ocp-Apim-Subscription-Key": import.meta.env.PUBLIC_MSFT_COGNITIVE_AI,
  };


  canvas.toBlob((blob) => {
    if (!blob) {
      showErrorDialog("No image to evaluate")
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
        let captionText = ""

        for (let i = 0; i < data.denseCaptionsResult.values.length; i++ ) {
          captionText += data.denseCaptionsResult.values[i].text + "\n"
        }
        document.getElementById("azure-area").value = captionText + "\n"

      })
      .catch((error) => {
        showErrorDialog("Azure API Error.")
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

    // const promptFieldValue = document.getElementById("prompt").value
    const promptFieldValue = ""

    let prompt = "Compose a detailed description in English for this image.";
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

      document.getElementById("results-section").scrollIntoView();

    } catch (error) {
      showErrorDialog("Gemini API Error.")
      console.error("Error during API request:", error.message);
    }
  } else {
    showErrorDialog("No image to evaluate.")
    console.error("There is no image to evaluate!");
  }
};

const handleGeminiRefineResults = async () => {
  const initialResponse = document.getElementById("gemini-area").value;
  const additionalInfo = document.getElementById("refine-gemini").value;

  const canvas = document.getElementById("canvas");

  const dataURL = canvas.toDataURL("image/jpeg", 0.5);

  if (dataURL !== "data:," && additionalInfo != "") {
    const genAI = new GoogleGenerativeAI(import.meta.env.PUBLIC_GEMINI_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-pro-vision" });
    let prompt = `Building on the intial response of ${initialResponse}, enhance the caption by incorporating the following additional information: ${additionalInfo}`;

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

      document.getElementById("gemini-area").value = text;
    } catch (error) {
      console.error("Error during API request:", error.message);
    }
  } else {
    if (additionalInfo == "" && dataURL !== "data:,") {
      showErrorDialog("Please insert some additional information.")
      console.error("There is additional information.");
    } else {
      showErrorDialog("There is no image to evaluate!")
      console.error("There is no image to evaluate!");
    }
  }
}

const handleAzureURL = async () => {
  const sleep = (ms = 0) => new Promise(resolve => setTimeout(resolve, ms));
  const url = document.getElementById("url-upload").value;
  console.log(url)

  const headers = {
    "Content-Type": "application/json",
    "Ocp-Apim-Subscription-Key": import.meta.env.PUBLIC_MSFT_COGNITIVE_AI,
  };

  const requestData = {
    url: url
  }

  if (url === "") {
    showErrorDialog("No URL to evaluate")
  } else {
    await sleep(1500)
    fetch("https://descriptive-alt-text.cognitiveservices.azure.com/computervision/imageanalysis:analyze?api-version=2024-02-01&features=tags,read,caption,denseCaptions,smartCrops,objects,people&language=en&gender-neutral-caption=false", {
      method: 'POST',
      headers: headers,
      body: JSON.stringify(requestData)
    })
      .then(response => response.json())
      .then(data => {
        console.log(data)
        const captionText = data.captionResult.text;

        // Update the text area
        document.getElementById("azure-area").value = captionText;
        document.getElementById("results-section").scrollIntoView();
      })
      .catch(error => {
        showErrorDialog("Azure API Error.")
        console.error("Error: ", error);
      })
  }
}

const handleGeminiURL = async () => {
  const imageUrl = document.getElementById("url-upload").value;

  if (imageUrl.trim() !== "") {
    const genAI = new GoogleGenerativeAI(import.meta.env.PUBLIC_GEMINI_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-pro-vision" });

    const promptFieldValue = document.getElementById("prompt").value;
    let prompt = "Compose a detailed description in English for this image.";
    if (promptFieldValue !== "") {
      prompt += " This is additional information from the user: " + promptFieldValue;
    }

    const payload = {
      contents: [
        {
          parts: [
            { text: prompt },
            {
              url_data: {
                mime_type: "image/jpeg",
                url: imageUrl,
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

      // Update the text area
      document.getElementById("gemini-area").value = text;

      document.getElementById("results-section").scrollIntoView();
    } catch (error) {
      showErrorDialog("Gemini API Error.");
      console.error("Error during API request:", error.message);
    }
  } else {
    showErrorDialog("No image URL provided.");
    console.error("No image URL provided.");
  }
};

const handleOpenAICall = async () => {
  // Replace with your Azure OpenAI key
  const key = import.meta.env.PUBLIC_CHATGPT_KEY;
  const endpoint = import.meta.env.PUBLIC_OPENAI_ENDPOINT;
  const client = new OpenAIClient(endpoint, new AzureKeyCredential(key));

  const deploymentId = "test_deployment";

  const messages = [
    { role: "system", content: "You are a helpful assistant. You will talk like a pirate." },
    { role: "user", content: "Can you help me?" },
    { role: "assistant", content: "Arrrr! Of course, me hearty! What can I do for ye?" },
    { role: "user", content: "What's the best way to train a parrot?" },
  ];

  console.log(`Messages: ${messages.map((m) => m.content).join("\n")}`);

  const events = await client.streamChatCompletions(deploymentId, messages, { maxTokens: 128 });
  for await (const event of events) {
    for (const choice of event.choices) {
      const delta = choice.delta?.content;
      if (delta !== undefined) {
        console.log(`Chatbot: ${delta}`);
      }
    }
  }
}


export { handleAzureCall, handleGeminiCall, handleGeminiRefineResults, handleAzureURL, handleGeminiURL, handleOpenAICall }