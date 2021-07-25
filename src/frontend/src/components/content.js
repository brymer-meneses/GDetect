import { message, notification } from 'antd';
import { useState } from 'react';
import axios from 'axios';

import UploadForm from './uploadForm.js';
import Login from './login';
import messageHandler from './message';
import Progress from './progress';
import Result from './result';

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

  const [showResult, setShowResult] = useState(false);
  const [result, setResult] = useState({
    status: 'error',
    message: null,
    tips: null,
  });

  const checkVerificationStatus = (email) => {
    const formData = new FormData();
    formData.append('email_address', email);
    axios
      .post(STATUS_LINK, formData)
      .then((res) => {
        if (!res.status === 200) {
          notification.error({
            message: 'Network Error',
            description:
              'It seems you may have an unstable internet connection.',
          });
          return;
        }
        if (res.data.verification_status === 1) {
          setProceedToUpload(true);
          // If the account linked with that email is not currently being
          // processed for verification, proceed to image upload
        } else {
          // Else show result
          /* 
            Verification Status Codes:
                0 - User Verification Success
                1 - User did not do any prior attempt
                     to verification
                2 - User verification is currently being processed
                3 - Faces were not detected by the system
                4 - The two images that were uploaded, do not have
                    the same facial structure.
                5 - Invalid ID
                6 - Credentials don't match up with the ones written
                    in the id uploaded by the user.
                7 - A similar facial structure has been found in the database
            */
          let status;
          let message;
          switch (res.verification_status) {
            case 0:
              status = 'success';
              message = 'Verification Success';
              break;
            case 2:
              status = 'warning';
              message = 'Verification Pending';
              break;
            default:
              status = 'error';
              message = 'Verification Failed';
          }

          const fetchedResult = {
            status: status,
            message: message,
            tips: res.data.message,
          };

          setResult(fetchedResult);
          setShowResult(true);
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

  const handleCloseResult = () => {
    setShowResult(false);
  };

  return (
    <div className="content">
      <Result
        status={result.status}
        showResult={showResult}
        handleClose={handleCloseResult}
        message={result.message}
        tips={result.tips}
      />
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
