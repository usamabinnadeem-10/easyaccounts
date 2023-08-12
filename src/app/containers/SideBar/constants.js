import * as routes from '../../../constants/routesConstants';

import { FIELDS } from '../../../constants/fieldTypes';

import { DB } from '../../../constants/db';

import * as options from '../../../constants/choices';
import * as actions from '../../../store/essentials/actions';
import { addNewFormula, addNewRawProduct } from '../../../store/raw';
import { addNewDying } from '../../../store/dying';
import { addNewCategory } from '../../../store/essentials';
import { setShouldFetchDaybook } from '../../../store/accounts/actions';
import { PERMISSIONS } from '../../../constants/permissions';

export const VIEW = 'View';

// ----------------------REPORTS--------------------------- //
export const REPORTS = 'Reports';
export const DAYBOOK = 'Daybook';
export const BALANCES = 'Balances';
export const STOCK = 'Stock';
export const LOW_STOCK = 'Low Stock';
export const VIEW_DETAILED_STOCK = 'Detailed Stock';
export const SALE_BY_PERIOD = 'Sale Ledger';
export const PRODUCT_PERFORMANCE_HISTORY = 'Product Performance';
export const ACCOUNTS_HISTORY = 'Account History';
export const BALANCE_SHEET = 'Balance Sheet';
export const INCOME_STATEMENT = 'Income Statement';
export const ACTIVITY_LOGS = 'Activity Logs';

// ----------------------TRANSACTIONS--------------------------- //
export const TRANSACTIONS = 'Invoices';
export const SUPPLIER_TRANSACTION = 'Purchase';
export const CUSTOMER_TRANSACTION = 'Sale';

// ----------------------LEDGERS--------------------------- //
export const LEDGER = 'Ledgers';
export const LEDGER_ENTRY = 'Ledger Entry';

// ----------------------LEDGERS--------------------------- //
export const PAYMENT = 'Payment';
export const PAYMENT_ENTRY = 'Payment Entry';
export const PAYMENT_LIST = 'Payment List';

// ----------------------EXPENSES--------------------------- //
export const EXPENSES = 'Expenses';
export const EXPENSE_ENTRY = 'Expense Entry';

// ----------------------TRANSFERS--------------------------- //
export const TRANSFERS = 'Transfers';
export const TRANSFER_STOCK = 'Transfer Stock';

// ----------------------CHEQUE MGT--------------------------- //
export const CHEQUES = 'Cheques';
export const CHEQUE_MANAGEMENT = 'Cheque Management';
export const PERSONAL_CHEQUES = 'Personal Cheques';
export const EXTERNAL_CHEQUES = 'Party Cheques';

// ----------------------CREATE NEW--------------------------- //
export const CREATE_NEW = 'Create New';
export const PERSON = 'Customer/Supplier';
export const PRODUCT = 'Product';
export const PRODUCT_CATEGORY = 'Product Category';
export const WAREHOUSE = 'Warehouse';
export const ACCOUNT = 'Account Head';
export const EXPENSE_ACCOUNT = 'Expense Head';
export const AREA = 'Area';
export const OPENING_STOCK = 'Add Opening Stock';
export const FORMULA = 'Formula';
export const RAW_PRODUCT = 'Kora product';
export const DYING_UNIT = 'Dying unit';

// ----------------------ASSETS--------------------------- //
export const ASSET = 'Asset';
export const SEARCH_ASSET = 'Search';
export const CREATE_ASSET = 'Add Asset';

// ----------------------DYING--------------------------- //
export const DYING = 'Dying/Washing';
export const DYING_ISSUE = 'Issue';
export const DYING_RETURN = 'Return';

// ----------------------RAW--------------------------- //
export const RAW = 'Kora';
export const RAW_PURCHASE = 'Buying';
export const RAW_SALE = 'Sale';
export const RAW_SEARCH = 'Filter';
export const RAW_DEBIT = 'Kora Sale/Return';
export const RAW_TRANSFER = 'Kora Transfer';

