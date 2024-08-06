import {getCharLimit} from "./apiHelper";
import {GoogleGenerativeAI} from "@google/generative-ai";
import {showErrorDialog} from "./ModalHelper";

/**
 * Function to handle the Gemini API call for image analysis using a canvas blob or a URL.
 * @param {boolean} isFile - Determines if the input is a file or a URL.
 */
const handleGeminiCall = async (isFile) => {
	let limit_response = getCharLimit(isFile);
	let canvas;
	if (isFile) {
		console.log("file canvas")
		canvas = document.getElementById("canvas");
	} else {
		console.log("url canvas")
		canvas = document.getElementById("url-canvas");
	}

	const dataURL = canvas.toDataURL("image/jpeg", 0.5);
	if (dataURL !== "data:,") {
		const genAI = new GoogleGenerativeAI(import.meta.env.PUBLIC_GEMINI_KEY);
		const model = genAI.getGenerativeModel({model: "gemini-1.5-flash"});

		let prompt = "Compose a detailed description in English for this image.";
		if (limit_response != -1) {
			prompt += ` Limit the description to under ${limit_response} characters.`
		}

		console.log(prompt)

		const payload = {
			contents: [
				{
					parts: [
						{text: prompt},
						{
							inline_data: {
								mime_type: "image/jpeg",
								data: dataURL.split(",")[1],
							},
						},
					],
				},
			],
		};

		try {
			const result = await model.generateContent(payload);
			const response = await result.response;
			const text = await response.text();
			document.getElementById("gemini-char-count").textContent = text.length.toString();

			// Update the text area
			document.getElementById("gemini-area").value = text;

		} catch (error) {
			showErrorDialog(`Oops! There was an error with the Gemini API. Please try again later or contact support for assistance.\n Error Message: ${error.message}`)
			console.error("Error during Gemini request:", error.message);
		}
	} else {
		showErrorDialog("No image to evaluate. (Gemini)")
		console.error("There is no image to evaluate!");
	}
};

/**
 * Function to handle the Gemini API call for image analysis using an image URL.
 */
const handleGeminiURL = async () => {
	const imageUrl = document.getElementById("url-upload").value;

	if (imageUrl.trim() !== "") {
		const genAI = new GoogleGenerativeAI(import.meta.env.PUBLIC_GEMINI_KEY);
		const model = genAI.getGenerativeModel({model: "gemini-1.5-flash"});

		// const promptFieldValue = document.getElementById("prompt").value;
		let prompt = "Compose a detailed description in English for this image.";

		if (limit_response) {
			prompt += " Limit the description to under 260 characters."
		}

		// if (promptFieldValue !== "") {
		//   prompt += " This is additional information from the user: " + promptFieldValue;
		// }

		// const payload = {
		//   contents: [
		//     {
		//       parts: [
		//         { text: prompt },
		//         {
		//           url_data: {
		//             mime_type: "image/jpeg",
		//             url: imageUrl,
		//           },
		//         },
		//       ],
		//     },
		//   ],
		// };

		const payload = {
			contents: [
				{
					parts: [
						{text: prompt},
						{
							inline_data: {
								mime_type: "image/jpeg",
								data: imageUrl,
							},
						},
					],
				},
			],
		};

		try {
			const result = await model.generateContent(payload);
			const response = await result.response;
			const text = await response.text();

			// Update the text area
			document.getElementById("gemini-area").value = text;
			document.getElementById("gemini-char-count").textContent = text.length.toString();

		} catch (error) {
			showErrorDialog("Gemini API Error.");
			console.error("Error during API request:", error.message);
		}
	} else {
		showErrorDialog("No image URL provided.");
		console.error("No image URL provided.");
	}
};

/**
 * Function to refine the Gemini API results with additional information.
 * @param {boolean} isFile - Determines if the input is a file or a URL.
 */
const handleGeminiRefineResults = async (isFile) => {
	var limit_response = getCharLimit(isFile);
	const initialResponse = document.getElementById("gemini-area").value;
	const additionalInfo = document.getElementById("refine-gemini").value;

	let canvas;
	if (isFile) {
		console.log("file canvas refine")
		canvas = document.getElementById("canvas");
	} else {
		console.log("url canvas refine")
		canvas = document.getElementById("url-canvas");
	}

	const dataURL = canvas.toDataURL("image/jpeg", 0.5);

	if (dataURL !== "data:," && additionalInfo != "") {
		const genAI = new GoogleGenerativeAI(import.meta.env.PUBLIC_GEMINI_KEY);
		const model = genAI.getGenerativeModel({model: "gemini-1.5-flash"});
		let prompt = `Building on the intial response of ${initialResponse}, enhance the caption by incorporating the following additional information: ${additionalInfo}.`;
		if (limit_response != -1) {
			prompt += ` Limit the description to under ${limit_response} characters.`
		}
		console.log("Gemini Refine: ", prompt)

		const payload = {
			contents: [
				{
					parts: [
						{text: prompt},
						{
							inline_data: {
								mime_type: "image/jpeg",
								data: dataURL.split(",")[1],
							},
						},
					],
				},
			],
		};

		try {
			const result = await model.generateContent(payload);
			const response = await result.response;
			const text = await response.text();

			document.getElementById("gemini-area").value = text;
		} catch (error) {
			showErrorDialog(`Oops! There was an error with Gemini's refine feature. Please try again later or contact support for assistance.\n Error Message: ${error.message}`)
			console.error("Error during Gemini request:", error.message);
		}
	} else {
		if (additionalInfo == "" && dataURL !== "data:,") {
			showErrorDialog("Please insert some additional information.")
			console.error("There is additional information.");
		} else {
			showErrorDialog("There is no image to evaluate! (Gemini)")
			console.error("There is no image to evaluate!");
		}
	}
}

export {handleGeminiCall, handleGeminiRefineResults, handleGeminiURL}
