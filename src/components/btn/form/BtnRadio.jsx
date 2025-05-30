import React, { useState } from "react";

export default function BtnRadio ({ children, label, value, checked, onChange = () => {} }) {

  return (
   
    <label className="inline-flex items-center cursor-pointer select-none mr-4">
    <input
        type="radio"
        name="customRadio"
        value={value}
        checked={checked}
        onChange={() => onChange(value)}
        className="hidden"
    />
        <div
        className={`w-[18px] h-[18px] rounded-full border flex items-center justify-center 
            ${checked ? "bg-gray-800 border-gray-800" : "bg-gray-100 border-gray-200"}`}
        >
        <div
            className={`w-2 h-2 bg-white rounded-full transition-opacity ${
            checked ? "opacity-100" : "opacity-0"
            }`}
        />
        </div>
        <span className="ml-2">{children}</span>
    </label>
  );
}