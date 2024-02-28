// React component for displaying images in the browser
// This component will be used in the main Upload component

import React, { useState, useEffect} from 'react';

const props = {uploadType, imageLink, uploadedImage}

const Old_UploadImage = ({props}) => {
    const [file, setFile] = useState(null);
    const [preview, setPreview] = useState(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (!file) {
            return
        }
				if (props.uploadType === "uploadedImage") {
					const reader = new FileReader();
					reader.onloadend = () => {
						setPreview(reader.result);
					}
					reader.readAsDataURL(file);
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
			<div className="image">
			{loading ? <div>Loading...</div> : preview && (
					<div className="image media-stretc">
						<canvas id="canvas" style={{margin: "10px", objectFit: "contain", width: "95%"}}></canvas>
					</div>
			)}
			</div>
		);
}

	export default Old_UploadImage;
