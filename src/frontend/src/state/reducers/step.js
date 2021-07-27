const step = (state = false, action) => {
  switch (action.type) {
    case 'setCurrentStep':
      return action.payload;
    default:
      return state;
  }
};

export default screenDimmedReducer;
