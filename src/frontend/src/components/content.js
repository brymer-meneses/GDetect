import { message } from 'antd';
import { useState } from 'react';
import axios from 'axios';

import UploadForm from './uploadForm.js';
import Login from './login';
import messageHandler from './message';
import Progress from './progress';

import '../styles/content.css';

const API_LINK = 'http://127.0.0.1:8000/api/upload';
const STATUS_LINK = 'http://127.0.0.1:8000/api/status';

function Content() {
  const [credentials, setCredentials] = useState({
    email: null,
    fullName: null,
  });

  const [currentStep, setCurrentStep] = useState(0);

  const [selfieImage, setSelfieImage] = useState(null);
  const [idImage, setIdImage] = useState(null);
  const [proceedToUpload, setProceedToUpload] = useState(false);

  const checkVerificationStatus = (email) => {
    const formData = new FormData();
    formData.append('email_address', email);
    axios
      .post(STATUS_LINK, formData)
      .then((res) => {
        if (res.status === 200) {
          if (res.data.verification_status !== 1) {
          } else {
            setCurrentStep(1);
          }
          setProceedToUpload(true);
        } else {
          message.error({ content: 'Network Error' });
        }
      })
      .catch((err) => {
        try {
          message.error(err.response);
        } catch (error) {
          message.error({ content: 'Upload Failed' });
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
          setCurrentStep(2);
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
    setCurrentStep(0);
  };

  return (
    <div className="content">
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
      <Progress currentStep={currentStep} />
    </div>
  );
}

export default Content;
