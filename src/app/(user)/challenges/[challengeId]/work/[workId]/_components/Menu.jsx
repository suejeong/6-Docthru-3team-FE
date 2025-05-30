import React, { useRef, useState, useEffect } from "react";
import Image from "next/image";
import menu from "@/assets/icon/ic_menu.svg";

export default function Menu({ onEdit, onDelete }) {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={menuRef}>
      <button onClick={() => setIsOpen((prev) => !prev)} className="flex items-center justify-center">
        <Image src={menu} width={24} height={24} alt="menu" />
      </button>
      {isOpen && (
        <div className="absolute top-8 right-0 w-[139px] rounded-md border border-gray-300 bg-white z-10">
          <button
            onClick={() => {
              onEdit();
              setIsOpen(false);
            }}
            className="flex w-full items-center justify-center px-4 py-2 text-base text-gray-500 hover:text-gray-700"
          >
            수정하기
          </button>
          <hr className="w-full border-gray-200" />
          <button
            onClick={() => {
              onDelete();
              setIsOpen(false);
            }}
            className="flex w-full items-center justify-center px-4 py-2 text-base text-gray-500 hover:text-red-500"
          >
            삭제하기
          </button>
        </div>
      )}
    </div>
  );
}
