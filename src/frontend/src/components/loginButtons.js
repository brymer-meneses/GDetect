import { Button } from 'antd';

import { useRecoilValue, useSetRecoilState, useRecoilState } from 'recoil';
import checkStatus from '../utils/checkStatus';

import { emailState, fullNameState } from '../states/info';
import { resultState } from '../states/result';
import { isOnUploadPageState } from '../states/isOnUploadPage';
import { currentStepState } from '../states/currentStep';
import { isResultShownState } from '../states/isResultShown';
import { isScreenDimmedState } from '../states/isScreenDimmed';

function LoginButtons() {
  const email = useRecoilValue(emailState);
  const fullName = useRecoilValue(fullNameState);
  const setCurrentStep = useSetRecoilState(currentStepState);
  const setIsOnUploadPage = useSetRecoilState(isOnUploadPageState);
  const [fetchedResult, setResult] = useRecoilState(resultState);
  const setIsResultShown = useSetRecoilState(isResultShownState);
  const setIsScreenDimmed = useSetRecoilState(isScreenDimmedState);

  const isProceedButtonDisabled = email === '' || fullName === '';
  const isCheckStatusButtonDisabled = email === '';

  const handleCheckStatus = () => {
    checkStatus({ email, setResult });
    setIsResultShown(true);
    setIsScreenDimmed(true);
  };

  const handleProceed = () => {
    checkStatus({ email, setResult });
    if (
      fetchedResult.errors === null &&
      fetchedResult.verificationStatus === 1
    ) {
      setIsOnUploadPage(true);
      setCurrentStep(1);
    } else {
      setIsResultShown(true);
    }
  };

  return (
    <>
      <Button
        type="primary"
        disabled={isProceedButtonDisabled}
        className="upload-button"
        onClick={handleProceed}
      >
        Proceed
      </Button>
      Recently Applied for Verification?
      <Button
        type="secondary"
        disabled={isCheckStatusButtonDisabled}
        className="upload-button"
        onClick={handleCheckStatus}
      >
        Check Status
      </Button>
    </>
  );
}
export default LoginButtons;
