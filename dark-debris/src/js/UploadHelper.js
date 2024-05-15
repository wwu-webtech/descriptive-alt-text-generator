// import { handleAzureCall, handleGeminiCall, handleAzureURL, handleGeminiURL, handleOpenAICall } from "./API";
import { handleGeminiCall, handleGeminiURL } from "./Gemini";
import { handleOpenAICall } from "./OpenAI";
import { showErrorDialog } from "./ModalHelper";

const canvas = document.getElementById("canvas");
const context = canvas.getContext("2d");
canvas.width = 0;
canvas.height = 0;

const file_button = document.getElementById("evaluate-image");
file_button.addEventListener("click", async () => {
  const loading = document.getElementById("evaluate-loading");
  loading.showModal();
  console.log("Evaluating...");

  try {
    const dataURL = canvas.toDataURL("image/jpeg", 0.5);

    if (dataURL === "data:,") {
      showErrorDialog("Oops! Looks like there's no image to evaluate. Please upload an image to continue.");
    } else {
      handleGeminiCall(true);
      await handleOpenAICall(true);
    }

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
    handleGeminiCall(false);
    await handleOpenAICall(false);
  } catch (error) {
    console.error(error);
  } finally {
    loading.close();
  }
});

const fileInput = document.getElementById("file-input");
fileInput.addEventListener("change", () => {
  // Clear the results
  document.getElementById("gemini-area").value = ""
  document.getElementById("chatgpt-area").value = ""
  // document.getElementById("azure-area").value = ""

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

const urlCanvas = document.getElementById("url-canvas");
const urlContext = urlCanvas.getContext("2d");

const urlInput = document.getElementById("url-upload");
urlInput.addEventListener("input", () => {

  document.getElementById("gemini-area").value = ""
  document.getElementById("chatgpt-area").value = ""
  // document.getElementById("azure-area").value = ""
  const url = urlInput.value;
  if (url) {
    const img = new Image();
    img.onload = function () {

      // Adjust canvas size to the new dimensions
      urlCanvas.width = img.width;
      urlCanvas.height = img.height;

      // Draw the image on the canvas
      urlContext.drawImage(img, 0, 0, img.width, img.height);
    };
    img.setAttribute('crossOrigin', 'anonymous');
    img.src = url; // Set the image source directly to the URL
  }
});
