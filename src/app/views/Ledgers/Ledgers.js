import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';

import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';

import { Button } from '@mui/material';
import { Grid } from '@mui/material';
import { Typography } from '@mui/material';

import WhatsAppIcon from '@mui/icons-material/WhatsApp';

import ConfirmationModal from '../../components/ConfirmationModal';
import SearchAndSelect from '../../components/SearchAndSelect';
import LedgerDetail from '../../components/LedgerDetail';
import TransactionDrawer from '../../components/TransactionDrawer/';
import Empty from '../../components/Empty';
import LedgerEntry from '../../views/LedgerEntry';
import Printable from '../../containers/Printable';

import {
  PERSON_TYPES,
  STORE_PERSON,
} from '../../components/SelectPerson/constants';
import { useStyles } from './styles';
import { ERRORS, NATURES, SUCCESS } from './constants';
import { formatLedgerData, getChequeTexts } from './utils';
import { LEDGER_URLS } from '../../../constants/restEndPoints';

import { DB_TRANSLATION } from '../../../constants/db';
import instance from '../../../utils/axiosApi';
import { makeQueryParamURL, formatCurrency } from '../../utilities/stringUtils';
import { findErrorMessage } from '../../utilities/objectUtils';
import { getURL } from '../../utilities/stringUtils';

import { withSnackbar } from '../../hoc/withSnackbar';

import { setShouldFetchDaybook } from '../../../store/accounts/actions';
import { cacheLedger } from '../../../store/cache';

