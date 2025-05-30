"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { useParams } from "next/navigation";
import { getChallengeDetail } from "@/lib/api/challengeDetail";
import { getRankingAction } from "@/lib/actions/user";
import dayjs from "dayjs";
import ChallengeCard from "@/components/card/Card";
import ChallengeContainer from "../_components/ChallengeContainer";
import RankingListItem from "@/components/list/RankingListItem";
import userIcon from "@/assets/img/profile_member.svg";
import arrowRight from "@/assets/icon/ic_arrow_right.svg";
import arrowLeft from "@/assets/icon/ic_arrow_left.svg";
import TopRecommendedWork from "@/app/(user)/challenges/_components/TopRecommendedWork";
import { createWorkAction } from "@/lib/actions/work";
import { useRouter } from "next/navigation";
import { assignRankingWithTies } from "@/lib/utils/assignRank";

function useIsTablet() {
  const [isTablet, setIsTablet] = useState(false);
  useEffect(() => {
    const checkWidth = () => setIsTablet(window.innerWidth >= 768);
    checkWidth();
    window.addEventListener("resize", checkWidth);
    return () => window.removeEventListener("resize", checkWidth);
  }, []);
  return isTablet;
}

export default function ChallengeDetailPage() {
  const isTablet = useIsTablet();
  const { challengeId } = useParams();

  const [challenge, setChallenge] = useState(null);
  const [rankingData, setRankingData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);

  const itemsPerPage = 5;
  const totalPages = Math.ceil(rankingData.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const sortedData = [...rankingData].sort((a, b) => b.likeCount - a.likeCount);
  const rankedData = assignRankingWithTies(sortedData);
  const currentItems = rankedData.slice(startIndex, startIndex + itemsPerPage);

  const router = useRouter();

  const handleChallenge = async () => {
    try {
      const data = await createWorkAction(challengeId);
      const workId = data.data.id;
      router.push(`/challenges/${challenge.id}/work/${workId}/form`);
    } catch (err) {
      console.error("작업 생성 실패:", err);
      alert("작업 생성에 실패했습니다.");
    }
  };

  useEffect(() => {
    if (!challengeId) return;

    getChallengeDetail(challengeId)
      .then(setChallenge)
      .catch((err) => setError(err.message));

    (async () => {
      try {
        const works = await getRankingAction(challengeId);
        setRankingData(works);
      } catch (err) {
        console.error("랭킹 데이터 요청 실패:", err);
        setError("랭킹 정보를 불러오지 못했습니다.");
      } finally {
        setLoading(false);
      }
    })();
  }, [challengeId]);

  if (loading) return <main className="p-10 text-center">불러오는 중...</main>;
  if (error) return <main className="p-10 text-center text-red-500">{error}</main>;
  if (!challenge) return <main className="p-10 text-center">챌린지를 찾을 수 없습니다.</main>;

  const now = dayjs();
  const deadline = dayjs(challenge.deadline);
  const participantCount = challenge.participants?.length || 0;

  let challengeStatus = undefined;
  if (now.isAfter(deadline)) {
    challengeStatus = "expired";
  } else if (participantCount >= challenge.maxParticipant) {
    challengeStatus = "closed";
  }

  return (
    <main className="mb-40 flex flex-col items-center bg-white">
      <section className="flex w-full max-w-6xl flex-col gap-4 md:flex-row md:items-start md:justify-center md:gap-6">
        <div className="flex w-full flex-col gap-2 md:w-2/3">
          {/* 🔥 status props 전달 */}
          <ChallengeCard {...challenge} variant="simple" status={challengeStatus} />

          <section className="px-1 text-gray-800 sm:px-2 md:px-4">
            <p className="text-sm leading-[1.3] whitespace-pre-line md:text-base">{challenge.description}</p>
          </section>

          <section className="flex items-center gap-2 px-4">
            <Image src={userIcon} alt="작성자 프로필" width={32} height={32} className="rounded-full" />
            <span className="text-sm font-medium text-gray-700">{challenge.user?.nickname || "작성자 없음"}</span>
          </section>
        </div>

        <div className="w-full md:w-1/3">
          <ChallengeContainer
            height="h-auto"
            type={isTablet ? "" : "slim"}
            deadline={dayjs(challenge.deadline).format("YYYY년 M월 D일")}
            currentCount={challenge.participants?.length || 0}
            maxCount={challenge.maxParticipant}
            originalUrl={challenge.originalUrl}
            onChallenge={handleChallenge}
            status={challengeStatus}
          />
        </div>
      </section>

      <div className="mt-6" />
      {challengeStatus === "expired" && <TopRecommendedWork rankingData={rankingData} />}

      <section className="mt-6 w-full max-w-6xl rounded-xl border-2 border-gray-800 bg-white">
        <div className="flex items-center justify-between px-4 py-3">
          <h3 className="text-base font-semibold text-gray-800 md:text-lg">참여현황</h3>
          {rankingData.length > 0 && (
            <div className="flex items-center gap-2 text-sm md:text-base">
              <span className="font-semibold text-[var(--color-brand-yellow)]">{currentPage}</span>
              <span className="text-gray-800">/ {totalPages}</span>
              <button onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))} disabled={currentPage === 1}>
                <Image
                  src={arrowLeft}
                  alt="이전"
                  width={20}
                  height={20}
                  className={currentPage === 1 ? "opacity-30" : ""}
                />
              </button>
              <button
                onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
                disabled={currentPage === totalPages}
              >
                <Image
                  src={arrowRight}
                  alt="다음"
                  width={20}
                  height={20}
                  className={currentPage === totalPages ? "opacity-30" : ""}
                />
              </button>
            </div>
          )}
        </div>

        <div className="px-4">
          {currentItems.length > 0 ? (
            (() => {
              const seenRanks = new Set();

              return currentItems.map((item) => {
                const isFirstOfRank = !seenRanks.has(item.rank);
                seenRanks.add(item.rank);

                return (
                  <RankingListItem
                    key={item.workId}
                    item={{
                      rank: item.rank,
                      userName: item.author.authorNickname,
                      userRole:
                        item.author.grade === "EXPERT" ? "전문가" : item.author.grade === "NORMAL" ? "일반" : "미정",
                      likes: item.likeCount,
                      isLiked: true,
                      workId: item.workId,
                      challengeId: challenge.id
                    }}
                    highlight={isFirstOfRank}
                  />
                );
              });
            })()
          ) : (
            <p className="min-h-30 py-4 text-center text-gray-500">
              아직 참여한 도전자가 없어요,
              <br />
              지금 바로 도전해보세요!
            </p>
          )}
        </div>
      </section>
    </main>
  );
}
