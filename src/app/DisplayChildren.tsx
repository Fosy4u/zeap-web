"use client";
import Footer from "@/components/Footer/Footer";
import Header from "@/components/Header/Header";
import { ThemeContext } from "@/contexts/themeContext";
import ToastContainer from "@/shared/toast";
import { usePathname } from "next/navigation";
import React, { useContext, useEffect } from "react";

const DisplayChildren = ({ children }: { children: React.ReactNode }) => {
  const { theme, dimBackground, setDimBackground } = useContext(ThemeContext);
  const pathname = usePathname();
  const isAuthPage = pathname.startsWith("/account/login");
  useEffect(() => {
    setDimBackground(false);
  }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  , [pathname]);
  return (
    <div>
      {!isAuthPage && <Header />}
      <div
      style={{ outline: "1px solid red" }}
        className={`pt-2 ${theme} 
         ${
           dimBackground &&
           "brightness-[20%] bg-neutral-50 blur-sm transition-all duration-300 ease-in-out"
         }`}
      >
        <div className={`flex flex-col h-full w-full overflow-x-hidden`}>
          <div className="mb-8">{children}</div>
          <div className="relative flex flex-col w-full h-full overflow-x-hidden">
            <Footer />
          </div>
        </div>

        <ToastContainer />
      </div>
    </div>
  );
};

export default DisplayChildren;
