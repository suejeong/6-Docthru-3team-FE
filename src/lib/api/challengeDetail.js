import { BASE_URL } from '@/constant/constant';

// 챌린지 상세 조회
export async function getChallengeDetail(challengeId) {
  const res = await fetch(`${BASE_URL}/challenges/${challengeId}`, {
    credentials: 'include'
  });

  if (!res.ok) {
    const errorBody = await res.json();
    throw new Error(errorBody.message || '챌린지 정보를 불러올 수 없습니다.');
  }

  const result = await res.json();
  return result.data;
}

// 챌린지 랭킹 조회
export async function getChallengeRanking(challengeId, page = 1, pageSize = 5) {
  const res = await fetch(`${BASE_URL}/challenges/${challengeId}/works?page=${page}&pageSize=${pageSize}`, {
    credentials: 'include'
  });

  if (!res.ok) {
    const errorBody = await res.json();
    throw new Error(errorBody.message || '랭킹 정보를 불러올 수 없습니다.');
  }

  const result = await res.json();
  return result.data; // works 배열
}
