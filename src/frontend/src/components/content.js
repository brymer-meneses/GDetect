import UploadForm from './uploadForm.js';
import Login from './login';
import Progress from './progress';
import Result from './result';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { isOnUploadPageState } from '../states/isOnUploadPage';

import '../styles/content.css';
import { currentStepState } from '../states/currentStep.js';

function Content() {
  const [isOnUploadPage, setIsOnUploadPage] = useRecoilState(
    isOnUploadPageState
  );
  const setCurrentStep = useSetRecoilState(currentStepState);
  const handleBack = () => {
    setIsOnUploadPage(false);
    setCurrentStep(0);
  };

  return (
    <>
      <Result />
      <div className="content">
        {isOnUploadPage ? (
          <>
            <i class="fas fa-arrow-left back-button" onClick={handleBack}></i>
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
