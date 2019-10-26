/* eslint-disable import/prefer-default-export */
const generateErrorMessage = (status, message) => ({
  status,
  message,
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
};
