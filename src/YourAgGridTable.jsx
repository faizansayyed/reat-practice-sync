// YourAgGridTable.js
import React from "react";
import { AgGridColumn, AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import CustomCellRenderer from "./CustomCellRenderer";

const YourAgGridTable = ({ rowData, handleDelete, handleEdit }) => {
  const columnDefs = [
    {
      field: "id",
      headerName: "Actions",
      cellRendererFramework: (params) => (
        <CustomCellRenderer
          value={params.value}
          onDelete={handleDelete}
          onEdit={handleEdit}
        />
      ),
      width: 100
    },
    {
      field: "name",
      headerName: "Name",
      width: 200
    }
    // Add other columns here as needed
    // {
    //   field: 'otherField',
    //   headerName: 'Other Column',
    //   width: 150,
    //   ...
    // },
  ];

  const handleCellClicked = (event) => {
    const { colDef, data } = event.node;
    if (colDef.field === "id") {
      event.api.deselectAll(); // Deselect the row clicked in the "Actions" column
    } else {
      // Redirect to edit page for other columns (excluding "Actions")
      handleEdit(data.id); // Replace with the appropriate ID field from your data
    }
  };

  return (
    <div className="ag-theme-alpine" style={{ height: "400px", width: "100%" }}>
      <AgGridReact
        rowData={rowData}
        columnDefs={columnDefs}
        onCellClicked={handleCellClicked}
      />
    </div>
  );
};

export default YourAgGridTable;
