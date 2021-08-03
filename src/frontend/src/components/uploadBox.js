import { notification } from 'antd';
import { useState } from 'react';
import '../styles/uploadBox.css';
import { useSetRecoilState } from 'recoil';
import { selfieImageState, idImageState } from '../states/images';

import {
  faPortrait,
  faIdCard,
  faWindowClose,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

function UploadBox(props) {
  let fileInput = null;
  const [imagePreview, setImagePreview] = useState(null);

  const setSelfieImage = useSetRecoilState(selfieImageState);
  const setIdImage = useSetRecoilState(idImageState);

  let setImage;
  let icon;
  switch (props.type) {
    case 'selfie':
      setImage = setSelfieImage;
      icon = <FontAwesomeIcon icon={faPortrait} class="icon"></FontAwesomeIcon>;
      break;
    case 'id':
      setImage = setIdImage;
      icon = <FontAwesomeIcon icon={faIdCard} class="icon"></FontAwesomeIcon>;
      break;
    default:
      console.log('Error');
  }

  const fileSelectedHandler = (event) => {
    const file = event.target.files[0];
    const fileType = file.name.split('.').slice(-1).pop();
    const allowedFileType = ['jpg', 'png', 'jpeg'];

    if (!allowedFileType.includes(fileType)) {
      setImage(null);
      notification.error({
        message: 'Filetype Unsupported',
        description:
          'The file you have uploaded is unsupported. Expected png, jpg, jpeg',
        duration: 1,
      });
      return;
    }

    setImage(file);
    setImagePreview(URL.createObjectURL(file));
  };

  const handleDelete = () => {
    setImage(null);
    setImagePreview(null);
  };

  return (
    <>
      <input
        style={{ display: 'none' }}
        type="file"
        name={props.name}
        accept="image/png, image/jpg, image/jpeg"
        onChange={fileSelectedHandler}
        ref={(input) => {
          fileInput = input;
        }}
      />
      <div
        className="upload-box"
        style={imagePreview === null ? { cursor: 'pointer' } : {}}
        onClick={() => {
          if (imagePreview === null) {
            fileInput.click();
          }
        }}
      >
        {imagePreview === null ? (
          <div className="upload-box-contents">{icon}</div>
        ) : (
          <>
            <img src={imagePreview} alt="preview" />
            <FontAwesomeIcon
              icon={faWindowClose}
              class="delete-button"
              onClick={handleDelete}
            ></FontAwesomeIcon>
          </>
        )}
      </div>
    </>
  );
}
export default UploadBox;
