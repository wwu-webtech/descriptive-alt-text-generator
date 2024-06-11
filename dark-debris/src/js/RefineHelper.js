import { handleGeminiRefineResults } from "./Gemini";
import { handleOpenAIRefineResults } from "./OpenAI";
import { showErrorDialog } from "./ModalHelper";
import { updateCharacterCount } from "./Clipboard";

// Event listener for the "Refine" button for Gemini refinement
const gemini_refine = document.getElementById("refine-gemini-button");
gemini_refine.addEventListener("click", async () => {
    // Show loading modal while refining
    const loading = document.getElementById("evaluate-loading");
    document.getElementById("refine-gemini-detail").removeAttribute("open");
    loading.showModal();
    console.log("Refining...");

    try {
        // Call Gemini refine function and update character count
        await handleGeminiRefineResults(true);
        updateCharacterCount("gemini-area", "copy-gemini-button", "gemini-char-count");
    } catch (error) {
        // Handle errors and show error dialog
        console.error(error);
    } finally {
        // Reset input field and close loading modal
        document.getElementById("refine-gemini").value = "";
        loading.close();
    }
});

// Event listener for the "Refine" button for ChatGPT refinement
const chatgpt_refine = document.getElementById("refine-chatgpt-button");
chatgpt_refine.addEventListener("click", async () => {
    // Show loading modal while refining
    const loading = document.getElementById("evaluate-loading");

    document.getElementById("refine-chatgpt-detail").removeAttribute("open");
    
    loading.showModal();
    console.log("Refining...");

    try {
        // Call OpenAI refine function and update character count
        await handleOpenAIRefineResults(true);
        updateCharacterCount("chatgpt-area", "copy-chatgpt-button", "chatgpt-char-count");
    } catch (error) {
        // Handle errors and show error dialog
        showErrorDialog(`Oops! There was an error with the OpenAI refine feature. Please try again later or contact support for assistance.\n Error Message: ${error.message}`);
        console.error(error);
    } finally {
        // Reset input field and close loading modal
        document.getElementById("refine-chatgpt").value = "";
        loading.close();
    }
});
