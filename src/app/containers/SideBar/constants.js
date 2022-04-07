import * as routes from '../../../constants/routesConstants';

import { FIELDS } from '../../../constants/fieldTypes';

import { DB } from '../../../constants/db';

import * as actions from '../../../store/essentials/actions';
import { addNewFormula, addNewProduct } from '../../../store/raw';
import { addNewDying } from '../../../store/dying';
import { addNewCategory } from '../../../store/essentials';
import { setShouldFetchDaybook } from '../../../store/accounts/actions';

export const VIEW = 'View';

// ----------------------REPORTS--------------------------- //
export const REPORTS = 'Reports';
export const DAYBOOK = 'Daybook';
export const BALANCES = 'Balances';
export const STOCK = 'Stock';
export const VIEW_DETAILED_STOCK = 'Detailed Stock';
export const PRODUCT_PERFORMANCE_HISTORY = 'Product Performance';
export const ACCOUNTS_HISTORY = 'Account History';

// ----------------------TRANSACTIONS--------------------------- //
export const TRANSACTIONS = 'Transactions';
export const SUPPLIER_TRANSACTION = 'Buying';
export const CUSTOMER_TRANSACTION = 'Sale';

// ----------------------LEDGERS--------------------------- //
export const LEDGER = 'Ledgers';
export const LEDGER_ENTRY = 'Ledger Entry';

// ----------------------EXPENSES--------------------------- //
export const EXPENSES = 'Expenses';
export const EXPENSE_ENTRY = 'Expense Entry';

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

// ----------------------DYING--------------------------- //
export const DYING = 'Dying/Washing';
export const DYING_ISSUE = 'Issue';
export const DYING_RETURN = 'Return';

// ----------------------RAW--------------------------- //
export const RAW = 'Kora';
export const RAW_PURCHASE = 'Buying';
export const RAW_SALE = 'Sale';
export const RAW_SEARCH = 'Filter';

// ----------------------ACTIONS--------------------------- //
export const ACTIONS = 'Actions';
export const CANCEL_INVOICE = 'Cancel Invoice';

export const DRAWER_WIDTH = 240;