// ----------------------ACTIONS--------------------------- //
export const ACTIONS = 'Actions';
export const CANCEL_INVOICE = 'Cancel Invoice';
export const CANCEL_STOCK_TRANSFER = 'Cancel Stock Transfer';

export const DRAWER_WIDTH = 240;

export const SIDEBAR = [
  // ----------------REPORTS---------------//
  {
    panelName: REPORTS,
    panelData: [
      {
        name: DAYBOOK,
        route: routes.VIEW_DAYBOOK,
        permissions: [
          PERMISSIONS.CAN_VIEW_PARTIAL_DAYBOOK,
          PERMISSIONS.CAN_VIEW_FULL_DAYBOOK,
        ],
      },
      {
        name: BALANCES,
        route: routes.ALL_BALANCES,
        permissions: [
          PERMISSIONS.CAN_VIEW_PARTIAL_BALANCES,
          PERMISSIONS.CAN_VIEW_FULL_BALANCES,
        ],
      },
      {
        name: STOCK,
        route: routes.ALL_STOCK,
        permissions: [PERMISSIONS.CAN_VIEW_STOCK],
      },
      {
        name: LOW_STOCK,
        route: routes.LOW_STOCK,
        permissions: [PERMISSIONS.CAN_VIEW_LOW_STOCK],
      },
      {
        name: VIEW_DETAILED_STOCK,
        route: routes.DETAILED_STOCK,
        permissions: [PERMISSIONS.CAN_VIEW_DETAILED_STOCK],
      },
      {
        name: ACCOUNTS_HISTORY,
        route: routes.ACCOUNT_HISTORY,
        permissions: [PERMISSIONS.CAN_VIEW_ACCOUNT_HISTORY],
      },
      {
        name: BALANCE_SHEET,
        route: routes.BALANCE_SHEET_ROUTE,
        permissions: [PERMISSIONS.CAN_VIEW_BALANCE_SHEET],
      },
      {
        name: INCOME_STATEMENT,
        route: routes.INCOME_STATEMENT_ROUTE,
        permissions: [PERMISSIONS.CAN_VIEW_INCOME_STATEMENT],
      },
      {
        name: SALE_BY_PERIOD,
        route: routes.REVENUE_BY_PERIOD,
        permissions: [PERMISSIONS.CAN_VIEW_REVENUE_BY_PERIOD],
      },
      {
        name: PRODUCT_PERFORMANCE_HISTORY,
        route: routes.PRODUCT_PERFORMANCE,
        permissions: [PERMISSIONS.CAN_VIEW_PRODUCT_PERFORMANCE],
      },
      {
        name: ACTIVITY_LOGS,
        route: routes.ACTIVITY_LOGS_ROUTE,
        permissions: [PERMISSIONS.CAN_VIEW_LOGS],
      },
    ],
  },
  // ----------------TRANSACTIONS---------------//
  {
    panelName: TRANSACTIONS,
    panelData: [
      {
        name: VIEW,
        route: routes.TRANSACTIONS,
        permissions: [
          PERMISSIONS.CAN_VIEW_PARTIAL_TRANSACTIONS,
          PERMISSIONS.CAN_VIEW_FULL_TRANSACTIONS,
        ],
      },
      {
        name: CUSTOMER_TRANSACTION,
        route: routes.CUSTOMER_TRANSACTION,
        permissions: [PERMISSIONS.CAN_CREATE_TRANSACTION],
      },
      {
        name: SUPPLIER_TRANSACTION,
        route: routes.SUPPLIER_TRANSACTION,
        permissions: [PERMISSIONS.CAN_VIEW_FULL_TRANSACTIONS],
      },
    ],
  },
  // ----------------LEDGER---------------//
  {
    panelName: LEDGER,
    panelData: [
      {
        name: VIEW,
        route: routes.LEDGERS,
        permissions: [
          PERMISSIONS.CAN_VIEW_PARTIAL_LEDGERS,
          PERMISSIONS.CAN_VIEW_FULL_LEDGERS,
        ],
      },
      {
        name: LEDGER_ENTRY,
        route: routes.LEDGER_TRANSACTION,
        permissions: [PERMISSIONS.CAN_CREATE_LEDGER_ENTRY],
      },
    ],
  },
  // ----------------PAYMENTS---------------//
  {
    panelName: PAYMENT,
    panelData: [
      {
        name: PAYMENT_LIST,
        route: routes.PAYMENT_LIST_ROUTE,
        permissions: [PERMISSIONS.CAN_VIEW_PAYMENTS],
      },
      {
        name: PAYMENT_ENTRY,
        route: routes.PAYMENT_ROUTE,
        permissions: [PERMISSIONS.CAN_CREATE_PAYMENT],
      },
    ],
  },
  // ----------------EXPENSES---------------//
  {
    panelName: EXPENSES,
    panelData: [
      {
        name: VIEW,
        route: routes.VIEW_EXPENSES,
        permissions: [PERMISSIONS.CAN_VIEW_EXPENSES],
      },
      {
        name: EXPENSE_ENTRY,
        modal: EXPENSE_ENTRY,
        permissions: [PERMISSIONS.CAN_CREATE_EXPENSE],
      },
    ],
  },
  // ----------------TRANSFERS---------------//
  {
    panelName: TRANSFERS,
    panelData: [
      {
        name: VIEW,
        route: routes.VIEW_TRANSFERS,
        permissions: [PERMISSIONS.CAN_VIEW_TRANSFER_STOCK],
      },
      {
        name: TRANSFER_STOCK,
        route: routes.STOCK_TRANSFER,
        permissions: [PERMISSIONS.CAN_CREATE_TRANSFER_STOCK],
      },
    ],
  },
  // ----------------CHEQUE MANAGEMENT---------------//
  {
    panelName: CHEQUE_MANAGEMENT,
    panelData: [
      {
        name: PERSONAL_CHEQUES,
        route: routes.PERSONAL_CHEQUE,
        permissions: [PERMISSIONS.CAN_MANAGE_EXTERNAL_CHEQUE],
      },
      {
        name: EXTERNAL_CHEQUES,
        route: routes.EXTERNAL_CHEQUE,
        permissions: [PERMISSIONS.CAN_MANAGE_PERSONAL_CHEQUE],
      },
    ],
  },
  // ----------------CREATE NEW---------------//
  {
    panelName: CREATE_NEW,
    panelData: [
      {
        name: PERSON,
        modal: PERSON,
        permissions: [PERMISSIONS.CAN_CREATE_PERSON],
      },
      {
        name: PRODUCT,
        modal: PRODUCT,
        permissions: [PERMISSIONS.CAN_CREATE_PRODUCT],
      },
      {
        name: PRODUCT_CATEGORY,
        modal: PRODUCT_CATEGORY,
        permissions: [PERMISSIONS.CAN_CREATE_PRODUCT_CATEGORY],
      },
      {
        name: WAREHOUSE,
        modal: WAREHOUSE,
        permissions: [PERMISSIONS.CAN_CREATE_WAREHOUSE],
      },
      {
        name: ACCOUNT,
        modal: ACCOUNT,
        permissions: [PERMISSIONS.CAN_CREATE_ACCOUNT_TYPE],
      },
      {
        name: EXPENSE_ACCOUNT,
        modal: EXPENSE_ACCOUNT,
        permissions: [PERMISSIONS.CAN_CREATE_EXPENSE_ACCOUNT],
      },
      {
        name: AREA,
        modal: AREA,
        permissions: [PERMISSIONS.CAN_CREATE_AREA],
      },
      {
        name: OPENING_STOCK,
        modal: OPENING_STOCK,
        permissions: [PERMISSIONS.CAN_CREATE_OPENING_STOCK],
      },
      // {
      //   name: FORMULA,
      //   modal: FORMULA,
      //   permissions: [PERMISSIONS.CAN_VIEW_TRANSFER_STOCK],
      // },
      // {
      //   name: RAW_PRODUCT,
      //   modal: RAW_PRODUCT,
      //   permissions: [PERMISSIONS.CAN_VIEW_TRANSFER_STOCK],
      // },
      // {
      //   name: DYING_UNIT,
      //   modal: DYING_UNIT,
      //   permissions: [PERMISSIONS.CAN_VIEW_TRANSFER_STOCK],
      // },
    ],
  },
  // ----------------Assets---------------//
  {
    panelName: ASSET,
    panelData: [
      {
        name: SEARCH_ASSET,
        route: routes.ASSET_LIST_ROUTE,
        permissions: [PERMISSIONS.CAN_VIEW_ASSETS],
      },
      {
        name: CREATE_ASSET,
        route: routes.ASSET_CREATE_ROUTE,
        permissions: [PERMISSIONS.CAN_CREATE_ASSET],
      },
    ],
  },
  // ----------------DYING---------------//
  // {
  //   panelName: DYING,
  //   roles: [ROLES.ADMIN, ROLES.ACCOUNTANT, ROLES.ADMIN_VIEWER],
  //   panelData: [
  //     {
  //       name: DYING_ISSUE,
  //       route: routes.ISSUE_DYING,
  //     },
  //     {
  //       name: DYING_RETURN,
  //       route: routes.RETURN_DYING,
  //     },
  //   ],
  // },
  // ----------------RAW---------------//
  // {
  //   panelName: RAW,
  //   roles: [ROLES.ADMIN, ROLES.ACCOUNTANT, ROLES.ADMIN_VIEWER],
  //   panelData: [
  //     {
  //       name: RAW_PURCHASE,
  //       route: routes.RAW_PURCHASE_ROUTE,
  //     },
  //     {
  //       name: RAW_DEBIT,
  //       route: routes.RAW_DEBIT_ROUTE,
  //     },
  //     {
  //       name: RAW_TRANSFER,
  //       route: routes.RAW_TRANSFER_ROUTE,
  //     },
  //   ],
  // },
  // ----------------ACTIONS---------------//
  // {
  //   panelName: ACTIONS,
  //   roles: [ROLES.ADMIN, ROLES.ACCOUNTANT],
  //   panelData: [
  //     {
  //       name: CANCEL_INVOICE,
  //       modal: CANCEL_INVOICE,
  //     },
  //     {
  //       name: CANCEL_STOCK_TRANSFER,
  //       modal: CANCEL_STOCK_TRANSFER,
  //     },
  //   ],
  // },
];

