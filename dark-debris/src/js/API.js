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
        })
        .catch((error) => {
          console.error("Error: ", error);
        });
    });
  };

  const handleGeminiCall = (key, endpoint) => {
    console.log("Calling Gemini API");
  }

  export { handleAzureCall, handleGeminiCall }