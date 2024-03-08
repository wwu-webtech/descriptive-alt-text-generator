import { handleGeminiRefineResults } from "./API";

const button = document.getElementById("refine-gemini-button");
button.addEventListener("click", () => {
  console.log("Refining...");
  handleGeminiRefineResults();
});
