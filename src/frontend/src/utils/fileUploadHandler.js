import axios from 'axios';
import { StopOutlined, CloudUploadOutlined } from '@ant-design/icons';
import { notification, message } from 'antd';

const API_LINK = 'http://127.0.0.1:8000/api/upload';

const fileUploadHandler = ({
  selfieImage,
  idImage,
  fullName,
  email,
  isRetryVerification,
  setIsRetryVerification,
  setResult,
}) => {
  const formData = new FormData();
  formData.append('selfie_image', selfieImage);
  formData.append('id_image', idImage);
  formData.append('full_name', fullName);
  formData.append('email_address', email);
  formData.append('retry_verification', isRetryVerification);

  const uploadSuccess = {
    status: null,
    icon: <CloudUploadOutlined />,
    title: 'Upload Success',
    message:
      'Congrats! Your account is now currently being processed for verification.',
  };

  const uploadFailed = {
    status: null,
    icon: <StopOutlined />,
    message: 'Something went upon uploading your information to the server.',
  };

  const key = 'updatable';
  message.loading({ content: 'Uploading Images...', key });

  axios
    .post(API_LINK, formData)
    .then((res) => {
      if (res.ok) {
        message.loading({ content: 'Success', key });
        setIsRetryVerification(true);
        setResult(uploadSuccess);
      } else {
        notification.error({
          message: 'Server Error',
          description: 'The server is not online, please try again later',
        });
        setResult(uploadFailed);
      }
    })
    .catch((err) => {
      notification.error({
        message: 'Network Error',
        description: 'It seems you may have an unstable internet connection.',
      });
      setResult(uploadFailed);
    });
};

export default fileUploadHandler;
