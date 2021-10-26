import Accounts from "@mui/icons-material/ManageAccounts";
import Ledger from "@mui/icons-material/MenuBook";
import Cheques from "@mui/icons-material/StickyNote2";

// import Note from "@mui/icons-material/Note";

import Manage from "@mui/icons-material/Settings";
import Customers from "@mui/icons-material/GroupAdd";
import Products from "@mui/icons-material/Inventory";
// import Inventory2 from "@mui/icons-material/Inventory2";

import {
  ACCOUNTS,
  LEDGER,
  CHEQUES,
  MANAGE,
  CUSTOMERS,
  PRODUCTS,
} from "./constants";

export const getIcon = (panel) => {
  switch (panel) {
    case ACCOUNTS:
      return <Accounts />;
    case LEDGER:
      return <Ledger />;
    case CHEQUES:
      return <Cheques />;
    case MANAGE:
      return <Manage />;
    case CUSTOMERS:
      return <Customers />;
    case PRODUCTS:
      return <Products />;
    default:
      break;
  }
};
