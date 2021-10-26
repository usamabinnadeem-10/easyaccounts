import React from "react";

import CustomTable from "../../components/CustomTable/CustomTable";

const COLUMNS = [
  { accessor: "date", Header: "Date" },
  { accessor: "detail", Header: "Detail" },
  { accessor: "debit", Header: "Debit" },
  { accessor: "credit", Header: "Credit" },
  { accessor: "balance", Header: "Balance" },
];

function LedgerDetail(props) {
  const { rows } = props;

  return <CustomTable columns={COLUMNS} data={rows} />;
}

export default LedgerDetail;
