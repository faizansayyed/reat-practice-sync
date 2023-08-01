import React, { useState } from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import Search from "./Search";

const TableWithSearch = () => {
  const [gridApi, setGridApi] = useState(null);
  const [gridColumnApi, setGridColumnApi] = useState(null);
  const [searchText, setSearchText] = useState("");

  const onGridReady = (params) => {
    setGridApi(params.api);
    setGridColumnApi(params.columnApi);
  };

  const onSearch = (text) => {
    setSearchText(text);
    gridApi.setQuickFilter(text);
  };

  const columnDefs = [
    // Your column definitions here
    // Example: { headerName: 'Name', field: 'name' },
  ];

  return (
    <div>
      <CustomSearch onSearch={onSearch} />
      <div
        className="ag-theme-alpine"
        style={{ height: "400px", width: "100%" }}
      >
        <AgGridReact
          columnDefs={columnDefs}
          onGridReady={onGridReady}
          quickFilterText={searchText}
        />
      </div>
    </div>
  );
};

export default TableWithSearch;
