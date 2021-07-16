import UploadBox from './uploadBox';

import { Button } from 'antd';
import '../styles/uploadForm.css';
import { LoadingOutlined } from '@ant-design/icons';

import { Steps } from 'antd';

import useWindowSize from '../utils/useWindowSize';

// TODO
// - Change message to alert antdesign

const { Step } = Steps;

function UploadForm(props) {
  const { width } = useWindowSize();

  const selectedSelfieHandler = (selfieImage) => {
    props.selfieHandler(selfieImage);
  };

  const selectedIdHandler = (idImage) => {
    props.idHandler(idImage);
  };

  return (
    <div className="upload-form">
      <div className="upload-container">
        <UploadBox setFileHandler={selectedSelfieHandler}>
          Upload Selfie
        </UploadBox>
        <UploadBox setFileHandler={selectedIdHandler}>Upload ID</UploadBox>
      </div>
      <Button
        type="primary"
        className="upload-button"
        disabled={props.selfieImage === null || props.idImage === null}
        onClick={props.fileUploadHandler}
      >
        Submit
      </Button>
      <Steps
        style={{ marginTop: '4rem', marginLeft: '1rem', marginRight: '1rem' }}
        direction={width < 800 ? 'vertical' : 'horizontal'}
      >
        <Step
          status={props.isUploadButtonDisabled ? 'wait' : 'finish'}
          title="Upload Information"
          description="Fill out your email address as well as your full name and upload your pictures"
        />
        <Step
          status={props.isUploading ? 'finish' : 'wait'}
          title="Click Submit"
          description="After completing the required information, click the submit button to proceed."
          icon={
            props.isUploading && !props.isProcessDone ? (
              <LoadingOutlined />
            ) : null
          }
        />
        <Step
          status={props.isProcessDone ? 'finish' : 'wait'}
          title="Wait for Verification"
          description="After submitting your information,  wait for your identity to be verified"
        />
      </Steps>
    </div>
  );
}
export default UploadForm;
