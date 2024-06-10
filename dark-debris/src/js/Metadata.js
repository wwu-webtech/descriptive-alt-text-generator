/* Alex Kefer // 5/25/24 // Functions relating to extracting metadata from the images uploaded by the user*/
import * as ExifReader from "exifreader";

// Function to extract metadata from the image
function extractMetadata(selectedFile) {
	let metadata = null;
	try {
		metadata = ExifReader.load(selectedFile);
		return metadata;
	} catch (error) {
		console.error(error);
		console.log("Error loading metadata");
		return null;
	} finally {
		console.log("All Metadata attached is loaded");
	}
}

function showMetadataButton() {
	if (showMetadataOption.checked) {
		metadataButton.removeAttribute("hidden");
		metadataButton.removeAttribute("aria-hidden");
	}
}

// Function to convert JSON data to CSV format
async function convertToCSV(metadata) {
	const data = await Promise.resolve(metadata);
	if (!data) {
		throw new Error("No metadata found");
	} else {
		const csv = Object.keys(data)
			.map((key) => {
				return `${key},${data[key].description}`;
			})
			.join('\n');
		return csv;
	}
}

// Function to create and download a CSV file
function downloadCSV(csv, filename) {
	const blob = new Blob([csv], {type: 'text/csv'});
	const url = window.URL.createObjectURL(blob);
	const a = document.createElement('a');
	a.style.display = 'none';
	a.href = url;
	a.download = filename;
	document.body.appendChild(a);
	a.click();
	window.URL.revokeObjectURL(url);
}

// Main function to handle fetching, converting, and downloading the data
async function exportDataAsCSV() {
	try {
		const csv = await convertToCSV(metadata);      // Step 2: Convert data to CSV format
		const file = document.getElementById("file-input").files[0].name;
		const filename = file.slice(0, file.indexOf('.')) + "-metadata.csv";
		downloadCSV(csv, filename);    // Step 3: Download the CSV file
	} catch (error) {
		console.error("Error exporting data:", error);
	}
}

let metadata = null;

const metadataButton = document.getElementById("metadata");
const fileInput = document.getElementById("file-input");

fileInput.addEventListener("change", () => {
	const selectedFile = fileInput.files[0];
	if (selectedFile) {
		metadata = extractMetadata(selectedFile);
	}
});


metadataButton.addEventListener("click", () => {
	exportDataAsCSV();
});

const showMetadataOption = document.getElementById("show-metadata");

showMetadataOption.addEventListener("click", () => {
	if (showMetadataOption.checked && metadata) {
		showMetadataButton();
	} else {
		metadataButton.setAttribute("hidden", "true");
		metadataButton.setAttribute("aria-hidden", "true");
	}
});

export {showMetadataButton};
