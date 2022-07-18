import React from 'react';
import { useRef } from 'react';

import { useState } from 'react';

import ViewWrapper from '../ViewWrapper';
import Heading from '../Heading';

import { Box } from '@mui/material';
import { Grid } from '@mui/material';
import { Button } from '@mui/material';

import ImgsViewer from 'react-images-viewer';

import { useReactToPrint } from 'react-to-print';

import { CellText, TableCell, StyledImage, ImagesContainer } from './styled';

import { formatPaymentAsTable } from './utils';

const Table = ({ data }) => {
  return (
    <Grid container direction='column'>
      {data.map((row) => {
        return (
          <Grid container>
            {[0, 1].map((column, index) => {
              return (
                <Grid key={index} item xs={6}>
                  <TableCell>
                    <CellText variant='body2'>{row[index]}</CellText>
                  </TableCell>
                </Grid>
              );
            })}
          </Grid>
        );
      })}
    </Grid>
  );
};

const ImagesWrapper = ({ images, onClick }) => {
  return (
    <ImagesContainer gap={2} container>
      {images.map((img, idx) => (
        <StyledImage src={img.url} onClick={() => onClick(idx)} />
      ))}
    </ImagesContainer>
  );
};

const PaymentReceipt = ({ paymentData, persons, accounts, overridewidth }) => {
  const componentRef = useRef();
  const [currentImg, setCurrentImg] = useState(0);
  const [showViewer, setShowViewer] = useState(false);

  const images = paymentData.image_urls;

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  const goToPrevious = () => {
    setCurrentImg(currentImg > 0 ? currentImg - 1 : 0);
  };

  const goToNext = () => {
    setCurrentImg(
      currentImg < images.length - 1 ? currentImg + 1 : images.length - 1
    );
  };

  const toggleViewer = () => {
    setShowViewer(!showViewer);
  };

  const handleClickImage = (index) => {
    setCurrentImg(index);
    setShowViewer(true);
  };

  return (
    <ViewWrapper overridewidth={overridewidth}>
      <Heading heading='Payment Receipt' />
      <Box ref={componentRef} sx={{ p: 3 }}>
        <Table data={formatPaymentAsTable(paymentData, persons, accounts)} />
        {images && images?.length ? (
          <>
            <ImagesWrapper images={images} onClick={handleClickImage} />
            <ImgsViewer
              imgs={paymentData.image_urls.map((img) => ({ src: img.url }))}
              currImg={currentImg}
              isOpen={showViewer}
              onClickPrev={goToPrevious}
              onClickNext={goToNext}
              onClose={toggleViewer}
            />
          </>
        ) : (
          <></>
        )}
      </Box>
      <Button onClick={handlePrint}>PRINT</Button>
    </ViewWrapper>
  );
};

export default PaymentReceipt;
