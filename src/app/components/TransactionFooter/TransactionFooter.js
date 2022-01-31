import React from "react";

import CustomLoader from "../CustomLoader/CustomLoader";

import { Button } from "@mui/material";
import Fab from "@mui/material/Fab";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";

import Add from "@mui/icons-material/Add";
import EmailIcon from "@mui/icons-material/Email";
import SaveIcon from "@mui/icons-material/Save";
import EditIcon from "@mui/icons-material/Edit";

import { formatCurrency } from "../../utilities/stringUtils";

function TransactionFooter(props) {
  const {
    addRow,
    transactionFooter,
    tableData,
    total,
    loading,
    makeTransaction,
    transaction,
  } = props;
  return (
    <>
      <Grid container justifyContent="flex-end" sx={{ pb: 2 }}>
        <Fab onClick={() => addRow()} color="secondary" size="small">
          <Add />
        </Fab>
      </Grid>

      <Grid container justifyContent="flex-end" sx={{ pb: 2 }}>
        <Grid sx={{ width: "max-content" }} container direction="column">
          {transactionFooter.map((field, index) => {
            if (field.visible) {
              return (
                <TextField
                  key={index}
                  label={field.placeholder}
                  type={field.type}
                  multiline
                  variant="outlined"
                  size="small"
                  placeholder={field.placeholder}
                  value={field.value}
                  onChange={(e) =>
                    field.action(
                      field.type === "number"
                        ? parseFloat(e.target.value) || ""
                        : e.target.value
                    )
                  }
                  sx={{
                    width: 200,
                    my: 1,
                  }}
                />
              );
            }
            return null;
          })}
        </Grid>
      </Grid>

      <Grid container justifyContent="space-between">
        <Typography variant="subtitle">Items : {tableData.length}</Typography>
        <Typography variant="h6" color={total < 0 && "error"}>
          PKR : {formatCurrency(total) || 0} /=
        </Typography>
      </Grid>
      {loading ? (
        <CustomLoader loading={loading} height={20} />
      ) : (
        <Grid sx={{ my: 2 }}>
          <Button
            endIcon={transaction ? <EditIcon /> : <EmailIcon />}
            variant="contained"
            sx={{ fontWeight: 900, mr: 2 }}
            onClick={() => makeTransaction()}
          >
            {transaction ? "Edit" : "Finalize"}
          </Button>

          {/* <Button
            endIcon={<SaveIcon />}
            variant="contained"
            sx={{ fontWeight: 900 }}
            color="warning"
            onClick={() => makeTransaction(true)}
          >
            Save as draft
          </Button> */}
        </Grid>
      )}
    </>
  );
}

export default TransactionFooter;
