import { SORT_OPTIONS } from "@/constant/constant";
import React from "react";

function ApplyDropdown({ onSelect, className }) {
  return (
    <div className={`flex w-35 flex-col overflow-hidden rounded-lg border border-gray-300 bg-white ${className}`}>
      {SORT_OPTIONS.map(({ label, value }) => (
        <button
          key={value}
          onClick={() => onSelect({ label, value })}
          className="flex h-[41px] items-center justify-start border-b border-gray-300 bg-white px-4 last:border-b-0 md:h-[43px]"
        >
          <span className="text-sm text-gray-500 md:text-base">{label}</span>
        </button>
      ))}
    </div>
  );
}

export default ApplyDropdown;
