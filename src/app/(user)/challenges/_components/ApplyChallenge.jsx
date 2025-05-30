"use client";

import React from "react";
import Image from "next/image";
import plus from "@/assets/icon/ic_plus.svg";
import { useRouter } from "next/navigation";

function ApplyChallenge() {
  const router = useRouter();

  const handleclickApplyChallenge = () => {
    router.push("/challenges/create");
  };

  return (
    <button
      className="font-pretendard flex h-[40px] w-[154px] flex-row items-center justify-center gap-[8px] rounded-[19px] bg-[var(--color-gray-800)] text-[16px] font-semibold text-[#FFFFFF]"
      onClick={handleclickApplyChallenge}
    >
      신규 챌린지 신청
      <Image src={plus} alt="plus icon" />
    </button>
  );
}

export default ApplyChallenge;
