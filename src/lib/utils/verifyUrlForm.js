//챌린지 신청 시 originalUrl 기입 시 사용됨
export function isValidURL(url) {
  try {
    const parsed = new URL(url); // 내장 URL 생성자 사용
    return ["http:", "https:"].includes(parsed.protocol);
  } catch (e) {
    return false;
  }
}
