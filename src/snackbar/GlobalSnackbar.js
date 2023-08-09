import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Snackbar, Alert } from "@mui/material";
import { hideSnackbar } from "./snackbarSlice";

const GlobalSnackbar = () => {
  const dispatch = useDispatch();
  const { open, message, type } = useSelector(state => state.snackbar);

  const handleClose = () => {
    dispatch(hideSnackbar());
  };

  const handleCellClick = params => {
    const isEditing = params.api
      .getEditingCells()
      .some(
        cell =>
          cell.rowIndex === params.node.rowIndex &&
          cell.column === params.column
      );

    if (!isEditing) {
      // Perform the click action for the column
      console.log(`Cell clicked: ${params.value}`);
    }
  };

  return (
    <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
      <Alert onClose={handleClose} severity={type} sx={{ width: "100%" }}>
        {message}
      </Alert>
    </Snackbar>
  );
};

export default GlobalSnackbar;
