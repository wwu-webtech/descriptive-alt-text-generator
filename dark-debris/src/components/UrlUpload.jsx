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
					<form style={{ marginTop: "20px", marginBottom: "20px" }}>
						<label htmlFor="url-upload"><h3>URL</h3></label>
						<input
							id="url-upload"
							type="url"
							placeholder="Enter a URL"
							style={{ width: "100%", lineHeight: "1.5em" }}
							onInput={handleChange}
							required
						/>
						<label htmlFor="prompt">
							<h3>Prompt<i style={{ fontSize: "18px", float:"right", color:"#d5e381" }}>* Optional</i></h3>
						</label>
						<textarea
							id="prompt"
							placeholder="Enter a prompt"
							rows="5"
							wrap="hard"
							style={{ width: "100%" }}
						/>
					</form>
					<button id="evaluate-url" style={{ marginBottom: "10px" }}>
						Evaluate URL
					</button>
				</div>
				<div style={{ objectFit: "contain" }}>
					{url && (
						<img
							role="img"
							aria-label="Image to generate"
							src={url}
							alt="Image failed to load. Did you submit the correct link?"
							style={{ objectFit: "contain", margin: "10px", width: "95%" }}
						/>
					)}
				</div>
			</div>
		</astro-upload>
	);
}
