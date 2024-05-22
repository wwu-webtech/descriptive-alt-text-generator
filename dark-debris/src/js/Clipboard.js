const chatgptCopy = document.getElementById("copy-chatgpt-button");
chatgptCopy.addEventListener("click", () =>
	copyTextFromTextArea("chatgpt-area"),
);

const geminiCopy = document.getElementById("copy-gemini-button");
geminiCopy.addEventListener("click", () => 
	copyTextFromTextArea("gemini-area")
);

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

function getCharacterCount(textAreaId) {
	const textArea = document.getElementById(textAreaId);
	return textArea.value.length;
}

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

export {updateCharacterCount}