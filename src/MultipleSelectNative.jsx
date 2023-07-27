import React, { useState } from "react";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";

const names = [
  "Oliver Hansen",
  "Van Henry",
  "April Tucker",
  "Ralph Hubbard",
  "Omar Alexander",
  "Carlos Abbott",
  "Miriam Wagner",
  "Bradley Wilkerson",
  "Virginia Andrews",
  "Kelly Snyder"
];

export default function MultipleSelectNative() {
  const [personName, setPersonName] = useState([]);

  const handleChangeMultiple = (event) => {
    setPersonName(event.target.value);
  };

  const [selectedNames, setSelectedNames] = useState([]);

  const handleCheckboxChange = (event) => {
    const { value } = event.target;
    setSelectedNames((prevSelectedNames) => {
      if (prevSelectedNames.includes(value)) {
        return prevSelectedNames.filter((name) => name !== value);
      } else {
        return [...prevSelectedNames, value];
      }
    });
  };

  return (
    <div>
      <FormControl sx={{ m: 1, minWidth: 120, maxWidth: 300 }}>
        <InputLabel shrink htmlFor="select-multiple-native">
          Native
        </InputLabel>
        <div>
          {names.map((name) => (
            <label key={name}>
              <input
                type="checkbox"
                value={name}
                checked={selectedNames.includes(name)}
                onChange={handleCheckboxChange}
              />
              <span style={{ fontSize: 700 }}>{name}</span>
              <span className="custom-span" style={{ fontSize: 600 }}>
                plus
              </span>
            </label>
          ))}
        </div>
      </FormControl>
    </div>
  );
}
