// React component for uploading images to the server and displaying them in the browser
// This component will be used in the main App component

import React, { useState } from 'react';
import axios from 'axios';
import {render} from "react-dom";

const UploadImage = () => {
    const [file, setFile] = useState('')
    const [fileName, setFileName] = useState('Choose File');
    const [uploadedFile, setUploadedFile] = useState({});
    const [message, setMessage] = useState('');

    // Function to handle file change
    const onChange = e => {
        setFile(e.target.files[0]);
        setFileName(e.target.files[0].name);
    }

    // Function to handle file upload
    const onSubmit = async e => {
        setUploadedFile({});
        setMessage('');
        e.preventDefault();
    }

    return (
        <div>
            <form onSubmit={onSubmit}>
                <div>
                    <input type="file" id="customFile" onChange={onChange}/>
                    <label htmlFor="customFile">{fileName}</label>
                </div>
                <input type="submit" value="Upload"/>
            </form>
        </div>
    );
}

export default UploadImage;