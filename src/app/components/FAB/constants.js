import { AttachMoney } from "@mui/icons-material";
import { AccountCircle } from "@mui/icons-material";
import { Receipt } from "@mui/icons-material";
import { Inventory2 } from "@mui/icons-material";
import { Home } from "@mui/icons-material";

export const DEFAULTS = {
  ADD_CUSTOMER: "Add Customer",
  ADD_PRODUCT: "Add Product",
  ADD_WAREHOUSE: "Add Warehouse",
  ADD_EXPENSE: "New Expense",
  NEW_TRANSACTION: "New Transaction",
};

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
    tooltip: DEFAULTS.NEW_TRANSACTION,
  },
];

export const ADD_CUSTOMER_FORM = {
  heading: "Add Customer",
  formData: [
    {
      label: "First Name",
      type: "string",
      name: "firstName",
    },
    {
      label: "Last Name",
      type: "string",
      name: "lastName",
    },
    {
      label: "Phone Number",
      type: "string",
      name: "phoneNumber",
    },
    {
      label: "Business Name",
      type: "string",
      name: "businessName",
    },
  ],
};

export const ADD_PRODUCT_FORM = {
  heading: "Add Product",
  formData: [
    {
      label: "Product Name",
      type: "string",
      name: "productName",
    },
    {
      label: "Minimum Price",
      type: "number",
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
      type: "string",
      name: "warehouseName",
    },
    {
      label: "Warehouse Location",
      type: "string",
      name: "warehouseLocation",
    },
  ],
};

export const ADD_EXPENSE_FORM = {
  heading: "Add Expense",
  formData: [
    {
      label: "Amount",
      type: "number",
      name: "addExpense",
      min: 1,
    },
  ],
};
