const processResult = (res) => {
  let status;
  let title;
  let message;
  switch (res.data.verification_status) {
    case 0:
      status = 'success';
      title = 'Verification Success';
      message = 'Congratulations, you are now a verified GCash User!';
      break;
    case 1:
      status = 'error';
      title = 'No Pending Verification';
      message =
        'You have not completed or applied for the verification process.';
      break;
    case 2:
      status = 'warning';
      title = 'Verification Pending';
      message =
        'Your verification is currently being processed, please try again later.';
      break;
    default:
      status = 'error';
      title = 'Verification Failed';
      message = 'Your verification failed, please try again.';
      break;
  }

  return {
    status: status,
    title: title,
    message: message,
    errors: res.data.verification_failures,
    verificationStatus: res.data.verification_status,
  };
};
export default processResult;
