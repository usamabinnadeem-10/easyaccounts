import {
  LEDGERS,
  TRANSACTIONS,
  VIEW_DAYBOOK,
  VIEW_EXPENSES,
  ALL_BALANCES,
  ALL_STOCK,
  DETAILED_STOCK,
  PRODUCT_PERFORMANCE,
  PERSONAL_CHEQUE,
  EXTERNAL_CHEQUE,
  ACCOUNT_HISTORY,
  ISSUE_DYING,
  RETURN_DYING,
} from "../../../constants/routesConstants";

import { FIELDS } from "../../../constants/fieldTypes";

import { DB } from "../../../constants/db";

import * as actions from "../../../store/essentials/actions";

export const VIEW = "View";
export const LEDGER = "Ledgers";
export const CHEQUES = "Cheques";
export const TRANSACTION = "Transactions";
export const DAYBOOK = "Daybook";
export const EXPENSE = "Expenses";
export const ACCOUNTS_HISTORY = "Account History";

export const REPORTS = "Reports";
export const BALANCES = "Balances";
export const STOCK = "Stock";
export const VIEW_DETAILED_STOCK = "Detailed Stock";
export const PRODUCT_PERFORMANCE_HISTORY = "Product Performance";

export const CHEQUE_MANAGEMENT = "Cheque Management";
export const PERSONAL_CHEQUES = "Personal Cheques";
export const EXTERNAL_CHEQUES = "Party Cheques";

export const CREATE_NEW = "Create New";
export const PERSON = "Customer/Supplier";
export const PRODUCT = "Product";
export const WAREHOUSE = "Warehouse";
export const ACCOUNT = "Account Head";
export const EXPENSE_ACCOUNT = "Expense Head";
export const AREA = "Area";

export const DYING = "Dying/Washing";
export const DYING_ISSUE = "Issue";
export const DYING_RETURN = "Return";

export const DRAWER_WIDTH = 240;

export const SIDEBAR = [
  {
    panelName: VIEW,
    panelData: [
      {
        name: LEDGER,
        route: LEDGERS,
      },
      {
        name: TRANSACTION,
        route: TRANSACTIONS,
      },
      {
        name: DAYBOOK,
        route: VIEW_DAYBOOK,
      },
      {
        name: EXPENSE,
        route: VIEW_EXPENSES,
      },
      {
        name: ACCOUNTS_HISTORY,
        route: ACCOUNT_HISTORY,
      },
    ],
  },
  {
    panelName: REPORTS,
    panelData: [
      {
        name: BALANCES,
        route: ALL_BALANCES,
      },
      {
        name: STOCK,
        route: ALL_STOCK,
      },
      {
        name: VIEW_DETAILED_STOCK,
        route: DETAILED_STOCK,
      },
      {
        name: PRODUCT_PERFORMANCE_HISTORY,
        route: PRODUCT_PERFORMANCE,
      },
    ],
  },
  {
    panelName: CHEQUE_MANAGEMENT,
    panelData: [
      {
        name: PERSONAL_CHEQUES,
        route: PERSONAL_CHEQUE,
      },
      {
        name: EXTERNAL_CHEQUES,
        route: EXTERNAL_CHEQUE,
      },
    ],
  },
  {
    panelName: CREATE_NEW,
    panelData: [
      {
        name: PERSON,
        modal: PERSON,
      },
      {
        name: PRODUCT,
        modal: PRODUCT,
      },
      {
        name: WAREHOUSE,
        modal: WAREHOUSE,
      },
      {
        name: ACCOUNT,
        modal: ACCOUNT,
      },
      {
        name: EXPENSE_ACCOUNT,
        modal: EXPENSE_ACCOUNT,
      },
      {
        name: AREA,
        modal: AREA,
      },
    ],
  },
  {
    panelName: DYING,
    panelData: [
      {
        name: DYING_ISSUE,
        route: ISSUE_DYING,
      },
      {
        name: DYING_RETURN,
        route: RETURN_DYING,
      },
    ],
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

const NATURE_OPTIONS = [
  {
    label: "Debit",
    value: "D",
  },
  {
    label: "Credit",
    value: "C",
  },
];

export const getPersonForm = (essentials) => {
  return {
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
        name: DB.PERSON_TYPE,
        options: PERSON_OPTIONS,
        required: true,
      },
      {
        label: "Opening Balance Nature",
        type: FIELDS.SELECT,
        name: DB.NATURE,
        options: NATURE_OPTIONS,
        required: true,
      },
      {
        label: "Opening Balance",
        type: FIELDS.NUMBER,
        name: DB.OPENING_BALANCE,
        required: true,
      },
      {
        label: "Opening Balance Date",
        type: FIELDS.DATE,
        name: DB.OPENING_BALANCE_DATE,
        required: true,
      },
      {
        label: "Phone Number",
        type: FIELDS.PHONE_NUMBER,
        name: DB.PHONE_NUMBER,
      },
      {
        label: "Area",
        type: FIELDS.SELECT,
        options: essentials.areas,
        name: DB.AREA,
      },
      {
        label: "City",
        type: FIELDS.SELECT,
        name: DB.CITY,
        options: essentials.cities,
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
    ],
  };
};

export const getAreaForm = (essentials) => {
  return {
    heading: "Add Area",
    action: actions.addNewArea,
    formData: [
      {
        label: "Area Name",
        type: FIELDS.STRING,
        name: DB.NAME,
        required: true,
      },
      {
        label: "Area City",
        type: FIELDS.SELECT,
        name: DB.CITY,
        options: essentials.cities,
        required: true,
      },
    ],
  };
};

export const getProductForm = (essentials) => {
  return {
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
        label: "Opening Stock",
        type: FIELDS.NUMBER,
        name: DB.OPENING_STOCK,
      },
      {
        label: "Opening Stock Rate",
        type: FIELDS.NUMBER,
        name: DB.OPENING_STOCK_RATE,
      },
      {
        label: "Warehouse",
        type: FIELDS.SELECT,
        options: essentials.warehouses,
        name: DB.WAREHOUSE,
        required: true,
      },
      {
        label: "Gazaana",
        type: FIELDS.NUMBER,
        name: DB.GAZAANA,
        required: true,
      },
    ],
  };
};

export const MODAL_DEFAULTS = {
  [WAREHOUSE]: {
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
  },
  [ACCOUNT]: {
    heading: "Add Account",
    action: actions.addNewAccountType,
    formData: [
      {
        label: "Account Name",
        type: FIELDS.STRING,
        name: DB.NAME,
        required: true,
      },
      {
        label: "Opening Balance",
        type: FIELDS.NUMBER,
        name: DB.OPENING_BALANCE,
        required: true,
      },
    ],
  },
  [EXPENSE_ACCOUNT]: {
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
  },
};

export const chooseModal = (name, essentials) => {
  switch (name) {
    case PERSON:
      return getPersonForm(essentials);
    case AREA:
      return getAreaForm(essentials);
    case PRODUCT:
      return getProductForm(essentials);
    default:
      return MODAL_DEFAULTS[name];
  }
};
