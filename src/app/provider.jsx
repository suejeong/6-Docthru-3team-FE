import AuthProvider from "@/providers/AuthProvider";
import React from "react";

function Providers({ children }) {
  return <AuthProvider>{children}</AuthProvider>;
}

export default Providers;
