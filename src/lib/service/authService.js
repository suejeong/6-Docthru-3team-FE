import { logoutAction } from "@/lib/actions/auth";
import { defaultFetch } from "@/lib/fetchClient";

export const authService = {
  // 로그인
  login: async (email, password) => {
    try {
      const response = await defaultFetch("/auth/sign-in", {
        method: "POST",
        body: JSON.stringify({ email, password }),
        cache: "no-store"
      });
      return response;
    } catch (error) {
      console.error("authService.login API 호출 실패:", error.message);
      throw error;
    }
  },

  // 회원가입
  register: async (nickname, email, password, passwordConfirmation) => {
    try {
      const response = await defaultFetch("/auth/sign-up", {
        method: "POST",
        body: JSON.stringify({ nickname, email, password, passwordConfirmation }),
        cache: "no-store"
      });
      return response;
    } catch (error) {
      console.error("authService.register API 호출 실패:", error.message);
      throw error;
    }
  },

  // 로그아웃
  logout: async () => {
    return await logoutAction();
  },

  // 토큰 갱신(TODO: 수정필요)
  refresh: async () => {
    try {
      const response = await defaultFetch("/auth/refresh-token", {
        method: "POST",
        cache: "no-store",
        credentials: "include"
      });

      if (!response.ok) {
        throw new Error("토큰 갱신 실패");
      }

      return await response.json();
    } catch (error) {
      console.error("authService.refresh 호출 실패:", error.message);
      throw error;
    }
  }
};
