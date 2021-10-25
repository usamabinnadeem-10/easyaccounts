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
  ADD_CUSTOMER: "Add Customer",
  ADD_PRODUCT: "Add Product",
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

export const ADD_CUSTOMER_FORM = {
  heading: "Add Customer",
  formData: [
    {
      label: "First Name",
      type: FIELDS.STRING,
      name: "firstName",
    },
    {
      label: "Last Name",
      type: FIELDS.STRING,
      name: "lastName",
    },
    {
      label: "Phone Number",
      type: FIELDS.STRING,
      name: "phoneNumber",
    },
    {
      label: "Business Name",
      type: FIELDS.STRING,
      name: "businessName",
    },
  ],
};

export const ADD_PRODUCT_FORM = {
  heading: "Add Product",
  formData: [
    {
      label: "Product Name",
      type: FIELDS.STRING,
      name: "productName",
    },
    {
      label: "Minimum Price",
      type: FIELDS.NUMBER,
      name: "minimumPrice",
      min: 1,
    },
  ],
};

export const ADD_WAREHOUSE_FORM = {
  heading: "Add Warehouse",
  formData: [
    {
      label: "Warehouse Name",
      type: FIELDS.STRING,
      name: "warehouseName",
    },
    {
      label: "Warehouse Location",
      type: FIELDS.STRING,
      name: "warehouseLocation",
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
