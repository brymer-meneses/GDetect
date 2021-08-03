import axios from 'axios';
import { notification, message } from 'antd';

const API_LINK = 'http://127.0.0.1:8000/api/upload';

const fileUploadHandler = async ({
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

  message.loading({ content: 'Uploading...', key: 'upload' });

  try {
    const res = await axios.post(API_LINK, formData);
    if (res.status === 200) {
      message.destroy('upload');
      return true;
    } else {
      message.destroy('upload');
      return false;
    }
  } catch (err) {
    if (err.status !== 422) {
      message.error({ content: 'Error', key: 'upload' });
      notification.error({
        message: 'Network Error',
        description: 'It seems you may have an unstable internet connection.',
      });
      message.destroy('upload');
      return false;
    } else {
      message.error({ content: 'Error', key: 'upload' });
      notification.error({
        message: 'Server Error',
        description:
          'There seems to be a problem with the server, please try again later.',
      });
      message.destroy('upload');
      return false;
    }
  }
};

export default fileUploadHandler;
