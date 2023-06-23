import { ROLES } from '../../../constants/roles';
import { FIELDS } from '../../containers/CustomFilters/constants';

import * as constants from './constants';

export const getFilters = (role) => {
  return [
    {
      qp: 'person_type',
      options: [ROLES.ADMIN].includes(role)
        ? constants.PERSONS
        : constants.PERSONS_CUSTOMER,
      type: FIELDS.SELECT,
      placeholder: 'Person',
    },
    {
      qp: 'balance_nature',
      options: constants.BALANCE_NATURES,
      type: FIELDS.SELECT,
      placeholder: 'Balance Nature',
    },
    {
      qp: 'date__lte',
      type: FIELDS.DATE,
      placeholder: 'Date (up to)',
      variant: 'end',
    },
    {
      qp: 'balance__gte',
      type: FIELDS.NUMBER,
      placeholder: 'Balance (more than)',
    },
    {
      qp: 'balance__lte',
      type: FIELDS.NUMBER,
      placeholder: 'Balance (less than)',
    },
  ];
};
