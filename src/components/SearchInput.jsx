import React, { useState, useEffect } from "react";
import { Input } from "antd";

const SearchInput = ({ cb, dataSource, handleTableDataSource, cbLoading }) => {
  const [inputValue, setInputValue] = useState([]);

  const { Search } = Input;

  useEffect(() => {
    const rta = cb(inputValue, dataSource);
    handleTableDataSource(rta);
    cbLoading(true);
  }, [inputValue]);

  return (
    <Search
      placeholder="Message..."
      enterButton="Search"
      size="large"
      value={inputValue}
      pattern={/[az]/}
      onInput={(e) => {
        setInputValue(e.currentTarget.value);
      }}
    />
  );
};

export default SearchInput;
