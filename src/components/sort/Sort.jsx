import Image from "next/image";
import React from "react";
import toggleDownIcon from "@/assets/icon/ic_toggle_down.svg";
import filterIcon from "@/assets/icon/ic_filter.svg";
import filterWhiteIcon from "@/assets/icon/ic_filter_white.svg";

export default function Sort({ isAdminStatus, isFiltered, count, label, onClick }) {
  const iconSrc = isAdminStatus ? toggleDownIcon : isFiltered ? filterWhiteIcon : filterIcon;

  const containerClass = [
    "flex w-full h-10 items-center justify-between gap-2 rounded-4xl border border-gray-300 px-3 py-2",
    isAdminStatus && "pr-2",
    isFiltered && "bg-gray-800"
  ]
    .filter(Boolean)
    .join(" ");

  const textClass = isFiltered ? "text-gray-50" : "text-gray-400";

  const imageClass = isAdminStatus ? "h-6 w-6" : "";

  return (
    <button className={containerClass} onClick={onClick}>
      <div className={`${textClass} flex w-full flex-row max-sm:text-sm`}>
        <div>{isAdminStatus ? label : "필터"}</div>
        <div>{count ? `(${count})` : ""}</div>
      </div>
      <Image src={iconSrc} width={16} height={16} alt="아이콘" className={imageClass} />
    </button>
  );
}
