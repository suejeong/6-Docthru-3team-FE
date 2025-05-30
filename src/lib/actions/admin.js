"use server";

import { BASE_URL } from "@/constant/constant";
import { cookies } from "next/headers";

// 관리자 - 챌린지 소프트 삭제
export async function deleteChallengeAction(challengeId, adminMessage) {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("accessToken")?.value;

  const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080";

  if (!accessToken) {
    throw new Error("인증되지 않았습니다: 액세스 토큰이 없습니다.");
  }

  try {
    const response = await fetch(`${API_URL}/admin/challenges/${challengeId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Cookie: `accessToken=${accessToken}`
      },
      body: JSON.stringify({
        adminStatus: "DELETED",
        adminMessage: adminMessage
      })
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "챌린지 삭제에 실패했습니다.");
    }

    return await response.json();
  } catch (err) {
    console.error("서버 액션 - 챌린지 삭제 오류:", err);
    throw err;
  }
}

// 관리자 - 신청 거절
export async function declineChallengeAction(challengeId, adminMessage) {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("accessToken")?.value;

  const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080";

  if (!accessToken) {
    throw new Error("인증되지 않았습니다: 액세스 토큰이 없습니다.");
  }

  try {
    const response = await fetch(`${API_URL}/admin/challenges/${challengeId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Cookie: `accessToken=${accessToken}`
      },
      body: JSON.stringify({
        adminStatus: "REJECTED",
        adminMessage: adminMessage
      })
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "챌린지 거절에 실패했습니다.");
    }

    return await response.json();
  } catch (err) {
    console.error("서버 액션 - 챌린지 거절 오류:", err);
    throw err;
  }
}

// 관리자 - 신청 승인
export async function acceptChallengeAction(applicationId) {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("accessToken")?.value;

  const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080";

  if (!accessToken) {
    throw new Error("인증되지 않았습니다: 액세스 토큰이 없습니다.");
  }

  try {
    const response = await fetch(`${API_URL}/admin/challenges/${applicationId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Cookie: `accessToken=${accessToken}`
      },
      body: JSON.stringify({
        adminStatus: "ACCEPTED"
      })
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "챌린지 승인에 실패했습니다.");
    }

    return await response.json();
  } catch (err) {
    console.error("서버 액션 - 챌린지 승인 오류:", err);
    throw err;
  }
}

// 관리자 - 신청 목록 전체 조회
export async function getApplicationsAction({ params = {} }) {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("accessToken")?.value;
  const query = new URLSearchParams(params).toString();

  try {
    const res = await fetch(`${BASE_URL}/admin/applications?${query}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Cookie: `accessToken=${accessToken}`
      }
    });

    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(errorData.message || "신청 목록을 불러오는데 실패했습니다.");
    }

    return await res.json();
  } catch (err) {
    console.error("getApplicationsAction 에러:", err);
    throw err;
  }
}
