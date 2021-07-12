import UploadBox from './uploadBox';
import axios from 'axios';
import { useState } from 'react';

import { Button, message } from 'antd';
import '../styles/uploadForm.css';
import messageHandler from './message';
import TextInput from './textInput';
import { MailOutlined, UserOutlined } from '@ant-design/icons';

const API_LINK = 'http://127.0.0.1:8000/api/upload-images';

// TODO
// - Make the UI responsive
// - Add Steps
// - Change message to alert antdesign

function UploadForm() {
  const [selfieImage, setSelfieImage] = useState(null);
  const [idImage, setIdImage] = useState(null);

  const selectedSelfieHandler = (event) => {
    setSelfieImage(event.target.files[0]);
  };

  const selectedIdHandler = (event) => {
    setIdImage(event.target.files[0]);
  };

  const [email, setEmail] = useState(null);
  const [fullName, setFullName] = useState(null);

  const fileUploadHandler = () => {
    const formData = new FormData();
    // The selfie image is sent before the id image
    formData.append('files', selfieImage);
    formData.append('files', idImage);
    formData.append('userInfo', { fullName, email });

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

  const isUploadButtonDisabled =
    selfieImage === null ||
    idImage === null ||
    email === null ||
    fullName === null;

  return (
    <div className="upload-form">
      <div className="upload-container">
        <UploadBox setFileHandler={selectedSelfieHandler}>
          Upload Selfie
        </UploadBox>
        <UploadBox setFileHandler={selectedIdHandler}>Upload ID</UploadBox>
      </div>
      <div className="text-container">
        <TextInput
          prefix={<MailOutlined />}
          handler={setEmail}
          placeholder="Email Address"
        />
        <TextInput
          prefix={<UserOutlined />}
          handler={setFullName}
          placeholder="Full Name"
        />
      </div>
      <Button
        type="primary"
        className="upload-button"
        disabled={isUploadButtonDisabled}
        onClick={fileUploadHandler}
      >
        Upload Information
      </Button>
    </div>
  );
}
export default UploadForm;
