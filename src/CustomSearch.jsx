import React from "react";
import TextField from "@mui/material/TextField";
import SearchIcon from "@mui/icons-material/Search";

const CustomSearch = ({ onSearch }) => {
  const handleSearchChange = (event) => {
    const searchText = event.target.value;
    onSearch(searchText);
  };

  return (
    <TextField
      variant="outlined"
      placeholder="Search"
      onChange={handleSearchChange}
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">
            <SearchIcon />
          </InputAdornment>
        ),
        sx: { borderRadius: 25 } // Set round borders
      }}
      sx={{ "& .MuiInputBase-root": { borderRadius: 25 } }} // Set round borders
    />
  );
};

export default CustomSearch;
