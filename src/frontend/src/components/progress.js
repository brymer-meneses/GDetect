import useWindowSize from '../utils/useWindowSize';
import { Steps } from 'antd';
import '../styles/progress.css';

const { Step } = Steps;

function Progress(props) {
  const { width } = useWindowSize();
  return (
    <div className="progress-container" style={{ alignItems: 'center' }}>
      <Steps
        current={props.currentStep}
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
