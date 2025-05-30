import React from "react";
import Image from "next/image";
import clock from "@/assets/icon/ic_clock.svg";
import callengers from "@/assets/icon/ic_person.svg";
import { formatDeadline } from "@/lib/utils/formatDate";

export default function ChallengeInfo({ deadline, participants, maxParticipant, className, adminStatus }) {
  return (
    <div className={`flex w-full items-center gap-1 text-[13px] font-normal text-gray-600 ${className}`}>
      <Image src={clock} alt="시계 아이콘" width={24} height={24} />
      {formatDeadline(deadline)} 마감
      <Image src={callengers} alt="참가자 아이콘" width={24} height={24} />
      {adminStatus === "ACCEPTED" ? `${participants}/${maxParticipant}` : `${maxParticipant}명`}
    </div>
  );
}
