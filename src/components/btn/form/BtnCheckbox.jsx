import React, { useState } from "react";

export default function BtnCheckbox ({children}) {
    const [checked, setChecked] = useState(false);
    
    return (
    <label className="inline-flex items-center cursor-pointer">
      <input
        type="checkbox"
        checked={checked}
        onChange={() => setChecked(!checked)}
        className="hidden"
      />
      <div
        className={`w-[18px] h-[18px] rounded ${
          checked ? "bg-gray-800 " : "bg-gray-100 border-gray-200"
        }`}>
        {checked && (
          <svg
            className="w-[18px] h-[18px] text-white"
            fill="none"
            stroke="currentColor"
            strokeWidth="4"
            viewBox="0 0 26 26"
          >
            <path d="M5 13l4 4L19 7" />
          </svg>
        )}
        </div>
      <span className="ml-2">{children}</span>
    </label>
  );
}