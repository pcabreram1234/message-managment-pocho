import React, { forwardRef } from "react";
import { Input } from "antd";

const SearchInput = forwardRef(
  ({ placeholder = "Search...", onSearchChange, valueInput }, ref) => {
    const handleChange = (e) => {
      onSearchChange(e.target.value);
    };

    return (
      <Input
        placeholder={placeholder}
        value={valueInput}
        ref={ref}
        allowClear
        size="large"
        onChange={handleChange}
      />
    );
  }
);

export default SearchInput;
