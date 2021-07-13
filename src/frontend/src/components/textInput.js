import { Input } from 'antd';

function TextInput(props) {
  const handleChange = (event) => {
    props.handler(event.target.value);
  };
  return (
    <div className="text-input-container">
      <Input
        placeholder={props.placeholder}
        onChange={handleChange}
        prefix={props.prefix}
      />
    </div>
  );
}

export default TextInput;
