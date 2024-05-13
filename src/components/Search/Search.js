import React from 'react';

const Search = ({ value, onChange, type, placeholder, className }) => {
  return (
    <input
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      className={className}
    />
  );
};

export default Search;