import { Steps } from 'antd';
import '../styles/progress.css';
import { currentStepState } from '../states/currentStep';

import { useRecoilValue } from 'recoil';
import useWindowSize from '../utils/useWindowSize';

const { Step } = Steps;

function Progress() {
  const { width } = useWindowSize();
  const currentStep = useRecoilValue(currentStepState);
  return (
    <div className="progress-container" style={{ alignItems: 'center' }}>
      <Steps
        current={currentStep}
        direction={width < 800 ? 'vertical' : 'horizontal'}
      >
        <Step
          title="Upload Information"
          description="Fill out your email address as well as your full name."
        />
        <Step
          title="Upload Pictures"
          description="Upload a clear photo of your ID, and a picture of yourself."
        />
        <Step
          title="Wait for Verification"
          description="The verification process can take a few minutes to finish, please be patient."
        />
      </Steps>
    </div>
  );
}

export default Progress;
