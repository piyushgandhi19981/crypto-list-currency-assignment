import { getCurrencySign } from '../common';

jest.mock('../../constants/currencies', () => ({
  CURRENCIES: [
    { id: 'USD', sign: '$' },
    { id: 'EUR', sign: '€' },
    { id: 'INR', sign: '₹' },
  ],
  DEFAULT_CURRENCY: { id: 'USD', sign: '$' },
}));

describe('getCurrencySign', () => {
  it('should return the correct currency sign when the currency exists', () => {
    expect(getCurrencySign('USD')).toBe('$');
    expect(getCurrencySign('EUR')).toBe('€');
    expect(getCurrencySign('INR')).toBe('₹');
  });

  it('should return the default currency sign when the currency does not exist', () => {
    expect(getCurrencySign('JPY')).toBe('$');
  });

  it('should return the default currency sign when the currency is null or undefined', () => {
    expect(getCurrencySign(null)).toBe('$');
    expect(getCurrencySign(undefined)).toBe('$');
  });

  it('should return the default currency sign when the input is an empty string', () => {
    expect(getCurrencySign('')).toBe('$');
  });

  it('should handle non-string inputs gracefully', () => {
    expect(getCurrencySign(123)).toBe('$');
    expect(getCurrencySign({})).toBe('$');
    expect(getCurrencySign([])).toBe('$');
  });
});
