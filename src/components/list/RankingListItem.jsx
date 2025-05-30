"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import keyboardIcon from "@/assets/img/profile_member.svg";
import activeHeartIcon from "@/assets/icon/ic_active_heart.svg";
import crownIcon from "@/assets/icon/ic_crown.svg";
import arrowRightIcon from "@/assets/icon/ic_arrow_right.svg";

/**
 * RankingListItem 컴포넌트
 *
 * 좋아요 수 기준으로 유저를 정렬한 랭킹 리스트 항목 UI를 렌더링합니다.
 * 좋아요 버튼 클릭 기능은 제거되었으며,
 * 항상 채워진 하트 아이콘과 좋아요 수만 표시합니다.
 *
 * @param {Object} props
 * @param {{
 *   rank: number,
 *   userName: string,
 *   userRole: string,
 *   likes: number,
 *   workId?: number,
 *   challengeId?: number,
 * }} props.item - 유저 정보를 담은 객체
 */
export default function RankingListItem({ item, highlight = false }) {
  const { rank, userName, userRole, likes, workId = 0, challengeId = 0 } = item;

  return (
    <div className="flex items-center justify-between border-b border-gray-200 bg-transparent py-4">
      {/* 왼쪽: 순위 및 유저 정보 */}
      <div className="flex items-center gap-3">
        <div
          className={`flex w-[60px] items-center justify-center rounded-2xl px-3 py-1 text-[14px] font-[500] ${
            highlight ? "bg-gray-800 text-yellow-400" : "bg-gray-800 text-white"
          }`}
        >
          {rank === 1 && highlight && <Image src={crownIcon} alt="crown" width={12} height={12} className="mr-1.5" />}
          {rank.toString().padStart(2, "0")}
        </div>
        <Image src={keyboardIcon} alt="profile" width={24} height={24} className="rounded-full" />
        <div>
          <div className="text-[14px] font-medium text-gray-800">{userName}</div>
          <div className="text-[12px] text-gray-500">{userRole}</div>
        </div>
      </div>

      {/* 오른쪽: 좋아요 수 + 작업물 보기 */}
      <div className="flex w-[210px] items-center justify-between gap-4">
        <div className="flex items-center text-lg font-medium text-gray-500">
          <Image src={activeHeartIcon} alt="like" width={20} height={20} className="mr-1" />
          {likes >= 10000 ? "9999..." : likes.toLocaleString()}
        </div>

        <Link
          href={`/challenges/${challengeId}/work/${workId}`}
          className="flex items-center gap-1 text-base font-normal text-gray-800 no-underline transition-colors"
        >
          작업물 보기
          <span className="text-lg">
            <Image src={arrowRightIcon} alt="arrow-right" width={30} height={30} />
          </span>
        </Link>
      </div>
    </div>
  );
}
