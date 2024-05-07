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
							<h3>URL</h3>
						</label>
						<input
							id="url-upload"
							type="url"
							placeholder="Enter a URL"
							onInput={handleChange}
							required
						/>
					</form>
					<button id="evaluate-url">Evaluate URL</button>
				</div>
				<div id="url-img">
					{url && (
						<img
							role="img"
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
