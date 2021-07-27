const imagesReducer = (state = { selfie: null, id: null }, action) => {
  switch (action.type) {
    case 'setSelfie':
      let id = action.payload;
      return { id: id, ...state };
    case 'setId':
      let selfie = action.payload;
      return { selfie: selfie, ...state };
    default:
      return state;
  }
};

export default imagesReducer;
