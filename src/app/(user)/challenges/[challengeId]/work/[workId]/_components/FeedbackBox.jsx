"use client";
import React, { useEffect, useState } from "react";
import inactiveDown from "@/assets/btn/btn_down_inactive.svg";
import activeDown from "@/assets/btn/btn_down.svg";
import Image from "next/image";
import Reply from "@/components/reply/Reply";
import TextBox from "@/components/reply/TextBox";
import { useParams } from "next/navigation";
import {
  getFeedbacksAction,
  createFeedbackAction,
  updateFeedbackAction,
  deleteFeedbackAction
} from "@/lib/actions/feedback";

export default function FeedbackBox() {
  const [feedback, setFeedback] = useState("");
  const [allFeedbacks, setAllFeedbacks] = useState([]); // 전체 피드백
  const [displayedFeedbacks, setDisplayedFeedbacks] = useState([]); // 화면에 보여줄 피드백
  const [offset, setOffset] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const params = useParams();
  const workId = params.workId;

  // 피드백 목록 전체 불러오기
  const fetchFeedbackList = async () => {
    setIsLoading(true);
    try {
      const data = await getFeedbacksAction(workId);
      setAllFeedbacks(data || []);
      setHasMore(data.length > 0);
      // 처음엔 3개만 보여줌
      setDisplayedFeedbacks(data.slice(0, 3));
      setOffset(3);
    } catch (error) {
      console.error("피드백 불러오기 실패:", error.message);
      setAllFeedbacks([]);
      setDisplayedFeedbacks([]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (workId) fetchFeedbackList();
  }, [workId]);

  // 더보기 버튼 클릭
  const handleLoadMore = () => {
    const newOffset = offset + 5;
    setDisplayedFeedbacks(allFeedbacks.slice(0, newOffset));
    setOffset(newOffset);
    setHasMore(newOffset < allFeedbacks.length);
  };

  // 피드백 등록
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!feedback.trim()) return;

    try {
      await createFeedbackAction(workId, feedback);
      setFeedback("");
      await fetchFeedbackList(); // 목록 갱신
    } catch (error) {
      console.error("피드백 등록 실패:", error.message);
    }
  };

  // 피드백 수정
  const onEdit = async (feedbackId, editedContent) => {
    try {
      await updateFeedbackAction(workId, feedbackId, editedContent);
      await fetchFeedbackList(); // 목록 갱신
    } catch (error) {
      console.error("피드백 수정 실패:", error.message);
    }
  };

  // 피드백 삭제
  const onDelete = async (feedbackId) => {
    try {
      await deleteFeedbackAction(workId, feedbackId);
      await fetchFeedbackList(); // 목록 갱신
    } catch (error) {
      console.error("피드백 삭제 실패:", error.message);
    }
  };

  // 로딩 UI
  if (isLoading) {
    return (
      <div className="flex h-40 items-center justify-center">
        <div className="h-12 w-12 animate-spin rounded-full border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div>
      <form onSubmit={handleSubmit} className="flex gap-[17px]">
        <TextBox value={feedback} onChange={(e) => setFeedback(e.target.value)} onSubmit={handleSubmit} />
        <button type="submit" className="self-start" disabled={!feedback.trim()}>
          <Image
            src={feedback ? activeDown : inactiveDown}
            width={32}
            height={32}
            alt={feedback ? "active_down" : "inactive_down"}
          />
        </button>
      </form>
      {displayedFeedbacks.map((feedbackItem) => (
        <Reply
          key={feedbackItem.id}
          userName={feedbackItem.user?.nickname || "익명"}
          timestamp={feedbackItem.createdAt}
          content={feedbackItem.content}
          isAuthor={feedbackItem.isAuthor}
          onEdit={(editedContent) => onEdit(feedbackItem.id, editedContent)}
          onDelete={() => onDelete(feedbackItem.id)}
        />
      ))}
      {hasMore && allFeedbacks.length > 3 && (
        <div className="mt-2 flex justify-center">
          <button onClick={handleLoadMore} className="w-45 rounded-xl bg-gray-100 py-2 text-center hover:bg-gray-50">
            더보기
          </button>
        </div>
      )}
    </div>
  );
}
