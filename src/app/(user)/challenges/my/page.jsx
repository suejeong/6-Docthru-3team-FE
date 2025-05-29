"use client";

import { useParams } from "next/navigation";
import Mychallenges from "./_components/MyChallenges";
import { useAuth } from "@/providers/AuthProvider";

export default function ParticipatedChallengesPage() {


  const { loading } = useAuth();

  if (loading) return <div>로딩 중...</div>;
    
  return (
    <Mychallenges myChallengeStatus="participated" />
  )

}
