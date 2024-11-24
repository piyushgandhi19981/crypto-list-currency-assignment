import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import ListSubheader from "../ListSubheader";
import { CURRENCIES } from "../../../../../constants/currencies";

jest.mock("../listSubheader.helpers", () => ({
  getAutocompleteItems: jest.fn(),
}));

describe("ListSubheader Component", () => {
  it("renders correctly and responds to currency change", () => {
    const mockOnCurrencyChange = jest.fn();
    const { getByTestId } = render(
      <ListSubheader
        onCurrencyChange={mockOnCurrencyChange}
        selectedCurrency="usd"
        totalResults={100}
        searchText=""
        recentSearches={[]}
      />,
    );

    const currencySelect = getByTestId("currency-select");

    fireEvent.change(currencySelect, { target: { value: "eur" } });

    expect(mockOnCurrencyChange).toHaveBeenCalledWith("eur");
  });

  test("renders default values correctly", () => {
    render(
      <ListSubheader
        selectedCurrency="usd"
        totalResults={10}
        searchText=""
        recentSearches={[]}
      />,
    );

    expect(screen.getByTestId("result-count")).toHaveTextContent(
      "Total Results: 10",
    );
    expect(screen.getByTestId("currency-select")).toHaveValue("usd");
  });

  test("should render currency select options correctly", () => {
    render(
      <ListSubheader
        selectedCurrency="usd"
        totalResults={100}
        searchText=""
        recentSearches={[]}
      />,
    );

    const options = screen.getAllByRole("option");

    expect(options.length).toBe(CURRENCIES.length);
  });

});
