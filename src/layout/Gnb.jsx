"use client";
import Image from "next/image";
import React, { useRef, useState } from "react";
import notiOff from "@/assets/icon/ic_noti_off.svg";
import notiOn from "@/assets/icon/ic_noti_on.svg";
import member from "@/assets/img/profile_member.svg";
import admin from "@/assets/img/profile_admin.svg";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Logo from "./_components/Logo";
import Profile from "@/components/dropDown/Profile";
import { useOutsideClick } from "@/hooks/useOutsideClick";
import NotificationModal from "@/components/modal/NotificationModal";
import { getUnreadNotificationsAction } from "@/lib/actions/notification";

export default function Gnb({ isNoti, userRole }) {
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isNotiModalOpen, setIsNotiModalOpen] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const pathname = usePathname();
  const profileRef = useRef(null);
  const notiButtonRef = useRef(null);

  useOutsideClick(profileRef, () => setIsProfileOpen(false));

  const handleClickProfile = () => {
    setIsProfileOpen((prev) => !prev);
    setIsNotiModalOpen(false);
  };

  // 알림 목록 조회
  const handleClickNoti = async (e) => {
    e.stopPropagation();
    try {
      const data = await getUnreadNotificationsAction();
      setNotifications(data);
      setIsNotiModalOpen((prev) => !prev);
      setIsProfileOpen(false);
    } catch (error) {
      console.error("알림 목록 조회 실패:", error);
      setIsNotiModalOpen((prev) => !prev);
      setIsProfileOpen(false);
    }
  };

  const fetchNotifications = async () => {
    try {
      const data = await getUnreadNotificationsAction();
      setNotifications(data);
    } catch (error) {
      console.error("알림 목록 조회 실패:", error);
    }
  };

  return (
    <header className="flex h-14 items-center justify-center bg-[#FFFFFF] px-4 sm:px-6 md:h-15 lg:px-8">
      <div className="flex w-full max-w-[var(--container-xl)] items-center justify-between">
        <div className="flex items-center gap-4">
          <Logo className="md:h-[27px] md:w-30" />
          {userRole === "admin" && (
            <>
              <Link
                href="/admin/management"
                className={
                  pathname.includes("/management")
                    ? "text-[13px] font-bold md:text-[15px]"
                    : "text-[13px] font-bold text-gray-500 md:text-[15px]"
                }
              >
                챌린지 관리
              </Link>
              <Link
                href="/admin/challenges"
                className={
                  pathname.includes("/challenges")
                    ? "text-[13px] font-bold md:text-[15px]"
                    : "text-[13px] font-bold text-gray-500 md:text-[15px]"
                }
              >
                챌린지 목록
              </Link>
            </>
          )}
        </div>
        <div className="relative flex gap-4" ref={profileRef}>
          {userRole === "member" && (
            <>
              <button ref={notiButtonRef} aria-label="알림" onClick={handleClickNoti}>
                <Image
                  src={isNoti ? notiOn : notiOff}
                  alt={isNoti ? "알림 있음 아이콘" : "알림 없음 아이콘"}
                  width={24}
                  height={24}
                />
              </button>
              <button aria-label="유저 프로필" onClick={handleClickProfile}>
                <Image src={member} alt="유저 프로필" width={32} height={32} />
              </button>
            </>
          )}
          {userRole === "admin" && (
            <button aria-label="어드민 프로필" onClick={handleClickProfile}>
              <Image src={admin} alt="어드민 프로필" width={32} height={32} />
            </button>
          )}
          {userRole === "guest" && (
            <Link href="/signIn">
              <button
                className="h-8 w-20 rounded-[10px] border text-sm font-semibold md:h-10 md:w-[90px] md:text-base"
                aria-label="로그인"
              >
                로그인
              </button>
            </Link>
          )}
          {isNotiModalOpen && (
            <NotificationModal
              onClose={() => setIsNotiModalOpen(false)}
              buttonRef={notiButtonRef}
              notifications={notifications}
              onNotificationRead={fetchNotifications}
            />
          )}
          {isProfileOpen && (
            <div className="absolute top-10 right-0 z-1">
              <Profile userRole={userRole} />
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
