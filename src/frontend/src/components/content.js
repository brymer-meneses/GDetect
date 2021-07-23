import { message, notification } from 'antd';
import { useState } from 'react';
import axios from 'axios';

import UploadForm from './uploadForm.js';
import Login from './login';
import messageHandler from './message';
import Progress from './progress';

import '../styles/content.css';

const API_LINK = 'http://127.0.0.1:8000/api/upload';
const STATUS_LINK = 'http://127.0.0.1:8000/api/status';

//  TODO: Change message to notification

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
          } else if (res.data.verification_status === 1) {
            // TODO: use switch instead of if else
            setCurrentStep(1);
          } else {
          }
          setProceedToUpload(true);
        } else {
          notification.error({
            message: 'Network Error',
            description:
              'It seems you may have an unstable internet connection.',
          });
        }
      })
      .catch((err) => {
        if (err.status !== 422) {
          notification.error({
            message: 'Server Error',
            description: 'The server is not online, please try again later',
          });
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
          notification.error({
            message: 'Server Error',
            description: 'The server is not online, please try again later',
          });
        }
      })
      .catch(
        notification.error({
          message: 'Network Error',
          description: 'It seems you may have an unstable internet connection.',
        })
      );
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
