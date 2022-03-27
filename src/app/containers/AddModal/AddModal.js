import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';

import { useDispatch } from 'react-redux';

import CustomDatePicker from '../../components/CustomDatePicker/CustomDatePicker';

import MuiPhoneNumber from 'material-ui-phone-number';

import Autocomplete from '@mui/material/Autocomplete';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import { LoadingButton } from '@mui/lab';

import { useStyles } from './styles';
import { FIELDS } from '../../../constants/fieldTypes';
// import { resetAdded } from "../../../store/essentials/actions";

import { withSnackbar } from '../../hoc/withSnackbar';

const AddModal = ({
  open,
  handleClose,
  form,
  isEdit = false,
  defaultFormState,
  showErrorSnackbar,
  isLoading,
}) => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const [state, setState] = useState({});
  const [error, setError] = useState(false);

  // useEffect(() => {
  //   return () => {
  //     dispatch(resetAdded());
  //   };
  // }, []);

  useEffect(() => {
    setError(false);
  }, [state]);

  useEffect(() => {
    if (isEdit) {
      setState(defaultFormState);
    } else {
      setState({});
    }
  }, [form, isEdit, defaultFormState]);

  const handleChange = (value, label) => {
    setState({
      ...state,
      [label]: value,
    });
  };

  const submit = () => {
    let data = { ...state };
    for (let key in state) {
      if (typeof state[key] === 'object' && !!state[key]) {
        data[key] = data[key].value;
      }
    }
    // check if all the required fields are in the data
    let canPost = true;
    form.formData.forEach((element) => {
      if (element.required && !data[element.name]) {
        showErrorSnackbar(`Please fill ${element.label}`);
        setError(true);
        canPost = false;
      }
    });
    if (canPost) {
      if (isEdit) {
        form.action(data);
      } else {
        dispatch(form.action(data));
      }
      if (form.dispatchActions?.length > 0) {
        form.dispatchActions.forEach((action) => {
          dispatch(action.actionName(action.data));
        });
      }
    }
  };

  return (
    <Modal paper='true' open={open} onClose={handleClose}>
      <Paper className={classes.paper}>
        <Typography
          textAlign='center'
          variant='h6'
          sx={{
            mb: 2,
            fontWeight: 900,
          }}>
          {form.heading}
        </Typography>
        <Grid container flexDirection='column' alignContent='center'>
          {form.formData.map((field, index) => {
            return field.type === FIELDS.SELECT ? (
              <div key={index} className={classes.select}>
                <Autocomplete
                  clearOnEscape
                  autoComplete
                  autoHighlight
                  fullWidth
                  size='small'
                  getOptionLabel={(option) => option.label}
                  options={field.options}
                  onChange={(e, value, reason) => {
                    if (reason === 'clear' || !value) {
                      handleChange(null, field.name);
                    } else {
                      handleChange(value, field.name);
                    }
                  }}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      variant='outlined'
                      label={field.label}
                      error={error && field.required}
                    />
                  )}
                  value={state[field.name] || null}
                />
              </div>
            ) : field.type === FIELDS.DATE ? (
              <div key={index} className={classes.dateWrapper}>
                <CustomDatePicker
                  placeholder={field.label}
                  getDate={(date) => handleChange(date, field.name)}
                  value={state[field.name] || null}
                  fullWidth
                />
              </div>
            ) : field.type === FIELDS.PHONE_NUMBER ? (
              <MuiPhoneNumber
                key={index}
                defaultCountry={'pk'}
                onlyCountries={['pk']}
                onChange={(value) => handleChange(value, field.name)}
                sx={{ mb: 2.5, width: 0.9 }}
                variant='outlined'
                size='small'
                countryCodeEditable={false}
                label='Phone Number'
                autoFormat={false}
              />
            ) : (
              <TextField
                error={error && field.required && !state[field.name]}
                multiline={field.type !== FIELDS.NUMBER}
                value={state[field.name] || ''}
                onChange={(e) => handleChange(e.target.value, field.name)}
                variant='outlined'
                key={index}
                label={field.label}
                fullWidth
                size='small'
                required={field.required}
                sx={{ mb: 2.5, width: 0.9 }}
                type={field.type}
                InputProps={{
                  inputProps: field.type === FIELDS.NUMBER ? { min: 0 } : {},
                }}
              />
            );
          })}

          <LoadingButton
            loading={isLoading}
            onClick={submit}
            variant='contained'
            sx={{ mt: 2, fontWeight: 700 }}>
            Submit
          </LoadingButton>
        </Grid>
      </Paper>
    </Modal>
  );
};

export default withSnackbar(AddModal);
