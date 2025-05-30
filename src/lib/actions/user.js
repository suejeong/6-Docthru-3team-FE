"use server";

import { BASE_URL } from "@/constant/constant";
import { cookies } from "next/headers";

// 사용자 정보 조회
export async function getUserAction() {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("accessToken")?.value;

  try {
    const res = await fetch(`${BASE_URL}/users/me`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Cookie: `accessToken=${accessToken}`
      }
    });

    if (!res.ok) {
      throw new Error("유저 정보를 불러오는데 실패했습니다.");
    }

    return await res.json();
  } catch (err) {
    console.error("getUserAction 에러:", err);
    throw err;
  }
}

// 나의 챌린지 신청 목록 조회
export async function getMyApplicationsAction({ params = {} }) {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("accessToken")?.value;
  const query = new URLSearchParams(params).toString();

  try {
    const res = await fetch(`${BASE_URL}/users/me/applications?${query}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Cookie: `accessToken=${accessToken}`
      }
    });

    if (!res.ok) {
      throw new Error("챌린지 신청 목록를 불러오는데 실패했습니다.");
    }

    return await res.json();
  } catch (err) {
    console.error("getMyApplicationsAction 에러:", err);
    throw err;
  }
}

// 챌린지 신청 상세 조회
export async function getApplicationAction(applicationId) {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("accessToken")?.value;

  try {
    const res = await fetch(`${BASE_URL}/users/me/applications/${applicationId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Cookie: `accessToken=${accessToken}`
      }
    });

    if (!res.ok) {
      throw new Error("챌린지를 불러오는데 실패했습니다.");
    }

    return await res.json();
  } catch (err) {
    console.error("getApplicationAction 에러:", err);
    throw err;
  }
}

// 챌린지 작업물(랭킹) 조회
export async function getRankingAction(challengeId) {
  const cookieStore = cookies();
  const accessToken = cookieStore.get("accessToken")?.value;

  try {
    const res = await fetch(`${BASE_URL}/challenges/${challengeId}/works`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Cookie: `accessToken=${accessToken}`
      },
      cache: "no-store"
    });

    if (!res.ok) {
      throw new Error("랭킹 데이터를 불러오는데 실패했습니다.");
    }

    const result = await res.json();
    console.log("랭킹 응답 데이터:", result); // 확인용

    // 구조가 { data: [...] } 형태라면 아래처럼 수정
    return result.data;
  } catch (err) {
    console.error("getRankingAction 에러:", err);
    throw err;
  }
}
