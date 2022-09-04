import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';

import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';

import CustomModal from '../../components/CustomModal';
import CustomDatePicker from '../../components/CustomDatePicker';

import MuiPhoneNumber from 'material-ui-phone-number';

import Autocomplete from '@mui/material/Autocomplete';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { LoadingButton } from '@mui/lab';

import { useStyles, StyledTextField } from './styles';
import { FIELDS } from '../../../constants/fieldTypes';

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
  const essentials = useSelector((state) => state.essentials);

  const [state, setState] = useState({});
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (form.essentialActions?.length > 0) {
      setLoading(true);
      form.essentialActions.forEach((action) => {
        if (!essentials.fetched[action.reducerVariable]) {
          dispatch(action.action());
        }
      });
      setLoading(false);
    }
  }, []);

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
    <CustomModal open={open} handleClose={handleClose}>
      <Typography
        textAlign='center'
        variant='h6'
        sx={{
          mb: 2,
          fontWeight: 900,
        }}>
        {form.heading}
      </Typography>
      {!loading ? (
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
                    <StyledTextField
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
              <StyledTextField
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
      ) : (
        <></>
      )}
    </CustomModal>
  );
};

export default withSnackbar(AddModal);
