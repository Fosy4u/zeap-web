import type { Metadata } from "next";
import { Bodoni_Moda } from "next/font/google";
// import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

import { Suspense } from "react";
import DisplayChildren from "./DisplayChildren";
import StoreProvider from "@/redux/store/StoreProvider";
import Loading from "./Loader";


// const geistSans = Geist({
//   variable: "--font-geist-sans",
//   subsets: ["latin"],
// });

// const geistMono = Geist_Mono({
//   variable: "--font-geist-mono",
//   subsets: ["latin"],
// });
const getBodoniFont = Bodoni_Moda({
  variable: "--font-bodoni",
  weight: ["900", "900"],
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Zeaper Fashion",
  description: "Zeaper Fashion is a fashion store",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <StoreProvider>
      <html lang="en">
        <body className={` ${getBodoniFont.variable}  antialiased h-full`}>
          <Suspense fallback={<Loading />}>
            <div className="">
              {/* <Header /> */}
              <div className="flex flex-col min-h-screen">
                <DisplayChildren>{children}</DisplayChildren>
              </div>
            </div>
          </Suspense>
        </body>
      </html>
    </StoreProvider>
  );
}
