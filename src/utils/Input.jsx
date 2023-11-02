import React from 'react';

const Input = ({ placeholder, type, change, value, id }) => {
  return (
    <input
      id={id}
      className='w-full h-[50px] pl-3 rounded-lg outline-none border focus:border-2'
      placeholder={placeholder}
      type={type}
      value={value}
      onFocus={(e) => e.target.select()}
      onChange={change}
      autoComplete='on'
    />
  );
};

export default Input;
