import { handleGeminiRefineResults } from "./API";

const button = document.getElementById("refine-gemini-button");
button.addEventListener("click", async () => {
  const loading = document.getElementById("evaluate-loading");
  loading.showModal();
  console.log("Refining...");

  try {
    await handleGeminiRefineResults();
  } catch (error) {
    console.error(error);
  } finally {
    loading.close();
  }

});
