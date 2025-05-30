"use client";

import dropdownIcon from "@/assets/icon/ic_menu.svg";
import Image from "next/image";
import React, { useState } from "react";
import CancelDropdown from "@/components/dropDown/list/CancelDropdown";
import { categoryChipMap, typeChipMap } from "@/components/chip/chipMaps";
import { useAuth } from "@/providers/AuthProvider";
import ConfirmActionModal from "@/components/modal/ConfirmActionModal";

export default function ChallengeContent({ title, description, category, docType, adminStatus }) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isModalOpen, setisModalOpen] = useState(false);
  const { user } = useAuth();

  return (
    <article className="flex w-full flex-col gap-4">
      <div className="relative flex justify-between">
        <h2 className="text-xl font-semibold text-gray-800 md:text-2xl">{title}</h2>
        {adminStatus === "PENDING" && user?.role === "USER" && (
          <button onClick={() => setIsDropdownOpen((prev) => !prev)}>
            <Image src={dropdownIcon} alt="드롭다운" width={24} height={24} />
            {isDropdownOpen && (
              <CancelDropdown onClick={() => setisModalOpen(true)} className="absolute right-0 mt-3" />
            )}
          </button>
        )}
        {/* TODO: ConfirmActionModal - onConfirm 핸들러 추가 */}
        {isModalOpen && (
          <ConfirmActionModal text="정말 취소하시겠어요?" onClose={() => setisModalOpen(false)} isLoggedIn={true} />
        )}
      </div>
      <div className="mt-2 flex flex-wrap gap-2">
        {categoryChipMap[category] ?? null}
        {typeChipMap[docType] ?? null}
      </div>
      <p className="text-sm font-medium text-gray-700 md:text-base">{description}</p>
    </article>
  );
}
