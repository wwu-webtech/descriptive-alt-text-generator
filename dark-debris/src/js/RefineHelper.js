import { handleGeminiRefineResults, handleOpenAIRefineResults } from "./API";

const gemini_refine = document.getElementById("refine-gemini-button");
gemini_refine.addEventListener("click", async () => {
  const loading = document.getElementById("evaluate-loading");
  loading.showModal();
  console.log("Refining...");

  try {
    await handleGeminiRefineResults();
  } catch (error) {
    console.error(error);
  } finally {
    document.getElementById("refine-gemini").value = ""
    loading.close();
  }
});

const chatgpt_refine = document.getElementById("refine-chatgpt-button");
chatgpt_refine.addEventListener("click", async () => {
  const loading = document.getElementById("evaluate-loading");
  loading.showModal();
  console.log("Refining...");

  try {
    await handleOpenAIRefineResults();
  } catch (error) {
    console.error(error)
  } finally {
    document.getElementById("refine-chatgpt").value = ""
    loading.close();
  }
})