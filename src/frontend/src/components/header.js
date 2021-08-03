import { Typography } from 'antd';
import '../styles/header.css';

const { Text } = Typography;
function Header() {
  return (
    <div className="header">
      <img
        src={process.env.PUBLIC_URL + '/gcash-logo.png'}
        className="logo"
        alt=""
      />

      <Text strong className="title">
        GCash
      </Text>
      <Text secondary className="subtitle">
        Verify your account
      </Text>
    </div>
  );
}
export default Header;
