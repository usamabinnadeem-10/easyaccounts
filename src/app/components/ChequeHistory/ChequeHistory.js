import React from "react";
import { useEffect } from "react";
import { useState } from "react";

import moment from "moment";

import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Timeline from "@mui/lab/Timeline";
import TimelineItem from "@mui/lab/TimelineItem";
import TimelineSeparator from "@mui/lab/TimelineSeparator";
import TimelineConnector from "@mui/lab/TimelineConnector";
import TimelineContent from "@mui/lab/TimelineContent";
import TimelineOppositeContent from "@mui/lab/TimelineOppositeContent";
import TimelineDot from "@mui/lab/TimelineDot";
import LocalAtmIcon from "@mui/icons-material/LocalAtm";
import PriceCheckIcon from "@mui/icons-material/PriceCheck";

import Cheque from "../Cheque";

import * as api from "./api";

import { formatCurrency } from "../../utilities/stringUtils";

const ChequeHistory = ({
  open,
  onClose,
  chequeId,
  persons,
  accounts,
  isExternal,
}) => {
  const [history, setHistory] = useState(null);

  // fetch history if cheque is external
  useEffect(() => {
    if (chequeId && isExternal) {
      api.getChequeHistoryApi(chequeId).then((response) => {
        setHistory(response.data.length ? response.data[0] : null);
      });
    }
  }, [chequeId, isExternal]);

  // fetch single cheque if personal
  useEffect(() => {
    if (chequeId && !isExternal) {
      api.getPersonalChequeApi(chequeId).then((response) => {
        setHistory(response.data.length ? response.data[0] : null);
      });
    }
  }, [chequeId, isExternal]);

  return (
    <Drawer open={open} onClose={onClose}>
      {history && (
        <Box sx={{ m: 2 }}>
          <Cheque
            chequeData={history}
            persons={persons}
            accounts={accounts}
            isPersonal={!isExternal}
          />
        </Box>
      )}
      {history && history?.cheque_history?.length ? (
        <Box
          sx={{
            m: 2,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography>Cheque History</Typography>
          <Typography>
            Remaining Amount: {formatCurrency(history.remaining_amount)}/=
          </Typography>
          <Timeline>
            {history.cheque_history.map((history, index) => {
              return (
                <TimelineItem key={index}>
                  <TimelineOppositeContent sx={{ m: "auto 0" }}>
                    {moment(history.date).format("DD-MM-YYYY")}
                  </TimelineOppositeContent>
                  <TimelineSeparator>
                    <TimelineConnector />
                    <TimelineDot
                      color={history.return_cheque ? "info" : "success"}
                    >
                      {history.return_cheque ? (
                        <LocalAtmIcon />
                      ) : (
                        <PriceCheckIcon />
                      )}
                    </TimelineDot>
                    <TimelineConnector />
                  </TimelineSeparator>
                  <TimelineContent sx={{ flex: 5, m: "auto 0" }}>
                    {history.return_cheque ? (
                      <Cheque
                        chequeData={history.return_cheque}
                        persons={persons}
                        accounts={accounts}
                        viewHistoryButton
                      />
                    ) : (
                      <Typography variant="h6">
                        {formatCurrency(history.amount)}/={" received in "}
                        {accounts?.[history.account_type].label}
                      </Typography>
                    )}
                  </TimelineContent>
                </TimelineItem>
              );
            })}
          </Timeline>
        </Box>
      ) : (
        <Typography sx={{ textAlign: "center", mt: 2, mx: 5 }} variant="h5">
          No History
        </Typography>
      )}
    </Drawer>
  );
};

export default ChequeHistory;
