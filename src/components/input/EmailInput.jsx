import React from "react";

export default function EmailInput({ value, onChange, error }) {
  return (
    <div className="flex w-full max-w-[343px] flex-col md:max-w-[518px]">
      <label htmlFor="email" className="mb-2 text-sm font-medium text-gray-900">
        이메일
      </label>
      <input
        type="email"
        id="email"
        value={value}
        onChange={onChange}
        placeholder="이메일을 입력해주세요"
        className={`h-12 w-full rounded-[12px] border bg-white px-3 py-2 text-sm outline-none ${
          error ? "border-error" : "border-gray-200"
        }`}
      />
      {error && <p className="text-error mt-2 text-xs">잘못된 이메일입니다.</p>}
    </div>
  );
}
