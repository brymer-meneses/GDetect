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
          <i class="fas fa-portrait icon"></i>
        </UploadBox>
        <UploadBox setFileHandler={selectedIdHandler}>
          <i class="fas fa-id-card icon"></i>
        </UploadBox>
      </div>
      <Button
        type="primary"
        className="upload-button"
        disabled={props.selfieImage === null || props.idImage === null}
        onClick={props.fileUploadHandler}
      >
        Submit
      </Button>
    </div>
  );
}
export default UploadForm;
