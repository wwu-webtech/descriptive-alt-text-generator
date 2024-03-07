import { handleAzureCall, handleGeminiCall } from "./API";
// import { azureKey } from "../pages/index.astro"; 

const canvas = document.getElementById("canvas");
const context = canvas.getContext("2d");
canvas.width = 0;
canvas.height = 0;
const fileInput = document.getElementById("file-input");

const button = document.getElementById("evaluate-image");
button.addEventListener("click", () => {
  console.log("Evaluating...");
  handleGeminiCall();
  handleAzureCall(); 
});

fileInput.addEventListener("change", () => {
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
