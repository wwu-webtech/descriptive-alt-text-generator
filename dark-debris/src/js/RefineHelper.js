import { handleGeminiRefineResults } from "./Gemini";
import { handleOpenAIRefineResults } from "./OpenAI";
import { showErrorDialog } from "./ModalHelper";

const gemini_refine = document.getElementById("refine-gemini-button");
gemini_refine.addEventListener("click", async () => {
	const loading = document.getElementById("evaluate-loading");
	loading.showModal();
	console.log("Refining...");

  try {
    await handleGeminiRefineResults(true);
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
    await handleOpenAIRefineResults(true);
  } catch (error) {
    showErrorDialog(`Oops! There was an error with the OpenAI refine feature. Please try again later or contact support for assistance.\n Error Message: ${error.message}`)
    console.error(error)
  } finally {
    document.getElementById("refine-chatgpt").value = ""
    loading.close();
  }
})
