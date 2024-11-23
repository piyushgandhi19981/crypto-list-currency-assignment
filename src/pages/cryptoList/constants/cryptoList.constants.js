import { DEFAULT_CURRENCY } from "../../../constants/currencies";

export const INITIAL_STATE = {
  rows: 50,
  page: 1,
  isLoading: true,
  data: [],
  currency: DEFAULT_CURRENCY.id,
  searchText: '',
  recentSearches: []
};

export const HEADER_PROPS = {
  title: 'Explore Top Cryptocurrencies', 
  subTitle: 'Discover the latest market trends and top-ranked cryptocurrencies'
};

export const ACTION_TYPES = {
  ON_FILTER_CHANGE: 'ON_FILTER_CHANGE',
  ON_SEARCH_CHANGE: 'ON_SEARCH_CHANGE'
}

export const SEARCH_FIELDS = ['name', 'symbol']; // search related fields

export const LS_KEYS = {
  CURRENCY: 'currency',
  RECENT_SEARCHES: 'recentSearches'
};
