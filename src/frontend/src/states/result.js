import { atom } from 'recoil';

export const resultState = atom({
  key: 'result',
  default: {
    type: 'verification',
    status: 'error',
    title: 'You have not applied for verification',
    message: 'Apply now to get GCash Benefits',
    errors: null,
    verificationStatus: 1,
    buttonVisible: false,
  },
});
