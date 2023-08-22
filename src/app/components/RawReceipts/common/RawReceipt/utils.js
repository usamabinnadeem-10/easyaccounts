import { DB } from '../../../../../constants/db';
import {
  PRODUCT_GLUES,
  PRODUCT_TYPES,
} from '../../../../views/Raw/common/constants';

// Utils
import moment from 'moment';
import { formatCurrency } from '../../../../utilities/stringUtils';

export const getMeta = (transaction, persons) => {
  let person = persons?.[transaction[DB.PERSON]];
  let data = [
    {
      value: moment(transaction[DB.DATE]).format('DD-MM-YYYY'),
      label: 'Date:',
    },
    {
      value: transaction[DB.SERIAL],
      label: 'Serial #',
    },
    {
      value: `${transaction[DB.BOOK_NUM] || '---'}`,
      label: 'Manual #',
    },
    {
      value: person?.label,
      label: 'Party:',
    },
  ];
  return data;
};

export const getLotTableData = (lotDetail, warehouseHash) => {
  return lotDetail.map((detail) => ({
    ...detail,
    warehouse: warehouseHash?.[detail.warehouse]?.label,
    total_actual_gazaana: formatCurrency(
      detail.quantity * detail.actual_gazaana,
    ),
    total_expected_gazaana: formatCurrency(
      detail.quantity * detail.expected_gazaana,
    ),
    total_amount: formatCurrency(
      detail.rate_gazaana * detail.quantity * detail.rate,
    ),
  }));
};

export const getProductGlueAndType = (lot) => {
  return {
    productGlue: PRODUCT_GLUES.find((g) => g.value === lot.product_glue),
    productType: PRODUCT_TYPES.find((t) => t.value === lot.product_type),
  };
};
