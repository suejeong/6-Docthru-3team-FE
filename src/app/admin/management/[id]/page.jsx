"use client";

import StatusSection from "@/app/(user)/challenges/my/apply/[id]/_components/StatusSection";
import ChallengeSection from "@/app/(user)/challenges/my/apply/[id]/_components/ChallengeSection";
import LineDivider from "@/app/(user)/challenges/my/apply/[id]/_components/LineDivider";
import React, { useEffect, useState } from "react";
import OriginalUrlSection from "@/app/(user)/challenges/my/apply/[id]/_components/OriginalUrlSection";
import { useParams } from "next/navigation";
import { userService } from "@/lib/service/userService";
import BtnText from "@/components/btn/text/BtnText";
import DeclineModal from "@/components/modal/DeclineModal";
import { acceptChallengeAction, declineChallengeAction } from "@/lib/actions/admin";
import Image from "next/image";
import arrorLeft from "@/assets/icon/ic_arrow_left.svg";
import arrorRight from "@/assets/icon/ic_arrow_right.svg";

export default function AdminApplicationPage() {
  const params = useParams();
  const applicationId = params.id;
  const [application, setApplication] = useState(null);
  const [challenge, setChallenge] = useState(null);
  const [prevId, setPrevId] = useState(null);
  const [nextId, setNextId] = useState(null);
  const [isModalOpen, setisModalOpen] = useState(false);

  const fetchApplication = async () => {
    try {
      const data = await userService.getApplication(applicationId);
      setApplication(data?.application);
      setChallenge(data?.challenge);
      setPrevId(data?.prevApplicationId);
      setNextId(data?.nextApplicationId);
    } catch (error) {
      console.log("신청한 챌린지 상세 불러오기 실패: ", error);
    }
  };

  useEffect(() => {
    fetchApplication();
  }, []);

  const handleConfirmDecline = async (reason) => {
    if (!challenge.id) {
      console.error("challengeId가 없습니다.");
      return;
    }
    try {
      await declineChallengeAction(challenge.id, reason);
      console.log("챌린지 거절 성공:", challenge.id, reason);
      setisModalOpen(false);
      alert("챌린지가 성공적으로 거절되었습니다.");
      await fetchApplication();
    } catch (error) {
      console.error("챌린지 거절 실패:", error.message);
      alert(`챌린지 거절 실패: ${error.message}`);
    }
  };

  const handleAccept = async () => {
    try {
      await acceptChallengeAction(challenge.id);
      console.log("승인된 챌린지:", challenge.id);
      await fetchApplication();
    } catch (error) {
      console.error("챌린지 승인 실패", error);
    }
  };

  return (
    <div className="mt-4 pb-[10rem] md:mt-6">
      <div className="flex justify-between">
        <span className="font-medium text-gray-800">No. {applicationId}</span>
        <div className="flex gap-[10px]">
          <button
            onClick={() => {
              if (prevId !== null) {
                window.location.href = `/admin/management/${prevId}`;
              }
            }}
            disabled={prevId === null}
          >
            <Image src={arrorLeft} alt="이전 챌린지" width={24} height={24} />
          </button>
          <button
            onClick={() => {
              if (prevId !== null) {
                window.location.href = `/admin/management/${nextId}`;
              }
            }}
            disabled={nextId === null}
          >
            <Image src={arrorRight} alt="다음 챌린지" width={24} height={24} />
          </button>
        </div>
      </div>
      <StatusSection application={application} />
      <LineDivider />
      <ChallengeSection challenge={challenge} adminStatus={application?.adminStatus} />
      <LineDivider />
      <OriginalUrlSection originalPageUrl={challenge?.originalUrl} />
      {(application?.adminStatus === "PENDING" || application?.adminStatus === "ACCEPTED") && <LineDivider />}
      {application?.adminStatus === "PENDING" && (
        <div className="flex h-10 gap-3 md:h-12 md:justify-end">
          <BtnText
            theme="tonal"
            children="거절하기"
            className="w-full md:w-[158px]"
            onClick={() => setisModalOpen(true)}
          />
          <BtnText theme="solidblack" children="승인하기" className="w-full md:w-[158px]" onClick={handleAccept} />
        </div>
      )}
      {isModalOpen && <DeclineModal onClose={() => setisModalOpen(false)} onConfirm={handleConfirmDecline} />}
    </div>
  );
}
