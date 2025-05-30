"use client";

import React, { useState } from "react";
import Image from "next/image";
import activeHeartIcon from "@/assets/icon/ic_active_heart.svg";
import userIcon from "@/assets/img/profile_member.svg";
import bestIcon from "@/assets/icon/ic_medal.svg";
import nextBtn from "@/assets/btn/btn_right.svg";
import arrowDown from "@/assets/icon/ic_arrow_down.svg";
import arrowUp from "@/assets/icon/ic_arrow_up.svg";
import dayjs from "dayjs";

export default function TopRecommendedWork({ rankingData }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [expandedIndexes, setExpandedIndexes] = useState({});

  if (!rankingData || rankingData.length === 0) return null;

  const maxLikes = Math.max(...rankingData.map((w) => w.likeCount));
  const topWorks = rankingData.filter((w) => w.likeCount === maxLikes);
  const isSingle = topWorks.length === 1;

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % topWorks.length);
  };

  const toggleExpand = (index) => {
    setExpandedIndexes((prev) => ({
      ...prev,
      [index]: !prev[index]
    }));
  };

  return (
    <section className="relative w-full max-w-6xl">
      <div
        className="flex items-start transition-transform duration-500 ease-in-out"
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {topWorks.map((work, index) => {
          const isCurrent = index === currentIndex;
          const isExpanded = !!expandedIndexes[index];

          return (
            <div
              key={work.workId}
              className={`relative ${isSingle ? "mr-0 w-full" : "mr-4 max-w-[95%] min-w-full"} min-h-[324px] w-full shrink-0 rounded-[16px] border-2 border-gray-200 bg-gray-50 shadow-sm transition-all duration-300 ${
                isCurrent || isSingle ? "opacity-100" : "opacity-30"
              }`}
            >
              <div className="absolute top-0 left-0 z-10 flex items-center gap-1 rounded-tl-[16px] rounded-br-[16px] bg-black px-5 py-2 text-sm font-semibold text-white">
                <Image src={bestIcon} alt="메달" width={20} height={20} />
                최다 추천 번역
              </div>

              <div className="m-3 flex items-center justify-between pt-10">
                <div className="flex items-center gap-3 px-6">
                  <Image src={userIcon} alt="작성자" width={24} height={24} className="rounded-full" />
                  <span className="text-sm font-medium text-gray-800">{work.author.authorNickname}</span>
                  <span className="text-xs text-gray-500">
                    {work.author.grade === "EXPERT" ? "전문가" : work.author.grade === "NORMAL" ? "일반" : "미정"}
                  </span>
                  <div className="ml-2 flex items-center gap-1 text-sm text-gray-600">
                    <Image src={activeHeartIcon} alt="좋아요" width={16} height={16} />
                    {work.likeCount}
                  </div>
                </div>
                <span className="px-6 text-xs text-gray-400">{dayjs(work.createdAt).format("YYYY/MM/DD HH:mm")}</span>
              </div>

              <div className="px-6">
                <hr className="mb-2 border-t border-gray-300" />
                <p
                  className={`pb-2 text-sm leading-relaxed whitespace-pre-line text-gray-700 ${
                    !isExpanded ? "line-clamp-5" : ""
                  }`}
                >
                  {work.content}
                </p>

                {work.content.length > 100 && isCurrent && (
                  <div className="mt-4 flex justify-center bg-transparent pb-6">
                    <button
                      onClick={() => toggleExpand(index)}
                      className="flex items-center gap-1 text-sm text-gray-600 hover:underline"
                    >
                      <span>{isExpanded ? "접기" : "더보기"}</span>
                      <Image
                        src={isExpanded ? arrowUp : arrowDown}
                        alt={isExpanded ? "접기" : "더보기"}
                        width={20}
                        height={20}
                      />
                    </button>
                  </div>
                )}
              </div>

              {!isSingle && isCurrent && (
                <div className="absolute top-1/2 -right-6 z-20 -translate-y-1/2">
                  <button onClick={handleNext}>
                    <Image src={nextBtn} alt="다음 번역 보기" width={32} height={32} />
                  </button>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}