export const getPersonForm = (essentials) => {
  return {
    heading: 'Add Customer / Supplier',
    action: actions.addNewPerson,
    essentialActions: [
      {
        action: actions.getAllAreas,
        reducerVariable: 'areas',
      },
    ],
    formData: [
      {
        label: 'Name',
        type: FIELDS.STRING,
        name: DB.NAME,
        required: true,
      },
      {
        label: 'Type',
        type: FIELDS.SELECT,
        name: DB.PERSON_TYPE,
        options: options.PERSON_OPTIONS,
        required: true,
      },
      {
        label: 'Opening Balance Nature',
        type: FIELDS.SELECT,
        name: DB.NATURE,
        options: options.NATURE_OPTIONS,
        required: true,
      },
      {
        label: 'Opening Balance',
        type: FIELDS.NUMBER,
        name: DB.OPENING_BALANCE,
        required: true,
      },
      {
        label: 'Opening Balance Date',
        type: FIELDS.DATE,
        name: DB.OPENING_BALANCE_DATE,
        required: true,
      },
      {
        label: 'Phone Number',
        type: FIELDS.PHONE_NUMBER,
        name: DB.PHONE_NUMBER,
      },
      {
        label: 'Area',
        type: FIELDS.SELECT,
        options: essentials.areas,
        name: DB.AREA,
      },
      // {
      //   label: 'City',
      //   type: FIELDS.SELECT,
      //   name: DB.CITY,
      //   options: essentials.cities,
      // },
      // {
      //   label: 'Business Name',
      //   type: FIELDS.STRING,
      //   name: DB.BUSINESS_NAME,
      // },
      {
        label: 'Address',
        type: FIELDS.STRING,
        name: DB.ADDRESS,
      },
    ],
  };
};

