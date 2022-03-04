import { AttachMoney } from "@mui/icons-material";
import { Receipt } from "@mui/icons-material";
import CompareArrowsIcon from "@mui/icons-material/CompareArrows";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import CancelIcon from "@mui/icons-material/Cancel";

import {
  CUSTOMER_TRANSACTION,
  SUPPLIER_TRANSACTION,
  LEDGER_TRANSACTION,
  ALL_STOCK,
} from "../../../constants/routesConstants";

import { FIELDS } from "../../../constants/fieldTypes";
import { DB } from "../../../constants/db";

import * as actions from "../../../store/essentials/actions";
import { setShouldFetchDaybook } from "../../../store/accounts/actions";

export const DEFAULTS = {
  ADD_EXPENSE: "Expense Entry",
  NEW_CUSTOMER_TRANSACTION: "Customer Transaction / Bill",
  NEW_SUPPLIER_TRANSACTION: "Supplier Transaction / Bill",
  LEDGER_ENTRY: "Ledger Entry",
  TRANSFER_ENTRY: "Transfer Stock",
  CANCEL_INVOICE: "Cancel Invoice",
};

export const TRANSACTION = "TRANSACTION";
export const ACTION_FABS = [
  {
    icon: <CancelIcon />,
    tooltip: DEFAULTS.CANCEL_INVOICE,
    customColor: "#000",
  },
  {
    icon: <AttachMoney />,
    tooltip: DEFAULTS.ADD_EXPENSE,
    customColor: "#e63737",
  },
  {
    icon: <CompareArrowsIcon />,
    tooltip: DEFAULTS.TRANSFER_ENTRY,
    customColor: "#2cd4b8",
    route: ALL_STOCK,
    type: TRANSACTION,
  },
  {
    icon: <Receipt />,
    tooltip: DEFAULTS.NEW_SUPPLIER_TRANSACTION,
    route: SUPPLIER_TRANSACTION,
    type: TRANSACTION,
    customColor: "#3565de",
  },
  {
    icon: <MenuBookIcon />,
    tooltip: DEFAULTS.LEDGER_ENTRY,
    route: LEDGER_TRANSACTION,
    type: TRANSACTION,
    customColor: "#e3326a",
  },
  {
    icon: <Receipt />,
    tooltip: DEFAULTS.NEW_CUSTOMER_TRANSACTION,
    route: CUSTOMER_TRANSACTION,
    type: TRANSACTION,
    customColor: "#f79123",
  },
];

export const getExpenseForm = (expenseAccounts, accountTypes) => {
  return {
    heading: "Add Expense",
    action: actions.addExpenseDetail,
    dispatchActions: [
      {
        actionName: setShouldFetchDaybook,
        data: true,
      },
    ],
    formData: [
      {
        label: "Date",
        type: FIELDS.DATE,
        name: DB.DATE,
      },
      {
        label: "Expense Account",
        type: FIELDS.SELECT,
        name: DB.EXPENSE,
        options: expenseAccounts,
        required: true,
      },
      {
        label: "Account Type",
        type: FIELDS.SELECT,
        name: DB.ACCOUNT_TYPE,
        options: accountTypes,
        required: true,
      },
      {
        label: "Amount",
        type: FIELDS.NUMBER,
        name: DB.AMOUNT,
        min: 1,
        required: true,
      },
      {
        label: "Expense Detail",
        type: FIELDS.STRING,
        name: DB.DETAIL,
        required: true,
      },
    ],
  };
};

const INVOICE_OPTIONS = [
  {
    label: "Customer Invoice",
    value: "INV",
  },
  {
    label: "Maal Wapsi Customer",
    value: "MWC",
  },
  {
    label: "Supplier Purchase",
    value: "SUP",
  },
  {
    label: "Maal Wapsi Supplier",
    value: "MWS",
  },
];

export const CANCEL_INVOICE_FORM = {
  heading: "Cancel Invoice",
  action: actions.cancelInvoice,
  formData: [
    {
      label: "Serial Type",
      type: FIELDS.SELECT,
      name: DB.SERIAL_TYPE,
      options: INVOICE_OPTIONS,
      required: true,
    },
    {
      label: "Serial Number",
      type: FIELDS.NUMBER,
      name: DB.BOOK_SERIAL,
      required: true,
    },
    {
      label: "Why are you deleting?",
      type: FIELDS.STRING,
      name: DB.COMMENT,
      required: true,
    },
  ],
};
