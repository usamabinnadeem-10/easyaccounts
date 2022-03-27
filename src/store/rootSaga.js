import essentialSagas from "./essentials/saga";
import transactionSagas from "./transactions/saga";
import accountsSagas from "./accounts/saga";
import authSaga from "./auth/saga";
import rawSaga from "./raw/saga";
import dyingSaga from "./dying/saga";

export const rootSagas = [
  essentialSagas,
  transactionSagas,
  accountsSagas,
  authSaga,
  rawSaga,
  dyingSaga,
];
