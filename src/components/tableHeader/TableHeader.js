import React from "react";
import PropTypes from 'prop-types';

import './tableHeader.css'

const TableHeader = ({
  title = '',
  subTitle = ''
}) => {
  return (
    <div className="header-container">
      {title && <h1 className="header-title">{title}</h1>}
      {subTitle && <p className="header-subtitle">{subTitle}</p>}
    </div>
  );
};

TableHeader.propTypes = {
  title: PropTypes.string,
  subTitle: PropTypes.string,
};

export default TableHeader;
