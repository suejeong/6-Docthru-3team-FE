"use client";
import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import NextjsChip from "@/components/chip/chipType/NextjsChip";
import ApiChip from "@/components/chip/chipType/ApiChip";
import CareerChip from "@/components/chip/chipType/CareerChip";
import ModernJSChip from "@/components/chip/chipType/ModernjsChip";
import WebChip from "@/components/chip/chipType/WebChip";
import BlogChip from "@/components/chip/chipCategory/BlogChip";
import OfficialDocChip from "@/components/chip/chipCategory/OfficialDocChip";
import Menu from "./Menu";
import { useAuth } from "@/providers/AuthProvider";
import { getWorkDetailAction, deleteWorkAction } from "@/lib/actions/work";
import DeclineModal from "@/components/modal/DeclineModal";
import { deleteChallengeAction } from "@/lib/actions/admin";

const categoryComponentMap = {
  "Next.js": NextjsChip,
  API: ApiChip,
  Career: CareerChip,
  "Modern JS": ModernJSChip,
  Web: WebChip
};

const docTypeComponentMap = {
  블로그: BlogChip,
  공식문서: OfficialDocChip
};

export default function Header() {
  const { challengeId, workId } = useParams();
  const [challenge, setChallenge] = useState(null);
  const [work, setWork] = useState(null);
  const [isDeclineModalOpen, setIsDeclineModalOpen] = useState(false);
  const { user } = useAuth();
  const router = useRouter();

  const isAdmin = user?.role === "ADMIN";
  const isAuthor = work?.author?.authorId === user?.id;

  useEffect(() => {
    const fetchChallenge = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/challenges/${challengeId}`);
        if (!res.ok) throw new Error("챌린지 불러오기 실패");
        const { data } = await res.json();
        setChallenge(data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchChallenge();
  }, [challengeId]);

  // 작업물 조회 (Server Action 활용)
  useEffect(() => {
    const fetchWork = async () => {
      try {
        const result = await getWorkDetailAction(challengeId, workId);
        if (result?.data) {
          setWork(result.data);
        } else {
          throw new Error("작업물 정보를 불러오지 못했습니다.");
        }
      } catch (error) {
        console.error(error.message);
      }
    };
    if (workId) fetchWork();
  }, [workId]);

  // 수정
  const handleEdit = () => {
    router.push(`/challenges/${challengeId}/work/${workId}/form`);
  };

  // 삭제 (Server Action 활용)
  const handleDelete = async () => {
    try {
      await deleteWorkAction(workId);
      // 삭제 성공 시, 해당 챌린지 페이지로 이동
      router.push(`/challenges/${challengeId}`);
    } catch (error) {
      console.error("작업물 삭제 에러:", error.message);
      alert(error.message || "작업물 삭제에 실패했습니다.");
    }
  };

  const handleAdminDelete = () => {
    setIsDeclineModalOpen(true);
  };

  const handleCloseDeclineModal = () => {
    setIsDeclineModalOpen(false);
  };

  const handleConfirmDelete = async (adminMessage) => {
    try {
      await deleteChallengeAction(challengeId, adminMessage);
      // 삭제 성공 시, 해당 챌린지 페이지로 이동
      router.push(`/challenges/${challengeId}`);
    } catch (error) {
      console.error("챌린지 삭제 실패:", error);
      alert("챌린지 삭제에 실패했습니다: " + error.message);
    }
  };

  return (
    <div>
      <div className="mt-10 flex justify-between">
        <div className="mb-4 text-xl font-semibold text-gray-800 md:text-2xl">{challenge?.title || "Loading..."}</div>
        {isAuthor && <Menu onEdit={handleEdit} onDelete={handleDelete} />}
        {isAdmin && <Menu onEdit={handleEdit} onDelete={handleAdminDelete} />}
      </div>
      <div className="flex items-center gap-2">
        {/* 카테고리 칩 */}
        {challenge?.category &&
          categoryComponentMap[challenge.category] &&
          React.createElement(categoryComponentMap[challenge.category])}

        {/* 문서 타입 칩 */}
        {challenge?.docType &&
          docTypeComponentMap[challenge.docType] &&
          React.createElement(docTypeComponentMap[challenge.docType])}
      </div>
      {isDeclineModalOpen && (
        <DeclineModal text="삭제" onClose={handleCloseDeclineModal} onConfirm={handleConfirmDelete} />
      )}
    </div>
  );
}
