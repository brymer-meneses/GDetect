import UploadForm from './uploadForm.js';
import Login from './login';
import Progress from './progress';
import Result from './result';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { isOnUploadPageState } from '../states/isOnUploadPage';

import '../styles/content.css';
import { currentStepState } from '../states/currentStep.js';
import { emailState, fullNameState } from '../states/info';

import { ArrowLeftOutlined } from '@ant-design/icons';

function Content() {
  const [isOnUploadPage, setIsOnUploadPage] = useRecoilState(
    isOnUploadPageState
  );
  const setEmailState = useSetRecoilState(emailState);
  const setFullNameState = useSetRecoilState(fullNameState);

  const setCurrentStep = useSetRecoilState(currentStepState);
  const handleBack = () => {
    setIsOnUploadPage(false);
    setCurrentStep(0);
    setEmailState('');
    setFullNameState('');
  };

  return (
    <>
      <Result />
      <div className="content">
        {isOnUploadPage ? (
          <>
            <ArrowLeftOutlined
              className="back-button"
              onClick={handleBack}
            ></ArrowLeftOutlined>
            <UploadForm />
          </>
        ) : (
          <Login />
        )}
        <Progress />
      </div>
    </>
  );
}

export default Content;
