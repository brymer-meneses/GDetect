import { message } from 'antd';

function messageHandler(response, key) {
  if (response.status === 200) {
    setTimeout(() => {
      message.success({
        content: response.data,
        key,
        duration: 1,
      });
    }, 10000);
    console.log(response);
  } else {
    setTimeout(() => {
      message.error({
        content: response.data,
        key,
        duration: 1,
      });
    }, 10000);
    console.log(response);
  }
}

export default messageHandler;
