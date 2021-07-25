import { Result as ResultComponent } from 'antd';
import { CloseOutlined } from '@ant-design/icons';
import '../styles/result.css';

function Result(props) {
  const handleClose = () => {
    props.handleClose(true);
  };
  return (
    <div
      style={props.showResult ? {} : { display: 'none' }}
      className="result-container"
    >
      <ResultComponent
        className="result"
        status={props.status}
        title={props.message}
        subTitle={props.tips}
      />
      <CloseOutlined className="close-button" onClick={handleClose} />
    </div>
  );
}

export default Result;
