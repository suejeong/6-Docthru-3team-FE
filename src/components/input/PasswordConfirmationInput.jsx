import React, { useState } from "react";
import EyeIcon from "@/assets/icon/ic_eye_on.svg";
import EyeOffIcon from "@/assets/icon/ic_eye_off.svg";

export default function PasswordConfirmationInput({ value, onChange, error }) {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="flex w-full max-w-[343px] flex-col md:max-w-[518px]">
      <label htmlFor="passwordConfirmation" className="mb-2 text-sm font-medium text-gray-900">
        비밀번호 확인
      </label>

      <div className="relative">
        <input
          type={showPassword ? "text" : "password"}
          id="passwordConfirmation"
          value={value}
          onChange={onChange}
          placeholder="비밀번호를 한번 더 입력해 주세요"
          className={`h-12 w-full rounded-[12px] border bg-white px-3 py-2 pr-10 text-sm outline-none ${
            error ? "border-error" : "border-gray-200"
          }`}
        />
        <button
          type="button"
          onClick={() => setShowPassword((prev) => !prev)}
          className="absolute top-1/2 right-3 -translate-y-1/2"
          aria-label="비밀번호 확인 보기 토글"
        >
          <img src={showPassword ? EyeIcon.src : EyeOffIcon.src} alt="비밀번호 보기 아이콘" className="h-5 w-5" />
        </button>
      </div>

      {error && <p className="text-error mt-2 text-xs">비밀번호가 일치하지 않습니다.</p>}
    </div>
  );
}
