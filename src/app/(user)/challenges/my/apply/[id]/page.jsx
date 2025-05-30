"use client";

import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import StatusSection from "./_components/StatusSection";
import LineDivider from "./_components/LineDivider";
import OriginalUrlSection from "./_components/OriginalUrlSection";
import ChallengeSection from "./_components/ChallengeSection";
import { userService } from "@/lib/service/userService";

export default function MyApplicationDetailPage() {
  const { id } = useParams();
  const [application, setApplication] = useState();
  const [challenge, setChallenge] = useState();

  const fetchDetail = async () => {
    try {
      const data = await userService.getApplication(id);
      console.log(data.application);
      console.log(data.challenge);
      setApplication(data.application);
      setChallenge(data.challenge);
    } catch (error) {
      console("신청한 챌린지 상세 불러오기 실패: ", error);
    }
  };

  useEffect(() => {
    fetchDetail();
  }, []);

  return (
    <div>
      <StatusSection application={application} />
      <LineDivider />
      <ChallengeSection challenge={challenge} adminStatus={application?.adminStatus} />
      <LineDivider />
      <OriginalUrlSection originalPageUrl={challenge?.originalUrl} />
    </div>
  );
}
