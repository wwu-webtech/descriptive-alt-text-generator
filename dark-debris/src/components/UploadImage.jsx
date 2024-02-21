// React component for uploading images to the server and displaying them in the browser
// This component will be used in the main App component

import React, { useState } from 'react';
import axios from 'axios';
import {render} from "react-dom";

const UploadImage = ({endpoint, key}) => {
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

    const handleAPICall = () => {
        const headers = {
            'Content-Type': 'application/json',
            'Ocp-Apim-Subscription-Key' : key
        };

        const requestData = {
            url: "https://cdn.britannica.com/84/145084-050-A0268BC0/Old-Main-Western-Washington-University-Bellingham.jpg"
        }

        fetch(endpoint, {
            method: 'POST',
            headers: headers,
            body: JSON.stringify(requestData)
        })
        .then(response => response.json())
        .then(data =>  {
            console.log(data)
        })
        .catch(error => {
            console.error("Error: ", error);
        })
    }

    const btnAlert = () => {
        alert("testing")
    }

    return (
        <div>
            {/* <form onSubmit={onSubmit}>
                <div>
                <label htmlFor="customFile">{fileName}</label>
                    <input type="file" id="customFile" onChange={onChange}/> 
                </div>
                <input type="submit" value="Submit"/>
            </form> */}
            <button id="testbtn">Test Alert</button>
        </div>
    );
}

export default UploadImage;