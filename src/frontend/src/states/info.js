import { atom } from 'recoil';

export const emailState = atom({
  key: 'email',
  default: '',
});

export const fullNameState = atom({
  key: 'fullName',
  default: '',
});
