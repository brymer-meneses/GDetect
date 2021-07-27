import { useState } from 'react';

import UploadForm from './uploadForm.js';
import Login from './login';
import Progress from './progress';
import Result from './result';

import '../styles/content.css';
import checkStatus from '../utils/checkStatus';
import fileUploader from '../utils/fileUploader';

//  TODO: Change message to notification

function Content(props) {
  const [credentials, setCredentials] = useState({
    email: null,
    fullName: null,
  });

  const [currentStep, setCurrentStep] = useState(0);

  const [selfieImage, setSelfieImage] = useState(null);
  const [idImage, setIdImage] = useState(null);
  const [proceedToUpload, setProceedToUpload] = useState(false);

  const [showResult, setShowResult] = useState(false);
  const [result, setResult] = useState({
    status: 'success',
    title: null,
    message: null,
    errors: null,
    buttonLabel: null,
    buttonHandler: null,
    buttonVisible: false,
  });

  const [retryVerification, setRetryVerification] = useState(false);

  const checkStatusHandler = () => {
    setShowResult(false);
    checkStatus({
      setProceedToUpload,
      setResult,
      setShowResult,
      setCurrentStep,
      email: credentials.email,
      screenDimmedHandler: props.screenDimmedHandler,
      retryVerificationHandler: handleRetryVerification,
    });
  };

  const fileUploadHandler = () => {
    fileUploader({
      selfieImage,
      idImage,
      setCurrentStep,
      retryVerification,
      setRetryVerification,
      email: credentials.email,
      fullName: credentials.fullName,
    });
  };

  const handleBack = () => {
    setProceedToUpload(false);
    setCurrentStep(0);
  };

  const handleCloseResult = () => {
    setShowResult(false);
    props.screenDimmedHandler(false);
  };

  const handleRetryVerification = () => {
    setRetryVerification(true);
    setProceedToUpload(true);
    setShowResult(false);
    props.screenDimmedHandler(false);
  };

  return (
    <>
      <div className="content">
        <Result
          status={result.status}
          showResult={showResult}
          handleClose={handleCloseResult}
          title={result.title}
          message={result.message}
          errors={result.errors}
          buttonLabel={result.buttonLabel}
          buttonHandler={result.buttonHandler}
          buttonVisible={result.buttonVisible}
        />
        {proceedToUpload ? (
          <>
            <i class="fas fa-arrow-left back-button" onClick={handleBack}></i>
            <UploadForm
              selfieHandler={setSelfieImage}
              idHandler={setIdImage}
              idImage={idImage}
              selfieImage={selfieImage}
              fileUploadHandler={fileUploadHandler}
            />
          </>
        ) : (
          <Login handler={setCredentials} handleStatus={checkStatusHandler} />
        )}
        <Progress currentStep={currentStep} />
      </div>
    </>
  );
}

export default Content;
