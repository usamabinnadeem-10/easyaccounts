import Accounts from "@mui/icons-material/ManageAccounts";
import Ledger from "@mui/icons-material/MenuBook";
import Cheques from "@mui/icons-material/StickyNote2";
import CompareArrowsIcon from "@mui/icons-material/CompareArrows";
import Manage from "@mui/icons-material/Settings";
import Customers from "@mui/icons-material/GroupAdd";
import Products from "@mui/icons-material/Inventory";
import LibraryBooksIcon from "@mui/icons-material/LibraryBooks";
import LocalAtmIcon from "@mui/icons-material/LocalAtm";
import ArticleIcon from "@mui/icons-material/Article";
import QueryStatsIcon from "@mui/icons-material/QueryStats";

import {
  VIEW,
  LEDGER,
  CHEQUES,
  REPORTS,
  BALANCES,
  STOCK,
  TRANSACTION,
  DAYBOOK,
  EXPENSE,
  VIEW_DETAILED_STOCK,
  PRODUCT_PERFORMANCE_HISTORY,
} from "./constants";

export const getIcon = (panel) => {
  switch (panel) {
    case VIEW:
      return <Accounts />;
    case LEDGER:
      return <Ledger />;
    case CHEQUES:
      return <Cheques />;
    case REPORTS:
      return <Manage />;
    case BALANCES:
      return <Customers />;
    case STOCK:
      return <Products />;
    case TRANSACTION:
      return <CompareArrowsIcon />;
    case DAYBOOK:
      return <LibraryBooksIcon />;
    case EXPENSE:
      return <LocalAtmIcon />;
    case VIEW_DETAILED_STOCK:
      return <ArticleIcon />;
    case PRODUCT_PERFORMANCE_HISTORY:
      return <QueryStatsIcon />;
    default:
      break;
  }
};
