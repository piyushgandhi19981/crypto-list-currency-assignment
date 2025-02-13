import { axiosWithCache } from '../cache/cache';
import { DEFAULT_CURRENCY } from '../constants/currencies';

const CACHE_TIME = 15 * 60 * 1000; // 15 minutes of caching time

export const fetchCryptoDetails = ({ currency } = {}) => {
  const url = `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency || DEFAULT_CURRENCY.id}&order=market_cap_desc`;
  return axiosWithCache({ url, method: 'GET' }, CACHE_TIME);
};
