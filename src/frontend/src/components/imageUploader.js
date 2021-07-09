import { useState } from 'react';
const dotenv = require('dotenv')
dotenv.config()

const API_LINK = "127.0.0.1"


function ImageUploader() {
    
    const [selectedFile, setSelectedFile] = useState(null);

    const fileSelectedHandler = event => {
        setSelectedFile(event.target.files[0]);
    }
    const fileUploadHandler = () => {
        const fd = new FormData();
    } 
    return (
        <div className="ImageUploader">
            <input type="file" onChange={fileSelectedHandler}/>
        </div>
    )
};

export default ImageUploader;
