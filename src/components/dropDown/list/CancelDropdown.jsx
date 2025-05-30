import React from "react";

function CancelDropdown({ className, onClick }) {
  return (
    <button
      onClick={onClick}
      className={`flex h-10 w-35 items-center justify-center rounded-lg border border-gray-300 bg-white p-4 hover:bg-gray-50 ${className}`}
    >
      <div className="text-sm text-gray-500 md:text-base">취소하기</div>
    </button>
  );
}

export default CancelDropdown;
