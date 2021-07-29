const processResult = (res) => {
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
    case 1:
      status = 'error';
      title = 'No Pending Verification';
      message =
        'You have not completed or applied for the verification process.';
      buttonVisible = false;
      break;
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

  return {
    status: status,
    title: title,
    message: message,
    errors: res.data.verification_failures,
    verificationStatus: res.data.verification_status,
  };
};
export default processResult;
