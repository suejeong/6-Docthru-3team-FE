"use server";

import { cookies } from "next/headers";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

// accessToken을 안전하게 추출
const getAccessToken = async () => {
  const cookieStore = await cookies(); // 동기
  const token = cookieStore.get("accessToken"); // 동기
  return token?.value;
};

// fetch 요청에 사용할 headers 구성
const getAuthHeaders = async () => {
  const accessToken = await getAccessToken(); // 반드시 await 필요
  return {
    "Content-Type": "application/json",
    Cookie: `accessToken=${accessToken}`
  };
};

// ✅ 작업물 상세 조회
export async function getWorkDetailAction(challengeId, workId) {
  const headers = await getAuthHeaders();

  const res = await fetch(`${BASE_URL}/challenges/${challengeId}/works/${workId}`, {
    method: "GET",
    headers,
    credentials: "include",
    cache: "no-store"
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`작업물 조회 실패 (${res.status}): ${text}`);
  }

  return await res.json();
}

// ✅ 작업물 생성
export async function createWorkAction(challengeId) {
  const headers = await getAuthHeaders();

  const res = await fetch(`${BASE_URL}/challenges/${challengeId}/works`, {
    method: "POST",
    headers,
    credentials: "include",
    cache: "no-store"
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`작업물 생성 실패 (${res.status}): ${text}`);
  }

  return await res.json();
}

// ✅ 작업물 수정
export async function updateWorkAction(workId, content) {
  const headers = await getAuthHeaders();

  const res = await fetch(`${BASE_URL}/works/${workId}`, {
    method: "PATCH",
    headers,
    credentials: "include",
    cache: "no-store",
    body: JSON.stringify({ content })
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`작업물 수정 실패 (${res.status}): ${text}`);
  }

  return await res.json();
}

// ✅ 작업물 삭제
export async function deleteWorkAction(workId) {
  const headers = await getAuthHeaders();

  const res = await fetch(`${BASE_URL}/works/${workId}`, {
    method: "DELETE",
    headers,
    credentials: "include",
    cache: "no-store"
  });

  return { status: res.status };
}

// ✅ 작업물 좋아요 생성
export async function createWorkLikeAction(workId) {
  const headers = await getAuthHeaders();

  const res = await fetch(`${BASE_URL}/works/${workId}/like`, {
    method: "POST",
    headers,
    credentials: "include",
    cache: "no-store"
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`좋아요 실패 (${res.status}): ${text}`);
  }

  return await res.json();
}

// ✅ 작업물 좋아요 삭제
export async function deleteWorkLikeAction(workId) {
  const headers = await getAuthHeaders();

  const res = await fetch(`${BASE_URL}/works/${workId}/like`, {
    method: "DELETE",
    headers,
    credentials: "include",
    cache: "no-store"
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`좋아요 취소 실패 (${res.status}): ${text}`);
  }

  return await res.json();
}
