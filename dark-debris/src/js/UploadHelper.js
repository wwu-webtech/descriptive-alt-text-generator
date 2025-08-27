// import { handleAzureCall, handleGeminiCall, handleAzureURL, handleGeminiURL, handleOpenAICall } from "./API";
import {handleGeminiCall, handleGeminiURL} from "./Gemini";
import {handleOpenAICall} from "./OpenAI";
import {showErrorDialog} from "./ModalHelper";
import {updateCharacterCount} from "./Clipboard";
import {hideMetadataButton, showMetadataButton} from "./Metadata.js";

hideMetadataButton();
const canvas = document.getElementById("canvas");
const context = canvas.getContext("2d");
canvas.width = 0;
canvas.height = 0;

// responsible use modal elements
const responsibleUseModal = document.getElementById("responsible-use-modal");
const agreeOption = document.getElementById("agree-option");
const disagreeOption = document.getElementById("disagree-option");
const dialogOkButton = document.getElementById("dialog-ok");
const dialogCancelButton = document.getElementById("dialog-cancel");
agreeOption.addEventListener("change", () => {
	dialogOkButton.disabled = false;
});
disagreeOption.addEventListener("change", () => {
	dialogOkButton.disabled = false;
});

// Event listener for clicking the "Evaluate Image" button for file uploads
const file_button = document.getElementById("evaluate-image");
file_button.addEventListener("click", async () => {
    const loading = document.getElementById("evaluate-loading");

    document.getElementById("results-container").style.display = "block";
    document.getElementById("advanced-options").removeAttribute("open");

    const proceed = await handleResponsibleUseAgreement();
    if (!proceed) return;

    loading.showModal();

    try {
        const dataURL = canvas.toDataURL("image/jpeg", 0.5);

        if (dataURL === "data:,") {
            showErrorDialog("Oh no! Looks like there's no image to evaluate. Please upload an image to continue with this software.");
        } else {
            await handleGeminiCall(true);
            updateCharacterCount("gemini-area", "copy-gemini-button", "gemini-char-count");

            await handleOpenAICall(true);
            updateCharacterCount("chatgpt-area", "copy-chatgpt-button", "chatgpt-char-count");
        }
    } catch (error) {
        console.error(error);
    } finally {
        loading.close();
    }
});

// Event listener for clicking the "Evaluate URL" button for URL uploads
const url_button = document.getElementById("evaluate-url");
url_button.addEventListener("click", async () => {
	const loading = document.getElementById("evaluate-loading");
	loading.showModal();
	console.log("Evaluating the URL...");
	try {
		await handleGeminiCall(false);
		updateCharacterCount("gemini-area", "copy-gemini-button", "gemini-char-count");
		await handleOpenAICall(false);
		updateCharacterCount("chatgpt-area", "copy-chatgpt-button", "chatgpt-char-count");
	} catch (error) {
		console.error(error);
	} finally {
		loading.close();
	}
});

// Event listener for file input changes
const fileInput = document.getElementById("file-input");
const fileNameSpan = document.getElementById("file-name"); // Reference to the span to display file name

fileInput.addEventListener("change", () => {
	// Clear previous results
	document.getElementById("gemini-area").value = "";
	document.getElementById("chatgpt-area").value = "";

	const selectedFile = fileInput.files[0];
	if (selectedFile) {
		// Update the file name display
		fileNameSpan.textContent = selectedFile.name; // Display the name of the selected file

		const reader = new FileReader();

		reader.onload = function (e) {
			const img = new Image();
			img.onload = function () {
				// Adjust canvas size to the new image's dimensions
				canvas.width = img.width;
				canvas.height = img.height;
				canvas.ariaLabel = trimFakePathPrefix(fileInput.value); // Clean fake path prefix

				// Draw the image on the canvas
				context.drawImage(img, 0, 0, img.width, img.height);

				// Show metadata button (if applicable)
				showMetadataButton();
			};
			img.src = e.target.result;
		};
		reader.readAsDataURL(selectedFile);
	}
});

// Function to trim "C:\fakepath\" prefix from the file input path
const trimFakePathPrefix = (path) => {
	const fakePathPrefix = "C:\\fakepath\\";
	return path.startsWith(fakePathPrefix) ? path.slice(fakePathPrefix.length) : path;
}


const urlCanvas = document.getElementById("url-canvas");
const urlContext = urlCanvas.getContext("2d");

// Event listener for URL input changes
const urlInput = document.getElementById("url-upload");
urlInput.addEventListener("input", () => {

	document.getElementById("gemini-area").value = ""
	document.getElementById("chatgpt-area").value = ""
	// document.getElementById("azure-area").value = ""
	const url = urlInput.value;
	if (url) {
		const img = new Image();
		img.onload = function () {

			// Adjust canvas size to the new dimensions
			urlCanvas.width = img.width;
			urlCanvas.height = img.height;

			// Draw the image on the canvas
			urlContext.drawImage(img, 0, 0, img.width, img.height);
		};
		img.setAttribute('crossOrigin', 'anonymous');
		img.src = url; // Set the image source directly to the URL
	}
});

// function to handle the responisble use agreement logic
async function handleResponsibleUseAgreement() {
    const cookieName = 'responsibleDialogueCookie';

    if (getCookie(cookieName)) {
        return true; // Already agreed
    }

    // Cookie not found, show modal
    agreeOption.checked = false;
    disagreeOption.checked = false;
    dialogOkButton.disabled = true;

    responsibleUseModal.showModal();

    const decision = await new Promise((resolve) => {
        dialogOkButton.onclick = () => {
            const selected = document.querySelector('input[name="responsible-use"]:checked');
            responsibleUseModal.close();
            resolve(selected?.value || 'disagree');
        };
    });

    if (decision === 'agree') {
		// Store for 1 week
        setCookie(cookieName, 'true', 7);
        return true;
    }

    console.log("Image evaluation cancelled by user (user declined responsible use).");
    file_button.focus();
    return false;
}


// handles cookie for responsible use modal
function setCookie(name, value, days) {
	const date = new Date();
	date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
	const expires = "expires=" + date.toUTCString();
	document.cookie = name + "=" + value + ";" + expires + ";path=/";
}

function getCookie(name) {
	const nameEQ = name + "=";
	const ca = document.cookie.split(';');
	for (let i = 0; i < ca.length; i++) {
		let c = ca[i];
		while (c.charAt(0) === ' ') c = c.substring(1, c.length);
		if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
	}
	return null;
}
