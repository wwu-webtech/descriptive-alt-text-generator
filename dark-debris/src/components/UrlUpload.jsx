// React Integration of UrlUpload component
import React, { useState } from 'react';
//import {AzureURLRequest} from "../api/AzureURLRequest.jsx";
import { handleAzureCall } from "../js/API.js";

export default function UrlUpload({api_key, endpoint}) {
	const [url, setUrl] = useState('');
	const [blob, setBlob] = useState(null);

	const callAzure = async () => {
		try {
			const response = await fetch("https://cors-anywhere.herokuapp.com/" + url, {
				method: "GET",
				headers: {
					"Content-Type": "application/json",
					"Accept": "application/json",
				},
			});
			if (!response.ok) {
				throw new Error(`Failed to fetch image: ${response.statusText}`);
			}
			const blobData = await response.blob();
			setBlob(blobData);
			handleAzureCall(api_key, endpoint, blobData)
		} catch (error) {
			console.error("Error fetching image:", error);
		}
	};

	const handleChange = async (event) => {
		setUrl(event.target.value);
	};
	
	const evaluateImage = async () => {
		const prompt = document.getElementById("prompt").value;
		AzureURLRequest({url, prompt, api_key, endpoint});
	}

	return (
		<astro-upload data-endpoint={endpoint} data-key={api_key}>
			<div className="wwu-card horizontal dark-blue-bg">
				<div className="body">
					<form style={{marginTop: "20px", marginBottom: "20px"}}>
						<label htmlFor="url-upload">URL</label>
						<input
							id="url-upload"
							type="url"
							placeholder="Enter a URL"
							style={{width: "100%", lineHeight: "1.5em"}}
							onInput={handleChange}
							required
						/>
						<label htmlFor="prompt">Prompt <i>[Optional]</i></label>
						<textarea
							id="prompt"
							placeholder="Enter a prompt"
							rows="5"
							wrap="hard"
							style={{width: "100%"}}
						/>
					</form>
					<button onClick={callAzure} id="evaluate-image" style={{ marginBottom: '10px'}}>Evaluate Image</button>
				</div>
				<div style={{objectFit:'contain'}}>
					{url && <img src={url} alt="Image failed to load. Did you submit the correct link?" style={{objectFit: 'contain', margin: '10px', width: '95%'}}/>}
				</div>
			</div>
		</astro-upload>
	);
}
