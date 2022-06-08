import React from 'react';

import { Button } from '@mui/material';

import { getImageError } from './utils';

import { withSnackbar } from '../../hoc/withSnackbar';

import {
  Box,
  ButtonsContainer,
  StyledButton,
  ImagesWrapper,
  Image,
  ImageButtonWrapper,
} from './styled';

import ImageUploading from 'react-images-uploading';

const ImageUpload = ({
  images,
  onImageUpload,
  maxImages = 5,
  maxFileSize = 1000000,
  showErrorSnackbar,
}) => {
  const handleImageUpload = (imageList) => {
    onImageUpload(imageList);
  };

  return (
    <ImageUploading
      multiple
      value={images}
      onChange={handleImageUpload}
      maxNumber={maxImages}
      dataURLKey='data_url'
      acceptType={['jpg', 'png']}
      maxFileSize={maxFileSize}
      onError={(errors) => {
        showErrorSnackbar(getImageError(errors, maxFileSize, maxImages));
      }}>
      {({
        imageList,
        onImageUpload,
        onImageRemoveAll,
        onImageUpdate,
        onImageRemove,
        isDragging,
        dragProps,
        errors,
      }) => (
        <Box container>
          <ButtonsContainer container>
            <StyledButton
              size='small'
              variant='contained'
              marginright='true'
              onClick={onImageUpload}
              {...dragProps}>
              Add images
            </StyledButton>
            <StyledButton
              size='small'
              variant='contained'
              color='error'
              onClick={onImageRemoveAll}>
              Remove all images
            </StyledButton>
          </ButtonsContainer>
          <ImagesWrapper container>
            {imageList.map((image, index) => (
              <Image key={index}>
                <img
                  src={image.data_url}
                  alt={`payment-${index}`}
                  width='250'
                />
                <ImageButtonWrapper container>
                  <Button onClick={() => onImageUpdate(index)}>Update</Button>
                  <Button color='error' onClick={() => onImageRemove(index)}>
                    Remove
                  </Button>
                </ImageButtonWrapper>
              </Image>
            ))}
          </ImagesWrapper>
        </Box>
      )}
    </ImageUploading>
  );
};

export default withSnackbar(ImageUpload);
