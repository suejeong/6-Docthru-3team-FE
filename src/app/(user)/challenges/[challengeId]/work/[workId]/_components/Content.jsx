"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import inactiveHeart from "@/assets/icon/ic_inactive_heart.svg";
import activeHeart from "@/assets/icon/ic_active_heart.svg";
import profile from "@/assets/img/profile_member.svg";
import adminProfile from "@/assets/img/profile_admin.svg";
import empty from "@/assets/img/empty.svg";
import { getWorkDetailAction, createWorkLikeAction, deleteWorkLikeAction } from "@/lib/actions/work";

export default function Content() {
  const { challengeId, workId } = useParams();
  const [work, setWork] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // 작업물 조회
  const fetchWork = async () => {
    setIsLoading(true);
    try {
      const result = await getWorkDetailAction(challengeId, workId);
      if (result?.data) {
        setWork(result.data);
      } else {
        throw new Error("작업물 정보를 불러오지 못했습니다.");
      }
    } catch (error) {
      console.error(error);
      alert(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  // 좋아요 토글 핸들러
  const handleLikeToggle = async () => {
    try {
      if (work?.isLiked) {
        await deleteWorkLikeAction(workId);
      } else {
        await createWorkLikeAction(workId);
      }
      await fetchWork(); // 상태 갱신
    } catch (error) {
      console.error("좋아요 처리 실패:", error);
      alert(error.message || "좋아요 처리 중 오류가 발생했습니다.");
    }
  };

  // 날짜 포맷팅
  const formatDate = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return `${date.getFullYear()}.${String(date.getMonth() + 1).padStart(2, "0")}.${String(date.getDate()).padStart(
      2,
      "0"
    )}`;
  };

  useEffect(() => {
    if (workId) fetchWork();
  }, [workId]);

  if (isLoading) {
    return (
      <div className="flex h-40 items-center justify-center">
        <div className="h-12 w-12 animate-spin rounded-full border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div>
      <div className="my-4 flex h-12 items-center justify-between border-y border-gray-200 py-3">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <Image
              src={work?.author?.authorRole === "ADMIN" ? adminProfile : profile}
              width={24}
              height={24}
              alt="profile"
            />
            <div className="text-xs font-medium text-gray-800">{work?.author?.authorNickname || "닉네임"}</div>
          </div>
          <div className="flex items-center gap-1 text-sm font-medium text-gray-500">
            <button onClick={handleLikeToggle}>
              <Image
                src={work?.isLiked ? activeHeart : inactiveHeart}
                width={16}
                height={16}
                alt={work?.isLiked ? "active_heart" : "inactive_heart"}
              />
            </button>
            {work?.likeCount || 0}
          </div>
        </div>
        <div className="text-sm font-medium text-gray-500">{work?.createdAt ? formatDate(work.createdAt) : "날짜"}</div>
      </div>
      <div className="mb-6 border-b border-gray-200 pb-10">
        {work?.content || (
          <div className="flex flex-col items-center justify-center gap-4 py-30 text-base text-gray-900">
            <Image src={empty} width={320} height={168} alt="empty" />
            아직 아무런 번역을 진행하지 않았어요!
          </div>
        )}
      </div>
    </div>
  );
}
