import React from "react";

import { TextField } from "@mui/material";

import CustomDatePicker from "../../components/CustomDatePicker";
import CustomToggleButtons from "../../components/CustomToggleButtons";
import CustomSwitch from "../../components/CustomSwitch";
import Heading from "../../components/Heading";

import Select from "react-select";

import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";

import { useStyles } from "./styles";

function TransactionHeader(props) {
  const {
    currentBalance,
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
      <Heading heading={`New ${personIdentifier} Transaction`} />
      <Grid container rowSpacing={3} columnSpacing={4}>
        <Grid item xs={6} className={`${classes.selectCustomer}`}>
          <Select
            tabSelectsValue
            escapeClearsValue
            isClearable
            styles={{
              control: (base, state) => ({
                ...base,
                minHeight: "40px",
              }),
              menu: (base) => ({
                ...base,
                zIndex: 10000,
              }),
            }}
            placeholder={personIdentifier}
            value={selectedOptions.currentPerson}
            onChange={(user) => updateMetaData(metaConstants.user, user)}
            options={options.people}
          />
          {currentBalance && (
            <div className={classes.currentBalance}>
              <Typography
                variant="subtitle2"
                color={currentBalance >= 0 ? "success.main" : "error.main"}
              >{`${Math.abs(currentBalance)} ${
                currentBalance >= 0 ? " CR" : " DB"
              }`}</Typography>
            </div>
          )}
        </Grid>
        <Grid item xs={6}>
          <CustomDatePicker
            getDate={(date) => updateMetaData(metaConstants.date, date)}
            value={selectedOptions.currentDate}
            fullWidth
          />
        </Grid>
        {showAccountTypes && (
          <Grid item xs={6}>
            <Select
              placeholder={"Account Type"}
              value={selectedOptions.currentAccountType}
              onChange={(account) =>
                updateMetaData(metaConstants.accountType, account)
              }
              options={options.accountTypes}
              styles={{
                control: (base, state) => ({
                  ...base,
                  minHeight: "40px",
                }),
              }}
            />
          </Grid>
        )}
        <Grid item xs={6}>
          <TextField
            fullWidth
            type="number"
            label="Book serial"
            defaultValue={selectedOptions.currentManualInvoiceSerial}
            value={selectedOptions.currentManualInvoiceSerial}
            size="small"
            min={0}
            onChange={(e) => {
              updateMetaData(
                metaConstants.manualInvoiceSerial,
                parseInt(e.target.value) || null
              );
            }}
          />
        </Grid>
        {!showAccountTypes && (
          <Grid
            item
            xs={showAccountTypes ? 6 : 12}
            className={classes.metaItems}
          ></Grid>
        )}

        <Grid item xs={6} className={classes.metaItems}>
          <CustomToggleButtons
            buttons={transactionTypes}
            getSelectedValue={(type) =>
              updateMetaData(metaConstants.transactionType, type)
            }
            selectedValue={selectedOptions.currentTransactionType}
          />
        </Grid>
        <Grid item xs={6} className={classes.metaItems}>
          <CustomSwitch
            label="Mark as incomplete"
            onCheckedLabel="Incomplete Invoice"
            checked={selectedOptions.currentRequiresAction}
            onChange={(event) =>
              updateMetaData(metaConstants.requiresAction, event.target.checked)
            }
          />
        </Grid>
      </Grid>
    </>
  );
}

export default TransactionHeader;
