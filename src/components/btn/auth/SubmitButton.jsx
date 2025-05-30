import LoadingSpinner from "@/components/loading/LoadingSpinner";
import React from "react";

export function SubmitButton({ type, loading, hasInputValue }) {
  return (
    <button
      type="submit"
      className="flex items-center justify-center h-12 w-[343px] rounded-xl bg-black font-semibold text-white md:w-[518px]"
      disabled={!hasInputValue}
    >
      {loading && <LoadingSpinner classname="w-8" />}
      {type}
    </button>
  );
}

export default SubmitButton;
