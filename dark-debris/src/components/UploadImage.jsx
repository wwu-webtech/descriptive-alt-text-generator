// React component for uploading images to the server and displaying them in the browser
// This component will be used in the main App component

import React, { useState, useEffect} from 'react';

const UploadImage = () => {
    const [file, setFile] = useState(null);
    const [preview, setPreview] = useState(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (!file) {
            return
        }
        setLoading(true);
        const objectUrl = URL.createObjectURL(file);
        setPreview(objectUrl);
        setLoading(false);

        return () => {
            URL.revokeObjectURL(objectUrl);
        }
    }, [file]);

    // const handleAPICall = () => {
    //     const headers = {
    //         'Content-Type': 'application/json',
    //         'Ocp-Apim-Subscription-Key' : key
    //     };

    //     const requestData = {
    //         url: "https://cdn.britannica.com/84/145084-050-A0268BC0/Old-Main-Western-Washington-University-Bellingham.jpg"
    //     }

    //     fetch(endpoint, {
    //         method: 'POST',
    //         headers: headers,
    //         body: JSON.stringify(requestData)
    //     })
    //     .then(response => response.json())
    //     .then(data =>  {
    //         console.log(data)
    //     })
    //     .catch(error => {
    //         console.error("Error: ", error);
    //     })
    // }

    return (
        <div>
            <div className="wwu-card horizontal dark-blue-bg">
                <div class="image">
                {loading ? <div>Loading...</div> : preview && (
                    <div className="image media-stretc">
                        <img src={preview} alt="Preview" style={{objectFit: "contain"}}/>
                    </div>
                )}
                </div>
                <div className="body">
                    <form style={{marginTop:"20px", marginBottom:"20px"}}>
                        <label htmlFor="file">Upload Image</label>
                        <input type="file" id="file" accept=".png,.jpg,.jpeg" style={{width:'100%'}}
                               onChange={(e) => setFile(e.target.files[0])}/>
                        <label htmlFor="prompt">Prompt <i>[Optional]</i></label>
                        <textarea id="prompt" placeholder="Enter a prompt" rows="5" wrap="hard" style={{width:'100%'}}/>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default UploadImage;