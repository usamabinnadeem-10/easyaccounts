import React, { useRef } from "react";
import { useReactToPrint } from "react-to-print";

import ViewSingleTransaction from "../../containers/ViewSingleTransaction/ViewSingleTransaction";

import { Tooltip } from "@mui/material";
import { IconButton } from "@mui/material";
import { Avatar } from "@mui/material";
import { useStyles } from "./styles";

import PrintIcon from "@mui/icons-material/Print";

const Printable = () => {
  const componentRef = useRef();
  const classes = useStyles();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  return (
    <div className={classes.root}>
      <div className={classes.printIcon}>
        <Tooltip title="Print" arrow>
          <IconButton onClick={() => handlePrint()} sx={{ p: 0 }}>
            <Avatar sx={{ bgcolor: "purple" }}>
              <PrintIcon />
            </Avatar>
          </IconButton>
        </Tooltip>
      </div>
      <ViewSingleTransaction ref={componentRef} />
    </div>
  );
};

export default Printable;
