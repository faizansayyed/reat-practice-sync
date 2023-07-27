import React from "react";
import { TextField } from "@mui/material";

export default function CustomTextField() {
  return (
    <TextField
      variant="outlined"
      size="small"
      label="Smaller TextField"
      sx={{
        "& .MuiInputLabel-root": {
          fontSize: 12 // Adjust the font size to make it smaller
        },
        "& .MuiOutlinedInput-root": {
          fontSize: 12 // Adjust the font size to make it smaller
        }
      }}
    />
  );
}
