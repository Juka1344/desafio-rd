import React from 'react';

function Checkbox({ children, ...props }) {
  return (
    <label className="flex items-center p-3 rounded-lg border border-gray-200 hover:border-blue-300 hover:bg-blue-50 transition-all duration-200 cursor-pointer group">
      <input
        type="checkbox"
        className="w-5 h-5 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2 transition-all duration-200"
        {...props}
      />
      <span className="ml-3 text-gray-700 group-hover:text-blue-700 transition-colors duration-200 select-none">
        {children}
      </span>
    </label>
  );
}

export default Checkbox;
