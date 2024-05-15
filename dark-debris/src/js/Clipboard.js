const chatgptCopy = document.getElementById("copy-chatgpt-button");
chatgptCopy.addEventListener("click", () =>
	copyTextFromTextArea("chatgpt-area"),
);

const geminiCopy = document.getElementById("copy-gemini-button");
geminiCopy.addEventListener("click", () => copyTextFromTextArea("gemini-area"));

function copyTextFromTextArea(textAreaId) {
	const textArea = document.getElementById(textAreaId);
	textArea.select();
	textArea.setSelectionRange(0, 99999); /* For mobile devices */

	if (textArea.value === "") {
		console.log("Nothing to copy!");
		return;
	}
	navigator.clipboard
		.writeText(textArea.value)
		.then(() => {
			console.log("Copied the text: " + textArea.value);
		})
		.catch((error) => {
			console.error("Error copying text: ", error);
		});
}
