const handleAzureCall = (key, endpoint) => {
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
      fetch(endpoint, {
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