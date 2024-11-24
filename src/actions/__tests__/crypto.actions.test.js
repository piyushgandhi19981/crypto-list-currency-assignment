import { toast } from "react-toastify";
import { fetchCryptoDetailsAction } from "../crypto.actions";
import { fetchCryptoDetails } from "../../services/crypto.services";

jest.mock("react-toastify", () => ({
  toast: {
    success: jest.fn(),
    error: jest.fn(),
  },
}));

jest.mock("../../services/crypto.services", () => ({
  fetchCryptoDetails: jest.fn(),
}));

describe("fetchCryptoDetailsAction", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test("should fetch data successfully and show success toast", async () => {
    const mockData = { data: [{ id: 1, name: "Bitcoin" }] };
    fetchCryptoDetails.mockResolvedValueOnce(mockData);

    const result = await fetchCryptoDetailsAction({ id: 1 });

    expect(fetchCryptoDetails).toHaveBeenCalledWith({ id: 1 });
    expect(toast.success).toHaveBeenCalledWith("Data fetched successfully!");
    expect(result).toEqual(mockData.data);
  });

  test("should handle failure and show error toast", async () => {
    fetchCryptoDetails.mockRejectedValueOnce(new Error("Network error"));

    const result = await fetchCryptoDetailsAction({ id: 1 });

    expect(fetchCryptoDetails).toHaveBeenCalledWith({ id: 1 });
    expect(toast.error).toHaveBeenCalledWith(
      "Failed to fetch data. Please try again later.",
    );
    expect(result).toEqual([]);
  });
});
