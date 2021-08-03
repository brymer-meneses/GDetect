import UploadForm from './uploadForm.js';
import Login from './login';
import Progress from './progress';
import Result from './result';
import { useRecoilValue } from 'recoil';
import { isOnUploadPageState } from '../states/isOnUploadPage';

import '../styles/content.css';

function Content() {
  const isOnUploadPage = useRecoilValue(isOnUploadPageState);

  return (
    <>
      <Result />

      <div className="content">
        {isOnUploadPage ? <UploadForm /> : <Login />}
        <Progress />
      </div>
    </>
  );
}

export default Content;
