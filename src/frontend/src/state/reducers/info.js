const infoReducer = (state = { fullName: null, email: null }, action) => {
  switch (action.type) {
    case 'setInfo':
      return action.payload;
    default:
      return state;
  }
};

export default infoReducer;
