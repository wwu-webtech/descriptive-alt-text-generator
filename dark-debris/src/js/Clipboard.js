

/**
 * Adding an event listener to the copy text button in the chatgpt text area.
 * Also, displays the responsible use modal if possible
 */
const chatgptCopy = document.getElementById("copy-chatgpt-button");
chatgptCopy.addEventListener("click", () => {
	copyTextFromTextArea("chatgpt-area")
	
});

/**
 * Adding an event listener to the copy text button in the gemini text area.
 * Also, displays the responsible use modal if possible
 */
const geminiCopy = document.getElementById("copy-gemini-button");
geminiCopy.addEventListener("click", () => {
	copyTextFromTextArea("gemini-area")


});

/**
 * Function to copy text from a textarea to the clipboard.
 * @param {string} textAreaId - The ID of the textarea element.
 */
function copyTextFromTextArea(textAreaId) {
	const textArea = document.getElementById(textAreaId);
	textArea.select();
	textArea.setSelectionRange(0, 99999);

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

/**
 * Function to count the character of a given text area
 * @param {string} textAreaId - The ID of the textarea element.
 */
function getCharacterCount(textAreaId) {
	const textArea = document.getElementById(textAreaId);
	return textArea.value.length;
}

/**
 * Function to update the character count and enable/disable a button based on the count.
 * @param {string} areaName - The ID of the textarea/input element.
 * @param {string} buttonName - The ID of the button element to enable/disable.
 * @param {string} countName - The ID of the element where the character count will be displayed.
 */
const updateCharacterCount = (areaName, buttonName, countName) => {
	let count = getCharacterCount(areaName);

	if (count != 0) {
		document.getElementById(buttonName).removeAttribute('disabled')
	} else {
		document.getElementById(buttonName).setAttribute('disabled', 'true');
	}

	document.getElementById(countName).textContent = count
}

document.getElementById("gemini-area").addEventListener("input", () => {
	updateCharacterCount("gemini-area", "copy-gemini-button", "gemini-char-count");
});

document.getElementById("chatgpt-area").addEventListener("input", () => {
	updateCharacterCount("chatgpt-area", "copy-chatgpt-button", "chatgpt-char-count");
});

window.onload = () => {
	document.getElementById("gemini-char-count").textContent = getCharacterCount("gemini-area");
	document.getElementById("chatgpt-char-count").textContent = getCharacterCount("chatgpt-area");
}

export { updateCharacterCount }