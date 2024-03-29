import * as actionTypes from './actionTypes';

const initialState = {
  lowStockCache: null,
  allStockCache: null,
  detailedStockCache: null,
  accountHistoryCache: {
    next: null,
    data: null,
    rawData: null,
  },
  ledgerCache: {
    ledgerData: null,
    ledgerDataRaw: null,
    currentPerson: null,
    openingBalance: null,
    closingBalance: null,
    chequeBalances: null,
    next: null,
  },
  paymentListCache: {
    paymentData: null,
  },
  transactionListCache: {
    transactionData: null,
    transactionDataRaw: null,
    nextPage: null,
  },
  expensesListCache: {
    expensesData: null,
  },
  userBranchRelationListCache: {
    userBranchRelations: null,
  },
  allBalancesCache: null,
  productPerformanceCache: null,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.CACHE_LOW_STOCK:
      return {
        ...state,
        lowStockCache: action.payload,
      };
    case actionTypes.CACHE_ALL_STOCK:
      return {
        ...state,
        allStockCache: action.payload,
      };
    case actionTypes.CACHE_DETAILED_STOCK:
      return {
        ...state,
        detailedStockCache: action.payload,
      };
    case actionTypes.CACHE_ACCOUNT_HISTORY:
      return {
        ...state,
        accountHistoryCache: {
          ...state.accountHistoryCache,
          ...action.payload,
        },
      };
    case actionTypes.CACHE_LEDGER:
      return {
        ...state,
        ledgerCache: {
          ...state.ledgerCache,
          ...action.payload,
        },
      };
    case actionTypes.CACHE_PAYMENT_LIST:
      return {
        ...state,
        paymentListCache: {
          ...state.paymentListCache,
          ...action.payload,
        },
      };
    case actionTypes.CACHE_ALL_BALANCES:
      return {
        ...state,
        allBalancesCache: action.payload,
      };
    case actionTypes.CACHE_PRODUCT_PERFORMANCE:
      return {
        ...state,
        productPerformanceCache: action.payload,
      };
    case actionTypes.CACHE_TRANSACTION_LIST:
      return {
        ...state,
        transactionListCache: {
          ...state.transactionListCache,
          ...action.payload,
        },
      };
    case actionTypes.CACHE_EXPENSE_LIST:
      return {
        ...state,
        expensesListCache: {
          ...state.expensesListCache,
          ...action.payload,
        },
      };
    case actionTypes.CACHE_USERS_BRANCH_RELATION_LIST:
      return {
        ...state,
        userBranchRelationListCache: {
          ...state.userBranchRelationListCache,
          ...action.payload,
        },
      };
    default:
      return state;
  }
};

export default reducer;
