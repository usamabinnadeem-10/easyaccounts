import instance from '../../../utils/axiosApi';

import { getURL } from '../../utilities/stringUtils';
import { PAYMENT_APIS } from '../../../constants/restEndPoints';

export const createPaymentApi = (data) => {
  return instance.post(PAYMENT_APIS.CREATE.PAYMENT, data);
};

export const uploadImageApi = (image) => {
  return instance.post(PAYMENT_APIS.CREATE.IMAGE, image);
};

export const editPaymentApi = (data, paymentId) => {
  return instance.put(
    getURL(PAYMENT_APIS.EDIT.PAYMENT, 'uuid', paymentId),
    data
  );
};
