import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import type { RootState } from "../../store/store";

interface ProtectedProps {
  children: React.ReactNode;
  authentication?: boolean;
}



export default function Protected({
  children,
  authentication = true,
}: ProtectedProps) {
  const [loader, setLoader] = useState<boolean>(true);
  const authStatus = useSelector(
    (state: RootState) => state.auth.status
  );
  const navigate = useNavigate();

useEffect(() => {
  if (authentication && !authStatus) {
    navigate("/login", { replace: true });
  } else if (!authentication && authStatus) {
    navigate("/", { replace: true });
  } else {
    setLoader(false);
  }
}, [authStatus, authentication, navigate]);

  if (loader) {
    return (
      <div className="min-h-screen flex items-center justify-center 
      bg-white dark:bg-slate-900 transition-colors duration-300">

        <div className="flex flex-col items-center gap-4 
        bg-gray-50 dark:bg-slate-950 
        border border-gray-200 dark:border-slate-800 
        rounded-2xl shadow-lg px-8 py-10">

       
          <div className="h-10 w-10 rounded-full border-4 
          border-gray-200 dark:border-slate-700 
          border-t-blue-600 dark:border-t-blue-500 
          animate-spin"></div>

          <p className="text-sm 
          text-gray-500 dark:text-slate-400">
            Verifying authentication...
          </p>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
