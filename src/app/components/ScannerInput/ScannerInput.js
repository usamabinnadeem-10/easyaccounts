import React from 'react';
import { useState } from 'react';

import { useSelector } from 'react-redux';

import { TextField } from '@mui/material';

import { Snackbar } from '@mui/material';

const ScannerInput = ({ getScannedValue, overrideValues }) => {
  const products = useSelector((state) => state.essentials.products);

  const [input, setInput] = useState('');

  const handleScannerInput = (val) => {
    let decoded = null;
    try {
      decoded = JSON.parse(val);
    } catch (error) {
      setInput('');
      return;
    }
    let product = products.filter((product) => product.label === decoded.name);
    if (!(product.length > 0)) {
      setInput('');
      return;
    }
    product = product[0];
    overrideValues &&
      overrideValues.forEach((value) => {
        decoded[value.key] = value.value;
      });

    getScannedValue({
      product: product,
      yards_per_piece: {
        label: decoded.gazaana,
        value: decoded.gazaana,
      },
    });
    setInput('');
  };

  return (
    <Snackbar
      open={true}
      anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}>
      <div>
        <TextField
          sx={{
            '& .MuiFilledInput-root': {
              borderRadius: '10px',
              '-webkit-text-security': 'square',
            },
            '& .MuiFilledInput-root:before': {
              border: 0,
            },
            '& .MuiFilledInput-root:after': {
              border: 0,
            },
            '& .MuiFilledInput-root:hover': {
              border: 0,
            },
          }}
          InputProps={{ disableUnderline: true }}
          autoFocus
          variant='filled'
          label='Scanner'
          value={input}
          onChange={(event) => setInput(event.target.value)}
          onKeyPress={(e) => {
            if (e.key === 'Enter') {
              handleScannerInput(e.target.value);
            }
          }}
        />
      </div>
    </Snackbar>
  );
};

export default ScannerInput;
