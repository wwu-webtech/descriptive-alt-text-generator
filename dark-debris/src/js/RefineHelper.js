import { handleGeminiRefineResults } from "./Gemini";
import { handleOpenAIRefineResults } from "./OpenAI";
import { showErrorDialog } from "./ModalHelper";
import { updateCharacterCount } from "./Clipboard";

const gemini_refine = document.getElementById("refine-gemini-button");
gemini_refine.addEventListener("click", async () => {
	const loading = document.getElementById("evaluate-loading");
	loading.showModal();
	console.log("Refining...");

  try {
    await handleGeminiRefineResults(true);
    updateCharacterCount("gemini-area", "copy-gemini-button", "gemini-char-count");
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
    updateCharacterCount("chatgpt-area", "copy-chatgpt-button", "chatgpt-char-count");
  } catch (error) {
    showErrorDialog(`Oops! There was an error with the OpenAI refine feature. Please try again later or contact support for assistance.\n Error Message: ${error.message}`)
    console.error(error)
  } finally {
    document.getElementById("refine-chatgpt").value = ""
    loading.close();
  }
})
