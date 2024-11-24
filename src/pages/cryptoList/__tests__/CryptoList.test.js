import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import { CryptoAppList } from "../CryptoList";

describe("CryptoAppList", () => {
  test("should render SubHeader with correct total results", () => {
    const data = [
      { id: 1, name: "Bitcoin" },
      { id: 2, name: "Ethereum" },
    ];

    render(<CryptoAppList data={data} page={1} rows={10} currency="usd" />);

    expect(screen.getByTestId("result-count")).toHaveTextContent(
      "Total Results: 2",
    );
  });

  test("should call onCurrencyChange when a currency is selected", () => {
    const mockOnAction = jest.fn();

    render(
      <CryptoAppList
        data={[]}
        page={1}
        rows={10}
        currency="usd"
        onAction={mockOnAction}
      />,
    );

    const currencySelect = screen.getByTestId("currency-select");

    fireEvent.change(currencySelect, { target: { value: "eur" } });

    expect(mockOnAction).toHaveBeenCalledWith({
      type: "ON_FILTER_CHANGE",
      payload: "eur",
    });
  });

  test("should render correctly with no data", () => {
    render(<CryptoAppList data={[]} page={1} rows={10} currency="usd" />);

    expect(screen.getByTestId("result-count")).toHaveTextContent(
      "Total Results: 0",
    );
  });

  test("should render loading state correctly", () => {
    render(
      <CryptoAppList
        data={[]}
        page={1}
        rows={10}
        currency="usd"
        isLoading={true}
      />,
    );

    expect(
      screen.getByRole("region", { name: /loader container/i }),
    ).toBeInTheDocument();
  });
});
