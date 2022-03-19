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
import CreditCardIcon from "@mui/icons-material/CreditCard";
import CreditScoreIcon from "@mui/icons-material/CreditScore";
import ManageSearchIcon from "@mui/icons-material/ManageSearch";

import AccountCircle from "@mui/icons-material/AccountCircle";
import Inventory2 from "@mui/icons-material/Inventory2";
import Home from "@mui/icons-material/Home";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import MoneyIcon from "@mui/icons-material/Money";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import DnsIcon from "@mui/icons-material/Dns";

import LocalLaundryServiceIcon from "@mui/icons-material/LocalLaundryService";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import CheckroomIcon from "@mui/icons-material/Checkroom";

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
  CHEQUE_MANAGEMENT,
  PERSONAL_CHEQUES,
  EXTERNAL_CHEQUES,
  ACCOUNTS_HISTORY,
  CREATE_NEW,
  PERSON,
  PRODUCT,
  WAREHOUSE,
  ACCOUNT,
  EXPENSE_ACCOUNT,
  AREA,
  DYING,
  DYING_ISSUE,
  DYING_RETURN,
  OPENING_STOCK,
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
    case CHEQUE_MANAGEMENT:
      return <CreditCardIcon />;
    case PERSONAL_CHEQUES:
      return <CreditScoreIcon />;
    case EXTERNAL_CHEQUES:
      return <LocalAtmIcon />;
    case ACCOUNTS_HISTORY:
      return <ManageSearchIcon />;
    case CREATE_NEW:
      return <AddCircleOutlineIcon />;
    case PERSON:
      return <AccountCircle />;
    case PRODUCT:
      return <Inventory2 />;
    case WAREHOUSE:
      return <Home />;
    case ACCOUNT:
      return <MoneyIcon />;
    case EXPENSE_ACCOUNT:
      return <AccountBalanceIcon />;
    case AREA:
      return <LocationOnIcon />;
    case DYING:
      return <LocalLaundryServiceIcon />;
    case DYING_ISSUE:
      return <LocalShippingIcon />;
    case DYING_RETURN:
      return <CheckroomIcon />;
    case OPENING_STOCK:
      return <DnsIcon />;
    default:
      break;
  }
};
