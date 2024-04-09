import { handleAzureCall, handleGeminiCall, handleAzureURL, handleGeminiURL, handleOpenAICall } from "./API";

const canvas = document.getElementById("canvas");
const context = canvas.getContext("2d");
canvas.width = 0;
canvas.height = 0;
const fileInput = document.getElementById("file-input");

const file_button = document.getElementById("evaluate-image");
file_button.addEventListener("click", async () => {
  const loading = document.getElementById("evaluate-loading");
  loading.showModal();
  console.log("Evaluating...");

  try {
    await handleAzureCall();
    await handleGeminiCall();
    // await handleOpenAICall().catch((err) => {
    //   console.error("The sample encountered an error:", err);
    // });
  } catch (error) {
    console.error(error);
  } finally {
    loading.close();
  }
});

const url_button = document.getElementById("evaluate-url");
url_button.addEventListener("click", async () => {
  const loading = document.getElementById("evaluate-loading");
  loading.showModal();
  console.log("Evaluating...");
  try {
    // This still needs a bit of work:
    // await handleGeminiURL();
    await handleAzureURL();
  } catch (error) {
    console.error(error);
  } finally {
    loading.close();
  }
});

fileInput.addEventListener("change", () => {
  // Clear the results
  document.getElementById("gemini-area").value = ""
  document.getElementById("azure-area").value = ""
  
  const selectedFile = fileInput.files[0];

  if (selectedFile) {
    const reader = new FileReader();

    reader.onload = function (e) {
      const img = new Image();
      img.onload = function () {

        // Adjust canvas size to the new dimensions
        canvas.width = img.width;
        canvas.height = img.height;

        // Draw the image on the canvas
        context.drawImage(img, 0, 0, img.width, img.height);
      };
      img.src = e.target.result;
    };
    reader.readAsDataURL(selectedFile);
  }
});
