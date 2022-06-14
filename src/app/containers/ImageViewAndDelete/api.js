import instance from '../../../utils/axiosApi';

import { getURL } from '../../utilities/stringUtils';
import { PAYMENT_APIS } from '../../../constants/restEndPoints';

export const deleteImageApi = (imageId) => {
  return instance.delete(getURL(PAYMENT_APIS.DELETE.IMAGE, 'uuid', imageId));
};
