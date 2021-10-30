import essentialSagas from "./essentials/saga";
import transactionSagas from "./transactions/saga";

export const rootSagas = [essentialSagas, transactionSagas];
