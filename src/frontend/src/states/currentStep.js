import { atom } from 'recoil';

export const currentStepState = atom({
  key: 'currentStep',
  default: 0,
});
