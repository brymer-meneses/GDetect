import { atom } from 'recoil';

export const isRetryVerificationState = atom({
  key: 'isRetryVerification',
  default: false,
});
