import React, { useEffect } from "react";
import PropTypes from 'prop-types';
import _noop from 'lodash/noop';

import TableHeader from "../tableHeader";
import Table from "../table/Table";
import Pagination from "../pagination";

import { TABLE_ACTION_TYPES } from "./tableManager.constants";

const TableManager = ({ 
  data = [],
  tableProps = {},
  pageProps = {},
  onAction = _noop,
  headerProps = {},
  renderSubheader = null
 }) => {

  useEffect(() => {
    onAction({ type: TABLE_ACTION_TYPES.ON_INIT });
  }, []);

  const onPageUpdate = (payload) => {
    onAction({ type: TABLE_ACTION_TYPES.ON_PAGE_CHANGE, payload });
  };

  const onRowClick = payload => {
   onAction({ type: TABLE_ACTION_TYPES.ON_ROW_CLICK, payload });
  }

  return (
    <>
      <TableHeader {...headerProps} />
      {renderSubheader && renderSubheader()}
      <Table {...tableProps} onRowClick={onRowClick} />
      <Pagination {...pageProps} onPageUpdate={onPageUpdate} totalItems={data.length} />
    </>
  );
};

TableManager.propTypes = {
  tableProps: PropTypes.object,
  data: PropTypes.array,
  pageProps: PropTypes.object,
  onAction: PropTypes.func,
  headerProps: PropTypes.object,
  renderSubheader: PropTypes.func
}

export default TableManager;