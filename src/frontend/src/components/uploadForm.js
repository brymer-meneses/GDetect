import UploadBox from './uploadBox';
import axios from 'axios';
import { useState } from 'react';

import { Button, message } from 'antd';
import '../styles/uploadForm.css';
import messageHandler from './message';

const API_LINK = 'http://127.0.0.1:8000/api/upload-images';

// TODO
// - Make the UI responsive
// - Add Steps

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

    const key = 'updatable';
    message.loading({ content: 'Uploading Images...', key });
    axios
      .post(API_LINK, formData)
      .then((res) => {
        messageHandler(res, key);
      })
      .catch((err) => {
        if (err.response !== null) {
          messageHandler(err.response, key);
        } else {
          console.log(err);
        }
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
