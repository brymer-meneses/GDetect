const isResultShown = (state = false, action) => {
  switch (action.type) {
    case 'hideResult':
      return false;
    case 'showResult':
      return true;
    default:
      return state;
  }
};
