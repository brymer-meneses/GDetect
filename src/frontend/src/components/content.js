import UploadForm from './uploadForm.js';

import { useState } from 'react';

import Login from './login';
import axios from 'axios';

import { message } from 'antd';
import messageHandler from './message';

const API_LINK = 'http://127.0.0.1:8000/api/upload-images';

function Content() {
  const [credentials, setCredentials] = useState({
    email: null,
    fullName: null,
  });

  const [selfieImage, setSelfieImage] = useState(null);
  const [idImage, setIdImage] = useState(null);

  const fileUploadHandler = () => {
    const formData = new FormData();
    // The selfie image is sent before the id image
    formData.append('selfie_image', selfieImage);
    formData.append('id_image', idImage);

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

  const isLoggedIn =
    credentials.email !== null && credentials.fullName !== null;
  return (
    <>
      {isLoggedIn ? (
        <UploadForm
          selfieHandler={setSelfieImage}
          idHandler={setIdImage}
          idImage={idImage}
          selfieImage={selfieImage}
          fileUploadHandler={fileUploadHandler}
        />
      ) : (
        <Login handler={setCredentials} />
      )}
    </>
  );
}

export default Content;
