import _property from 'lodash/property';

const id = _property('id');
const symbol = _property('symbol');
const name = _property('name');
const image = _property('image');
const currentPrice = _property('current_price');
const marketCap = _property('market_cap');
const totalVolume = _property('total_volume');
const high24h = _property('high_24h');
const low24h = _property('low_24h');
const priceChange24h = _property('price_change_24h');
const priceChangePercentage24h = _property('price_change_percentage_24h');
const marketCapRank = _property('market_cap_rank');
const circulatingSupply = _property('circulating_supply');
const totalSupply = _property('total_supply');
const maxSupply = _property('max_supply');
const ath = _property('ath');
const athChangePercentage = _property('ath_change_percentage');
const athDate = _property('ath_date');
const atl = _property('atl');
const atlChangePercentage = _property('atl_change_percentage');
const atlDate = _property('atl_date');

const READER = {
  id,
  symbol,
  name,
  image,
  currentPrice,
  marketCap,
  totalVolume,
  high24h,
  low24h,
  priceChange24h,
  priceChangePercentage24h,
  marketCapRank,
  circulatingSupply,
  totalSupply,
  maxSupply,
  ath,
  athChangePercentage,
  athDate,
  atl,
  atlChangePercentage,
  atlDate
}

export default READER;
