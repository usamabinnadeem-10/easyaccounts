import { store } from "../../../index";

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

export const MODAL_DEFAULTS = {
  [PERSON]: {
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
        type: FIELDS.PHONE_NUMBER,
        name: DB.PHONE_NUMBER,
        required: true,
      },
      {
        label: "Area",
        type: FIELDS.SELECT,
        options: [],
        required: true,
      },
      {
        label: "City",
        type: FIELDS.STRING,
        name: DB.CITY,
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
  },
  [PRODUCT]: {
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
  },
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
  [AREA]: {
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
        type: FIELDS.STRING,
        name: DB.CITY,
        required: true,
      },
    ],
  },
};
