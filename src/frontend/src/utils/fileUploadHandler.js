import axios from 'axios';
import { notification, message } from 'antd';

const API_LINK = 'http://127.0.0.1:8000/api/upload';

const fileUploadHandler = ({
  selfieImage,
  idImage,
  fullName,
  email,
  isRetryVerification,
}) => {
  const formData = new FormData();
  formData.append('selfie_image', selfieImage);
  formData.append('id_image', idImage);
  formData.append('full_name', fullName);
  formData.append('email_address', email);
  formData.append('retry_verification', isRetryVerification);

  const key = 'updatable';
  message.loading({ content: 'Uploading Images...', key });

  let isUploadSuccess = false;
  axios
    .post(API_LINK, formData)
    .then((res) => {
      if (res.ok) {
        message.loading({ content: 'Success', key });
        isUploadSuccess = true;
      } else {
        notification.error({
          message: 'Server Error',
          description: 'The server is not online, please try again later',
        });
        isUploadSuccess = false;
      }
    })
    .catch((err) => {
      notification.error({
        message: 'Network Error',
        description: 'It seems you may have an unstable internet connection.',
      });
      isUploadSuccess = false;
    });
  return isUploadSuccess;
};

export default fileUploadHandler;
