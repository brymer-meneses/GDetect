export const setIdImage = (img) => {
  return {
    type: 'setId',
    payload: img,
  };
};

export const setSelfieImage = (img) => {
  return {
    type: 'setSelfie',
    payload: img,
  };
};
