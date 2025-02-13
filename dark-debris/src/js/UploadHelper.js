// import { handleAzureCall, handleGeminiCall, handleAzureURL, handleGeminiURL, handleOpenAICall } from "./API";
import {handleGeminiCall, handleGeminiURL} from "./Gemini";
import {handleOpenAICall} from "./OpenAI";
import {showErrorDialog} from "./ModalHelper";
import {updateCharacterCount} from "./Clipboard";
import {showMetadataButton} from "./Metadata.js";

const canvas = document.getElementById("canvas");
const context = canvas.getContext("2d");
canvas.width = 0;
canvas.height = 0;

// Event listener for clicking the "Evaluate Image" button for file uploads
const file_button = document.getElementById("evaluate-image");
file_button.addEventListener("click", async () => {
	const loading = document.getElementById("evaluate-loading");
	const responsible_use = document.getElementById("responsible-use-modal");

	//Only show results upon clicking "Evaluate Image"
	document.getElementById("results-container").style.display = "block";

	// Close advanced options detail
	document.getElementById("advanced-options").removeAttribute("open")

	// Open loading modal
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
		// upon loading modal closing, opens responsible_use modal
		responsible_use.showModal();
		// using it here to debug
		//try {
		//	const refine_results = document.getElementById("refine-results");
		//	refine_results.showModal(); // Show the modal
		//} catch (error) {
		//	console.error("Error showing modal:", error);
		//}
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
