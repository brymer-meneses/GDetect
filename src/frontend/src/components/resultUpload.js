import { Result as ResultComponent, Button } from 'antd';
import { CloseOutlined } from '@ant-design/icons';
import '../styles/result.css';

import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';

import { isResultShownState } from '../states/isResultShown';
import { isScreenDimmedState } from '../states/isScreenDimmed';
import { resultState } from '../states/result';

function ResultVerification() {
  const [isResultShown, setIsResultShown] = useRecoilState(isResultShownState);
  const fetchedResult = useRecoilValue(resultState);
  const setIsScreenDimmed = useSetRecoilState(isScreenDimmedState);

  const handleClose = () => {
    setIsResultShown(false);
    setIsScreenDimmed(false);
  };

  let isButtonVisible;
  let buttonHandler = () => {
    setIsResultShown(false);
  };
  let buttonLabel;

  return (
    <>
      {isResultShown ? (
        <div className="result-container">
          <div className="result-content">
            <ResultComponent
              className="result"
              status={fetchedResult.status}
              icon={fetchedResult.icon}
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
            ></ResultComponent>
            <CloseOutlined className="close-button" onClick={handleClose} />
          </div>
        </div>
      ) : (
        <div />
      )}
    </>
  );
}

export default ResultVerification;
