import { Button } from 'antd';
import '../styles/uploadForm.css';

import UploadBox from './uploadBox';
import fileUploadHandler from '../utils/fileUploadHandler';

import { useRecoilValue, useSetRecoilState } from 'recoil';

import { idImageState, selfieImageState } from '../states/images';
import { emailState, fullNameState } from '../states/info';
import { isRetryVerificationState } from '../states/isRetryVerification';
import { currentStepState } from '../states/currentStep';
import { resultState } from '../states/result';
import { isScreenDimmedState } from '../states/isScreenDimmed';
import { isResultShownState } from '../states/isResultShown';

import { StopOutlined, CloudUploadOutlined } from '@ant-design/icons';

import { useState } from 'react';

function UploadForm() {
  const selfieImage = useRecoilValue(selfieImageState);
  const idImage = useRecoilValue(idImageState);
  const fullName = useRecoilValue(fullNameState);
  const email = useRecoilValue(emailState);
  const isRetryVerification = useRecoilValue(isRetryVerificationState);
  const setCurrentStep = useSetRecoilState(currentStepState);
  const setIsScreenDimmed = useSetRecoilState(isScreenDimmedState);

  const setResult = useSetRecoilState(resultState);
  const setIsResultShown = useSetRecoilState(isResultShownState);

  const [isUploadSuccess, setIsUploadSuccess] = useState(false);

  const uploadSuccess = {
    type: 'upload',
    icon: <CloudUploadOutlined />,
    title: 'Upload Success',
    status: 'success',
    message: 'Your account is now currently being processed for verification.',
  };

  const uploadFailed = {
    type: 'upload',
    icon: <StopOutlined />,
    title: 'Upload Failed',
    status: 'error',
    message: 'Something went upon uploading your information to the server.',
  };
  const onUpload = () => {
    fileUploadHandler({
      selfieImage,
      idImage,
      fullName,
      email,
      isRetryVerification,
      setIsUploadSuccess,
    });
    if (isUploadSuccess) {
      setResult(uploadSuccess);
    } else {
      setResult(uploadFailed);
    }
    setCurrentStep(2);
    setIsScreenDimmed(true);
    setIsResultShown(true);
  };

  return (
    <div className="upload-form">
      <div className="upload-container">
        <UploadBox type="selfie"></UploadBox>
        <UploadBox type="id"></UploadBox>
      </div>
      <Button
        type="primary"
        className="upload-button"
        disabled={selfieImage === null || idImage === null}
        onClick={onUpload}
      >
        Submit
      </Button>
    </div>
  );
}
export default UploadForm;
