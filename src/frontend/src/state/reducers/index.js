import { combineReducers } from 'redux';

import screenDimmedReducer from './isScreenDimmed';
import imagesReducer from './images';
import infoReducer from './info';
import isProceedToUploadReducer from './isProceedToUpload';

const reducers = combineReducers({
  isScreenDimmed: screenDimmedReducer,
  images: imagesReducer,
  info: infoReducer,
  isProceedToUpload: isProceedToUploadReducer,
});

export default reducers;
