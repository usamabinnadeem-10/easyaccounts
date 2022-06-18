import { formatCurrency } from '../../utilities/stringUtils';

import { ROLES } from '../../../constants/userRoles';

export const formatBalances = (data) => {
  let newBalancesData = [];
  let totalCR = 0;
  let totalDB = 0;
  let index = 1;
  for (let [key, value] of Object.entries(data)) {
    if (value > 0) {
      totalCR += value;
    } else {
      totalDB += Math.abs(value);
    }
    newBalancesData.push({
      id: index,
      person: key,
      balance: formatCurrency(Math.abs(value)),
      status: value > 0 ? 'CR' : 'DB',
    });
    index++;
  }
  if (newBalancesData.length > 0) {
    newBalancesData = [
      ...newBalancesData,
      ...[
        {
          person: 'TOTAL CR',
          balance: `${formatCurrency(totalCR)}`,
          status: '',
          id: index++,
        },
        {
          person: 'TOTAL DB',
          balance: `${formatCurrency(totalDB)}`,
          status: '',
          id: index++,
        },
      ],
    ];
  }

  return newBalancesData;
};

export const hasAdminPermission = (role) => role === ROLES.ADMIN;
