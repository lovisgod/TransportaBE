/* eslint-disable import/prefer-default-export */
const generateErrorMessage = (status, message) => ({
  status,
  message,
});

const generateErrorData = (status, data) => ({
  status,
  data,
});
const generateSuccessMessage = (status, message) => ({
  status,
  message,
});
const generateSuccessData = (status, data) => ({
  status,
  data,
});
export {
  generateErrorMessage,
  generateSuccessMessage,
  generateSuccessData,
  generateErrorData,
};
