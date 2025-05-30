import Image from "next/image";
import React from "react";
import loadingSpinner from "@/assets/icon/loading_spinner.gif";

function LoadingSpinner({ classname }) {
  return <Image src={loadingSpinner} alt="로딩중" width={80} height={80} className={classname} />;
}

export default LoadingSpinner;
