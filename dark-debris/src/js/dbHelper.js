// Functions to interact with the database

// Function to receive Gemini API results from custom event
function handleGeminiResults(response) {
	const geminiFulfilled = new CustomEvent("geminiFulfilled", {
		detail: { response },
	});
	document.addEventListener("geminiFulfilled", (event) => {
		console.log("db");
		console.log(event.detail.response);
	});
	document.dispatchEvent(geminiFulfilled);
	return response;
}

// Function to receive OpenAI API results from custom event
function handleOpenAIResults(result) {
	const OpenAIFulfilled = new CustomEvent("openAIFulfilled", {
		detail: { result },
	});
	document.addEventListener("openAIFulfilled", (event) => {
		console.log('Data sent to db:');
		console.log(event.detail.result);
	});
	document.dispatchEvent(OpenAIFulfilled);
	return result;
}



export { handleGeminiResults, handleOpenAIResults };
