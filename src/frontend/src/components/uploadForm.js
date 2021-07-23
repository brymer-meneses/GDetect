import UploadBox from './uploadBox';
import { Button } from 'antd';

import '../styles/uploadForm.css';

function UploadForm(props) {
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
