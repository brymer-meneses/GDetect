const isProceedToUploadReducer = (state = false, action) => {
  switch (action.type) {
    case 'returnToLogin':
      return false;
    case 'proceedToUpload':
      return true;
    default:
      return state;
  }
};

export default isProceedToUploadReducer;