export const SIDEBAR = [
  {
    panelName: REPORTS,
    panelData: [
      {
        name: DAYBOOK,
        route: routes.VIEW_DAYBOOK,
      },
      {
        name: BALANCES,
        route: routes.ALL_BALANCES,
      },
      {
        name: STOCK,
        route: routes.ALL_STOCK,
      },
      {
        name: VIEW_DETAILED_STOCK,
        route: routes.DETAILED_STOCK,
      },
      {
        name: PRODUCT_PERFORMANCE_HISTORY,
        route: routes.PRODUCT_PERFORMANCE,
      },
      {
        name: ACCOUNTS_HISTORY,
        route: routes.ACCOUNT_HISTORY,
      },
    ],
  },
  {
    panelName: TRANSACTIONS,
    panelData: [
      {
        name: VIEW,
        route: routes.TRANSACTIONS,
      },
      {
        name: CUSTOMER_TRANSACTION,
        route: routes.CUSTOMER_TRANSACTION,
      },
      {
        name: SUPPLIER_TRANSACTION,
        route: routes.SUPPLIER_TRANSACTION,
      },
    ],
  },
  {
    panelName: LEDGER,
    panelData: [
      {
        name: VIEW,
        route: routes.LEDGERS,
      },
      {
        name: LEDGER_ENTRY,
        route: routes.LEDGER_TRANSACTION,
      },
    ],
  },
  {
    panelName: EXPENSES,
    panelData: [
      {
        name: VIEW,
        route: routes.VIEW_EXPENSES,
      },
      {
        name: EXPENSE_ENTRY,
        modal: EXPENSE_ENTRY,
      },
    ],
  },
  {
    panelName: CHEQUE_MANAGEMENT,
    panelData: [
      {
        name: PERSONAL_CHEQUES,
        route: routes.PERSONAL_CHEQUE,
      },
      {
        name: EXTERNAL_CHEQUES,
        route: routes.EXTERNAL_CHEQUE,
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
        name: PRODUCT_CATEGORY,
        modal: PRODUCT_CATEGORY,
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
      {
        name: OPENING_STOCK,
        modal: OPENING_STOCK,
      },
      {
        name: FORMULA,
        modal: FORMULA,
      },
      {
        name: RAW_PRODUCT,
        modal: RAW_PRODUCT,
      },
      {
        name: DYING_UNIT,
        modal: DYING_UNIT,
      },
    ],
  },
  {
    panelName: DYING,
    panelData: [
      {
        name: DYING_ISSUE,
        route: routes.ISSUE_DYING,
      },
      {
        name: DYING_RETURN,
        route: routes.RETURN_DYING,
      },
    ],
  },
  {
    panelName: ACTIONS,
    panelData: [
      {
        name: CANCEL_INVOICE,
        modal: CANCEL_INVOICE,
      },
    ],
  },
  {
    panelName: RAW,
    panelData: [
      {
        name: RAW_PURCHASE,
        route: routes.RAW_PURCHASE_ROUTE,
      },
      // {
      //   name: RAW_SALE,
      //   route: routes.RETURN_DYING,
      // },
      // {
      //   name: RAW_SEARCH,
      //   route: routes.RETURN_DYING,
      // },
    ],
  },
];

const PERSON_OPTIONS = [
  {
    label: 'Customer',
    value: 'C',
  },
  {
    label: 'Supplier',
    value: 'S',
  },
];

const NATURE_OPTIONS = [
  {
    label: 'Debit',
    value: 'D',
  },
  {
    label: 'Credit',
    value: 'C',
  },
];

const INVOICE_OPTIONS = [
  {
    label: 'Customer Invoice',
    value: 'INV',
  },
  {
    label: 'Maal Wapsi Customer',
    value: 'MWC',
  },
  {
    label: 'Supplier Purchase',
    value: 'SUP',
  },
  {
    label: 'Maal Wapsi Supplier',
    value: 'MWS',
  },
];

export const getPersonForm = (essentials) => {
  return {
    heading: 'Add Customer / Supplier',
    action: actions.addNewPerson,
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
        options: PERSON_OPTIONS,
        required: true,
      },
      {
        label: 'Opening Balance Nature',
        type: FIELDS.SELECT,
        name: DB.NATURE,
        options: NATURE_OPTIONS,
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
      {
        label: 'City',
        type: FIELDS.SELECT,
        name: DB.CITY,
        options: essentials.cities,
      },
      {
        label: 'Business Name',
        type: FIELDS.STRING,
        name: DB.BUSINESS_NAME,
      },
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
      {
        label: 'Area City',
        type: FIELDS.SELECT,
        name: DB.CITY,
        options: essentials.cities,
        required: true,
      },
    ],
  };
};

export const getOpeningStockForm = (essentials) => {
  return {
    heading: 'Add Opening Stock',
    action: actions.addOpeningStock,
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

const RAW_PRODUCT_TYPES = [
  {
    label: 'Standard',
    value: 'Standard',
  },
  {
    label: 'Baara',
    value: 'Baara',
  },
];

export const getRawProductForm = (essentials) => {
  return {
    heading: 'Add Kora Product',
    action: addNewProduct,
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
        options: RAW_PRODUCT_TYPES,
        required: true,
      },
    ],
  };
};

export const getProductForm = (essentials) => {
  return {
    heading: 'Add Product',
    action: actions.addNewProduct,
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
      {
        label: 'Minimum Rate',
        type: FIELDS.NUMBER,
        name: DB.MIN_RATE,
        required: true,
      },
    ],
  };
};

export const getExpenseForm = (essentials) => {
  return {
    heading: 'Add Expense',
    action: actions.addExpenseDetail,
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
      {
        label: 'Warehouse Location',
        type: FIELDS.STRING,
        name: DB.ADDRESS,
      },
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
        options: INVOICE_OPTIONS,
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
