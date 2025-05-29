"use client";
import React, { useState } from "react";
import Image from "next/image";
import out from "@/assets/icon/ic_out.svg";

const FIELD_OPTIONS = [
  { label: "Next. js", value: "Next.js" },
  { label: "Modern JS", value: "Modern JS" },
  { label: "API", value: "API" },
  { label: "Web", value: "Web" },
  { label: "Career", value: "Career" }
];

const DOC_TYPE_OPTIONS = [
  { label: "공식문서", value: "공식문서" },
  { label: "블로그", value: "블로그" }
];

const STATUS_OPTIONS = [
  { label: "진행중", value: "open" },
  { label: "마감", value: "closed" }
];

export default function FilterModal({
  initialFields = [],
  initialDocType = "",
  initialStatus = "",
  onApply,
  onReset,
  onClose
}) {
  const [fields, setFields] = useState(initialFields);
  const [docType, setDocType] = useState(initialDocType);
  const [status, setStatus] = useState(initialStatus);

  // 체크박스 토글
  const toggleField = (value) => {
    setFields((prev) => (prev.includes(value) ? prev.filter((v) => v !== value) : [...prev, value]));
  };

  // 리셋
  const handleReset = () => {
    setFields([]);
    setDocType("");
    setStatus("");
    onReset?.();
  };

  // 적용
  const handleApply = () => {
    onApply?.({ fields, docType, status });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30">
      <div className="relative w-[343px] rounded-xl border-2 border-solid border-gray-200 bg-white py-6 shadow-xl">
        {/* 헤더 */}
        <div className="mb-4 flex items-center justify-between px-6">
          <span className="text-base font-semibold text-gray-800">필터</span>
          <button onClick={onClose} className="cursor-pointer">
            <Image src={out} width={24} height={24} alt="out" />
          </button>
        </div>

        {/* 분야 */}
        <div className="px-6 pt-3 pb-3.5">
          <div className="mb-3 text-sm font-semibold text-gray-800">분야</div>
          <div className="flex flex-col gap-2">
            {FIELD_OPTIONS.map((option) => (
              <label key={option.value} className="relative flex cursor-pointer items-center gap-2 select-none">
                <input
                  type="checkbox"
                  checked={fields.includes(option.value)}
                  onChange={() => toggleField(option.value)}
                  className="absolute top-0 left-0 h-5 w-5 cursor-pointer opacity-0"
                  aria-checked={fields.includes(option.value)}
                />
                <span
                  className={`flex h-5 w-5 items-center justify-center rounded-md border-2 transition ${
                    fields.includes(option.value) ? "border-black bg-black" : "border-gray-300 bg-white"
                  } `}
                >
                  {fields.includes(option.value) && (
                    <svg className="pointer-events-none h-3 w-3 text-white" viewBox="0 0 12 10" fill="none">
                      <path d="M1 5.5L4.5 9L11 1" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                    </svg>
                  )}
                </span>
                <span className="text-sm text-gray-800">{option.label}</span>
              </label>
            ))}
          </div>
        </div>

        {/* 문서 타입 */}
        <div className="border-y-1 border-solid border-gray-200 px-6 py-3">
          <div className="mb-3 text-sm font-semibold text-gray-800">문서 타입</div>
          <div className="flex flex-col gap-2">
            {DOC_TYPE_OPTIONS.map((option) => (
              <label key={option.value} className="relative flex cursor-pointer items-center gap-2 select-none">
                <input
                  type="radio"
                  name="docType"
                  checked={docType === option.value}
                  onChange={() => setDocType(option.value)}
                  className="absolute top-0 left-0 h-5 w-5 cursor-pointer opacity-0"
                  aria-checked={docType === option.value}
                />
                <span
                  className={`flex h-5 w-5 items-center justify-center rounded-full border-2 transition ${
                    docType === option.value ? "border-black bg-black" : "border-gray-300 bg-white"
                  } `}
                >
                  {docType === option.value && <span className="block h-2.5 w-2.5 rounded-full bg-white" />}
                </span>
                <span className="text-sm text-gray-800">{option.label}</span>
              </label>
            ))}
          </div>
        </div>

        {/* 상태 */}
        <div className="mb-3 px-6 py-3">
          <div className="mb-3 text-sm font-semibold text-gray-800">상태</div>
          <div className="flex flex-col gap-2">
            {STATUS_OPTIONS.map((option) => (
              <label key={option.value} className="relative flex cursor-pointer items-center gap-2 select-none">
                <input
                  type="radio"
                  name="status"
                  checked={status === option.value}
                  onChange={() => setStatus(option.value)}
                  className="absolute top-0 left-0 h-5 w-5 cursor-pointer opacity-0"
                  aria-checked={status === option.value}
                />
                <span
                  className={`flex h-5 w-5 items-center justify-center rounded-full border-2 transition ${
                    status === option.value ? "border-black bg-black" : "border-gray-300 bg-white"
                  } `}
                >
                  {status === option.value && <span className="block h-2.5 w-2.5 rounded-full bg-white" />}
                </span>
                <span className="text-sm text-gray-800">{option.label}</span>
              </label>
            ))}
          </div>
        </div>

        {/* 버튼 */}
        <div className="flex gap-2 px-6 py-2">
          <button
            onClick={handleReset}
            className="h-10 w-[134px] cursor-pointer rounded-lg border border-gray-300 bg-white py-2 text-base font-semibold text-gray-800"
          >
            초기화
          </button>
          <button
            onClick={handleApply}
            className="h-10 w-[169px] cursor-pointer rounded-lg bg-black py-2 text-base font-semibold text-white"
          >
            적용하기
          </button>
        </div>
      </div>
    </div>
  );
}
