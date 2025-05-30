import React from "react";
import Image from "next/image";
import search from "@/assets/icon/ic_search.svg";

function SearchInput({ value, onChange }) {
  return (
    <div className="relative flex items-center">
      <Image src={search} className="absolute left-[8px] h-[24px] w-[24px]" alt="검색 돋보기" />
      <input
        type="text"
        value={value}
        onChange={onChange}
        className={`h-[40px] w-full rounded-[20px] border-[1px] border-gray-200 bg-white pl-[36px] text-sm placeholder-gray-400 md:text-base`}
        placeholder="챌린지 이름을 검색해보세요"
      />
    </div>
  );
}

export default SearchInput;
