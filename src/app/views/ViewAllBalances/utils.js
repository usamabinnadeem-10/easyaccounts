import { formatCurrency } from '../../utilities/stringUtils';

export const formatBalances = (data, persons) => {
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
      person: persons?.[key]?.label,
      balance: formatCurrency(Math.abs(value), 'decimal', 0),
      status: value > 0 ? 'CR' : 'DB',
    });
    index++;
  }
  const collator = new Intl.Collator('en', {
    numeric: true,
    sensitivity: 'base',
  });
  let sorted = newBalancesData.sort((a, b) =>
    collator.compare(a.person, b.person),
  );
  if (sorted.length > 0) {
    sorted = [
      ...sorted,
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

  return sorted;
};
