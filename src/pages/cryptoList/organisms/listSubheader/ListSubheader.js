import React, { useEffect, useMemo, useRef, useState } from "react";
import PropTypes from "prop-types";
import _noop from "lodash/noop";

import _identity from "lodash/identity";
import _reverse from "lodash/reverse";
import _map from "lodash/map";

import Autocomplete from "react-autocomplete";

import { CURRENCIES } from "../../../../constants/currencies";

import { getAutocompleteItems } from "./listSubheader.helpers";
import { INPUT_PROPS } from "./listSubheader.constants";

import "./listSubheader.css";

const ListSubheader = ({
  onCurrencyChange = _noop,
  totalResults = 0,
  onSearchChange = _noop,
  searchText = "",
  recentSearches = [],
  selectedCurrency,
}) => {
  const ref = useRef(null);

  const [search, setSearch] = useState(searchText);

  useEffect(() => {
    return () => {
      ref.current = null;
    };
  }, []);

  const autocompleteItems = useMemo(
    () => getAutocompleteItems(searchText, recentSearches),
    [searchText, recentSearches],
  );

  const handleSearchChange = (val) => {
    clearTimeout(ref.current);
    ref.current = setTimeout(() => {
      onSearchChange(val);
    }, 500);
  };

  const onAutoCompleteChange = (e) => {
    const val = e.target.value;
    setSearch(val);
    handleSearchChange(val);
  };

  const onSelect = (val) => {
    setSearch(val);
    onSearchChange(val);
  };

  const renderAutocompleteItem = (item) => (
    <div
      key={item}
      className={`autocomplete-item ${item === searchText ? "active" : ""}`}
    >
      {item}
    </div>
  );

  return (
    <div className="subheader">
      <div className="subheader-left">
        <select
          data-testid="currency-select"
          className="currency-filter"
          onChange={(e) => onCurrencyChange(e.target.value)}
          value={selectedCurrency}
        >
          {_map(CURRENCIES, (currency) => (
            <option key={currency.id} value={currency.id}>
              {currency.name}
            </option>
          ))}
        </select>

        <span data-testid="result-count" className="result-count">
          Total Results: {totalResults}
        </span>
      </div>

      <div className="subheader-right">
        <Autocomplete
          getItemValue={_identity}
          items={_reverse(autocompleteItems)}
          renderItem={renderAutocompleteItem}
          value={search}
          onChange={onAutoCompleteChange}
          inputProps={INPUT_PROPS}
          onSelect={onSelect}
          data-testid="autocomplete"
        />
      </div>
    </div>
  );
};

ListSubheader.propTypes = {
  onCurrencyChange: PropTypes.func,
  totalResults: PropTypes.number,
  onSearchChange: PropTypes.func,
  searchText: PropTypes.string,
  recentSearches: PropTypes.array,
  selectedCurrency: PropTypes.string.isRequired,
};

export default ListSubheader;
