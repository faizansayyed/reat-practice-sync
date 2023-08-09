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

  return (
    <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
      <Alert onClose={handleClose} severity={type} sx={{ width: "100%" }}>
        {message}
      </Alert>
    </Snackbar>
  );
};

export default GlobalSnackbar;
