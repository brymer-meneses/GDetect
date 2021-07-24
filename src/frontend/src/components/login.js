import { useState } from 'react';

import { Typography, Button } from 'antd';
import { UserOutlined, MailOutlined } from '@ant-design/icons';

import TextInput from './textInput';
import '../styles/login.css';

const { Text } = Typography;

function Login(props) {
  const [email, setEmail] = useState(null);
  const [fullName, setFullName] = useState(null);

  const handleSubmit = () => {
    props.handler({ email: email, fullName: fullName });
    props.handleStatus(email);
    console.log(email);
  };

  const isButtonsDisabled =
    email === '' || email === null || fullName === '' || fullName === null;

  return (
    <section className="login-section">
      <div className="login-form">
        <UserOutlined style={{ fontSize: '4rem' }} />
        <Text style={{ marginTop: '1rem' }}>Enter your Information</Text>{' '}
        <div className="login-container">
          <TextInput
            prefix={<MailOutlined />}
            handler={setEmail}
            placeholder="Email"
          />
          <TextInput
            prefix={<UserOutlined />}
            handler={setFullName}
            placeholder="Full Name"
          />
        </div>
        <Text style={{ marginTop: '1rem' }}></Text>
        <div className="button-container">
          <Button
            type="primary"
            disabled={isButtonsDisabled}
            className="upload-button"
            onClick={handleSubmit}
          >
            Proceed
          </Button>
          Recently Applied for Verification?
          <Button
            type="secondary"
            disabled={isButtonsDisabled}
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
