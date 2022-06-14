import React from 'react';
import { useState } from 'react';

import { Grid } from '@mui/material';
import { Button } from '@mui/material';

import { StyledImage } from './styled';
import { deleteImageApi } from './api';

import { findErrorMessage } from '../../utilities/objectUtils';
import { withSnackbar } from '../../hoc/withSnackbar';

const ImageViewAndDelete = ({ imageUrls, onDelete, showErrorSnackbar }) => {
  const [images, setImages] = useState(imageUrls);
  const [mouseLocation, setMouseLocation] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleDelete = (imageId) => {
    setLoading(true);
    deleteImageApi(imageId)
      .then((response) => {
        setImages(images.filter((img) => img.id !== imageId));
        setLoading(false);
      })
      .catch((error) => {
        showErrorSnackbar(findErrorMessage(error.response.data));
        setLoading(false);
      });
  };

  return (
    <Grid container gap={1}>
      {images.map((img, index) => {
        return (
          <Grid item xs={3}>
            <Grid container direction='column'>
              <StyledImage darken={mouseLocation === index} src={img.url} />
              <Button
                disabled={loading}
                onMouseEnter={() => setMouseLocation(index)}
                onMouseLeave={() => setMouseLocation(null)}
                onClick={() => handleDelete(img.id)}
                color='error'
                size='small'>
                Delete
              </Button>
            </Grid>
          </Grid>
        );
      })}
    </Grid>
  );
};

export default withSnackbar(ImageViewAndDelete);
