import React from "react";

export default function CategoryItems({ toggleType, onSelect }) {
  let categories;

  toggleType === "fields"
    ? (categories = ["Next.js", "API", "Career", "Modern JS", "Web"])
    : (categories = ["공식문서", "블로그"]);

  return (
    <div className="flex flex-col rounded-lg border border-[#E5E5E5]">
      {categories.map((item, index) => {
        const isFirst = index === 0;
        const isLast = index === categories.length - 1;

        return (
          <div
            key={item}
            onClick={() => onSelect(item)}
            className={`flex h-14 w-full flex-col items-center justify-between border border-[#E5E5E5] p-4 ${isFirst ? "rounded-t-lg" : ""} ${isLast ? "rounded-b-lg" : ""}`}
          >
            <span className="text-[16px] text-[#A3A3A3]">{item}</span>
          </div>
        );
      })}
    </div>
  );
}
