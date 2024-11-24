import { fetchCryptoDetails } from '../crypto.services';
import { axiosWithCache } from '../../cache/cache';
import { DEFAULT_CURRENCY } from '../../constants/currencies';

jest.mock('../../cache/cache', () => ({
  axiosWithCache: jest.fn(),
}));

describe('fetchCryptoDetails', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test('should fetch crypto details with the provided currency', async () => {
    const mockResponse = [{ id: 'bitcoin', name: 'Bitcoin' }];
    axiosWithCache.mockResolvedValueOnce(mockResponse);

    const result = await fetchCryptoDetails({ currency: 'usd' });

    expect(axiosWithCache).toHaveBeenCalledWith(
      { url: 'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc', method: 'GET' },
      15 * 60 * 1000
    );
    expect(result).toEqual(mockResponse);
  });

  test('should fetch crypto details with the default currency if none is provided', async () => {
    const mockResponse = [{ id: 'ethereum', name: 'Ethereum' }];
    axiosWithCache.mockResolvedValueOnce(mockResponse);

    const result = await fetchCryptoDetails();

    expect(axiosWithCache).toHaveBeenCalledWith(
      { url: `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${DEFAULT_CURRENCY.id}&order=market_cap_desc`, method: 'GET' },
      15 * 60 * 1000
    );
    expect(result).toEqual(mockResponse);
  });

  test('should handle errors and throw if axiosWithCache fails', async () => {
    const mockError = new Error('Network error');
    axiosWithCache.mockRejectedValueOnce(mockError);

    await expect(fetchCryptoDetails({ currency: 'usd' })).rejects.toThrow('Network error');

    expect(axiosWithCache).toHaveBeenCalledWith(
      { url: 'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc', method: 'GET' },
      15 * 60 * 1000
    );
  });
});
