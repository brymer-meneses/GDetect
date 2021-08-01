import { Result as ResultComponent, Typography, Button } from 'antd';
import { CloseOutlined, CloseCircleOutlined } from '@ant-design/icons';
import '../styles/result.css';

import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';

import { isResultShownState } from '../states/isResultShown';
import { isScreenDimmedState } from '../states/isScreenDimmed';
import { resultState } from '../states/result';
import { isRetryVerificationState } from '../states/isRetryVerification';
import { isOnUploadPageState } from '../states/isOnUploadPage';
import { currentStepState } from '../states/currentStep';

function ResultUpload() {
  const { Paragraph, Text } = Typography;
  const [isResultShown, setIsResultShown] = useRecoilState(isResultShownState);
  const fetchedResult = useRecoilValue(resultState);
  const setIsScreenDimmed = useSetRecoilState(isScreenDimmedState);

  const setIsRetryVerification = useSetRecoilState(isRetryVerificationState);
  const setIsOnUploadPage = useSetRecoilState(isOnUploadPageState);

  const setCurrentStep = useSetRecoilState(currentStepState);

  const handleClose = () => {
    setIsResultShown(false);
    setIsScreenDimmed(false);
  };

  const errors =
    fetchedResult.errors !== null
      ? fetchedResult.errors.map((error) => {
          return (
            <Paragraph>
              <CloseCircleOutlined
                style={{ color: 'red', marginRight: '5px' }}
              />
              <Text type="secondary">{error}</Text>
            </Paragraph>
          );
        })
      : '';

  let isButtonVisible;
  let buttonHandler = () => {};
  let buttonLabel;

  switch (fetchedResult.verificationStatus) {
    case -1:
      // Verification Failed
      buttonLabel = 'Retry Verification';
      isButtonVisible = true;
      buttonHandler = () => {
        setIsRetryVerification(true);
        setCurrentStep(1);
        setIsOnUploadPage(true);
        setIsScreenDimmed(false);
        setIsResultShown(false);
      };
      break;
    case 0:
      // Verification Success
      buttonLabel = '';
      isButtonVisible = false;
      buttonHandler = () => {
        setIsRetryVerification(false);
        setIsScreenDimmed(false);
        setIsResultShown(false);
      };
      break;
    case 1:
      // No pending verification was linked to this email
      buttonLabel = '';
      isButtonVisible = false;
      buttonHandler = () => {
        setIsRetryVerification(false);
        setIsScreenDimmed(false);
        setIsResultShown(false);
      };
      break;
    case 2:
      // Verification is currently being processed.
      buttonLabel = '';
      isButtonVisible = false;
      buttonHandler = () => {
        setIsRetryVerification(false);
        setIsScreenDimmed(false);
        setIsResultShown(false);
      };
      break;
    default:
      buttonLabel = '';
      isButtonVisible = false;
      buttonHandler = () => {
        setIsRetryVerification(false);
        setIsScreenDimmed(false);
        setIsResultShown(false);
      };
  }

  return (
    <>
      {isResultShown ? (
        <div className="result-container">
          <div className="result-content">
            <ResultComponent
              className="result"
              title={fetchedResult.title}
              subTitle={fetchedResult.message}
              status={fetchedResult.status}
              extra={
                <Button
                  style={!isButtonVisible ? { display: 'none' } : {}}
                  type="secondary"
                  onClick={buttonHandler}
                >
                  {buttonLabel}
                </Button>
              }
            >
              <div>
                {fetchedResult.verificationStatus === -1 ? (
                  <Paragraph>
                    <Text
                      strong
                      style={{
                        fontSize: 16,
                      }}
                    >
                      Your verification had the following errors:
                    </Text>
                  </Paragraph>
                ) : (
                  ''
                )}
                {errors}
              </div>
            </ResultComponent>
            <CloseOutlined className="close-button" onClick={handleClose} />
          </div>
        </div>
      ) : (
        <div />
      )}
    </>
  );
}

export default ResultUpload;
