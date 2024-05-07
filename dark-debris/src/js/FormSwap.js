const fileSwitcher = document.getElementById("upload-type-switch-tab-0")
const urlSwitcher = document.getElementById("upload-type-switch-tab-1")

const clearResults = () => {
    document.getElementById("gemini-area").value = ""
    document.getElementById("chatgpt-area").value = ""
}

fileSwitcher.addEventListener('click', (event) => {
    clearResults();
});

urlSwitcher.addEventListener('click', (event) => {
    clearResults();
});