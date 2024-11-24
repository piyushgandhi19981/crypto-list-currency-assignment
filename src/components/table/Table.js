import React from "react";
import _map from 'lodash/map';
import _noop from 'lodash/noop';
import PropTypes from 'prop-types';
import {
  useReactTable,
  getCoreRowModel,
} from "@tanstack/react-table";
import "./table.css";
import Loader from "../loader";

const Table = ({ 
  columns = [],
  data = [],
  isLoading = true,
  onRowClick = _noop
}) => {

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="react-table-container">
      <table className="fancy-table">
        <thead className="table-header" >
          {_map(table.getHeaderGroups(), (headerGroup) => (
            <tr key={headerGroup.id}>
              {_map(headerGroup.headers, (header) => (
                <th key={header.id}>
                  {header.isPlaceholder
                    ? null
                    : header.column.columnDef.header}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        {isLoading ? <Loader /> : <tbody>
          {_map(table.getRowModel().rows, (row) => (
            <tr role="row" onClick={() => onRowClick(row?.original)} key={row.id}>
              {_map(row.getVisibleCells(), (cell) => (
                <td key={cell.id}>{cell.getContext().renderValue()}</td>
              ))}
            </tr>
          ))}
        </tbody>}
      </table>
    </div>
  );
};

Table.propTypes = {
  columns: PropTypes.array,
  data: PropTypes.array,
  isLoading: PropTypes.bool,
  onRowClick: PropTypes.func
}

export default Table;