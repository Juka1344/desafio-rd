import React from 'react';

function SubmitButton({ text }) {
  return (
    <button
      type="submit"
      className="w-full bg-gradient-to-r from-[#00D4FF] to-[#00F2C9]
       hover:from-[#0fb6d7] hover:to-[#16d7b7] text-black
       font-semibold py-4 px-6 rounded-xl shadow-lg hover:shadow-xl
       transform hover:-translate-y-0.5 transition-all duration-200"
    >
      {text}
    </button>
  );
}

export default SubmitButton;