export const getAreaForm = (essentials) => {
  return {
    heading: 'Add Area',
    action: actions.addNewArea,
    formData: [
      {
        label: 'Area Name',
        type: FIELDS.STRING,
        name: DB.NAME,
        required: true,
      },
      // {
      //   label: 'Area City',
      //   type: FIELDS.SELECT,
      //   name: DB.CITY,
      //   options: essentials.cities,
      //   required: true,
      // },
    ],
  };
};

export const getOpeningStockForm = (essentials) => {
  return {
    heading: 'Add Opening Stock',
    action: actions.addOpeningStock,
    essentialActions: [
      {
        action: actions.getAllProduct,
        reducerVariable: 'products',
      },
      {
        action: actions.getAllWarehouse,
        reducerVariable: 'warehouses',
      },
    ],
    formData: [
      {
        label: 'Product',
        type: FIELDS.SELECT,
        name: DB.PRODUCT,
        options: essentials.products,
        required: true,
      },
      {
        label: 'Warehouse',
        type: FIELDS.SELECT,
        name: DB.WAREHOUSE,
        options: essentials.warehouses,
        required: true,
      },
      {
        label: 'Gazaana',
        type: FIELDS.NUMBER,
        name: DB.GAZAANA,
        required: true,
      },
      {
        label: 'Opening Quantity',
        type: FIELDS.NUMBER,
        name: DB.OPENING_STOCK,
        required: true,
      },
      {
        label: 'Opening Rate',
        type: FIELDS.NUMBER,
        name: DB.OPENING_STOCK_RATE,
        required: true,
      },
    ],
  };
};

