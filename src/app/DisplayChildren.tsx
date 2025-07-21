"use client";
import Whatsapp from "@/components/contact/Whatsapp";
import Footer from "@/components/Footer/Footer";
import Header from "@/components/Header/Header";
import { ThemeContext } from "@/contexts/themeContext";
import ToastContainer from "@/shared/toast";
import { usePathname } from "next/navigation";
import React, { useContext, useEffect } from "react";
import en from "javascript-time-ago/locale/en";
import TimeAgo from "javascript-time-ago";
TimeAgo.addDefaultLocale(en);

const DisplayChildren = ({ children }: { children: React.ReactNode }) => {
  const { theme, dimBackground, setDimBackground } = useContext(ThemeContext);
  const pathname = usePathname();
  const isAuthPage = pathname.startsWith("/account/login");
  useEffect(
    () => {
      setDimBackground(false);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [pathname]
  );
  return (
    <>
      {/* {!isAuthPage && <Header />} */}
      {/* <div
        style={{ outline: "1px solid red" }}
        className={`flex-grow ${theme} 
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
        <Whatsapp />
      </div> */}
      {!isAuthPage && <Header />}

      <div
        className={`flex-grow overflow-hidden ${theme} 
         ${
           dimBackground &&
           "brightness-[20%] bg-neutral-50 blur-sm transition-all duration-300 ease-in-out"
         }`}
      >
        {children}
      </div>
      <Footer />
      <ToastContainer />
      <Whatsapp />
    </>
  );
};

export default DisplayChildren;
