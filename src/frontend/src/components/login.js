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
  };

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
        <Button
          type="primary"
          disabled={fullName === null && email === null}
          className="upload-button"
          onClick={handleSubmit}
        >
          Submit
        </Button>
      </div>
    </section>
  );
}

export default Login;
