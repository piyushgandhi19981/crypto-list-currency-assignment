import React from "react";
import cryptoReader from '../../../readers/crypto.readers';
import { getCurrencySign } from "../../../helpers/common";

const getColumns = (selectedCurrency) => {
  const sign = getCurrencySign(selectedCurrency);
  return [
    {
        accessorFn: (row) => <span style={{ paddingLeft: '1.6rem' }} >{cryptoReader.marketCapRank(row) || '-'}</span>,
        header: 'Rank',
    },
    {
        header: 'Name',
        accessorFn: (row) => {
            const name = cryptoReader.name(row);
            const image = cryptoReader.image(row);
            return (
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <img
                src={image}
                alt={name}
                style={{ width: '2rem', height: '2rem', marginRight: '1rem' }}
              />
              {name}
            </div>
          )
        },
    },
    {
        header: 'Symbol',
        accessorFn: (row) => cryptoReader.symbol(row)?.toUpperCase(),
    },
    {
        accessorFn: (row) => `${sign}${cryptoReader.currentPrice(row)?.toLocaleString() ?? 'N/A'}`,
        header: 'Price',
    },
    {
        header: 'Market Cap',
        accessorFn: (row) => `${sign}${cryptoReader.marketCap(row)?.toLocaleString() ?? 'N/A'}`,
    },
    {
        header: '24h Volume',
        accessorFn: (row) => `${sign}${cryptoReader.totalVolume(row)?.toLocaleString() ?? 'N/A'}`,
    },
    {
        header: '24h High',
        accessorFn: (row) => `${sign}${cryptoReader.high24h(row)?.toLocaleString() ?? 'N/A'}`,
    },
    {
        header: '24h Low',
        accessorFn: (row) => `${sign}${cryptoReader.low24h(row)?.toLocaleString() ?? 'N/A'}`,
    },
    {
        accessorKey: 'price_change_percentage_24h',
        header: '24h Change (%)',
        accessorFn: (row) => {
          const value = cryptoReader.priceChangePercentage24h(row);
          const color = value > 0 ? 'green' : 'red'
          return <span style={{ color }}>{`${value?.toFixed(2) ?? 'N/A'}%`}</span>
        },
    },
  ];
}

export default getColumns;
