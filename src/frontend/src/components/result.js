import '../styles/result.css';

import { useRecoilValue, useSetRecoilState } from 'recoil';

import { isResultShownState } from '../states/isResultShown';
import { resultState } from '../states/result';
import { isScreenDimmedState } from '../states/isScreenDimmed';
import ResultVerification from './resultVerification';
import ResultUpload from './resultUpload';

function Result() {
  const isResultShown = useRecoilValue(isResultShownState);
  const fetchedResult = useRecoilValue(resultState);
  const setIsScreenDimmed = useSetRecoilState(isScreenDimmedState);

  let Content;
  if (fetchedResult === null) {
    setIsScreenDimmed(false);
    return '';
  }
  if (fetchedResult.type === 'verification') {
    Content = () => {
      return <ResultVerification />;
    };
  } else if (fetchedResult.type === 'upload') {
    Content = () => {
      return <ResultUpload />;
    };
  }

  return isResultShown ? <Content /> : '';
}
export default Result;
