import { atom } from 'recoil';

export const selfieImageState = atom({
  key: 'selfie',
  default: null,
});

export const idImageState = atom({
  key: 'id',
  default: null,
});
