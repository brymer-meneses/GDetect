import { Typography, Avatar } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import LoginButton from './loginButtons';
import TextInput from './textInput';

import '../styles/login.css';

const { Text } = Typography;

function Login() {
  return (
    <section className="login-section">
      <div className="login-form">
        <Avatar size={100} icon={<UserOutlined />} />
        <Text style={{ marginTop: '1rem' }}>Enter your Information</Text>
        <div className="login-container">
          <TextInput type="email" />
          <TextInput type="fullName" />
        </div>
        <Text style={{ marginTop: '1rem' }}></Text>
        <div className="button-container">
          <LoginButton />
        </div>
      </div>
    </section>
  );
}

export default Login;
