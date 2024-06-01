import { getCharLimit } from "./apiHelper";

/**
 * Function to handle the Azure API call for image analysis using a canvas blob.
 */
const handleAzureCall = async () => {
    const canvas = document.getElementById("canvas");
    const headers = {
        "Content-Type": "application/octet-stream",
        "Ocp-Apim-Subscription-Key": import.meta.env.PUBLIC_MSFT_COGNITIVE_A,
    };


    canvas.toBlob((blob) => {
        if (!blob) {
            showErrorDialog("No image to evaluate. (Azure)")
            console.error("Error: No image blob available");
            return;
        }
        fetch("https://descriptive-alt-text.cognitiveservices.azure.com/computervision/imageanalysis:analyze?api-version=2024-02-01&features=tags,read,caption,denseCaptions,smartCrops,objects,people&language=en&gender-neutral-caption=false", {
            method: "POST",
            headers: headers,
            body: blob,
        })
            .then((response) => response.json())
            .then((data) => {
                console.log(data);
                let captionText = ""

                for (let i = 0; i < data.denseCaptionsResult.values.length; i++) {
                    captionText += data.denseCaptionsResult.values[i].text + "\n"
                }
                document.getElementById("azure-area").value = captionText + "\n"

            })
            .catch((error) => {
                showErrorDialog(`Azure API Error. Error: ${error}`)
                console.error("Error: ", error);
            });
    });
};

/**
 * Function to handle the Azure API call for image analysis using a URL.
 */
const handleAzureURL = async () => {
    const sleep = (ms = 0) => new Promise(resolve => setTimeout(resolve, ms));
    const url = document.getElementById("url-upload").value;
    console.log(url)

    const headers = {
        "Content-Type": "application/json",
        "Ocp-Apim-Subscription-Key": import.meta.env.PUBLIC_MSFT_COGNITIVE_AI,
    };

    const requestData = {
        url: url
    }

    if (url === "") {
        showErrorDialog("No URL to evaluate")
    } else {
        await sleep(1500)
        fetch("https://descriptive-alt-text.cognitiveservices.azure.com/computervision/imageanalysis:analyze?api-version=2024-02-01&features=tags,read,caption,denseCaptions,smartCrops,objects,people&language=en&gender-neutral-caption=false", {
            method: 'POST',
            headers: headers,
            body: JSON.stringify(requestData)
        })
            .then(response => response.json())
            .then(data => {
                console.log(data)
                const captionText = data.captionResult.text;

                // Update the text area
                document.getElementById("azure-area").value = captionText;
            })
            .catch(error => {
                showErrorDialog("Azure API Error.")
                console.error("Error: ", error);
            })
    }
}

export {handleAzureCall, handleAzureURL}