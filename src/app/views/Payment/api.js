import instance from '../../../utils/axiosApi';

import { PAYMENT_APIS } from '../../../constants/restEndPoints';

import { formatPaymentDataForPosting } from './utils';

export const createPaymentApi = (data) => {
  return instance.post(
    PAYMENT_APIS.CREATE.PAYMENT,
    formatPaymentDataForPosting(data)
  );
};
