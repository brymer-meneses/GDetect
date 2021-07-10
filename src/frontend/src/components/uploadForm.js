import UploadBox from './uploadBox';
import '../styles/uploadForm.css';
import { useState } from 'react';
import axios from 'axios';
import { Button } from 'antd';

const API_LINK = 'http://127.0.0.1:8000/api/upload-images';

function UploadForm() {
  const [selfieImage, setSelfieImage] = useState(null);
  const [idImage, setIdImage] = useState(null);

  const selectedSelfieHandler = (event) => {
    setSelfieImage(event.target.files[0]);
  };

  const selectedIdHandler = (event) => {
    setIdImage(event.target.files[0]);
  };

  const showUploadButton = selfieImage !== null && idImage !== null;

  const fileUploadHandler = () => {
    const formData = new FormData();
    // The selfie image is sent before the id image
    formData.append('files', selfieImage);
    formData.append('files', idImage);

    axios
      .post(API_LINK, formData)
      .then((res) => {
        console.log(res);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const UploadButton = () => {
    return (
      <Button type="primary" onClick={fileUploadHandler}>
        Upload
      </Button>
    );
  };
  return (
    <div className="upload-form">
      <UploadBox setFileHandler={selectedSelfieHandler}>
        Upload Selfie
      </UploadBox>
      <UploadBox setFileHandler={selectedIdHandler}>Upload ID</UploadBox>
      {showUploadButton ? <UploadButton /> : <div />}
    </div>
  );
}
export default UploadForm;
