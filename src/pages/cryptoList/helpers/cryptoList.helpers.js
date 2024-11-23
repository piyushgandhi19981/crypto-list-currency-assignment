import _chunk from 'lodash/chunk';
import _get from 'lodash/get';
import _toLower from 'lodash/toLower';
import _filter from 'lodash/filter';
import _some from 'lodash/some';
import _includes from 'lodash/includes';
import _size from 'lodash/size';

import { SEARCH_FIELDS } from '../constants/cryptoList.constants';

const getSearchData = (data = [], searchText = '') => 
    _filter(data, dataItem => 
        _some(SEARCH_FIELDS, searchField =>  
            _includes(_toLower(_get(dataItem, searchField)), _toLower(searchText)
        )
    )
);

export const getResolvedList = ({ totalData = [], page= 1, rows= 50 } = {}, searchText = '') => {
  const tableData = searchText ? getSearchData(totalData, searchText) : totalData;
  const paginatedData = _chunk(tableData, rows);
  return { tableData, listData: paginatedData[page - 1] || [] };
};

export const getUpdatedRecentSearches = (recentSearches = [], searchText = '') => {
  if(_includes(recentSearches, searchText)){
    return [searchText, ..._filter(recentSearches, s => s!==searchText)];
  } else {
    let updatedRecentSearches = [searchText, ...recentSearches];
    if(_size(updatedRecentSearches) > 10){
        updatedRecentSearches.pop();
    }
    return updatedRecentSearches;
  }
}