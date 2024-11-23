import React, { useMemo } from "react";
import PropTypes from 'prop-types';

import _noop from 'lodash/noop';
import _size from 'lodash/size';

import TableManager from "../../components/tableManager";

import SubHeader from "./organisms/listSubheader";
import withOtherProps from "./hocs/withOtherProps";
import getColumns from "./columns/cryptoList.columns";
import { ACTION_TYPES, HEADER_PROPS } from "./constants/cryptoList.constants";

const CryptoAppList = ({ data, isLoading, onAction, listData, page, rows, currency, searchText, recentSearches }) => {

  const totalResults = useMemo(() => _size(data), [data]);

  const onCurrencyChange = (currency) => {
    onAction({ type: ACTION_TYPES.ON_FILTER_CHANGE, payload: currency })
  }

  const onSearchChange = (payload) => {
    onAction({ type: ACTION_TYPES.ON_SEARCH_CHANGE, payload })
  }

  const renderSubheader = () => (
    <SubHeader totalResults={totalResults} onCurrencyChange={onCurrencyChange} selectedCurrency={currency} onSearchChange={onSearchChange} searchText={searchText} recentSearches={recentSearches} />
  );

  const columns = useMemo(() => getColumns(currency), [currency]);

  const tableProps = useMemo(() => ({
    isLoading, 
    data: listData,
    columns
  }), [listData, isLoading, columns]);

  const pageProps = useMemo(() => ({
    page, rows
  }), [page, rows]);

  return (
    <TableManager renderSubheader={renderSubheader} headerProps={HEADER_PROPS} pageProps={pageProps} onAction={onAction} tableProps={tableProps} data={data} />
  );
};

CryptoAppList.propTypes = {
  isLoading: PropTypes.bool,
  data: PropTypes.array,
  onAction: PropTypes.func,
  listData: PropTypes.array,
  page: PropTypes.number.isRequired,
  rows: PropTypes.number.isRequired,
  currency: PropTypes.string.isRequired,
  searchText: PropTypes.string,
  recentSearches: PropTypes.array
};

CryptoAppList.defaultProps = {
  isLoading: true,
  data: [],
  onAction: _noop,
  listData: [],
  searchText: '',
  recentSearches: []
};

export default withOtherProps(CryptoAppList);
