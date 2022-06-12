import instance from '../../../utils/axiosApi';

import { PAYMENT_APIS } from '../../../constants/restEndPoints';

import { formatPaymentDataForPosting } from './utils';

export const createPaymentApi = (data) => {
  return instance.post(PAYMENT_APIS.CREATE.PAYMENT, data);
};

export const uploadImageApi = (image) => {
  return instance.post(PAYMENT_APIS.CREATE.IMAGE, image);
};
