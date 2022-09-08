import React from 'react';
import { useMemo } from 'react';
import { useState } from 'react';
import { useEffect } from 'react';

import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';

import ConfirmationModal from '../../components/ConfirmationModal';
import CustomFilters from '../../containers/CustomFilters';
import CustomTable from '../../components/CustomTable';
import Heading from '../../components/Heading';
import TransferDrawer from '../../components/TransferDrawer';
import StockTransfer from '../../views/StockTransfer';

import { getColumns, formatTransferData } from './utils';
import { getFilters } from './filters';
import { deleteTransferApi } from './api';
import { DIALOGUE_INIT } from './constants';

import { TRANSACTION_URLS } from '../../../constants/restEndPoints';
import { withSnackbar } from '../../hoc/withSnackbar';
import { setShouldFetch } from '../../../store/transactions';

import { findErrorMessage } from '../../utilities/objectUtils';

const ViewTransfers = ({
  showSuccessSnackbar,
  showErrorSnackbar,
  warehouses,
  products,
}) => {
  const dispatch = useDispatch();
  const essentials = useSelector((state) => state.essentials);

  const [transferData, setTransferData] = useState([]);
  const [showDrawer, setShowDrawer] = useState(false);
  const [currentTransfer, setCurrentTransfer] = useState([]);
  const [dialogueState, setDialogueState] = useState(DIALOGUE_INIT);
  const [isEdit, setIsEdit] = useState(false);
  const [editData, setEditData] = useState(null);
  const [editId, setEditId] = useState(null);

  const filters = useMemo(() => getFilters(essentials), [essentials]);

  const handleSearch = (data) => {
    setTransferData(formatTransferData(data));
  };

  const handleDelete = async (id) => {
    deleteTransferApi(id)
      .then((response) => {
        setTransferData(transferData.filter((val) => val.id !== id));
        showSuccessSnackbar('Transfer entry deleted');
        dispatch(setShouldFetch(true));
        setDialogueState(DIALOGUE_INIT);
      })
      .catch((error) => {
        showErrorSnackbar(findErrorMessage(error.response.data));
      });
  };

  const onRowClick = (id) => {
    let current = transferData.filter((val) => val.id === id)[0];
    setCurrentTransfer(current);
    setShowDrawer(true);
  };

  const askConfirmation = (id) => {
    setDialogueState({
      ...dialogueState,
      open: true,
      idToDelete: id,
      deleteItem: true,
    });
  };

  useEffect(() => {
    if (dialogueState.deleteItem && dialogueState.dialogueValue) {
      handleDelete(dialogueState.idToDelete);
    }
  }, [dialogueState]);

  const handleEdit = (id) => {
    let current = transferData.filter((val) => val.id === id)[0];
    let editData = {
      ...current,
      from_warehouse: {
        value: current.from_warehouse,
        label: warehouses[current.from_warehouse].label,
      },
      transfer_detail: current.transfer_detail.map((d) => ({
        ...d,
        to_warehouse: {
          value: d.to_warehouse,
          label: warehouses[d.to_warehouse].label,
        },
        product: { value: d.product, label: products[d.product].label },
      })),
    };
    setEditData(editData);
    setIsEdit(true);
    setEditId(id);
  };

  const handleCancelEdit = () => {
    setEditData(null);
    setEditId(null);
  };

  const columns = useMemo(
    () => getColumns(onRowClick, handleEdit, askConfirmation, warehouses),
    [transferData, warehouses]
  );

  return (
    <>
      {isEdit && editData ? (
        <StockTransfer
          products={products}
          warehouses={warehouses}
          editData={editData}
          editId={editId}
          handleCancelEdit={handleCancelEdit}
        />
      ) : (
        <>
          <Heading heading='Warehouse Transfers' />
          <CustomFilters
            api={TRANSACTION_URLS.LIST_TRANSFERS}
            onSearch={handleSearch}
            filters={filters}
          />
          <CustomTable
            columns={columns}
            data={transferData}
            hoverProperty='serial'
          />
          <TransferDrawer
            open={showDrawer}
            onClose={() => setShowDrawer(false)}
            data={currentTransfer}
            warehouses={warehouses}
            products={products}
          />
          <ConfirmationModal
            open={dialogueState.open}
            setDialogueState={(value) =>
              setDialogueState({ ...dialogueState, ...value })
            }
            closeDialogue={() =>
              setDialogueState({ ...dialogueState, open: false })
            }
          />
        </>
      )}
    </>
  );
};

export default withSnackbar(ViewTransfers);
