import UploadForm from './uploadForm.js';

import { useState } from 'react';

import Login from './login';
import axios from 'axios';

import { message } from 'antd';
import messageHandler from './message';

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
        try {
          switch (res.status) {
            case 202:
              message.success({ content: 'Success', key });
              setProceedToUpload(true);
              break;
            case 201:
              message.success({ content: 'User has been verified', key });
              break;
            case 208:
              message.error({
                content: 'The verification is currently being processed.',
                key,
              });
              console.log('hello 208');
              break;
          }
        } catch (error) {
          message.error({ content: 'Request Timed Out', key: key });
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

  return (
    <>
      {proceedToUpload ? (
        <UploadForm
          selfieHandler={setSelfieImage}
          idHandler={setIdImage}
          idImage={idImage}
          selfieImage={selfieImage}
          fileUploadHandler={fileUploadHandler}
        />
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
