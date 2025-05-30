"use server";

import { BASE_URL } from "@/constant/constant";
import { cookies } from "next/headers";

export async function getServerSideToken(cookieName) {
  try {
    const cookieStore = cookies();
    const isToken = cookieStore.get(cookieName)?.value;
    console.log(`[getServerSideToken] Fetched '${cookieName}':`, isToken ? "Found" : "Not Found");
    const token = await cookieStore.get(cookieName)?.value;
    return token;
  } catch (error) {
    console.error(`[getServerSideToken] Error getting '${cookieName}':`, error);
    return undefined;
  }
}

export async function loginAction(email, password) {
  try {
    const res = await fetch(
      `${BASE_URL}/auth/sign-in`,
      // const res = await fetch(`http://localhost:8080/auth/sign-in`,

      {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ email, password }),
        cache: "no-store"
      }
    );

    if (!res.ok) {
      const data = await res.json();
      console.error("로그인 실패 응답:", data);
      return { error: true, message: data.message || "로그인 실패" };
    }

    const userData = await res.json();

    const setCookieHeader = res.headers.get("Set-Cookie");

    if (setCookieHeader) {
      console.log("Backend Set-Cookie header received in loginAction:", setCookieHeader);

      const cookieParts = setCookieHeader.split(", ").flatMap((part) => part.split(","));
      const cookieStore = await cookies();

      const cookiePromises = cookieParts.map(async (cookieString) => {
        const [nameValuePair, ...attributes] = cookieString.split(";").map((s) => s.trim());
        const [name, value] = nameValuePair.split("=");

        const cookieOptions = {};
        attributes.forEach((attr) => {
          const lowerAttr = attr.toLowerCase();
          if (lowerAttr.startsWith("max-age")) {
            cookieOptions.maxAge = parseInt(attr.split("=")[1], 10);
          } else if (lowerAttr.startsWith("path")) {
            cookieOptions.path = attr.split("=")[1];
          } else if (lowerAttr.startsWith("expires")) {
            cookieOptions.expires = new Date(attr.split("=")[1]);
          } else if (lowerAttr === "httponly") {
            cookieOptions.httpOnly = true;
          } else if (lowerAttr.startsWith("samesite")) {
            cookieOptions.sameSite = attr.split("=")[1];
          } else if (lowerAttr === "secure") {
            cookieOptions.secure = true;
          }
        });

        if (name && value) {
          await cookieStore.set(name, value, cookieOptions);
          console.log(`[loginAction] Set server cookie: ${name}`);
        }
      });

      await Promise.all(cookiePromises);
    } else {
      console.warn("No Set-Cookie header received from backend for login.");
    }

    return { success: true, user: userData };
  } catch (error) {
    console.error("로그인 액션 오류:", error.message);
    return { error: true, message: error.message || "로그인 중 알 수 없는 오류 발생" };
  }
}

export async function registerAction(email, nickname, password, passwordConfirmation) {
  try {
    const res = await fetch(`${BASE_URL}/auth/sign-up`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ email, nickname, password, passwordConfirmation }),
      cache: "no-store"
    });

    const data = await res.json();
    if (!res.ok) {
      return { error: true, message: data.message || "회원가입 실패" };
    }
    return { success: true, user: data };
  } catch (error) {
    return { error: true, message: error.message || "회원가입 오류" };
  }
}

export async function logoutAction() {
  // 클라이언트 측 쿠키도 함께 삭제 (백업용)
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("accessToken")?.value;

  cookieStore.delete("accessToken");
  cookieStore.delete("refreshToken");

  try {
    // 백엔드 로그아웃 API 호출
    // TODO : 추후 마무리 배포시 주석 해제
    const response = await fetch(
      `${BASE_URL}/auth/sign-out`,
      // const response = await fetch(`http://localhost:8080/auth/sign-out`,

      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Cookie: `accessToken=${accessToken}`
        }
      }
    );

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "로그아웃 실패");
    }

    const data = await response.json();

    return {
      success: true,
      message: data.message || "성공적으로 로그아웃되었습니다."
    };
  } catch (error) {
    console.error("Logout error:", error);
    return {
      success: false,
      error: true,
      message: error.message || "로그아웃 중 오류가 발생했습니다."
    };
  }
}

export async function getRefreshToken() {
  const cookieStore = await cookies();
  const refreshToken = cookieStore.get("refreshToken")?.value;

  if (!refreshToken) {
    console.log("[getRefreshToken] No refresh token found");
    throw new Error("리프레시 토큰 만료됨!");
  }

  try {
    // TODO : 추후 테스트 성공시 주석 해제
    const response = await fetch(
      `${BASE_URL}/auth/refresh-token`,
      // const response = await fetch(`http://localhost:8080/auth/refresh-token`,

      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Cookie: `refreshToken=${refreshToken}`
        },
        cache: "no-store"
      }
    );

    const data = await response.json();

    if (!response.ok) {
      console.error("[getRefreshToken] Error response:", data);
      throw new Error(data.message || "토큰 갱신 실패");
    }

    const setCookieHeader = response.headers.get("Set-Cookie");

    if (setCookieHeader) {
      const cookieParts = setCookieHeader.split(", ").flatMap((part) => part.split(","));

      const cookiePromises = cookieParts.map(async (cookieString) => {
        const [nameValuePair, ...attributes] = cookieString.split(";").map((s) => s.trim());
        const [name, value] = nameValuePair.split("=");

        const cookieOptions = {};
        attributes.forEach((attr) => {
          const lowerAttr = attr.toLowerCase();
          if (lowerAttr.startsWith("max-age")) {
            cookieOptions.maxAge = parseInt(attr.split("=")[1], 10);
          } else if (lowerAttr.startsWith("path")) {
            cookieOptions.path = attr.split("=")[1];
          } else if (lowerAttr.startsWith("expires")) {
            cookieOptions.expires = new Date(attr.split("=")[1]);
          } else if (lowerAttr === "httponly") {
            cookieOptions.httpOnly = true;
          } else if (lowerAttr.startsWith("samesite")) {
            cookieOptions.sameSite = attr.split("=")[1];
          } else if (lowerAttr === "secure") {
            cookieOptions.secure = true;
          }
        });

        if (name && value) {
          await cookieStore.set(name, value, cookieOptions);
          console.log(`[getRefreshToken] Set ${name} cookie with options:`, cookieOptions);
        }
      });

      await Promise.all(cookiePromises);
    } else {
      console.warn("[getRefreshToken] No Set-Cookie header received");
    }

    return data;
  } catch (e) {
    console.error("[getRefreshToken] Error:", e);
    throw new Error("리프레시 토큰 재발급 실패!");
  }
}
