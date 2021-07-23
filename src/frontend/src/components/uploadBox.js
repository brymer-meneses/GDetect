import { notification } from 'antd';
import { useState } from 'react';
import '../styles/uploadBox.css';

function UploadBox(props) {
  let fileInput = null;
  const [imagePreview, setImagePreview] = useState(null);

  const fileSelectedHandler = (event) => {
    const file = event.target.files[0];
    const fileType = file.name.split('.').slice(-1).pop();
    const allowedFileType = ['jpg', 'png', 'jpeg'];

    if (!allowedFileType.includes(fileType)) {
      props.setFileHandler(null);
      notification.error({
        message: 'Filetype Unsupported',
        description:
          'The file you have uploaded is unsupported. Expected png, jpg, jpeg',
        duration: 1,
      });
      return;
    }

    props.setFileHandler(file);
    setImagePreview(URL.createObjectURL(file));
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
          <div className="upload-box-contents">{props.children}</div>
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
