"use client";

import React, { useCallback, useEffect } from "react";
import SearchInput from "@/components/input/SearchInput";
import ChallengeCard from "@/components/card/Card";
import useChallenges from "@/hooks/useChallengeList";

export default function Mychallenges({myChallengeStatus}) {
  console.log("🧩 Mychallenges 컴포넌트 렌더", myChallengeStatus);
  
  const {
    challenges,
    totalCount,
    page,
    pageSize,
    keyword,
    isLoading,
    error,
    setPage,
    setKeyword,
  } = useChallenges(myChallengeStatus);


  const handleScroll = useCallback(() => {
    if (
      window.innerHeight + window.scrollY >=
      document.body.offsetHeight - 300 // 바닥에서 300px 근처면
    ) {
      if (!isLoading && challenges.length < totalCount) {
        setPage((prev) => prev + 1);
      }
    }
  }, [isLoading, challenges.length, totalCount, setPage]);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  return (
    <>
      <SearchInput text={"text-[14px]"} value={keyword} onChange={(e) => setKeyword(e.target.value)} />
      <div className="flex flex-col gap-[24px] py-[24px]">
        {isLoading ? (
          <div className="flex h-full w-full items-center justify-center text-sm text-gray-500">
            챌린지 목록을 불러오는 중...
          </div>
        ) : error ? (
          <div className="text-red-500">{error}</div>
        ) : challenges.length > 0 ? (
          challenges.map((challenge) => (
            <ChallengeCard
              key={challenge.id}
              title={challenge.title}
              type={challenge.docType}
              category={challenge.category}
              deadline={challenge.deadline}
              participants={challenge.participants.length}
              maxParticipant={challenge.maxParticipant}
            />
          ))
        ) : (
          <div className="flex h-full w-full items-center justify-center text-sm text-gray-500">
            챌린지가 존재하지 않습니다.
          </div>
        )}
      </div>

      {/* <Pagination
        totalCount={totalCount}
        currentPage={page}
        pageSize={pageSize}
        onPageChange={(newPage) => setPage(newPage)}
      /> */}
    </>
  );
}