export const getRawProductForm = (essentials) => {
  return {
    heading: 'Add Kora Product',
    action: addNewRawProduct,
    formData: [
      {
        label: 'Product Name',
        type: FIELDS.STRING,
        name: DB.NAME,
        required: true,
      },
      {
        label: 'Supplier',
        type: FIELDS.SELECT,
        name: DB.PERSON,
        options: essentials.suppliers,
        required: true,
      },
      {
        label: 'Type',
        type: FIELDS.SELECT,
        name: DB.TYPE,
        options: options.RAW_PRODUCT_TYPES,
        required: true,
      },
    ],
  };
};

export const getProductForm = (essentials) => {
  return {
    heading: 'Add Product',
    action: actions.addNewProduct,
    essentialActions: [
      {
        action: actions.getAllCategories,
        reducerVariable: 'productCategories',
      },
    ],
    formData: [
      {
        label: 'Product Name',
        type: FIELDS.STRING,
        name: DB.NAME,
        required: true,
      },
      {
        label: 'Product Category',
        type: FIELDS.SELECT,
        name: DB.CATEGORY,
        options: essentials.productCategories,
        required: true,
      },
      // {
      //   label: 'Minimum Rate',
      //   type: FIELDS.NUMBER,
      //   name: DB.MIN_RATE,
      //   required: true,
      // },
    ],
  };
};

