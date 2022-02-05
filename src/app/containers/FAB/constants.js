import { AttachMoney } from "@mui/icons-material";
import { AccountCircle } from "@mui/icons-material";
import { Receipt } from "@mui/icons-material";
import { Inventory2 } from "@mui/icons-material";
import { Home } from "@mui/icons-material";
import CompareArrowsIcon from "@mui/icons-material/CompareArrows";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import MoneyIcon from "@mui/icons-material/Money";
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
  ADD_CUSTOMER: "Add Customer / Supplier",
  ADD_PRODUCT: "Add Product",
  ADD_WAREHOUSE: "Add Warehouse",
  ADD_EXPENSE_ACCOUNT: "Add Expense Account",
  ADD_EXPENSE: "Expense Entry",
  NEW_CUSTOMER_TRANSACTION: "Customer Transaction / Bill",
  NEW_SUPPLIER_TRANSACTION: "Supplier Transaction / Bill",
  LEDGER_ENTRY: "Ledger Entry",
  ADD_ACOUNT_TYPE: "Add Account Type",
  TRANSFER_ENTRY: "Transfer Stock",
  CANCEL_INVOICE: "Cancel Invoice",
};

export const TRANSACTION = "TRANSACTION";
export const ACTION_FABS = [
  {
    icon: <AccountCircle />,
    tooltip: DEFAULTS.ADD_CUSTOMER,
  },
  {
    icon: <Inventory2 />,
    tooltip: DEFAULTS.ADD_PRODUCT,
  },
  {
    icon: <Home />,
    tooltip: DEFAULTS.ADD_WAREHOUSE,
  },
  {
    icon: <MoneyIcon />,
    tooltip: DEFAULTS.ADD_EXPENSE_ACCOUNT,
  },
  {
    icon: <AccountBalanceIcon />,
    tooltip: DEFAULTS.ADD_ACOUNT_TYPE,
  },
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

const PERSON_OPTIONS = [
  {
    label: "Customer",
    value: "C",
  },
  {
    label: "Supplier",
    value: "S",
  },
];

export const ADD_CUSTOMER_FORM = {
  heading: "Add Customer / Supplier",
  action: actions.addNewPerson,
  formData: [
    {
      label: "Name",
      type: FIELDS.STRING,
      name: DB.NAME,
      required: true,
    },
    {
      label: "Type",
      type: FIELDS.SELECT,
      name: "person_type",
      options: PERSON_OPTIONS,
      required: true,
    },
    {
      label: "Phone Number (+923001234567)",
      type: FIELDS.STRING,
      name: DB.PHONE_NUMBER,
      required: true,
    },
    {
      label: "Business Name",
      type: FIELDS.STRING,
      name: DB.BUSINESS_NAME,
    },
    {
      label: "Address",
      type: FIELDS.STRING,
      name: DB.ADDRESS,
    },
    {
      label: "City",
      type: FIELDS.STRING,
      name: DB.ADDRESS,
    },
  ],
};

const PRODUCT_OPTIONS = [
  {
    label: "Pieces",
    value: "piece",
  },
  {
    label: "Yards",
    value: "yards",
  },
];

export const ADD_PRODUCT_FORM = {
  heading: "Add Product",
  action: actions.addNewProduct,
  formData: [
    {
      label: "Product Name",
      type: FIELDS.STRING,
      name: DB.NAME,
      required: true,
    },
    {
      label: "Basic Quantity",
      type: FIELDS.NUMBER,
      name: DB.BASIC_UNIT,
      required: true,
    },
    {
      label: "Unit",
      type: FIELDS.SELECT,
      name: DB.SI_UNIT,
      options: PRODUCT_OPTIONS,
      required: true,
    },
  ],
};

export const ADD_WAREHOUSE_FORM = {
  heading: "Add Warehouse",
  action: actions.addNewWarehouse,
  formData: [
    {
      label: "Warehouse Name",
      type: FIELDS.STRING,
      name: DB.NAME,
      required: true,
    },
    {
      label: "Warehouse Location",
      type: FIELDS.STRING,
      name: DB.ADDRESS,
    },
  ],
};

export const ADD_ACCOUNT_TYPE_FORM = {
  heading: "Add Account",
  action: actions.addNewAccountType,
  formData: [
    {
      label: "Account Name",
      type: FIELDS.STRING,
      name: DB.NAME,
      required: true,
    },
  ],
};

export const ADD_EXPENSE_ACCOUNT_FORM = {
  heading: "Add Expense Account",
  action: actions.addNewExpenseAccount,
  formData: [
    {
      label: "Account Name",
      type: FIELDS.STRING,
      name: DB.NAME,
      required: true,
    },
  ],
};

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
      required: false,
    },
  ],
};
