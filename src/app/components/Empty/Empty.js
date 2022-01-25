import React from "react";

import { styled } from "@mui/styles";
import { Typography } from "@mui/material";

import box from "../../../assets/box.png";

const CenteredDiv = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  flexDirection: "column",
  height: "100px",
  marginTop: "1rem",
}));

const Empty = () => {
  return (
    <CenteredDiv>
      <img
        style={{ height: "100px", width: "100px" }}
        alt="empty-box"
        src={box}
      />
      <Typography variant="h5">Oops, No data found</Typography>
    </CenteredDiv>
  );
};

export default Empty;
