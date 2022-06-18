import instance from '../../../utils/axiosApi';

import { getURL } from '../../utilities/stringUtils';
import { PAYMENT_APIS } from '../../../constants/restEndPoints';

export const deletePaymentApi = (paymentId) => {
  return instance.delete(
    getURL(PAYMENT_APIS.DELETE.PAYMENT, 'uuid', paymentId)
  );
};
