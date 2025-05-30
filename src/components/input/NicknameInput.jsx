import React from "react";

export default function NicknameInput({ value, onChange, error }) {
  return (
    <div className="flex w-full max-w-[343px] flex-col md:max-w-[518px]">
      <label htmlFor="nickname" className="mb-2 text-sm font-medium text-gray-900">
        닉네임
      </label>
      <input
        type="text"
        id="nickname"
        value={value}
        onChange={onChange}
        placeholder="닉네임을 입력해주세요"
        className={`h-12 w-full rounded-[12px] border bg-white px-3 py-2 text-sm outline-none ${
          error ? "border-error" : "border-gray-200"
        }`}
      />
      {error && <p className="text-error mt-2 text-xs">닉네임을 입력해주세요.</p>}
    </div>
  );
}
