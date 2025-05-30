"use server";

/**
 * 기본 fetch 클라이언트 - 인증이 필요 없는 일반 요청용
 * 이 함수는 항상 HTTP `Response` 객체 자체를 반환합니다.
 * 응답의 성공 여부 (.ok) 확인 및 본문 파싱은 이 함수를 호출하는 측(예: authService)에서 수행합니다.
 */
export const defaultFetch = async (url, options = {}) => {
  const baseURL = process.env.NEXT_PUBLIC_API_URL;
  const defaultOptions = {
    headers: {
      "Content-Type": "application/json"
    },
    cache: "no-store" // 기본적으로 캐싱하지 않음 (요청마다 새로운 데이터 보장)
  };

  const mergedOptions = {
    ...defaultOptions,
    ...options,
    headers: {
      ...defaultOptions.headers,
      ...options.headers
    },
    ...options.headers
  };

  const response = await fetch(`${baseURL}${url}`, mergedOptions);
  return response;
};
