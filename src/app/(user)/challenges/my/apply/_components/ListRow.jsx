import React from "react";
import { formatDate } from "@/lib/utils/formatDate";
import { columnSetting } from "@/constant/constant";

export default function ListRow({ data }) {
  const { challenge, ...rest } = data || {};

  return (
    <button className="flex min-h-12 w-full min-w-[670px] border-b border-gray-300 bg-white hover:bg-[#f5f5f5]">
      {columnSetting.map(({ key, className, flex, render }) => (
        <div
          key={key}
          style={{ flex }}
          className={`${className ?? ""} flex items-center px-1 text-left text-[13px] font-normal whitespace-normal text-gray-500`}
        >
          {render
            ? render(challenge, rest)
            : key === "createdAt" || key === "deadline"
              ? formatDate(challenge[key])
              : (challenge?.[key] ?? "-")}
        </div>
      ))}
    </button>
  );
}
