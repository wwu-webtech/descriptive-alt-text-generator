const handleAzureCall = (key) => {
  const canvas = document.getElementById("canvas");
  const headers = {
    "Content-Type": "application/octet-stream",
    "Ocp-Apim-Subscription-Key": key,
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

        const captionElement = document.getElementById("azure-caption");
        captionElement.textContent = captionText;

        document.getElementById("azure-result").scrollIntoView();
      })
      .catch((error) => {
        console.error("Error: ", error);
      });
  });
};

const handleGeminiCall = async (key) => {
  try {
    const payload = {
      contents: [{
        parts: [{
          text: "Write a story about a magic backpack."
        }]
      }]
    };

    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${key}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      throw new Error('Network response was not ok: ' + response.status);
    }
    if (!response.ok) {
      throw new Error('Network response was not ok: ' + response.status);
    }

    const responseData = await response.json();
    // Process the responseData as needed
    console.log(responseData.candidates[0].content.parts[0].text);
    const captionText = responseData.candidates?.[0]?.content?.parts?.[0]?.text || "Error!"
    const captionElement = document.getElementById("gemini-caption");
    captionElement.textContent = captionText;
  } catch (error) {
    console.error('Error during fetch:', error);
  }
};

export { handleAzureCall, handleGeminiCall }