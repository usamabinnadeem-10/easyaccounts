import { AttachMoney } from "@mui/icons-material";
import { AccountCircle } from "@mui/icons-material";
import { Receipt } from "@mui/icons-material";
import { Inventory2 } from "@mui/icons-material";
import { Home } from "@mui/icons-material";
import MenuBookIcon from "@mui/icons-material/MenuBook";

import {
  CUSTOMER_TRANSACTION,
  SUPPLIER_TRANSACTION,
  LEDGER_TRANSACTION,
} from "../../../constants/routesConstants";

import { FIELDS } from "../../../constants/fieldTypes";

export const DEFAULTS = {
  ADD_CUSTOMER: "Add Customer / Supplier",
  ADD_PRODUCT: "Add Product Head",
  ADD_WAREHOUSE: "Add Warehouse",
  ADD_EXPENSE: "New Expense",
  NEW_CUSTOMER_TRANSACTION: "Customer Transaction",
  NEW_SUPPLIER_TRANSACTION: "Supplier Transaction",
  LEDGER_ENTRY: "New Ledger Entry",
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
  formData: [
    {
      label: "Name",
      type: FIELDS.STRING,
      name: "name",
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
      name: "business_name",
    },
  ],
};

export const ADD_PRODUCT_FORM = {
  heading: "Add Product Head",
  formData: [
    {
      label: "Head Name",
      type: FIELDS.STRING,
      name: "name",
    },
  ],
};

export const ADD_WAREHOUSE_FORM = {
  heading: "Add Warehouse",
  formData: [
    {
      label: "Warehouse Name",
      type: FIELDS.STRING,
      name: "name",
    },
    {
      label: "Warehouse Location",
      type: FIELDS.STRING,
      name: "address",
    },
  ],
};

const EXPENSE_OPTIONS = [
  {
    value: "salary",
    label: "Salary Expense",
  },
  {
    value: "utilities",
    label: "Utility Expense",
  },
];
export const ADD_EXPENSE_FORM = {
  heading: "Add Expense",
  formData: [
    {
      label: "Expense Account",
      type: FIELDS.SELECT,
      name: "selectExpense",
      options: EXPENSE_OPTIONS,
    },
    {
      label: "Amount",
      type: FIELDS.NUMBER,
      name: "addExpense",
      min: 1,
    },
    {
      label: "Expense Detail",
      type: FIELDS.STRING,
      name: "expenseDetail",
    },
  ],
};
