export const getImageError = (errType, maxFileSize, maxNumber) => {
  if (errType.acceptType) {
    return 'File type is not supported';
  } else if (errType.maxNumber) {
    return `You can only upload ${maxNumber} images`;
  } else if (errType.maxFileSize) {
    return `Image size should be lesser than ${maxFileSize / 1000000} MB`;
  } else {
    return 'Image resolution is too large';
  }
};
