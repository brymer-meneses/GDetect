// import { PlusOutlined } from '@ant-design/icons';
import { UploadOutlined } from '@ant-design/icons';
import { useState } from 'react';
import '../styles/uploadBox.css';

function UploadBox(props) {
  let fileInput = null;
  const [imagePreview, setImagePreview] = useState(null);

  const fileSelectedHandler = (event) => {
    props.setFileHandler(event);
    setImagePreview(URL.createObjectURL(event.target.files[0]));
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
        onClick={() => {
          fileInput.click();
        }}
      >
        {imagePreview === null ? (
          <div className="upload-box-contents">
            {props.children}
            <UploadOutlined />
          </div>
        ) : (
          <img src={imagePreview} alt="preview" />
        )}
      </div>
    </>
  );
}
export default UploadBox;
