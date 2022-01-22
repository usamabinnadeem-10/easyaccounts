import React from "react";

import { Typography } from "@mui/material";

import { useStyles } from "./styles";

const AccountTypeCard = ({ accountName, balance }) => {
  const classes = useStyles();
  return (
    <div className={classes.card}>
      <Typography variant="body2" fontWeight={900}>
        {accountName === "null" ? "Account Payable" : accountName}
      </Typography>
      <Typography variant="h6" fontWeight={700}>
        PKR {balance}/=
      </Typography>
    </div>
  );
};

export default AccountTypeCard;
