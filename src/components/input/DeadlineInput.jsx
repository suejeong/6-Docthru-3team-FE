import React from "react";

export default function DeadlineInput({ value, onChange }) {
  return (
    <div className="flex w-full max-w-[343px] flex-col md:max-w-[518px]">
      <label
        htmlFor="deadline"
        className="mb-2 text-sm font-medium text-gray-900"
      >
        마감기한
      </label>
      <input
        type="date"
        id="deadline"
        value={value}
        onChange={onChange}
        placeholder="YY/MM/DD"
        className="h-12 w-full rounded-[12px] border border-gray-200 bg-white px-3 py-2 text-sm outline-none"
      />
    </div>
  );
}
