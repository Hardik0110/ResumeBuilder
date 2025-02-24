import React from 'react';

const FormField = ({ label, value, onChange }) => {
  return (
    <div className="mt-2">
      <label className="text-gray-700 font-medium">{label}</label>
      <input
        type="text"
        value={value}
        onChange={onChange}
        className="w-full p-3 mt-1 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
      />
    </div>
  );
};

export default FormField;