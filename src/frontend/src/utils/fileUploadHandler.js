import axios from 'axios';
import { notification } from 'antd';

const API_LINK = 'http://127.0.0.1:8000/api/upload';

const fileUploadHandler = ({
  selfieImage,
  idImage,
  fullName,
  email,
  isRetryVerification,
  setIsUploadSuccess,
}) => {
  const formData = new FormData();
  formData.append('selfie_image', selfieImage);
  formData.append('id_image', idImage);
  formData.append('full_name', fullName);
  formData.append('email_address', email);
  formData.append('retry_verification', isRetryVerification);

  axios
    .post(API_LINK, formData)
    .then((res) => {
      if (res.status === 200) {
        setIsUploadSuccess(true);
      } else {
        setIsUploadSuccess(false);
      }
    })
    .catch((err) => {
      if (err.status !== 422) {
        notification.error({
          message: 'Network Error',
          description: 'It seems you may have an unstable internet connection.',
        });
      } else {
        notification.error({
          message: 'Server Error',
          description:
            'There seems to be a problem with the server, please try again later.',
        });
      }
      setIsUploadSuccess(false);
    });
};

export default fileUploadHandler;
