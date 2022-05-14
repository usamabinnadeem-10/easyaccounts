import VisibilityIcon from '@mui/icons-material/Visibility';

import Cheques from '@mui/icons-material/StickyNote2';
import CompareArrowsIcon from '@mui/icons-material/CompareArrows';
import Manage from '@mui/icons-material/Settings';
import Customers from '@mui/icons-material/GroupAdd';
import Products from '@mui/icons-material/Inventory';
import LibraryBooksIcon from '@mui/icons-material/LibraryBooks';

import ArticleIcon from '@mui/icons-material/Article';
import QueryStatsIcon from '@mui/icons-material/QueryStats';
import CreditCardIcon from '@mui/icons-material/CreditCard';
import CreditScoreIcon from '@mui/icons-material/CreditScore';
import ManageSearchIcon from '@mui/icons-material/ManageSearch';

import DriveFileMoveIcon from '@mui/icons-material/DriveFileMove';

import AccountCircle from '@mui/icons-material/AccountCircle';
import Inventory2 from '@mui/icons-material/Inventory2';
import CategoryIcon from '@mui/icons-material/Category';
import Home from '@mui/icons-material/Home';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import MoneyIcon from '@mui/icons-material/Money';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import DnsIcon from '@mui/icons-material/Dns';
import CalculateIcon from '@mui/icons-material/Calculate';
import ShowerIcon from '@mui/icons-material/Shower';

import LocalLaundryServiceIcon from '@mui/icons-material/LocalLaundryService';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import CheckroomIcon from '@mui/icons-material/Checkroom';

import RawOnIcon from '@mui/icons-material/RawOn';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import PointOfSaleIcon from '@mui/icons-material/PointOfSale';
import FilterAltIcon from '@mui/icons-material/FilterAlt';

import Ledger from '@mui/icons-material/MenuBook';
import Receipt from '@mui/icons-material/Receipt';

import LocalAtmIcon from '@mui/icons-material/LocalAtm';
import AttachMoney from '@mui/icons-material/AttachMoney';
import TransferWithinAStationIcon from '@mui/icons-material/TransferWithinAStation';
import ExposureIcon from '@mui/icons-material/Exposure';

import AccessibilityIcon from '@mui/icons-material/Accessibility';
import CancelIcon from '@mui/icons-material/Cancel';

import {
  VIEW,
  LEDGER,
  CHEQUES,
  REPORTS,
  BALANCES,
  STOCK,
  TRANSACTIONS,
  DAYBOOK,
  EXPENSES,
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
  RAW,
  RAW_PURCHASE,
  RAW_SALE,
  RAW_SEARCH,
  FORMULA,
  RAW_PRODUCT,
  DYING_UNIT,
  PRODUCT_CATEGORY,
  EXPENSE_ENTRY,
  LEDGER_ENTRY,
  ACTIONS,
  CANCEL_INVOICE,
  TRANSFER_STOCK,
  TRANSFERS,
  RAW_DEBIT,
} from './constants';

export const getIcon = (panel) => {
  switch (panel) {
    case VIEW:
      return <VisibilityIcon />;
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
    case TRANSACTIONS:
      return <CompareArrowsIcon />;
    case DAYBOOK:
      return <LibraryBooksIcon />;
    case EXPENSES:
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
    case RAW:
      return <RawOnIcon />;
    case RAW_PURCHASE:
      return <ShoppingCartIcon />;
    case RAW_SALE:
      return <PointOfSaleIcon />;
    case RAW_SEARCH:
      return <FilterAltIcon />;
    case FORMULA:
      return <CalculateIcon />;
    case RAW_PRODUCT:
      return <RawOnIcon />;
    case DYING_UNIT:
      return <ShowerIcon />;
    case PRODUCT_CATEGORY:
      return <CategoryIcon />;
    case EXPENSE_ENTRY:
      return <AttachMoney />;
    case LEDGER_ENTRY:
      return <Receipt />;
    case ACTIONS:
      return <AccessibilityIcon />;
    case CANCEL_INVOICE:
      return <CancelIcon />;
    case TRANSFER_STOCK:
      return <TransferWithinAStationIcon />;
    case TRANSFERS:
      return <DriveFileMoveIcon />;
    case RAW_DEBIT:
      return <ExposureIcon />;
    default:
      break;
  }
};
