import { UploadOutlined } from '@ant-design/icons';
import { useState } from 'react';
import '../styles/uploadBox.css';

function UploadBox(props) {
  let fileInput = null;
  const [imagePreview, setImagePreview] = useState(null);

  const fileSelectedHandler = (event) => {
    props.setFileHandler(event.target.files[0]);
    setImagePreview(URL.createObjectURL(event.target.files[0]));
  };

  const handleDelete = () => {
    props.setFileHandler(null);
    setImagePreview(null);
  };

  return (
    <>
      <input
        style={{ display: 'none' }}
        type="file"
        name={props.name}
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
          <div className="upload-box-contents">
            {props.children}
            <UploadOutlined />
          </div>
        ) : (
          <>
            <img src={imagePreview} alt="preview" />
            <i
              class="fas fa-window-close delete-button"
              onClick={handleDelete}
            ></i>
          </>
        )}
      </div>
    </>
  );
}
export default UploadBox;
