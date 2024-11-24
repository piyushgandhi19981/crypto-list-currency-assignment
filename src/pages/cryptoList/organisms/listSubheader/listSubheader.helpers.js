import _includes from "lodash/includes";
import _filter from "lodash/filter";
import _toLower from "lodash/toLower";

export const getAutocompleteItems = (searchText = "", recentSearches = []) => {
  return searchText
    ? _filter(recentSearches, (s) =>
        _includes(_toLower(s), _toLower(searchText)),
      )
    : recentSearches;
};
