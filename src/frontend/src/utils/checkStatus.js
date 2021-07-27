import axios from 'axios';
import { notification } from 'antd';

const STATUS_LINK = 'http://127.0.0.1:8000/api/status';

const checkStatus = ({
  email,
  setProceedToUpload,
  setResult,
  setShowResult,
  setCurrentStep,
  screenDimmedHandler,
  retryVerificationHandler,
}) => {
  const formData = new FormData();
  formData.append('email_address', email);
  axios
    .post(STATUS_LINK, formData)
    .then((res) => {
      if (!res.status === 200) {
        notification.error({
          message: 'Network Error',
          description: 'It seems you may have an unstable internet connection.',
        });
        return;
      }
      setCurrentStep(1);
      if (res.data.verification_status === 1) {
        setProceedToUpload(true);
        // If the account linked with that email is not currently being
        // processed for verification, proceed to image upload
      } else {
        // Else show result
        /* 
            Verification Status Codes:
                0 - User Verification Success
                1 - User did not do any prior attempt
                     to verification
                2 - User verification is currently being processed
                3 - Faces were not detected by the system
                4 - The two images that were uploaded, do not have
                    the same facial structure.
                5 - Invalid ID
                6 - Credentials don't match up with the ones written
                    in the id uploaded by the user.
                7 - A similar facial structure has been found in the database
            */
        let status;
        let title;
        let message;
        let buttonVisible;
        switch (res.data.verification_status) {
          case 0:
            status = 'success';
            title = 'Verification Success';
            message = 'Congratulations, you are now a verified GCash User!';
            buttonVisible = false;
            break;
          // the case for "1" shouldn't be checked because it is handled
          // at the above if statement
          case 2:
            status = 'warning';
            title = 'Verification Pending';
            message =
              'Your verification is currently being processed, please try again later.';
            buttonVisible = false;
            break;
          default:
            status = 'error';
            title = 'Verification Failed';
            message = 'Your verification failed, please try again.';
            buttonVisible = true;
            break;
        }

        const fetchedResult = {
          status: status,
          title: title,
          message: message,
          errors: res.data.verification_failures,
          buttonLabel: 'Retry Verification',
          buttonHandler: retryVerificationHandler,
          buttonVisible: buttonVisible,
        };

        setResult(fetchedResult);
        setShowResult(true);
        screenDimmedHandler(true);
      }
    })
    .catch((err) => {
      if (err.status !== 422) {
        notification.error({
          message: 'Server Error',
          description: 'The server is not online, please try again later',
        });
      }
    });
};

export default checkStatus;
