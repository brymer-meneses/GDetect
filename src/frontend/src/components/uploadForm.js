import UploadBox from './uploadBox';
import axios from 'axios';
import { useState } from 'react';

import { Button, message } from 'antd';
import '../styles/uploadForm.css';
import messageHandler from './message';
import TextInput from './textInput';
import {
  MailOutlined,
  UserOutlined,
  SmileOutlined,
  LoadingOutlined,
  SolutionOutlined,
} from '@ant-design/icons';

import { Steps } from 'antd';

import useWindowSize from '../utils/useWindowSize';

const API_LINK = 'http://127.0.0.1:8000/api/upload-images';

// TODO
// - Change message to alert antdesign

const { Step } = Steps;

function UploadForm() {
  const { width } = useWindowSize();

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
  const [isUploading, setIsUploading] = useState(false);
  const [isProcessDone, setIsProcessDone] = useState(false);

  const fileUploadHandler = () => {
    const formData = new FormData();
    // The selfie image is sent before the id image
    formData.append('selfie_image', selfieImage);
    formData.append('id_image', idImage);
    formData.append('full_name', fullName);
    formData.append('email_address', email);
    setIsUploading(true);

    const key = 'updatable';
    message.loading({ content: 'Uploading Images...', key });
    axios
      .post(API_LINK, formData)
      .then((res) => {
        messageHandler(res, key);
        setIsProcessDone(true);
      })
      .catch((err) => {
        if (err.response !== null) {
          messageHandler(err.response, key);
          setIsProcessDone(true);
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
        Submit
      </Button>
      <Steps
        style={{ marginTop: '4rem', marginLeft: '1rem', marginRight: '1rem' }}
        direction={width < 800 ? 'vertical' : 'horizontal'}
      >
        <Step
          status={isUploadButtonDisabled ? 'wait' : 'finish'}
          title="Upload Information"
          description="Fill out your email address as well as your full name and upload your pictures"
        />
        <Step
          status={isUploading ? 'finish' : 'wait'}
          title="Click Submit"
          description="After completing the required information, click the submit button to proceed."
          icon={isUploading && !isProcessDone ? <LoadingOutlined /> : null}
        />
        <Step
          status={isProcessDone ? 'finish' : 'wait'}
          title="Wait for Verification"
          description="After submitting your information,  wait for your identity to be verified"
        />
      </Steps>
    </div>
  );
}
export default UploadForm;
