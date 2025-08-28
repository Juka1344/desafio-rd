import React from 'react';

function Checkbox({ children, ...props }) {
  return (
    <label className="flex items-center p-3 rounded-lg border border-gray-300 hover:border-[#94eadc] hover:bg-white transition-all duration-200 cursor-pointer group">
      <input
        type="checkbox"
        className="w-5 h-5 text-[#003d5c] bg-gray-100 border-gray-300 rounded transition-all duration-200"
        {...props}
      />
      <span className="ml-3 text-black group-hover:text-[#003d5c] transition-colors duration-200 select-none">
        {children}
      </span>
    </label>
  );
}

export default Checkbox;
