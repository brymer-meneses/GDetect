import axios from 'axios';
import { notification } from 'antd';
import processResult from '../utils/processResult';

const STATUS_LINK = 'http://127.0.0.1:8000/api/status';

const checkStatus = ({ email, setResult }) => {
  const formData = new FormData();
  let fetchedResult;
  formData.append('email_address', email);
  axios
    .post(STATUS_LINK, formData)
    .then((res) => {
      if (!res.status === 200) {
        notification.error({
          message: 'Network Error',
          description: 'It seems you may have an unstable internet connection.',
        });
        fetchedResult = null;
      }
      fetchedResult = processResult(res);
      setResult(fetchedResult);
    })
    .catch((err) => {
      if (err.status !== 422) {
        notification.error({
          message: 'Server Error',
          description: 'The server is not online, please try again later',
        });
        fetchedResult = null;
        setResult(fetchedResult);
      }
    });
};

export default checkStatus;
