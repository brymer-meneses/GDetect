import { Button } from 'antd';
import '../styles/uploadForm.css';

import UploadBox from './uploadBox';
import fileUploadHandler from '../utils/fileUploadHandler';

import { useRecoilValue, useSetRecoilState, useRecoilState } from 'recoil';

import { idImageState, selfieImageState } from '../states/images';
import { emailState, fullNameState } from '../states/info';
import { isRetryVerificationState } from '../states/isRetryVerification';
import { currentStepState } from '../states/currentStep';
import { resultState } from '../states/result';
import { isScreenDimmedState } from '../states/isScreenDimmed';
import { isResultShownState } from '../states/isResultShown';
import { isOnUploadPageState } from '../states/isOnUploadPage';

import { StopOutlined, CloudUploadOutlined } from '@ant-design/icons';

import { ArrowLeftOutlined } from '@ant-design/icons';

function UploadForm() {
  const selfieImage = useRecoilValue(selfieImageState);
  const idImage = useRecoilValue(idImageState);
  const [fullName, setFullName] = useRecoilState(fullNameState);
  const [email, setEmail] = useRecoilState(emailState);
  const isRetryVerification = useRecoilValue(isRetryVerificationState);
  const setCurrentStep = useSetRecoilState(currentStepState);
  const setIsScreenDimmed = useSetRecoilState(isScreenDimmedState);

  const setResult = useSetRecoilState(resultState);
  const setIsResultShown = useSetRecoilState(isResultShownState);
  const setIsRetryVerification = useSetRecoilState(isRetryVerificationState);

  const setIsOnUploadPage = useSetRecoilState(isOnUploadPageState);

  const handleBack = () => {
    setIsOnUploadPage(false);
    setCurrentStep(0);
    setEmail('');
    setFullName('');
  };
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
  const onUpload = async () => {
    const isUploadSuccess = await fileUploadHandler({
      selfieImage,
      idImage,
      fullName,
      email,
      isRetryVerification,
    });
    if (isUploadSuccess === true) {
      setResult(uploadSuccess);
    } else if (isUploadSuccess === false) {
      setResult(uploadFailed);
    }
    setCurrentStep(2);
    setIsScreenDimmed(true);
    setIsResultShown(true);
    setIsRetryVerification(false);
  };

  return (
    <>
      <ArrowLeftOutlined
        className="back-button"
        onClick={handleBack}
      ></ArrowLeftOutlined>
      <div className="upload-form">
        <div className="upload-container">
          <UploadBox type="selfie"></UploadBox>
          <UploadBox type="id"></UploadBox>
        </div>
        <Button
          style={{
            boxShadow: 'rgba(0, 0, 0, 0.1) 0px 4px 12px',
            borderRadius: '0.3rem',
          }}
          type="primary"
          className="upload-button"
          disabled={selfieImage === null || idImage === null}
          onClick={onUpload}
        >
          <CloudUploadOutlined />
          Submit Information
        </Button>
      </div>
    </>
  );
}
export default UploadForm;
