import { Typography, Button, Avatar } from 'antd';
import { UserOutlined, MailOutlined } from '@ant-design/icons';
import TextInput from './textInput';
import '../styles/login.css';

import { useDispatch, useSelector } from 'react-redux';
import { setEmail, setFullName } from '../state/actions/setInfo';

const { Text } = Typography;

function Login(props) {
  const { fullName, email } = useSelector((state) => state.info);
  const dispatch = useDispatch();

  const handleSubmit = () => {
    props.handleStatus(email);
  };

  const isProceedButtonDisabled =
    email === '' || email === null || fullName === '' || fullName === null;
  const isCheckStatusButtonDisabled = email === '' || email === null;

  return (
    <section className="login-section">
      <div className="login-form">
        <Avatar size={100} icon={<UserOutlined />} />
        <Text style={{ marginTop: '1rem' }}>Enter your Information</Text>{' '}
        <div className="login-container">
          <TextInput
            prefix={<MailOutlined />}
            handler={() => dispatch(setEmail)}
            placeholder="Email"
          />
          <TextInput
            prefix={<UserOutlined />}
            handler={() => dispatch(setFullName)}
            placeholder="Full Name"
          />
        </div>
        <Text style={{ marginTop: '1rem' }}></Text>
        <div className="button-container">
          <Button
            type="primary"
            disabled={isProceedButtonDisabled}
            className="upload-button"
            onClick={handleSubmit}
          >
            Proceed
          </Button>
          Recently Applied for Verification?
          <Button
            type="secondary"
            disabled={isCheckStatusButtonDisabled}
            className="upload-button"
            onClick={handleSubmit}
          >
            Check Status
          </Button>
        </div>
      </div>
    </section>
  );
}

export default Login;
