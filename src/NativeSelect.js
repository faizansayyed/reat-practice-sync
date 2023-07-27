import React, { useState } from 'react';
import { styled } from '@mui/system';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';

const FormContainer = styled('div')({
  display: 'flex',
  flexWrap: 'wrap',
});

const FormField = styled(FormControl)(({ theme }) => ({
  margin: theme.spacing(1),
  minWidth: 120,
  maxWidth: 300,
}));

const SelectBox = styled(Select)(({ theme }) => ({
  height: 'auto',
  padding: '6px 0',
  '& option': {
    backgroundColor: "gray",
  },
}));

const names = [
  'Oliver Hansen',
  'Van Henry',
  'April Tucker',
  'Ralph Hubbard',
  'Omar Alexander',
  'Carlos Abbott',
  'Miriam Wagner',
  'Bradley Wilkerson',
  'Virginia Andrews',
  'Kelly Snyder',
];

const NativeSelect = () => {
  const [personName, setPersonName] = useState([]);

  const handleChange = (event) => {
    setPersonName(event.target.value);
  };

  return (
    <FormContainer>
      <FormField>
        <SelectBox
          multiple
          value={personName}
          onChange={handleChange}
        >
          {names.map((name) => (    <MenuItem key={name} value={name}>
              {name}
            </MenuItem>
          ))}
        </SelectBox>
      </FormField>
    </FormContainer>
  );
};

export default NativeSelect;
