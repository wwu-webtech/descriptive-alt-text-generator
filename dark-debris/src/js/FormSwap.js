import { updateCharacterCount } from "./Clipboard"

const fileSwitcher = document.getElementById("upload-type-switch-tab-0")
const urlSwitcher = document.getElementById("upload-type-switch-tab-1")

const clearResults = () => {
    document.getElementById("gemini-area").value = ""
    document.getElementById("chatgpt-area").value = ""
    updateCharacterCount("gemini-area", "copy-gemini-button", "gemini-char-count");
    updateCharacterCount("chatgpt-area", "copy-chatgpt-button", "chatgpt-char-count");
}

fileSwitcher.addEventListener('click', (event) => {
    clearResults();
});

urlSwitcher.addEventListener('click', (event) => {
    clearResults();
});