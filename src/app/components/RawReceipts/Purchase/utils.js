import { DB, DB_TRANSLATION } from '../../../../constants/db';

// Utils
import moment from 'moment';
import { formatCurrency } from '../../../utilities/stringUtils';

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
      label: `${DB_TRANSLATION[person.person_type]}:`,
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
