"use client";

import { getRefreshToken, loginAction, logoutAction, registerAction } from "@/lib/actions/auth";
import { userService } from "@/lib/service/userService";
import { createContext, useContext, useState, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";

const AuthContext = createContext({
  login: () => {},
  logout: () => {},
  register: () => {},
  updateUser: () => {},
  user: null,
  isLoading: true
});

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export default function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  const pathname = usePathname();

  const getUser = async () => {
    try {
      const user = await userService.getMe();
      setUser(user);
    } catch (error) {
      console.error("사용자 정보를 가져오는데 실패했습니다:", error);
      setUser(null);
      throw error;
    }
  };

  const register = async (email, nickname, password, passwordConfirmation) => {
    setIsLoading(true);
    try {
      const userData = await registerAction(email, nickname, password, passwordConfirmation);
      if (userData?.error) {
        console.log(userData);
        return userData;
      }
      return userData;
    } catch (error) {
      console.error("회원가입 실패:", error.message);
      setUser(null);
    } finally {
      setIsLoading(false);
    }
  };

  const login = async (email, password) => {
    setIsLoading(true);
    try {
      const userData = await loginAction(email, password);

      if (userData?.error) {
        throw new Error(userData.message || "로그인에 실패했습니다.");
      }

      // 토큰 갱신 로직을 주기적으로 실행
      // JWT 슬라이딩 세션 트리거 파트
      const refreshTokenInterval = setInterval(
        async () => {
          await getRefreshToken();
          clearInterval(refreshTokenInterval);
          await logout();
        },

        // 14분마다 갱신 (서버 만료 시간인 15분보다 1분 짧게 설정함)
        // TODO : 추후 마무리 배포시 14분 주석 해제
        // 14 * 60 * 1000
        // test 코드 현재는 1분마다 갱신함
        14 * 60 * 1000
      );

      await getUser();
      router.push("/challenges");
    } catch (error) {
      console.error("로그인 실패:", error.message);
      setUser(null);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    try {
      await logoutAction();
      setUser(null);
      router.push("/signIn");
    } catch (error) {
      console.error("로그아웃 실패:", error.message);
      setUser(null);
      throw error;
    }
  };

  useEffect(() => {
    const excludeRoutes = ["/", "/signIn", "/signUp"];

    if (!excludeRoutes.includes(pathname)) {
      getUser();
    } else {
      setIsLoading(false);
    }
  }, [pathname]);

  return <AuthContext.Provider value={{ user, login, logout, register, isLoading }}>{children}</AuthContext.Provider>;
}
