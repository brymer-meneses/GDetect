import axios from 'axios';
import { notification, message } from 'antd';
import processResult from '../utils/processResult';

const STATUS_LINK = 'http://127.0.0.1:8000/api/status';

const checkStatus = async ({ email }) => {
  const formData = new FormData();
  formData.append('email_address', email);
  let fetchedResult;
  message.loading({ content: 'Processing Request...', key: 'status' });
  try {
    const res = await axios.post(STATUS_LINK, formData);
    // Handle failed upload

    if (!res.status === 200) {
      notification.error({
        message: 'Network Error',
        description: 'It seems you may have an unstable internet connection.',
      });
      fetchedResult = null;
    }
    message.destroy('status');

    fetchedResult = processResult(res);
    return fetchedResult;
  } catch (err) {
    if (err.status !== 422) {
      message.loading({ content: 'Processing Request...', key: 'status' });
      notification.error({
        message: 'Server Error',
        description: 'The server is not online, please try again later',
      });
      fetchedResult = null;
    }
    message.destroy('status');
    return null;
  }
};
export default checkStatus;
