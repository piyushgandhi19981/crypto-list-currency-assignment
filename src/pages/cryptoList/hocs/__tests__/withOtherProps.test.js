import React from "react";
import { render, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { toast } from "react-toastify";

import withOtherProps from "../withOtherProps";
import { DEFAULT_CURRENCY } from "../../../../constants/currencies";
import { LS_KEYS } from "../../constants/cryptoList.constants";

jest.mock("../../../../components/loader", () => () => (
  <div data-testid="loader">Loading...</div>
));
jest.mock(
  "../../../../hocs/withActionHandlers",
  () => () => (Component) => (props) => <Component {...props} />,
);

jest.mock("react-toastify", () => ({
  toast: {
    error: jest.fn(),
  },
}));

describe("withOtherProps HOC", () => {
  const WrappedComponent = () => (
    <div data-testid="wrapped-component">Wrapped Component</div>
  );
  const EnhancedComponent = withOtherProps(WrappedComponent);

  beforeEach(() => {
    jest.clearAllMocks();
    localStorage.clear();
  });

  test("should handle invalid JSON in recentSearches gracefully", async () => {
    localStorage.setItem(LS_KEYS.RECENT_SEARCHES, "{ invalidJson");

    render(<EnhancedComponent />, { wrapper: MemoryRouter });

    await waitFor(() => {
      expect(toast.error).toHaveBeenCalledWith(
        "Invalid JSON format! Please check your input.",
      );
    });
  });

  test("should set the default currency if not present in localStorage", async () => {
    localStorage.removeItem(LS_KEYS.CURRENCY);

    const WrappedComponent = () => <div>Test Component</div>;
    const EnhancedComponent = withOtherProps(WrappedComponent);

    render(<EnhancedComponent />, { wrapper: MemoryRouter });

    await waitFor(() => {
      expect(localStorage.getItem(LS_KEYS.CURRENCY)).toBe(DEFAULT_CURRENCY.id);
    });
  });

  test("should pass navigate function to the wrapped component", async () => {
    const WrappedComponent = jest.fn(() => <div>Test Component</div>);
    const EnhancedComponent = withOtherProps(WrappedComponent);

    render(<EnhancedComponent />, { wrapper: MemoryRouter });

    await waitFor(() => {
      expect(WrappedComponent).toHaveBeenCalledWith(
        expect.objectContaining({
          navigate: expect.any(Function),
        }),
        {},
      );
    });
  });
});
