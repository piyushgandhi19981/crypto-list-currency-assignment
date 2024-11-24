import { getAutocompleteItems } from "../listSubheader.helpers";

describe("getAutocompleteItems", () => {
  it("filters recent searches based on searchText", () => {
    const searchText = "bit";
    const recentSearches = ["Bitcoin", "Ethereum", "Litecoin", "Bitcoin Cash"];

    const result = getAutocompleteItems(searchText, recentSearches);

    expect(result).toEqual(["Bitcoin", "Bitcoin Cash"]);
  });

  it("returns all recent searches when no searchText is provided", () => {
    const searchText = "";
    const recentSearches = ["Bitcoin", "Ethereum", "Litecoin", "Bitcoin Cash"];

    const result = getAutocompleteItems(searchText, recentSearches);

    expect(result).toEqual(recentSearches);
  });
});
