import BtnText from "@/components/btn/text/BtnText";
import React from "react";

export default function OriginalUrlSection({ originalPageUrl }) {
  return (
    <section className="flex w-full flex-col">
      <h4 className="mb-4 font-semibold text-gray-800">원문 링크</h4>
      <div className="relative">
        <div className="absolute top-3 right-4">
          <BtnText
            theme="link"
            className="h-8"
            onClick={() => {
              window.open(originalPageUrl, "_blank");
            }}
          >
            링크 열기
          </BtnText>
        </div>
        <iframe
          src={originalPageUrl}
          title="원문 페이지"
          className="h-full w-full border-0"
          style={{ height: "calc(100vh - 500px)" }}
          loading="lazy"
          allow="clipboard-read; clipboard-write"
          sandbox="allow-same-origin allow-scripts allow-popups allow-forms"
        />
      </div>
    </section>
  );
}
