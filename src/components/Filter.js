import React, { useState,useRef } from 'react';
import {
  TextField,
  Checkbox,
  FormControlLabel,
  Select,
  MenuItem,
} from '@mui/material';

function FilterComponent() {
  const [searchText, setSearchText] = useState('');
  const [category, setCategory] = useState('');
  const [isChecked, setIsChecked] = useState(false);
  const inputRef=useRef('');
  return (
    <div>
      <TextField
        label="Search"
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
      />

      <Select
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        label="Category"
      >
        <MenuItem value="">All</MenuItem>
        <MenuItem value="category1">Category 1</MenuItem>
        <MenuItem value="category2">Category 2</MenuItem>
      </Select>

      <FormControlLabel
        control={
          <Checkbox
            checked={isChecked}
            onChange={(e) => setIsChecked(e.target.checked)}
          />
        }
        label="Active Only"
      />

    </div>
  );
}

export default FilterComponent;
