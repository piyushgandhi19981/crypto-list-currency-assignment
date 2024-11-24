import getColumns from "../cryptoList.columns";
import cryptoReader from "../../../../readers/crypto.readers";
import { getCurrencySign } from "../../../../helpers/common";

jest.mock("../../../../readers/crypto.readers", () => ({
  marketCapRank: jest.fn(),
  name: jest.fn(),
  image: jest.fn(),
  symbol: jest.fn(),
  currentPrice: jest.fn(),
  marketCap: jest.fn(),
  totalVolume: jest.fn(),
  high24h: jest.fn(),
  low24h: jest.fn(),
  priceChangePercentage24h: jest.fn(),
}));

jest.mock("../../../../helpers/common", () => ({
  getCurrencySign: jest.fn(),
}));

describe("getColumns", () => {
  const mockRow = {
    id: "1",
    marketCapRank: 1,
    name: "Bitcoin",
    image: "bitcoin_image_url",
    symbol: "BTC",
    currentPrice: 50000,
    marketCap: 900000000000,
    totalVolume: 1000000000,
    high24h: 51000,
    low24h: 48000,
    priceChangePercentage24h: 2.5,
  };

  it("should return correct number of columns", () => {
    const columns = getColumns("usd");
    expect(columns).toHaveLength(9);
  });

  it("should display Rank correctly", () => {
    cryptoReader.marketCapRank.mockReturnValue(mockRow.marketCapRank);
    const columns = getColumns("usd");
    const rankColumn = columns.find((col) => col.header === "Rank");
    const result = rankColumn.accessorFn(mockRow);
    expect(result.props.children).toBe(mockRow.marketCapRank);
  });

  it("should display Name with image correctly", () => {
    cryptoReader.name.mockReturnValue(mockRow.name);
    cryptoReader.image.mockReturnValue(mockRow.image);
    const columns = getColumns("usd");
    const nameColumn = columns.find((col) => col.header === "Name");
    const result = nameColumn.accessorFn(mockRow);
    expect(result.props.children[0].props.src).toBe(mockRow.image);
    expect(result.props.children[1]).toBe(mockRow.name);
  });

  it("should display Symbol in uppercase", () => {
    cryptoReader.symbol.mockReturnValue(mockRow.symbol);
    const columns = getColumns("usd");
    const symbolColumn = columns.find((col) => col.header === "Symbol");
    const result = symbolColumn.accessorFn(mockRow);
    expect(result).toBe(mockRow.symbol.toUpperCase());
  });

  it("should display Price with currency symbol", () => {
    getCurrencySign.mockReturnValue("$");
    cryptoReader.currentPrice.mockReturnValue(mockRow.currentPrice);
    const columns = getColumns("usd");
    const priceColumn = columns.find((col) => col.header === "Price");
    const result = priceColumn.accessorFn(mockRow);
    expect(result).toBe(`$${mockRow.currentPrice.toLocaleString()}`);
  });

  it("should display Market Cap with currency symbol", () => {
    getCurrencySign.mockReturnValue("$");
    cryptoReader.marketCap.mockReturnValue(mockRow.marketCap);
    const columns = getColumns("usd");
    const marketCapColumn = columns.find((col) => col.header === "Market Cap");
    const result = marketCapColumn.accessorFn(mockRow);
    expect(result).toBe(`$${mockRow.marketCap.toLocaleString()}`);
  });

  it("should display 24h Volume with currency symbol", () => {
    getCurrencySign.mockReturnValue("$");
    cryptoReader.totalVolume.mockReturnValue(mockRow.totalVolume);
    const columns = getColumns("usd");
    const volumeColumn = columns.find((col) => col.header === "24h Volume");
    const result = volumeColumn.accessorFn(mockRow);
    expect(result).toBe(`$${mockRow.totalVolume.toLocaleString()}`);
  });

  it("should display 24h High with currency symbol", () => {
    getCurrencySign.mockReturnValue("$");
    cryptoReader.high24h.mockReturnValue(mockRow.high24h);
    const columns = getColumns("usd");
    const highColumn = columns.find((col) => col.header === "24h High");
    const result = highColumn.accessorFn(mockRow);
    expect(result).toBe(`$${mockRow.high24h.toLocaleString()}`);
  });

  it("should display 24h Low with currency symbol", () => {
    getCurrencySign.mockReturnValue("$");
    cryptoReader.low24h.mockReturnValue(mockRow.low24h);
    const columns = getColumns("usd");
    const lowColumn = columns.find((col) => col.header === "24h Low");
    const result = lowColumn.accessorFn(mockRow);
    expect(result).toBe(`$${mockRow.low24h.toLocaleString()}`);
  });

  it("should display 24h Change with percentage and color", () => {
    cryptoReader.priceChangePercentage24h.mockReturnValue(
      mockRow.priceChangePercentage24h,
    );
    const columns = getColumns("usd");
    const changeColumn = columns.find((col) => col.header === "24h Change (%)");
    const result = changeColumn.accessorFn(mockRow);
    expect(result.props.style.color).toBe("green");
    expect(result.props.children).toBe(
      `${mockRow.priceChangePercentage24h.toFixed(2)}%`,
    );
  });
});
