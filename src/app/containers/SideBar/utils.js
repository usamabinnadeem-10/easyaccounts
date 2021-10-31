import Accounts from "@mui/icons-material/ManageAccounts";
import Ledger from "@mui/icons-material/MenuBook";
import Cheques from "@mui/icons-material/StickyNote2";
import CompareArrowsIcon from "@mui/icons-material/CompareArrows";
import Manage from "@mui/icons-material/Settings";
import Customers from "@mui/icons-material/GroupAdd";
import Products from "@mui/icons-material/Inventory";
import LibraryBooksIcon from "@mui/icons-material/LibraryBooks";

import {
  ACCOUNTS,
  LEDGER,
  CHEQUES,
  MANAGE,
  CUSTOMERS,
  PRODUCTS,
  TRANSACTION,
  DAYBOOK,
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
    case TRANSACTION:
      return <CompareArrowsIcon />;
    case DAYBOOK:
      return <LibraryBooksIcon />;
    default:
      break;
  }
};
