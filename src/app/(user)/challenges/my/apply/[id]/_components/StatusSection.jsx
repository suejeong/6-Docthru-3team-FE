import { formatInvalidatedAt } from "@/lib/utils/formatDate";
import React from "react";

const commonStyle =
  "flex justify-center items-center w-full h-[35px] mt-4 md:mt-6 rounded-[17.5px] text-sm font-semibold md:text-base";
const statusMap = {
  PENDING: {
    style: "bg-[#FFFDE7] text-[#F2BC00]",
    message: "승인 대기 중입니다."
  },
  REJECTED: {
    style: "bg-[#FFF0F0] text-[#E54946]",
    message: "신청이 거절된 챌린지입니다.",
    text: "신청 거절 사유"
  },
  DELETED: {
    style: "bg-gray-500 text-gray-50",
    message: "삭제된 챌린지입니다.",
    text: "삭제 사유"
  },
  ACCEPTED: {
    style: "bg-[#DFF0FF] text-[#4095DE]",
    message: "신청이 승인된 챌린지입니다."
  }
};

export default function StatusSection({ application }) {
  const { adminStatus, adminMessage, invalidatedAt } = application || {};
  const { style, message, text } = statusMap[adminStatus] || {};

  return (
    <section>
      <div className={`${commonStyle} ${style}`}>{message}</div>
      {(adminStatus === "DELETED" || adminStatus === "REJECTED") && (
        <div className="mt-4 flex h-[149px] w-full flex-col justify-center gap-4 rounded-2xl border border-gray-200 bg-gray-50 p-4">
          <div className="flex flex-col items-center gap-3">
            <span className="text-sm font-semibold text-gray-800">{text}</span>
            <p className="text-sm font-medium md:text-base">{adminMessage}</p>
          </div>
          <div className="flex items-center justify-end text-sm font-normal">
            <span className="text-gray-700">독스루 운영진</span>
            <span className="mx-2 flex h-4 flex-col border border-gray-200"></span>
            <span className="text-gray-500">{formatInvalidatedAt(invalidatedAt)}</span>
          </div>
        </div>
      )}
    </section>
  );
}
