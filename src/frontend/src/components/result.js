import { Result as ResultComponent, Typography, Button } from 'antd';
import { CloseOutlined, CloseCircleOutlined } from '@ant-design/icons';
import '../styles/result.css';

import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';

import { isResultShownState } from '../states/isResultShown';
import { isScreenDimmedState } from '../states/isScreenDimmed';
import { resultState } from '../states/result';
import { isRetryVerificationState } from '../states/isRetryVerification';
import { isOnUploadPageState } from '../states/isOnUploadPage';

function Result() {
  const { Paragraph } = Typography;
  const [isResultShown, setIsResultShown] = useRecoilState(isResultShownState);
  const fetchedResult = useRecoilValue(resultState);
  const setIsScreenDimmed = useSetRecoilState(isScreenDimmedState);

  const setIsRetryVerification = useSetRecoilState(isRetryVerificationState);
  const setIsOnUploadPage = useSetRecoilState(isOnUploadPageState);

  const handleClose = () => {
    setIsResultShown(false);
    setIsScreenDimmed(false);
  };

  const errors =
    fetchedResult.errors !== null
      ? fetchedResult.errors.map((error) => {
          return (
            <Paragraph>
              <CloseCircleOutlined style={{ color: 'red' }} />
              {error}
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
  }

  return (
    <>
      {isResultShown ? (
        <div className="result-container">
          <ResultComponent
            className="result"
            status={fetchedResult.status}
            title={fetchedResult.title}
            subTitle={fetchedResult.message}
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
            {errors}
          </ResultComponent>
          <CloseOutlined className="close-button" onClick={handleClose} />
        </div>
      ) : (
        <div />
      )}
    </>
  );
}

export default Result;
