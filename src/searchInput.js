import React from 'react';
import { Input } from 'antd';

const SearchInput = ({ searchText, setSearchText }) => {
  return (
    <Input
      placeholder="Search table"
      value={searchText}
      onChange={(e) => setSearchText(e.target.value)}
      style={{ width: 200, marginBottom: 10 }}
    />
  );
};

export default SearchInput;
