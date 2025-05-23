import React, { useState } from "react";

export default function UrlUpload() {
	const [url, setUrl] = useState("");

	const handleChange = async (event) => {
		setUrl(event.target.value);
	};

	return (
		<astro-upload>
			<div className="wwu-card horizontal dark-blue-bg">
				<div className="body">
					<form id="url-upload-form ">
						<label htmlFor="url-upload">
							<h3>URL to evaluate:</h3>
						</label>
						<input
							id="url-upload"
							type="url"
							placeholder="Enter a URL"
							onInput={handleChange}
							required
						/>
						<details id="advanced-options">
							<summary>Advanced Options</summary>
							<div className="checkbox-url">
								<input
									type="checkbox"
									id="limit-response-url"
									name="limit-url"
									value="Second"
								/><label htmlFor="limit-response-url"
								>Limit responses to under 260 characters.</label>
							</div>
						</details>
					</form>
					<button id="evaluate-url">Evaluate URL</button>
				</div>
				<div id="url-img">
					{url && (
						<img
							aria-label="Generate Results"
							src={url}
							alt="Image failed to load. Did you submit the correct link?"
						/>
					)}
				</div>
			</div>
		</astro-upload>
	);
}
