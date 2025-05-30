'use client';
import React, { useState, useRef, useEffect } from 'react';
import menuIcon from '@/assets/icon/ic_menu.svg';
import profileImg from '@/assets/img/profile_member.svg';
import Image from 'next/image';
import TextBox from './TextBox';
import { useAuth } from '@/providers/AuthProvider';

export default function Reply({
  userName = '익명',
  timestamp = '방금 전',
  content = '이건 테스트 입니다...',
  isAuthor = false,
  onEdit = () => { },
  onDelete = () => { }
}) {
  const [isReplyMenu, setIsReplyMenu] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [editedContent, setEditedContent] = useState(content);
  const menuRef = useRef(null);
  const { user } = useAuth();

  const isAdmin = user?.role === "ADMIN";

  // 메뉴 버튼 클릭
  const handleMoreClick = () => {
    setIsReplyMenu((prev) => !prev);
  };

  // 수정 버튼 클릭
  const handleEditClick = () => {
    setIsEditMode(true);
    setIsReplyMenu(false);
    setEditedContent(content);
  };

  // 수정 취소
  const handleCancelEdit = () => {
    setIsEditMode(false);
    setEditedContent(content);
  };

  // 수정 완료
  const handleSubmitEdit = () => {
    onEdit(editedContent);
    setIsEditMode(false);
  };

  // 메뉴 바깥 클릭 시 메뉴 닫기
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsReplyMenu(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="relative mt-4 w-full rounded-xl bg-gray-50 p-4 lg:w-[826px]">
      <div className="mb-3 flex items-center justify-between">
        {/* 유저 이름과 시간 */}
        <div className="flex items-center gap-2">
          <figure className="h-[32px] w-[32px] rounded-full bg-gray-200">
            <Image src={profileImg} alt="프로필 이미지" />
          </figure>
          <div className="flex flex-col">
            <span className="text-sm font-medium">{userName}</span>
            <span className="text-sm text-gray-400">{timestamp}</span>
          </div>
        </div>

        {/* isAuthor가 true일 때만 메뉴/수정 버튼 표시 */}
        {isAuthor && !isEditMode ? (
          <div className="relative" ref={menuRef}>
            <button
              onClick={handleMoreClick}
              className="flex h-6 w-6 items-center justify-center text-gray-400 hover:text-gray-600"
            >
              <Image src={menuIcon} alt="더보기" />
            </button>
            {isReplyMenu && (
              <div className="absolute top-7 right-0 z-10 w-[139px] rounded-md border border-gray-200 bg-white shadow-md">
                <button
                  onClick={handleEditClick}
                  className="flex w-full items-center justify-center px-4 py-2 text-left text-[16px] text-gray-500 hover:text-gray-700"
                >
                  수정하기
                </button>
                <hr className="w-full border-gray-200" />
                <button
                  onClick={onDelete}
                  className="flex w-full items-center justify-center px-4 py-2 text-left text-[16px] text-gray-500 hover:text-red-500"
                >
                  삭제하기
                </button>
              </div>
            )}
          </div>
        ) : isAuthor && isEditMode ? (
          <div className="mt-2 flex justify-end gap-2 text-sm">
            <button onClick={handleCancelEdit} className="px-5 py-2 font-bold text-gray-500">
              취소
            </button>
            <button
              onClick={handleSubmitEdit}
              className="bg-brand-black rounded-xl px-3 py-2 text-[14px] font-bold text-white"
            >
              수정 완료
            </button>
          </div>
        ) : null}
        {/* isAuthor가 true일 때만 메뉴/수정 버튼 표시 */}
        {isAdmin && !isEditMode ? (
          <div className="relative" ref={menuRef}>
            <button
              onClick={handleMoreClick}
              className="flex h-6 w-6 items-center justify-center text-gray-400 hover:text-gray-600"
            >
              <Image src={menuIcon} alt="더보기" />
            </button>
            {isReplyMenu && (
              <div className="absolute top-7 right-0 z-10 w-[139px] rounded-md border border-gray-200 bg-white shadow-md">
                <button
                  onClick={handleEditClick}
                  className="flex w-full items-center justify-center px-4 py-2 text-left text-[16px] text-gray-500 hover:text-gray-700"
                >
                  수정하기
                </button>
                <hr className="w-full border-gray-200" />
                <button
                  onClick={onDelete}
                  className="flex w-full items-center justify-center px-4 py-2 text-left text-[16px] text-gray-500 hover:text-red-500"
                >
                  삭제하기
                </button>
              </div>
            )}
          </div>
        ) : isAuthor && isEditMode ? (
          <div className="mt-2 flex justify-end gap-2 text-sm">
            <button onClick={handleCancelEdit} className="px-5 py-2 font-bold text-gray-500">
              취소
            </button>
            <button
              onClick={handleSubmitEdit}
              className="bg-brand-black rounded-xl px-3 py-2 text-[14px] font-bold text-white"
            >
              수정 완료
            </button>
          </div>
        ) : null}
      </div>

      {/* 내용 or 수정창 */}
      {isEditMode ? (
        <TextBox value={editedContent} onChange={(e) => setEditedContent(e.target.value)} onSubmit={handleSubmitEdit} />
      ) : (
        <p className="text-[16px] whitespace-pre-wrap text-gray-700">{content}</p>
      )}
    </div>
  );
}
