import axios from 'axios';
import { notification, message } from 'antd';

const API_LINK = 'http://127.0.0.1:8000/api/upload';

const fileUploadHandler = ({
  selfieImage,
  idImage,
  fullName,
  email,
  setCurrentStep,
  retryVerification,
  setRetryVerification,
}) => {
  const formData = new FormData();
  formData.append('selfie_image', selfieImage);
  formData.append('id_image', idImage);
  formData.append('full_name', fullName);
  formData.append('email_address', email);
  formData.append('retry_verification', retryVerification);

  setRetryVerification(false);
  const key = 'updatable';
  message.loading({ content: 'Uploading Images...', key });
  axios
    .post(API_LINK, formData)
    .then((res) => {
      if (res.ok) {
        message.loading({ content: 'Success', key });
        setCurrentStep(2);
      } else {
        notification.error({
          message: 'Server Error',
          description: 'The server is not online, please try again later',
        });
      }
    })
    .catch(
      notification.error({
        message: 'Network Error',
        description: 'It seems you may have an unstable internet connection.',
      })
    );
};

export default fileUploadHandler;
