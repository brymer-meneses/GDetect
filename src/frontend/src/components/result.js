import { Result as ResultComponent, Typography, Button } from 'antd';
import { CloseOutlined, CloseCircleOutlined } from '@ant-design/icons';
import '../styles/result.css';

const { Paragraph } = Typography;

function Result(props) {
  const handleClose = () => {
    props.handleClose(true);
  };

  const RetryVerificationHandler = () => {
    props.retryVerificationHandler();
  };

  const errors =
    props.errors !== null ? (
      props.errors.map((error) => {
        return (
          <Paragraph>
            <CloseCircleOutlined style={{ color: 'red' }} />
            {error}
          </Paragraph>
        );
      })
    ) : (
      <div />
    );
  return (
    <>
      <div
        style={props.showResult ? {} : { display: 'none' }}
        className="result-container"
      >
        <ResultComponent
          className="result"
          status={props.status}
          title={props.title}
          subTitle={props.message}
          extra={
            <Button type="secondary" onClick={RetryVerificationHandler}>
              Retry Verification
            </Button>
          }
        >
          {errors}
        </ResultComponent>
        <CloseOutlined className="close-button" onClick={handleClose} />
      </div>
    </>
  );
}

export default Result;
