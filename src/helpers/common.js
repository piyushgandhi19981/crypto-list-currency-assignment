import _find from 'lodash/find';
import { CURRENCIES, DEFAULT_CURRENCY } from "../constants/currencies";

export const getCurrencySign = (curr) => _find(CURRENCIES, currency => currency.id === curr)?.sign || DEFAULT_CURRENCY.sign;