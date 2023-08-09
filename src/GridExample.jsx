import React from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";

const GridExample = () => {
  const gridOptions = {
    // grid options and other configurations
    // ...
    onCellEditingStopped: (event) => {
      const editedRowData = event.data; // Edited row data
      const editedColumn = event.column.getColDef().field; // Edited column name
      const newValue = event.value; // New value

      // Make API call to sync changes to server
      syncChangesToServer(editedRowData, editedColumn, newValue);
    }
  };

  const syncChangesToServer = (rowData, columnName, newValue) => {
    // Make your API call here to sync changes to the server
    // Example using fetch:
    fetch("your-api-endpoint", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        rowData,
        columnName,
        newValue
      })
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Data synced to server:", data);
      })
      .catch((error) => {
        console.error("Error syncing data to server:", error);
      });
  };

  return (
    <div className="ag-theme-alpine" style={{ height: 400, width: 600 }}>
      <AgGridReact
        gridOptions={gridOptions}
        // column definitions, rowData, and other props
        // ...
      />
    </div>
  );
};

export default GridExample;
