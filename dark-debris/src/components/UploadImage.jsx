// React component for uploading images to the server and displaying them in the browser
// This component will be used in the main App component

import React, { useState, useEffect} from 'react';
import axios from 'axios';

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

    return (
        <>
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
        </>
    )
}

export default UploadImage;