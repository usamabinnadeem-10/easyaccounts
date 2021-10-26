import React from "react";

import CustomToggleButtons from "../../components/CustomToggleButtons/CustomToggleButtons";
import CustomDatePicker from "../../components/CustomDatePicker/CustomDatePicker";

import Select from "react-select";

import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";

import { useStyles } from "./styles";

function TransactionHeader(props) {
  const {
    personIdentifier,
    updateMetaData,
    selectedOptions,
    transactionTypes,
    metaConstants,
    showAccountTypes,
    options,
  } = props;

  const classes = useStyles();

  return (
    <>
      <Typography variant="h5" fontWeight="900" sx={{ mb: 2 }}>
        {`New ${personIdentifier} Transaction`}
      </Typography>

      <Grid container>
        <div className={`${classes.selectCustomer}`}>
          <Select
            placeholder={personIdentifier}
            value={selectedOptions.currentPerson}
            onChange={(user) => updateMetaData(metaConstants.user, user)}
            options={options.people}
          />
        </div>
        <CustomDatePicker
          getDate={(date) => updateMetaData(metaConstants.date, date)}
          value={selectedOptions.currentDate}
        />
        <div className={classes.metaItems}>
          <CustomToggleButtons
            buttons={transactionTypes}
            getSelectedValue={(type) =>
              updateMetaData(metaConstants.transactionType, type)
            }
            selectedValue={selectedOptions.currentTransactionType}
          />
        </div>
        {showAccountTypes && (
          <div>
            <Select
              placeholder={"Account Type"}
              value={selectedOptions.currentAccountType}
              onChange={(account) =>
                updateMetaData(metaConstants.accountType, account)
              }
              options={options.accountTypes}
            />
          </div>
        )}
      </Grid>
    </>
  );
}

export default TransactionHeader;
