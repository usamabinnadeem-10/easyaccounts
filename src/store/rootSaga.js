import essentialSagas from "./essentials/saga";
import transactionSagas from "./transactions/saga";
import accountsSagas from "./accounts/saga";

export const rootSagas = [essentialSagas, transactionSagas, accountsSagas];
