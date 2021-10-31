import { AttachMoney } from "@mui/icons-material";
import { AccountCircle } from "@mui/icons-material";
import { Receipt } from "@mui/icons-material";
import { Inventory2 } from "@mui/icons-material";
import { Home } from "@mui/icons-material";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import ColorLensIcon from "@mui/icons-material/ColorLens";
import MoneyIcon from "@mui/icons-material/Money";

import {
  CUSTOMER_TRANSACTION,
  SUPPLIER_TRANSACTION,
  LEDGER_TRANSACTION,
} from "../../../constants/routesConstants";

import { FIELDS } from "../../../constants/fieldTypes";
import { DB } from "../../../constants/db";

import * as actions from "../../../store/essentials/actions";

export const DEFAULTS = {
  ADD_CUSTOMER: "Add Customer / Supplier",
  ADD_PRODUCT: "Add Product Head",
  ADD_PRODUCT_COLOR: "Add Product Color",
  ADD_WAREHOUSE: "Add Warehouse",
  ADD_EXPENSE_ACCOUNT: "Add Expense Account",
  ADD_EXPENSE: "Add Expense Entry",
  NEW_CUSTOMER_TRANSACTION: "Customer Transaction",
  NEW_SUPPLIER_TRANSACTION: "Supplier Transaction",
  LEDGER_ENTRY: "New Ledger Entry",
  ADD_ACOUNT_TYPE: "New Account Type",
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
    icon: <ColorLensIcon />,
    tooltip: DEFAULTS.ADD_PRODUCT_COLOR,
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
    icon: <AttachMoney />,
    tooltip: DEFAULTS.ADD_EXPENSE,
  },

  {
    icon: <Receipt />,
    tooltip: DEFAULTS.NEW_SUPPLIER_TRANSACTION,
    route: SUPPLIER_TRANSACTION,
    type: TRANSACTION,
  },
  {
    icon: <MenuBookIcon />,
    tooltip: DEFAULTS.LEDGER_ENTRY,
    route: LEDGER_TRANSACTION,
    type: TRANSACTION,
  },
  {
    icon: <Receipt />,
    tooltip: DEFAULTS.NEW_CUSTOMER_TRANSACTION,
    route: CUSTOMER_TRANSACTION,
    type: TRANSACTION,
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
    },
    {
      label: "Type",
      type: FIELDS.SELECT,
      name: "person_type",
      options: PERSON_OPTIONS,
    },
    {
      label: "Business Name",
      type: FIELDS.STRING,
      name: DB.BUSINESS_NAME,
    },
  ],
};

export const ADD_PRODUCT_FORM = {
  heading: "Add Product Head",
  action: actions.addNewProductHead,
  formData: [
    {
      label: "Head Name",
      type: FIELDS.STRING,
      name: DB.HEAD_NAME,
    },
  ],
};

const COLOR_OPTIONS = [
  {
    label: "Pieces",
    value: "piece",
  },
  {
    label: "Yards",
    value: "yards",
  },
];

export const ADD_WAREHOUSE_FORM = {
  heading: "Add Warehouse",
  action: actions.addNewWarehouse,
  formData: [
    {
      label: "Warehouse Name",
      type: FIELDS.STRING,
      name: DB.NAME,
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
    },
  ],
};

export const getProductColorForm = (options) => {
  return {
    heading: "Add Product Color",
    action: actions.addNewProduct,
    formData: [
      {
        label: "Head Name",
        type: FIELDS.SELECT,
        name: DB.PRODUCT_HEAD,
        options: options,
      },
      {
        label: "Color Name",
        type: FIELDS.STRING,
        name: DB.PRODUCT_COLOR,
      },
      {
        label: "Basic Quantity",
        type: FIELDS.NUMBER,
        name: DB.BASIC_UNIT,
      },
      {
        label: "Unit",
        type: FIELDS.SELECT,
        name: DB.SI_UNIT,
        options: COLOR_OPTIONS,
      },
    ],
  };
};

export const getExpenseForm = (expenseAccounts, accountTypes) => {
  return {
    heading: "Add Expense",
    action: actions.addExpenseDetail,
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
      },
      {
        label: "Account Type",
        type: FIELDS.SELECT,
        name: DB.ACCOUNT_TYPE,
        options: accountTypes,
      },
      {
        label: "Amount",
        type: FIELDS.NUMBER,
        name: DB.AMOUNT,
        min: 1,
      },
      {
        label: "Expense Detail",
        type: FIELDS.STRING,
        name: DB.DETAIL,
      },
    ],
  };
};
