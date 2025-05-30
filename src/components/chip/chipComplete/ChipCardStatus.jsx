import React from "react";
import Image from "next/image";
import personIcon from "@/assets/icon/ic_person_white.svg";
import clockIcon from "@/assets/icon/ic_clock.svg";

function ChipCardStatus({ status }) {
  const statusStyleMap = {
    closed: {
      bg: "bg-gray-200",
      text: "text-gray-800",
      label: "모집이 완료된 상태에요",
      icon: personIcon,
    },
    expired: {
      bg: "bg-gray-800",
      text: "text-white",
      label: "챌린지가 마감되었어요",
      icon: clockIcon,
    },
  };

  const style = statusStyleMap[status];
  if (!style) return null;

  return (
    <div
      className={`flex w-fit items-center gap-[6px] rounded-full px-4 py-1 text-sm font-medium ${style.bg} ${style.text}`}
    >
      <Image src={style.icon} alt="상태 아이콘" width={16} height={16} />
      <span>{style.label}</span>
    </div>
  );
}

export default ChipCardStatus;
