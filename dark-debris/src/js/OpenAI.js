import {getCharLimit} from "./apiHelper";
import {showErrorDialog} from "./ModalHelper";
import OpenAI from "openai"; //according to docs this is correct?




//AzureOpenAIClient vars and auth:
const apiKey = process.env.PUBLIC_AZURE_OPENAI_KEY;
const endpoint = "https://wwuwebtechdev.openai.azure.com/";
const apiVersion = "2024-10-21"
const deployment = "gpt-35-turbo";

/**
 * Function to handle the OpenAI API call for generating image descriptions using GPT models.
 * @param {boolean} isFile - Determines if the input is a file or a URL.
 */
const handleOpenAICall = async (isFile) => {
	var limit_response = getCharLimit(isFile);

	// Set up Azure OpenAI client
	const openai = new OpenAI({
		apiKey: apiKey,
		baseURL: `${endpoint}/openai/deployments/${deployment}`,
		defaultQuery: { "api-version": apiVersion },
		defaultHeaders: {
		  "api-key": apiKey,
		},
	  });

	let canvas;
	if (isFile) {
		canvas = document.getElementById("canvas");
	} else {
		canvas = document.getElementById("url-canvas");
	}

	const dataURL = canvas.toDataURL("image/jpeg", 0.5);

	let prompt = "Compose a detailed description in English for this image.";
	if (limit_response != -1) {
		prompt += ` Limit the description to under ${limit_response} characters.`
	}
	console.log(prompt)

	if (dataURL !== "data:,") {
		try {
			const result = await openai.chat.completions.create({ // Do we care about max tokens and rempature here? Also changed from chat.completion to chat.completions
				messages: [{
					role: "user",
					content: [
						{
							type: "image_url",
							image_url: {
								url: dataURL
							},
						},
						{
							type: "text",
							text: prompt
						}
					]
				}],
				model: 'gpt-4-turbo',
			});

			console.log(result)
			document.getElementById("chatgpt-area").value = result.choices[0].message?.content
			document.getElementById("chatgpt-char-count").textContent = result.choices[0].message?.content.length.toString();

		} catch (error) {
			showErrorDialog("ChatGPT API Error.", error.message);
			console.log(error)
			console.error("Error during API request:", error.message);
		}

	} else {
		showErrorDialog("No image to evaluate. (GPT)")
		console.error("There is no image to evaluate!");

	}
}

/**
 * Function to refine the OpenAI API results with additional information.
 * @param {boolean} isFile - Determines if the input is a file or a URL.
 */
const handleOpenAIRefineResults = async (isFile) => {
	var limit_response = getCharLimit(isFile);

	const initialResponse = document.getElementById("chatgpt-area").value;
	const additionalInfo = document.getElementById("refine-chatgpt").value;

	const canvas = document.getElementById("canvas");
	const dataURL = canvas.toDataURL("image/jpeg", 0.5);

	let prompt = `Building on the initial response of ${initialResponse}, enhance the caption by incorporating the following additional information: ${additionalInfo}.`;
	if (limit_response != -1) {
		prompt += ` Limit the description to under ${limit_response} characters.`
	}

	console.log("GPT Refine: ", prompt)

	if (dataURL !== "data:," && additionalInfo != "") {
		const openai = new AzureOpenAI({ //should this be made its own func?
			apiKey, 
			endpoint, 
			apiVersion, //might not need api version and deployement?
			deployment 
			//apiKey: import.meta.env.PUBLIC_CHATGPT_KEY,
			//dangerouslyAllowBrowser: true
		});
		try {
			const result = await openai.chat.chat.completions.create({
				messages: [{
					role: "user",
					content: [
						{
							type: "image_url",
							image_url: {
								url: dataURL
							},
						},
						{
							type: "text",
							text: prompt
						}
					]
				}],
				model: 'gpt-4-turbo',
			});

			console.log(result)
			document.getElementById("chatgpt-area").value = result.choices[0].message?.content
			document.getElementById("chatgpt-char-count").textContent = result.choices[0].message?.content.length.toString();

		} catch (error) {
			showErrorDialog(`Oops! There was an error with the OpenAI refine feature. Please try again later or contact support for assistance.\n Error Message: ${error.message}`)
			console.error("Error during OpenAI request:", error.message);
		}
	} else {
		if (additionalInfo == "" && dataURL !== "data:,") {
			showErrorDialog("Please insert some additional information.")
			console.error("There is additional information.");
		} else {
			showErrorDialog("There is no image to evaluate!")
			console.error("There is no image to evaluate!");
		}
	}
}

export {handleOpenAICall, handleOpenAIRefineResults}
