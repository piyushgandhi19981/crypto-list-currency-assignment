import React from 'react';
import PropTypes from 'prop-types';

import _noop from 'lodash/noop';
import _map from 'lodash/map';

import './pagination.css'; 

const Pagination = ({ totalItems, onPageUpdate, pageSizeOptions, page: currentPage, rows: currentSize }) => {

  const totalPages = Math.ceil(totalItems / currentSize);

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      onPageUpdate({ page, rows: currentSize });
    }
  };

  const handleSizeChange = (event) => {
    const size = parseInt(event.target.value);
    onPageUpdate({ page: 1, rows: size })
  };

  const pages = Array.from({ length: totalPages }, (_, index) => index + 1);

  return (
    <div className="pagination-container">
      <div className="pagination-controls">
        <button 
          className="pagination-button" 
          onClick={() => handlePageChange(currentPage - 1)} 
          disabled={currentPage === 1}>
          &lt; Prev
        </button>
        {pages.map((page) => (
          <button
            key={page}
            className={`pagination-page ${page === currentPage ? 'active' : ''}`}
            onClick={() => handlePageChange(page)}>
            {page}
          </button>
        ))}
        <button 
          className="pagination-button" 
          onClick={() => handlePageChange(currentPage + 1)} 
          disabled={currentPage === totalPages}>
          Next &gt;
        </button>
      </div>

      <div className="pagination-size-selector">
        <label htmlFor="page-size">Items per page: </label>
        <select
          id="page-size"
          value={currentSize}
          onChange={handleSizeChange}
          className="pagination-size-dropdown"
        >
          {_map(pageSizeOptions, pageSize => (
            <>
              <option value={pageSize}>{pageSize}</option>
            </>
          ))}
        </select>
      </div>
    </div>
  );
};

Pagination.propTypes = {
  totalItems: PropTypes.number,
  rows: PropTypes.number,
  page: PropTypes.number,
  onPageUpdate: PropTypes.func,
  pageSizeOptions: PropTypes.array
};

Pagination.defaultProps = {
  totalItems: 0,
  onPageUpdate: _noop,
  page: 1,
  rows: 50,
  pageSizeOptions: [25, 50, 100]
};

export default Pagination;
