import { Button } from 'antd';
import '../styles/uploadForm.css';

import UploadBox from './uploadBox';
import fileUploadHandler from '../utils/fileUploadHandler';

import { useRecoilValue, useSetRecoilState } from 'recoil';

import { idImageState, selfieImageState } from '../states/images';
import { emailState, fullNameState } from '../states/info';
import { isRetryVerificationState } from '../states/isRetryVerification';
import { currentStepState } from '../states/currentStep';

function UploadForm() {
  const selfieImage = useRecoilValue(selfieImageState);
  const idImage = useRecoilValue(idImageState);
  const fullName = useRecoilValue(fullNameState);
  const email = useRecoilValue(emailState);
  const isRetryVerification = useRecoilValue(isRetryVerificationState);
  const setCurrentStep = useSetRecoilState(currentStepState);

  const onUpload = () => {
    const isUploadSuccess = fileUploadHandler({
      selfieImage,
      idImage,
      fullName,
      email,
      isRetryVerification,
    });

    if (isUploadSuccess) {
      setCurrentStep(2);
    }
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
