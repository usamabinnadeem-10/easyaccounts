import React from "react";

import { useSelector } from "react-redux";

import { Heading } from "./styled";

import CustomFilters from "../../containers/CustomFilters/CustomFilters";
import CustomTable from "../../components/CustomTable/CustomTable";

import * as utils from "./utils";
import * as constants from "./constants";
import { TRANSACTION_URLS } from "../../../constants/restEndPoints";

const ProductPerformance = (props) => {
  const essentials = useSelector((state) => state.essentials);
  const [tableData, setTableData] = React.useState([]);

  const filters = React.useMemo(
    () => utils.getFilters(essentials),
    [essentials]
  );

  const onSearch = (data) => {
    setTableData(utils.getTableData(data));
  };

  return (
    <>
      <Heading variant="h5" fontWeight={900}>
        Product Performance
      </Heading>
      <CustomFilters
        filters={filters}
        api={TRANSACTION_URLS.PRODUCT_PERFORMANCE}
        onSearch={onSearch}
      />
      {tableData.length > 0 && (
        <CustomTable columns={constants.COLUMNS} data={tableData} />
      )}
    </>
  );
};

export default ProductPerformance;
