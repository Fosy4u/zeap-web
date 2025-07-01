import type { Metadata } from "next";
import { Bodoni_Moda } from "next/font/google";
// import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import StoreProvider from "@/redux/store/StoreProvider";
import { AuthProvider } from "@/contexts/authContext";

import { Suspense } from "react";
import { ThemeProvider } from "@/contexts/themeContext";
import Loading from "@/components/loading/Loading";
import DisplayChildren from "./DisplayChildren";
import { WebSocketProvider } from "@/contexts/webSocketContext";
import FlowBiteTheme from "@/contexts/FlowBiteTheme";

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
  title: "Zeap Fashion",
  description: "Zeap Fashion is a fashion store",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <WebSocketProvider>
      <StoreProvider>
        <AuthProvider>
          <ThemeProvider>
            <FlowBiteTheme>
              <html lang="en">
                <body className={` ${getBodoniFont.variable}  antialiased `}>
                  <Suspense fallback={<Loading />}>
                    <div className="fixed h-full w-full overflow-x-hidden top-0 left-0 ">
                      <DisplayChildren>{children}</DisplayChildren>
                    </div>
                  </Suspense>
                </body>
              </html>
            </FlowBiteTheme>
          </ThemeProvider>
        </AuthProvider>
      </StoreProvider>
    </WebSocketProvider>
  );
}
