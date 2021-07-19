import UploadForm from './uploadForm.js';

import { useState } from 'react';

import Login from './login';
import axios from 'axios';

import { message } from 'antd';
import messageHandler from './message';

import '../styles/content.css';

const API_LINK = 'http://127.0.0.1:8000/api/upload';
const STATUS_LINK = 'http://127.0.0.1:8000/api/status';

function Content() {
  const [credentials, setCredentials] = useState({
    email: null,
    fullName: null,
  });

  const [selfieImage, setSelfieImage] = useState(null);
  const [idImage, setIdImage] = useState(null);
  const [proceedToUpload, setProceedToUpload] = useState(false);

  const checkVerificationStatus = (email) => {
    const formData = new FormData();
    const key = 'status';
    message.loading({ content: 'Please wait...', key });
    formData.append('email_address', email);
    axios
      .post(STATUS_LINK, formData)
      .then((res) => {
        if (res.status == 200) {
          if (res.data.verification_status !== 1) {
            message.success({ content: res.data.message, key });
          } else {
            message.success({ content: 'Success', key });
          }
          setProceedToUpload(true);
        } else {
          message.error({ content: 'Network Error', key });
        }
      })
      .catch((err) => {
        try {
          message.error(err.response, key);
        } catch (error) {
          message.error({ content: 'Upload Failed', key });
        }
      });
  };

  const fileUploadHandler = () => {
    const formData = new FormData();
    formData.append('selfie_image', selfieImage);
    formData.append('id_image', idImage);
    formData.append('full_name', credentials.fullName);
    formData.append('email_address', credentials.email);

    const key = 'updatable';
    message.loading({ content: 'Uploading Images...', key });
    axios
      .post(API_LINK, formData)
      .then((res) => {
        if (res !== null) {
          messageHandler(res, key);
        } else {
          console.log('error');
        }
      })
      .catch((err) => {
        try {
          messageHandler(err.response, key);
        } catch (error) {
          message.error({ content: 'Upload Failed', key });
        }
      });
  };

  const handleBack = () => {
    setProceedToUpload(false);
  };

  return (
    <>
      {proceedToUpload ? (
        <>
          <i class="fas fa-arrow-left back-button" onClick={handleBack}></i>
          <UploadForm
            selfieHandler={setSelfieImage}
            idHandler={setIdImage}
            idImage={idImage}
            selfieImage={selfieImage}
            fileUploadHandler={fileUploadHandler}
          />
        </>
      ) : (
        <Login
          handler={setCredentials}
          handleStatus={checkVerificationStatus}
        />
      )}
    </>
  );
}

export default Content;
