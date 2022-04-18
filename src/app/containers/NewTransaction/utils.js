import { INITIAL } from './constants';

export const getInitialValues = (toggleButtons) => {
  return {
    ...INITIAL,
    type: toggleButtons[0].value,
  };
};
