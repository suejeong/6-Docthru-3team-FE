import React from "react";

const AuthModal = ({ message, onClose }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="relative mx-4 flex h-[220px] w-[327px] flex-col items-center rounded-xl border-2 border-gray-800 bg-white md:h-[250px] md:w-[540px]">
        <span className="mt-[81px] md:mt-[108px] text-base font-medium text-gray-800 md:mb-2 md:text-lg">
          {message}
        </span>
        <button
          onClick={onClose}
          className="absolute bottom-7 left-1/2 h-[48px] w-[120px] -translate-x-1/2 rounded-lg bg-neutral-800 text-base font-medium text-white hover:bg-neutral-700 md:right-8 md:left-auto md:-translate-x-0"
        >
          확인
        </button>
      </div>
    </div>
  );
};

export default AuthModal;
