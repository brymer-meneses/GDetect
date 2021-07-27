const screenDimmedReducer = (state = false, action) => {
  switch (action.type) {
    case 'dimScreen':
      return true;
    case 'normalScreen':
      return false;
    default:
      return state;
  }
};

export default screenDimmedReducer;
