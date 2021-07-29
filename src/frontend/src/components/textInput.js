import { Input } from 'antd';
import { UserOutlined, MailOutlined } from '@ant-design/icons';

import { useSetRecoilState } from 'recoil';
import { emailState, fullNameState } from '../states/info';

function TextInput(props) {
  const setEmail = useSetRecoilState(emailState);
  const setFullName = useSetRecoilState(fullNameState);

  let placeholder;
  let prefix;
  let onChangeHandler;
  switch (props.type) {
    case 'email':
      placeholder = 'Email';
      prefix = <MailOutlined />;
      onChangeHandler = setEmail;
      break;
    case 'fullName':
      placeholder = 'Full Name';
      prefix = <UserOutlined />;
      onChangeHandler = setFullName;
      break;
    default:
      console.log('Something went wrong');
  }

  const onChange = (event) => {
    onChangeHandler(event.target.value);
  };

  return (
    <div className="text-input-container">
      <Input placeholder={placeholder} onChange={onChange} prefix={prefix} />
    </div>
  );
}

export default TextInput;
