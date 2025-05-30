"use client";

import React from "react";
import { useAuth } from "@/providers/AuthProvider";
import Mychallenges from "../_components/MyChallenges";
export default function CompletedChallengesPage() {
   const { loading } = useAuth();
  
  if (loading) return <div>로딩 중...</div>;
    
    return (
      <Mychallenges myChallengeStatus="completed" />
    )
  }