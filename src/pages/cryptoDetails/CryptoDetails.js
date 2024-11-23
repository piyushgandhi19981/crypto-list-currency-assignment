import React, { useEffect, useMemo, useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import _find from 'lodash/find';
import Loader from "../../components/loader";

import { fetchCryptoDetailsAction } from "../../actions/crypto.actions";
import { getCurrencySign } from "../../helpers/common";
import cryptoReader from "../../readers/crypto.readers";

import "./cryptoDetails.css";

const CryptoDetailsPage = () => {
  const { id } = useParams();
  const [searchParams] = useSearchParams()
  const [crypto, setCrypto] = useState(null);

  const currency = searchParams.get('currency');

  const handleInit = async () => {
    const data = await fetchCryptoDetailsAction({ currency: currency });
    const cryptoDetail = _find(data, dataItem => dataItem?.id === id);
    setCrypto(cryptoDetail);
  }

  const sign = useMemo(() => getCurrencySign(currency), [currency]);

  useEffect(() => {
    handleInit();
  }, []);

  if (!crypto) {
    return <Loader />
  }

  const priceChangePercentage24h = cryptoReader.priceChangePercentage24h(crypto);

  return (
    <div className="crypto-details">
      <div className="details-layout">
        <div className="details-image">
          <img src={crypto?.image} alt={cryptoReader.name(crypto)} />
        </div>
        <div className="details-info">
          <h1>{crypto?.name}</h1>
          <div className="info-grid">
            <div className="info-row">
              <strong>ID:</strong> {cryptoReader.id(crypto)}
            </div>
            <div className="info-row">
              <strong>Symbol:</strong> {cryptoReader.symbol(crypto)?.toUpperCase()}
            </div>
            <div className="info-row">
              <strong>Current Price:</strong> {sign}{cryptoReader.currentPrice(crypto)?.toLocaleString()}
            </div>
            <div className="info-row">
              <strong>Market Cap:</strong> {sign}{cryptoReader.marketCap(crypto)?.toLocaleString()}
            </div>
            <div className="info-row">
              <strong>Market Cap Rank:</strong> {cryptoReader.marketCapRank(crypto)}
            </div>
            <div className="info-row">
              <strong>Total Volume:</strong> {sign}{cryptoReader.totalVolume(crypto)?.toLocaleString()}
            </div>
            <div className="info-row">
              <strong>24h High:</strong> {sign}{cryptoReader.high24h(crypto)?.toLocaleString()}
            </div>
            <div className="info-row">
              <strong>24h Low:</strong> {sign}{cryptoReader.low24h(crypto)?.toLocaleString()}
            </div>
            <div className="info-row">
              <strong>Price Change (24h):</strong> {sign}{cryptoReader.priceChange24h(crypto)?.toFixed(2)}
            </div>
            <div className="info-row">
              <strong>Price Change Percentage (24h):</strong> <span style={{ color: priceChangePercentage24h > 0 ? "green" : 'red' }} >{priceChangePercentage24h.toFixed(2)}%</span>
            </div>
            <div className="info-row">
              <strong>Circulating Supply:</strong> {cryptoReader.circulatingSupply(crypto)?.toLocaleString()}
            </div>
            <div className="info-row">
              <strong>Total Supply:</strong> {cryptoReader.totalSupply(crypto)?.toLocaleString() || 'N/A'}
            </div>
            <div className="info-row">
              <strong>Max Supply:</strong> {cryptoReader.maxSupply(crypto)?.toLocaleString() || 'N/A'}
            </div>
            <div className="info-row">
              <strong>All-Time High:</strong> {sign}{cryptoReader.ath(crypto)?.toLocaleString()}
            </div>
            <div className="info-row">
              <strong>All-Time High Change (%):</strong> {cryptoReader.athChangePercentage(crypto)?.toFixed(2)}%
            </div>
            <div className="info-row">
              <strong>All-Time High Date:</strong> {new Date(cryptoReader.athDate(crypto)).toLocaleDateString()}
            </div>
            <div className="info-row">
              <strong>All-Time Low:</strong> {sign}{cryptoReader.atl(crypto)?.toLocaleString()}
            </div>
            <div className="info-row">
              <strong>All-Time Low Change (%):</strong> {cryptoReader.atlChangePercentage(crypto)?.toFixed(2)}%
            </div>
            <div className="info-row">
              <strong>All-Time Low Date:</strong> {new Date(cryptoReader.atlDate(crypto)).toLocaleDateString()}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CryptoDetailsPage;
