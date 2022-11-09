import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';

import moment from 'moment';

import Typography from '@mui/material/Typography';
import Tooltip from '@mui/material/Tooltip';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Timeline from '@mui/lab/Timeline';
import TimelineItem from '@mui/lab/TimelineItem';
import TimelineSeparator from '@mui/lab/TimelineSeparator';
import TimelineConnector from '@mui/lab/TimelineConnector';
import TimelineContent from '@mui/lab/TimelineContent';
import TimelineOppositeContent from '@mui/lab/TimelineOppositeContent';
import TimelineDot from '@mui/lab/TimelineDot';

import LocalAtmIcon from '@mui/icons-material/LocalAtm';
import PriceCheckIcon from '@mui/icons-material/PriceCheck';
import DeleteIcon from '@mui/icons-material/Delete';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';

import CustomDrawer from '../CustomDrawer/CustomDrawer';
import Cheque from '../Cheque';
import CustomIconButton from '../CustomIconButton';

import { withSnackbar } from '../../hoc/withSnackbar';

import * as api from './api';

import { formatCurrency } from '../../utilities/stringUtils';

const ChequeHistory = ({
  open,
  onClose,
  chequeId,
  persons,
  accounts,
  isExternal,
  showSuccessSnackbar,
  showErrorSnackbar,
}) => {
  const [history, setHistory] = useState(null);
  const [deleteIndex, setDeleteIndex] = useState(null);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    if (!open) {
      setDeleteIndex(null);
    }
  }, [open]);

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

  const handleDeleteChequeHistory = (chequeId) => {
    if (!deleting) {
      setDeleting(true);
      api
        .deleteExternalChequeHistory(chequeId)
        .then((response) => {
          setHistory({
            ...history,
            cheque_history: history.cheque_history.filter(
              (val, index) => index !== deleteIndex
            ),
          });
          showSuccessSnackbar('History deleted');
        })
        .catch((error) => {
          setDeleting(false);
          setDeleteIndex(false);
          showErrorSnackbar(
            error?.response?.data?.error || 'Oops, something went wrong'
          );
        })
        .finally(() => {
          setDeleting(false);
          setDeleteIndex(null);
        });
    }
  };

  return (
    <CustomDrawer open={open} onClose={onClose}>
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
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}>
          <Typography>Cheque History</Typography>
          <Typography>
            Remaining Amount: {formatCurrency(history.remaining_amount)}/=
          </Typography>
          <Timeline sx={{ width: '100%' }}>
            {history.cheque_history.map((history, index) => {
              return (
                <TimelineItem key={index}>
                  <TimelineOppositeContent sx={{ m: 'auto 0', flex: 2 }}>
                    <Typography variant='button'>
                      {moment(history.date).format('DD-MM-YYYY')}
                    </Typography>
                  </TimelineOppositeContent>
                  <TimelineSeparator>
                    <TimelineConnector />
                    <TimelineDot
                      color={history.return_cheque ? 'info' : 'success'}>
                      {history.return_cheque ? (
                        <LocalAtmIcon />
                      ) : (
                        <PriceCheckIcon />
                      )}
                    </TimelineDot>
                    <TimelineConnector />
                  </TimelineSeparator>
                  <TimelineContent sx={{ flex: 3, m: 'auto 0' }}>
                    {history.return_cheque ? (
                      <Cheque
                        chequeData={history.return_cheque}
                        persons={persons}
                        accounts={accounts}
                        viewHistoryButton
                      />
                    ) : (
                      <Grid
                        alignItems='center'
                        container
                        justifyContent='space-between'
                        direction='row'>
                        <Typography variant='subtitle'>
                          {formatCurrency(history.amount)}/={' received in '}
                          {accounts?.[history.account_type].label}
                        </Typography>
                        {deleteIndex === index ? (
                          <Grid item>
                            <Grid container>
                              <Tooltip
                                arrow
                                placement='top'
                                title='Confirm Delete'>
                                <CustomIconButton disabled={deleting}>
                                  <DeleteForeverIcon
                                    color='error'
                                    onClick={() =>
                                      handleDeleteChequeHistory(history.id)
                                    }
                                  />
                                </CustomIconButton>
                              </Tooltip>
                              <Box sx={{ mr: 2 }} />
                              <Tooltip arrow placement='top' title='Cancel'>
                                <CustomIconButton disabled={deleting}>
                                  <HighlightOffIcon
                                    color='primary'
                                    onClick={() => setDeleteIndex(null)}
                                  />
                                </CustomIconButton>
                              </Tooltip>
                            </Grid>
                          </Grid>
                        ) : (
                          <Tooltip arrow title='Delete' placement='top'>
                            <div>
                              <CustomIconButton disabled={deleting}>
                                <DeleteIcon
                                  onClick={() => setDeleteIndex(index)}
                                  color='error'
                                />
                              </CustomIconButton>
                            </div>
                          </Tooltip>
                        )}
                      </Grid>
                    )}
                  </TimelineContent>
                </TimelineItem>
              );
            })}
          </Timeline>
        </Box>
      ) : (
        <Typography sx={{ textAlign: 'center', mt: 2, mx: 5 }} variant='h5'>
          No History
        </Typography>
      )}
    </CustomDrawer>
  );
};

export default withSnackbar(ChequeHistory);
