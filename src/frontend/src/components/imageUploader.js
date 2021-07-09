import { useState } from 'react';
import axios from 'axios';

import { Button } from 'antd';
import { UploadOutlined } from '@ant-design/icons';

function ImageUploader({ uploadLink }) {
  const [selectedFile, setSelectedFile] = useState(null);

  const fileSelectedHandler = (event) => {
    setSelectedFile(event.target.files[0]);
  };
  const fileUploadHandler = () => {
    const formData = new FormData();
    formData.append('image', selectedFile, selectedFile.name);
    axios
      .post(uploadLink, formData)
      .then((res) => {
        console.log(res);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  let fileInput = null;
  return (
    <div className="ImageUploader">
      <input
        style={{ display: 'none' }}
        type="file"
        onChange={fileSelectedHandler}
        ref={(input) => {
          fileInput = input;
        }}
      />
      <Button type="primary" onClick={() => fileInput.click()}>
        Pick File
      </Button>
      <Button onClick={fileUploadHandler} icon={<UploadOutlined />}>
        Upload
      </Button>
    </div>
  );
}

export default ImageUploader;
