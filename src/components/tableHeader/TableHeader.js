import React from "react";
import PropTypes from 'prop-types';

import './tableHeader.css'

const TableHeader = props => {
  const { title, subTitle } = props;
  return (
    <div className="header-container">
      <h1 className="header-title">{title}</h1>
      <p className="header-subtitle">{subTitle}</p>
    </div>
  );
};

TableHeader.propTypes = {
  title: PropTypes.string,
  subTitle: PropTypes.string,
};

TableHeader.defaultProps = {
  title: '',
  subTitle: ''
};

export default TableHeader;