function Ledgers({
  daybookView,
  defaultLedgers,
  warehouses,
  products,
  accounts,
  persons,
  showSuccessSnackbar,
  showErrorSnackbar,
  role,
}) {
  const classes = useStyles();
  const state = useSelector((state) => state.essentials);
  const ledgerCache = useSelector((state) => state.cache.ledgerCache);
  const dispatch = useDispatch();

  const [personType, setPersonType] = useState(PERSON_TYPES[0].value);
  const [currentPerson, setCurrentPerson] = useState(
    ledgerCache.currentPerson || null
  );
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [ledgerDataRaw, setLedgerDataRaw] = useState(
    ledgerCache.ledgerDataRaw || []
  );
  const [ledgerData, setledgerData] = useState(
    daybookView
      ? formatLedgerData(defaultLedgers, 0, persons)
      : ledgerCache.ledgerData || []
  );
  const [openingBalance, setOpeningBalance] = useState(
    ledgerCache.openingBalance || 0
  );
  const [closingBalance, setClosingBalance] = useState(
    ledgerCache.closingBalance || 0
  );
  const [chequeBalances, setChequeBalances] = useState(
    ledgerCache.chequeBalances || []
  );
  const [loading, setLoading] = useState(false);
  const [dialogueState, setDialogueState] = useState({
    open: false,
    dialogueValue: null,
    deleteItem: false,
    idToDelete: null,
  });

  const [showDrawer, setShowDrawer] = useState(false);
  const [transactionID, setTransactionID] = useState(null);
  const [isEmpty, setIsEmpty] = useState(false);
  const [hideDetails, setHideDetails] = useState(false);
  const [nextPage, setNextPage] = useState(ledgerCache.next || null);

  const [editData, setEditData] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    setIsEmpty(false);
  }, [personType]);

  useEffect(() => {
    if (dialogueState.dialogueValue && dialogueState.deleteItem) {
      instance
        .delete(
          getURL(
            LEDGER_URLS.DELETE_LEDGER_ENTRY,
            'uuid',
            dialogueState.idToDelete
          )
        )
        .then((res) => {
          search();
          dispatch(setShouldFetchDaybook(true));
          setDialogueState({
            ...dialogueState,
            open: false,
            dialogueValue: false,
            deleteItem: false,
            idToDelete: null,
          });
          showSuccessSnackbar(SUCCESS.DELETED);
        })
        .catch((error) => {
          showErrorSnackbar(findErrorMessage(error.response.data));
        });
    }
  }, [dialogueState]);

  const setCache = (
    ledgerData,
    ledgerDataRaw,
    openingBalance,
    closingBalance,
    chequeBalances,
    next,
    currentPerson
  ) => {
    dispatch(
      cacheLedger({
        ledgerData,
        ledgerDataRaw,
        openingBalance,
        closingBalance,
        chequeBalances,
        next,
        currentPerson,
      })
    );
  };

  const handleFormattingLedger = (response, isLoadMore = false) => {
    let newLedgerData = [];
    if (isLoadMore) {
      newLedgerData = [...ledgerDataRaw, ...response.data.results];
    } else {
      newLedgerData = response.data.results;
    }
    setLedgerDataRaw(newLedgerData);
    let ledgerDataFormatted = formatLedgerData(
      newLedgerData,
      response.data.opening_balance,
      persons
    );
    let openingBalance = response.data.opening_balance;
    let closingBalance =
      ledgerDataFormatted[ledgerDataFormatted.length - 2]?.formattedBalance ||
      '---';
    let next = response.data.next;
    let chequeTexts = getChequeTexts(response.data);
    setNextPage(next);
    setledgerData(ledgerDataFormatted);
    setOpeningBalance(openingBalance);
    setClosingBalance(closingBalance);
    setChequeBalances(chequeTexts);

    setCache(
      ledgerDataFormatted,
      newLedgerData,
      response.data.opening_balance,
      openingBalance,
      chequeTexts,
      next,
      currentPerson
    );

    setIsEmpty(ledgerDataFormatted.length === 0);
    setLoading(false);
    setStartDate(null);
    setEndDate(null);
  };

  const search = () => {
    if (!currentPerson) {
      showErrorSnackbar(ERRORS.SELECT_PERSON + DB_TRANSLATION[personType]);
      return;
    }
    setLoading(true);
    const params = [
      {
        key: 'person',
        value: currentPerson.value,
      },
      startDate && {
        key: 'start',
        value: startDate,
      },
      endDate && {
        key: 'end',
        value: endDate,
      },
    ];
    const URL = makeQueryParamURL(LEDGER_URLS.SEARCH_LEDGER, params);

    instance
      .get(URL)
      .then((response) => {
        handleFormattingLedger(response);
      })
      .catch((error) => {
        setLoading(false);
        showErrorSnackbar(findErrorMessage(error.response.data));
      });
  };

  const onRowClick = (id) => {
    let transaction = ledgerData.filter((ledger) => ledger.id === id)[0]
      ?.transaction;
    transaction && setShowDrawer(true);
    setTransactionID(transaction);
  };

  const handleEdit = (id) => {
    let data = ledgerDataRaw.filter((l) => l.id === id)[0];
    data = {
      ...data,
      nature: NATURES[data.nature],
      person: persons?.[data.person],
      account_type: accounts?.[data.account_type],
    };
    setEditData(data);
    setIsEditing(true);
  };

  const handleCancelEditing = () => {
    setIsEditing(false);
    setEditData(null);
  };

  const handleDelete = (id) => {
    setDialogueState({
      ...dialogueState,
      open: true,
      deleteItem: true,
      idToDelete: id,
    });
  };

  const hideDrawer = () => {
    setShowDrawer(false);
  };

  const loadMoreData = () => {
    setLoading(true);
    instance
      .get(nextPage)
      .then((response) => {
        handleFormattingLedger(response, true);
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
      });
  };

  const handleOpenWhatsapp = () => {
    if (currentPerson?.phone_number) {
      // can use this link for sending text as well
      // https://api.whatsapp.com/send?phone={phone}&text={text}
      let URL = `https://wa.me/${currentPerson.phone_number}`;
      window.open(URL);
    } else {
      showErrorSnackbar('This person does not have a phone number');
    }
  };

  return (
    <>
      {isEditing ? (
        <LedgerEntry
          isEdit={isEditing}
          editData={editData}
          role={role}
          handleCancelEditing={handleCancelEditing}
        />
      ) : (
        <>
          <ConfirmationModal
            open={dialogueState.open}
            setDialogueState={(value) =>
              setDialogueState({ ...dialogueState, ...value })
            }
            closeDialogue={() =>
              setDialogueState({ ...dialogueState, open: false })
            }
          />
          {!daybookView && (
            <div className={classes.root}>
              <SearchAndSelect
                header='View Ledger'
                currentPerson={currentPerson}
                personType={personType}
                setCurrentPerson={setCurrentPerson}
                options={state[STORE_PERSON[personType]]}
                setPersonType={setPersonType}
                startDate={startDate}
                setStartDate={setStartDate}
                endDate={endDate}
                setEndDate={setEndDate}
                loading={loading}
                search={search}
              />
            </div>
          )}
          <Printable
            disablePrint={ledgerData.length === 0}
            documentTitle={`Ledger for ${currentPerson?.label}`}>
            <div className={classes.ledgerWrapper}>
              {!daybookView && (
                <Grid
                  container
                  alignItems='center'
                  justifyContent='space-between'>
                  <div>
                    {currentPerson && (
                      <Typography component='span' fontWeight={700}>
                        {currentPerson.label}
                      </Typography>
                    )}

                    <Typography variant='body2'>
                      Opening Balance:{' '}
                      {`${
                        Math.abs(openingBalance)
                          ? formatCurrency(openingBalance)
                          : '---'
                      }${openingBalance < 0 ? ' DB' : ' CR'}`}
                    </Typography>
                    <Typography variant='body2'>{`Closing Balance: ${closingBalance}`}</Typography>
                    {ledgerData.length > 0 && (
                      <>
                        <Typography variant='body2'>{`${ledgerData[0].date} - ${
                          ledgerData[ledgerData.length - 2].date
                        }`}</Typography>
                        {chequeBalances.map((balance, index) => (
                          <Typography variant='body2' color='error'>
                            {balance.text}: {balance.value}
                          </Typography>
                        ))}
                      </>
                    )}
                    <Button
                      variant='contained'
                      onClick={() => setHideDetails(!hideDetails)}
                      disabled={ledgerData.length === 0}
                      sx={{ mt: 2, mb: 1, displayPrint: 'none' }}
                      size='small'>
                      {hideDetails ? 'SHOW DETAILS' : 'HIDE DETAILS'}
                    </Button>
                  </div>
                  <Grid item>
                    <Button
                      onClick={handleOpenWhatsapp}
                      variant='contained'
                      size='small'
                      color='success'
                      disabled={
                        ledgerData.length === 0 || !currentPerson?.phone_number
                      }
                      sx={{ displayPrint: 'none' }}
                      startIcon={<WhatsAppIcon />}>
                      Whatsapp
                    </Button>
                  </Grid>
                </Grid>
              )}

              <div className={classes.table}>
                {ledgerData.length > 0 && (
                  <LedgerDetail
                    hideDetails={hideDetails}
                    daybookView={daybookView}
                    rows={ledgerData}
                    onRowClick={onRowClick}
                    hoverProperty={'transaction'}
                    handleEdit={handleEdit}
                    handleDelete={handleDelete}
                  />
                )}
              </div>
              {nextPage && !daybookView && (
                <Button
                  disabled={loading}
                  sx={{ mb: 3 }}
                  variant='contained'
                  onClick={() => loadMoreData()}
                  fullWidth>
                  LOAD MORE
                </Button>
              )}
            </div>
          </Printable>
          {isEmpty && <Empty />}
          <TransactionDrawer
            hideDrawer={hideDrawer}
            open={showDrawer}
            transactionID={transactionID}
            warehouses={warehouses}
            products={products}
            accounts={accounts}
            persons={persons}
          />
        </>
      )}
    </>
  );
}

export default withSnackbar(Ledgers);
