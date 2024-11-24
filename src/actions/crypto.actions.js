import { toast } from "react-toastify";
import { fetchCryptoDetails } from "../services/crypto.services";

export const fetchCryptoDetailsAction = async (payload) => {
  try {
    const response = await fetchCryptoDetails(payload);
    toast.success("Data fetched successfully!");
    return response?.data || [];
  } catch (e) {
    toast.error("Failed to fetch data. Please try again later.");
    return [];
  }
};
