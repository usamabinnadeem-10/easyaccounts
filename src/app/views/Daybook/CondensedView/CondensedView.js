import React, { useMemo } from 'react';

import {
  Wrapper,
  Credits,
  Debits,
  Section,
  SectionHeader,
  Row,
  RowText,
} from './styled';

import { formatCurrency } from '../../../utilities/stringUtils';

const CondensedView = ({ daybookData, persons, accounts }) => {
  const formatExpenses = (data) => {
    return data.map((e) => ({
      text: e.detail,
      account: accounts[e.account_type]?.label,
      amount: e.amount,
    }));
  };
  const formatPayments = (data, type = 'C') => {
    const payments = data.filter((p) => p.nature === type);
    return payments.map((p) => ({
      text: persons[p.person]?.label,
      account: accounts[p.account_type]?.label,
      amount: p.amount,
    }));
  };
  const formatLedgerDetails = (data, type = 'C') => {
    const ledgers = data.filter((l) => l.nature === type);
    return ledgers.map((l) => ({
      text: persons[l.person]?.label,
      account: accounts[l.account_type]?.label,
      amount: l.amount,
    }));
  };
  const formatExternalCheques = (data, type = 'C') => {
    return data.map((c) => ({
      text: `${persons[c.person]?.label} ${c.bank} ${c.cheque_number}`,
      account: type === 'C' ? '' : 'Cheque Khaata',
      amount: c.amount,
    }));
  };
  const formatExternalChequesHistory = (data) => {
    return data.map((c) => ({
      text: `${persons[c.person]?.label} ${c.cheque_number}`,
      account: accounts[c.account_type]?.label,
      amount: c.amount,
    }));
  };
  // const formatPersonalCheques = (data) => {};

  const viewData = useMemo(() => {
    return {
      credits: [
        {
          head: 'Payments',
          data: [
            ...formatPayments(daybookData.payments),
            ...formatLedgerDetails(daybookData.ledgerDetails),
          ],
        },
        {
          head: 'Cheques',
          data: formatExternalCheques(daybookData.externalCheques),
        },
        {
          head: 'Cheque Payments',
          data: formatExternalChequesHistory(
            daybookData.externalChequesHistory,
          ),
        },
      ],
      debits: [
        {
          head: 'Expenses',
          data: formatExpenses(daybookData.expenses),
        },
        {
          head: 'Payments',
          data: formatPayments(daybookData.payments, 'D'),
        },
        {
          head: 'Cheques',
          data: formatExternalCheques(daybookData.externalCheques, 'D'),
        },
      ],
    };
  }, [daybookData]);

  return (
    <Wrapper>
      <Debits>
        {viewData.debits.map((section) => {
          return section.data?.length ? (
            <Section>
              <SectionHeader>{section.head}</SectionHeader>
              {section.data.map((row) => (
                <Row>
                  <RowText sx={{ width: '100px' }}>
                    {formatCurrency(row.amount)}
                  </RowText>
                  <RowText>{row.account}</RowText>
                  <RowText sx={{ fontWeight: 700 }}>{row.text}</RowText>
                </Row>
              ))}
            </Section>
          ) : (
            <></>
          );
        })}
      </Debits>
      <Credits>
        {viewData.credits.map((section) => {
          return section.data?.length ? (
            <Section>
              <SectionHeader>{section.head}</SectionHeader>
              {section.data.map((row) => (
                <Row>
                  <RowText sx={{ width: '100px' }}>
                    {formatCurrency(row.amount)}
                  </RowText>
                  <RowText>{row.account}</RowText>
                  <RowText sx={{ fontWeight: 700 }}>{row.text}</RowText>
                </Row>
              ))}
            </Section>
          ) : (
            <></>
          );
        })}
      </Credits>
    </Wrapper>
  );
};

export default CondensedView;
