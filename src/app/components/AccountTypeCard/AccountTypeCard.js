import React from "react";

import { Typography } from "@mui/material";

import { DB } from "../../../constants/db";
import { useStyles } from "./styles";

const AccountTypeCard = ({ account }) => {
  const classes = useStyles();
  return (
    <div className={classes.card}>
      <Typography variant="body2" fontWeight={900}>
        {account[DB.ACCOUNT_TYPE] || "Account Payable"}
      </Typography>
      <Typography variant="button">PKR {account[DB.BALANCE]}/=</Typography>
    </div>
  );
};

export default AccountTypeCard;
