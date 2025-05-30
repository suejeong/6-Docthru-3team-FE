"use client";

import React from "react";
import icToggleDown from "../../../assets/icon/ic_toggle_down.svg";
import icToggleUp from "../../../assets/icon/ic_toggle_up.svg";
import Image from "next/image";

export default function CategoryClosed({ isOpen, onClick, label }) {
  return (
    <div
      onClick={onClick}
      className="mt-[8px] flex h-14 items-center justify-between rounded border-1 border-[#E5E5E5] px-[20px]"
    >
      <span className="text-[16px] text-[#A3A3A3]">{label}</span>
      <Image src={isOpen ? icToggleUp : icToggleDown} alt="Toggle Icon" width={24} height={24} />
    </div>
  );
}
