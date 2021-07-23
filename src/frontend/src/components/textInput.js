import { Input } from 'antd';

function TextInput(props) {

  return (
    <div className="text-input-container">
      <Input
        placeholder={props.placeholder}
        onChange={props.handler}
        prefix={props.prefix}
      />
    </div>
  );
}

export default TextInput;
