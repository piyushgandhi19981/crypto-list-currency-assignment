import { fetchCryptoDetailsAction } from "../../../../actions/crypto.actions";
import { TABLE_ACTION_TYPES } from "../../../../components/tableManager/tableManager.constants";
import { ACTION_TYPES } from "../../constants/cryptoList.constants";
import {
  getResolvedList,
  getUpdatedRecentSearches,
} from "../../helpers/cryptoList.helpers";
import ACTION_HANDLERS from "../cryptoList.actionHandlers";

jest.mock("../../../../actions/crypto.actions", () => ({
  fetchCryptoDetailsAction: jest.fn(),
}));

jest.mock("../../helpers/cryptoList.helpers", () => ({
  getResolvedList: jest.fn(),
  getUpdatedRecentSearches: jest.fn(),
}));

describe("Action Handlers", () => {
  describe("handleInit", () => {
    it("fetches data and updates the state correctly", async () => {
      const setState = jest.fn();
      const state = { page: 1, rows: 10, currency: "USD", searchText: "" };
      const mockData = [{ id: "1", name: "Bitcoin" }];
      const mockResolvedList = { listData: mockData, tableData: mockData };

      fetchCryptoDetailsAction.mockResolvedValue(mockData);
      getResolvedList.mockReturnValue(mockResolvedList);

      await ACTION_HANDLERS[TABLE_ACTION_TYPES.ON_INIT]({ setState, state });

      expect(fetchCryptoDetailsAction).toHaveBeenCalledWith({
        currency: "USD",
      });
      expect(getResolvedList).toHaveBeenCalledWith(
        { page: 1, rows: 10, totalData: mockData },
        "",
      );
      expect(setState).toHaveBeenCalledWith({
        totalData: mockData,
        data: mockData,
        isLoading: false,
        listData: mockData,
      });
    });
  });

  describe("handlePageChange", () => {
    it("updates state with the correct list data after page change", () => {
      const setState = jest.fn();
      const state = {
        page: 1,
        rows: 10,
        totalData: [{ id: "1", name: "Bitcoin" }],
        searchText: "",
      };
      const payload = { page: 2, rows: 10 };
      const mockListData = [{ id: "2", name: "Ethereum" }];

      getResolvedList.mockReturnValue({ listData: mockListData });

      ACTION_HANDLERS[TABLE_ACTION_TYPES.ON_PAGE_CHANGE](
        { setState, state },
        payload,
      );

      expect(getResolvedList).toHaveBeenCalledWith(
        { page: 2, rows: 10, totalData: state.totalData },
        "",
      );
      expect(setState).toHaveBeenCalledWith({
        page: 2,
        rows: 10,
        listData: mockListData,
      });
    });
  });

  describe("handleRowClick", () => {
    it("navigates to the correct crypto details page", () => {
      const navigate = jest.fn();
      const state = { currency: "USD" };
      const payload = { id: "1" };

      ACTION_HANDLERS[TABLE_ACTION_TYPES.ON_ROW_CLICK](
        { navigate, state },
        payload,
      );

      expect(navigate).toHaveBeenCalledWith("/crypto-details/1?currency=USD");
    });
  });

  describe("handleFilterChange", () => {
    it("fetches new data and updates the state with filtered data", async () => {
      const setState = jest.fn();
      const state = { page: 1, rows: 10, currency: "usd", searchText: "" };
      const updatedCurrency = "eur";
      const mockData = [{ id: "1", name: "Bitcoin" }];
      const mockResolvedList = { listData: mockData, tableData: mockData };

      fetchCryptoDetailsAction.mockResolvedValue(mockData);
      getResolvedList.mockReturnValue(mockResolvedList);

      await ACTION_HANDLERS[ACTION_TYPES.ON_FILTER_CHANGE](
        { setState, state },
        updatedCurrency,
      );

      expect(fetchCryptoDetailsAction).toHaveBeenCalledWith({
        currency: updatedCurrency,
      });
      expect(getResolvedList).toHaveBeenCalledWith(
        { page: 1, rows: 10, totalData: mockData },
        "",
      );
      expect(setState).toHaveBeenCalledWith({
        totalData: mockData,
        data: mockData,
        isLoading: false,
        listData: mockData,
        page: 1,
        currency: updatedCurrency,
      });
    });
  });

  describe("handleSearchChange", () => {
    it("updates state with new search text and recent searches", async () => {
      const setState = jest.fn();
      const state = {
        rows: 10,
        recentSearches: ["Bitcoin"],
        searchText: "Bitcoin",
        totalData: [],
      };
      const searchText = "Ethereum";
      const updatedRecentSearches = ["Ethereum", "Bitcoin"];

      getUpdatedRecentSearches.mockReturnValue(updatedRecentSearches);

      await ACTION_HANDLERS[ACTION_TYPES.ON_SEARCH_CHANGE](
        { setState, state },
        searchText,
      );

      expect(getUpdatedRecentSearches).toHaveBeenCalledWith(
        state.recentSearches,
        searchText,
      );
      expect(setState).toHaveBeenCalledWith({
        data: [
          {
            id: "1",
            name: "Bitcoin",
          },
        ],
        listData: [
          {
            id: "1",
            name: "Bitcoin",
          },
        ],
        recentSearches: updatedRecentSearches,
        searchText: "Ethereum",
        page: 1,
      });
    });
  });
});
