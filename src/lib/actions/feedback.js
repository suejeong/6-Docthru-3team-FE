"use server";

import { cookies } from "next/headers";

const BASE_URL = process.env.NODE_ENV === "production" ? process.env.NEXT_PUBLIC_API_URL : "http://localhost:8080";

// 공통 헤더 생성 함수
const getAuthHeaders = async () => {
  const cookieStore = cookies();
  const token = cookieStore.get("accessToken")?.value;
  return {
    "Content-Type": "application/json",
    Cookie: `accessToken=${token}`
  };
};

// 피드백 목록 조회
export async function getFeedbacksAction(workId) {
  const headers = await getAuthHeaders();

  const res = await fetch(`${BASE_URL}/works/${workId}/feedbacks`, {
    method: "GET",
    headers,
    credentials: "include",
    cache: "no-store"
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`피드백 조회 실패 (${res.status}): ${text}`);
  }

  return await res.json();
}

// 피드백 등록
export async function createFeedbackAction(workId, content) {
  const headers = await getAuthHeaders();

  const res = await fetch(`${BASE_URL}/works/${workId}/feedbacks`, {
    method: "POST",
    headers,
    credentials: "include",
    body: JSON.stringify({ content })
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`피드백 등록 실패 (${res.status}): ${text}`);
  }

  return await res.json();
}

// 피드백 수정
export async function updateFeedbackAction(workId, feedbackId, content) {
  const headers = await getAuthHeaders();

  const res = await fetch(`${BASE_URL}/works/${workId}/feedbacks/${feedbackId}`, {
    method: "PATCH",
    headers,
    credentials: "include",
    body: JSON.stringify({ content })
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`피드백 수정 실패 (${res.status}): ${text}`);
  }

  return await res.json();
}

// 피드백 삭제
export async function deleteFeedbackAction(workId, feedbackId) {
  const headers = await getAuthHeaders();

  const res = await fetch(`${BASE_URL}/works/${workId}/feedbacks/${feedbackId}`, {
    method: "DELETE",
    headers,
    credentials: "include"
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`피드백 삭제 실패 (${res.status}): ${text}`);
  }

  // 204 No Content 처리
  if (res.status === 204) return { status: 204 };
  return await res.json();
}