export const getExpenseForm = (essentials) => {
  return {
    heading: 'Add Expense',
    action: actions.addExpenseDetail,
    essentialActions: [
      {
        action: actions.getAllExpenseAccounts,
        reducerVariable: 'expenseAccounts',
      },
      {
        action: actions.getAllAccountTypes,
        reducerVariable: 'accountTypes',
      },
    ],
    dispatchActions: [
      {
        actionName: setShouldFetchDaybook,
        data: true,
      },
    ],
    formData: [
      {
        label: 'Date',
        type: FIELDS.DATE,
        name: DB.DATE,
      },
      {
        label: 'Expense Account',
        type: FIELDS.SELECT,
        name: DB.EXPENSE,
        options: essentials.expenseAccounts,
        required: true,
      },
      {
        label: 'Account Type',
        type: FIELDS.SELECT,
        name: DB.ACCOUNT_TYPE,
        options: essentials.accountTypes,
        required: true,
      },
      {
        label: 'Amount',
        type: FIELDS.NUMBER,
        name: DB.AMOUNT,
        min: 1,
        required: true,
      },
      {
        label: 'Expense Detail',
        type: FIELDS.STRING,
        name: DB.DETAIL,
        required: true,
      },
    ],
  };
};

export const MODAL_DEFAULTS = {
  [WAREHOUSE]: {
    heading: 'Add Warehouse',
    action: actions.addNewWarehouse,
    formData: [
      {
        label: 'Warehouse Name',
        type: FIELDS.STRING,
        name: DB.NAME,
        required: true,
      },
      // {
      //   label: 'Warehouse Location',
      //   type: FIELDS.STRING,
      //   name: DB.ADDRESS,
      // },
    ],
  },
  [ACCOUNT]: {
    heading: 'Add Account',
    action: actions.addNewAccountType,
    formData: [
      {
        label: 'Account Name',
        type: FIELDS.STRING,
        name: DB.NAME,
        required: true,
      },
      {
        label: 'Opening Balance',
        type: FIELDS.NUMBER,
        name: DB.OPENING_BALANCE,
        required: true,
      },
    ],
  },
  [EXPENSE_ACCOUNT]: {
    heading: 'Add Expense Account',
    action: actions.addNewExpenseAccount,
    formData: [
      {
        label: 'Account Name',
        type: FIELDS.STRING,
        name: DB.NAME,
        required: true,
      },
      {
        label: 'Account Type',
        type: FIELDS.SELECT,
        options: options.EXPENSE_TYPES,
        name: DB.TYPE,
        required: true,
      },
    ],
  },
  [FORMULA]: {
    heading: 'Add Formula',
    action: addNewFormula,
    formData: [
      {
        label: 'Multiply by',
        type: FIELDS.NUMBER,
        name: DB.NUMERATOR,
        required: true,
      },
      {
        label: 'Divide by',
        type: FIELDS.NUMBER,
        name: DB.DENOMINATOR,
        required: true,
      },
    ],
  },
  [DYING_UNIT]: {
    heading: 'Add Dying Unit',
    action: addNewDying,
    formData: [
      {
        label: 'Dying Unit Name',
        type: FIELDS.STRING,
        name: DB.NAME,
        required: true,
      },
    ],
  },
  [PRODUCT_CATEGORY]: {
    heading: 'Add Product Category',
    action: addNewCategory,
    formData: [
      {
        label: 'Category Name',
        type: FIELDS.STRING,
        name: DB.NAME,
        required: true,
      },
    ],
  },
  [CANCEL_INVOICE]: {
    heading: 'Cancel Invoice',
    action: actions.cancelInvoice,
    formData: [
      {
        label: 'Serial Type',
        type: FIELDS.SELECT,
        name: DB.SERIAL_TYPE,
        options: options.INVOICE_OPTIONS,
        required: true,
      },
      {
        label: 'Serial Number',
        type: FIELDS.NUMBER,
        name: DB.BOOK_SERIAL,
        required: true,
      },
      {
        label: 'Why are you deleting?',
        type: FIELDS.STRING,
        name: DB.COMMENT,
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
    case OPENING_STOCK:
      return getOpeningStockForm(essentials);
    case RAW_PRODUCT:
      return getRawProductForm(essentials);
    case PRODUCT:
      return getProductForm(essentials);
    case EXPENSE_ENTRY:
      return getExpenseForm(essentials);
    default:
      return MODAL_DEFAULTS[name];
  }
};
