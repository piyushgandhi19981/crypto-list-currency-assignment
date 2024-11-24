import {
  getResolvedList,
  getUpdatedRecentSearches,
} from "../cryptoList.helpers";
import _chunk from "lodash/chunk";
import _filter from "lodash/filter";
import _some from "lodash/some";
import _includes from "lodash/includes";
import _toLower from "lodash/toLower";
import _get from "lodash/get";

describe("Helpers Tests", () => {
  describe("getResolvedList", () => {
    const mockData = [
      { name: "Bitcoin", symbol: "BTC", marketCapRank: 1 },
      { name: "Ethereum", symbol: "ETH", marketCapRank: 2 },
      { name: "Ripple", symbol: "XRP", marketCapRank: 3 },
      { name: "Litecoin", symbol: "LTC", marketCapRank: 4 },
    ];

    it("should return paginated data without search text", () => {
      const result = getResolvedList({ totalData: mockData, page: 1, rows: 2 });

      expect(result.listData).toHaveLength(2);
      expect(result.listData[0].name).toBe("Bitcoin");
      expect(result.listData[1].name).toBe("Ethereum");
    });
    it("should return filtered and paginated data when search text is provided", () => {
      const searchText = "bit";
      const result = getResolvedList(
        { totalData: mockData, page: 1, rows: 2 },
        searchText,
      );

      expect(result.listData).toHaveLength(1);
      expect(result.listData[0].name).toBe("Bitcoin");
    });

    it("should return empty data when no items match the search text", () => {
      const searchText = "dogecoin";
      const result = getResolvedList(
        { totalData: mockData, page: 1, rows: 2 },
        searchText,
      );

      expect(result.listData).toHaveLength(0);
    });
  });

  describe("getUpdatedRecentSearches", () => {
    it("should add new search text at the front if not already present", () => {
      const recentSearches = ["Ethereum", "Litecoin"];
      const searchText = "Bitcoin";

      const result = getUpdatedRecentSearches(recentSearches, searchText);

      expect(result).toEqual([searchText, "Ethereum", "Litecoin"]);
    });

    it("should move existing search text to the front of the list", () => {
      const recentSearches = ["Ethereum", "Bitcoin", "Litecoin"];
      const searchText = "Bitcoin";

      const result = getUpdatedRecentSearches(recentSearches, searchText);

      expect(result).toEqual([searchText, "Ethereum", "Litecoin"]);
    });

    it("should limit the recent searches list to 10 items", () => {
      const recentSearches = Array(10).fill("Ethereum");
      const searchText = "Bitcoin";

      const result = getUpdatedRecentSearches(recentSearches, searchText);

      expect(result).toHaveLength(10);
      expect(result[0]).toBe(searchText);
    });
  });
});
