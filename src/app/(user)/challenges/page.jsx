"use client";

import Sort from "@/components/sort/Sort";
import ApplyChallenge from "./_components/ApplyChallenge";
import SearchInput from "@/components/input/SearchInput";
import ChallengeCard from "@/components/card/Card";
import FilterModal from "@/components/modal/FilterModal";
import Pagination from "@/components/pagination/Pagination";
import { useEffect, useState } from "react";
import useChallenges from "@/hooks/useChallengeList";
import { useAuth } from "@/providers/AuthProvider";
import { useRouter } from "next/navigation";

function Page() {
  const [shouldFetch, setShouldFetch] = useState(false);
  const { user, isLoading: authLoading } = useAuth(); // authLoading 추가

  useEffect(() => {
    if (!authLoading && user) {
      setShouldFetch(true); // 로그인 상태 확인 후에만 데이터 패칭
    }
  }, [user, authLoading]);

  const [isModal, setIsModal] = useState(false);
  const router = useRouter();

  //현재 사용자가 일반유저인지, 관리자인지 확인
  const isAdmin = user?.role === "ADMIN";

  const {
    challenges,
    totalCount,
    page,
    pageSize,
    keyword,
    filters,
    filterCount,
    isLoading,
    error,
    setPage,
    setKeyword,
    applyFilters
  } = useChallenges(); // 훅 내부에서 enabled로 조건 제어

  const handleClickFilter = () => {
    setIsModal(true);
  };

  const handleClickCard = (challengeId) => {
    router.push(`/challenges/${challengeId}`);
  };

  const handleApplyFilters = (newFilters) => {
    applyFilters(newFilters);
    setIsModal(false);
  };

  return (
    <div className="mx-[16px] mt-[16px] mb-[65px] [@media(min-width:1200px)]:mx-[462px]">
      <div className="font-pretendard flex flex-row items-center justify-between text-[20px] font-semibold">
        챌린지 목록 <ApplyChallenge />
      </div>

      <div className="mt-[16px] flex flex-row gap-[8px]">
        <div className="flex-[1]">
          <Sort onClick={handleClickFilter} isFiltered={filterCount > 0} count={filterCount} />
          {isModal && (
            <FilterModal
              onApply={handleApplyFilters}
              onClose={() => setIsModal(false)}
              initialFields={filters.categories}
              initialDocType={filters.docType}
              initialStatus={filters.status}
            />
          )}
        </div>
        <div className="flex-[2.5]">
          <SearchInput text={"text-[14px]"} value={keyword} onChange={(e) => setKeyword(e.target.value)} />
        </div>
      </div>

      <div className="flex flex-col gap-[24px] py-[24px]">
        {isLoading ? (
          <div className="font-pretendard flex h-full w-full flex-col items-center justify-center text-[16px] font-medium text-[var(--color-gray-500)]">
            챌린지 목록을 불러오는 중...
          </div>
        ) : error ? (
          <div className="text-red-500">{error}</div>
        ) : challenges.length > 0 ? (
          challenges.map((challenge) => (
            <div key={challenge.id}>
              <ChallengeCard
                onClick={() => handleClickCard(challenge.id)}
                title={challenge.title}
                type={challenge.docType}
                category={challenge.category}
                deadline={challenge.deadline}
                participants={challenge.participants.length}
                maxParticipant={challenge.maxParticipant}
                // status={challenge.status}
                isAdmin={isAdmin}
              />
            </div>
          ))
        ) : (
          <div className="font-pretendard flex h-full w-full flex-col items-center justify-center text-[16px] font-medium text-[var(--color-gray-500)]">
            <div>아직 챌린지가 없어요.</div>
            <div>지금 바로 챌린지를 신청해보세요!</div>
          </div>
        )}
      </div>

      <Pagination
        totalCount={totalCount}
        currentPage={page}
        pageSize={pageSize}
        onPageChange={(newPage) => setPage(newPage)}
      />
    </div>
  );
}

export default Page;
