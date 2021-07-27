export const setEmail = (email) => {
  return {
    type: 'setEmail',
    payload: email,
  };
};

export const setFullName = (fullName) => {
  return {
    type: 'setFullName',
    payload: fullName,
  };
};
