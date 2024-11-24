import { fetchCryptoDetailsAction } from "../../../actions/crypto.actions";
import { TABLE_ACTION_TYPES } from "../../../components/tableManager/tableManager.constants";

import { ACTION_TYPES, LS_KEYS } from "../constants/cryptoList.constants";
import {
  getResolvedList,
  getUpdatedRecentSearches,
} from "../helpers/cryptoList.helpers";

const handleInit = async ({ setState, state }) => {
  const { page, rows, currency, searchText } = state;
  const totalData = await fetchCryptoDetailsAction({ currency });
  const { listData, tableData } = getResolvedList(
    { page, rows, totalData },
    searchText,
  );
  setState({ totalData, data: tableData, isLoading: false, listData });
};

const handlePageChange = ({ setState, state }, payload) => {
  const { totalData, searchText } = state;
  const { page, rows } = payload || {};
  const { listData } = getResolvedList({ page, rows, totalData }, searchText);
  setState({ page, rows, listData });
};

const handleRowClick = ({ navigate, state } = {}, payload) => {
  const { id } = payload;
  const { currency } = state;
  navigate(`/crypto-details/${id}?currency=${currency}`);
};

const handleFilterChange = async (params, updatedCurrency) => {
  const { setState, state } = params;
  setState({ isLoading: true });
  const totalData = await fetchCryptoDetailsAction({
    currency: updatedCurrency,
  });
  await localStorage.setItem(LS_KEYS.CURRENCY, updatedCurrency);
  const { rows, searchText } = state;
  const { listData, tableData } = getResolvedList(
    { page: 1, rows, totalData },
    searchText,
  );
  setState({
    totalData,
    data: tableData,
    isLoading: false,
    listData,
    page: 1,
    currency: updatedCurrency,
  });
};

const handleSearchChange = async (params, searchText) => {
  const { state, setState } = params;
  const { rows, recentSearches, searchText: prev, totalData } = state;
  let updatedRecentSearches = null;
  if (searchText === prev) return;
  if (searchText) {
    updatedRecentSearches = getUpdatedRecentSearches(
      recentSearches,
      searchText,
    );
    await localStorage.setItem(
      LS_KEYS.RECENT_SEARCHES,
      JSON.stringify({ recentSearches: updatedRecentSearches }),
    );
  }
  const { listData, tableData } = getResolvedList(
    { page: 1, rows, totalData },
    searchText,
  );
  setState({
    data: tableData,
    listData,
    recentSearches: updatedRecentSearches
      ? updatedRecentSearches
      : recentSearches,
    searchText,
    page: 1,
  });
};

const ACTION_HANDLERS = {
  [TABLE_ACTION_TYPES.ON_INIT]: handleInit,
  [TABLE_ACTION_TYPES.ON_PAGE_CHANGE]: handlePageChange,
  [TABLE_ACTION_TYPES.ON_ROW_CLICK]: handleRowClick,
  [ACTION_TYPES.ON_FILTER_CHANGE]: handleFilterChange,
  [ACTION_TYPES.ON_SEARCH_CHANGE]: handleSearchChange,
};

export default ACTION_HANDLERS;
