"use client";
import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import NextjsChip from "@/components/chip/chipType/NextjsChip";
import ApiChip from "@/components/chip/chipType/ApiChip";
import CareerChip from "@/components/chip/chipType/CareerChip";
import ModernJSChip from "@/components/chip/chipType/ModernjsChip";
import WebChip from "@/components/chip/chipType/WebChip";
import BlogChip from "@/components/chip/chipCategory/BlogChip";
import OfficialDocChip from "@/components/chip/chipCategory/OfficialDocChip";
import Menu from "./Menu";
import { useAuth } from "@/providers/AuthProvider";
import { useRouter } from "next/navigation";

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
  const params = useParams();
  const challengeId = params.challengeId;
  const workId = params.workId;
  const [challenge, setChallenge] = useState(null);
  const [work, setWork] = useState(null);
  const { user } = useAuth();
  const router = useRouter();

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

  useEffect(() => {
    const fetchWork = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/works/${workId}`, {
          credentials: "include"
        });
        if (!res.ok) throw new Error("작업 불러오기 실패");
        const { data } = await res.json();
        setWork(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchWork();
  }, [workId]);

  const isAuthor = work?.authorId === user;

  // 수정
  const handleEdit = () => {
    router.push(`/challenges/${challengeId}/work/${workId}/form`);
  };

  // 삭제
  const handleDelete = async () => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/works/${workId}`, {
        method: "DELETE",
        credentials: "include"
      });

      if (res.ok) {
        // 삭제 성공 시, 해당 첼린지 페이지로 이동
        router.push(`/challenges/${challengeId}`);
      }
    } catch (error) {
      console.error("작업물 삭제 에러:", error);
    }
  };

  return (
    <div>
      <div className="flex justify-between">
        <div className="mb-4 text-xl font-semibold text-gray-800 md:text-2xl">{challenge?.title || "Loading..."}</div>
        {isAuthor && <Menu onEdit={handleEdit} onDelete={handleDelete} />}
      </div>
      <div className="flex items-center gap-2">
        {/*카테고리 칩*/}
        {challenge?.category &&
          categoryComponentMap[challenge.category] &&
          React.createElement(categoryComponentMap[challenge.category])}

        {/*문서 타입 칩*/}
        {challenge?.docType &&
          docTypeComponentMap[challenge.docType] &&
          React.createElement(docTypeComponentMap[challenge.docType])}
      </div>
    </div>
  );
}
