"use client";
import Image from "next/image";
import type { FC } from "react";
import React from "react";
import homeLogo from "@/images/zeap-text-logo.png";
import ProductGroupNav from "@/components/Header/ProductGroupNav";
import { useRouter } from "next/navigation";
// import { productGroupNavOptions } from "@/data/content";

interface LogoProps {
  className?: string;
}

const Logo: FC<LogoProps> = ({}) => {
  // const pathname = usePathname();
  // const searchParams = useSearchParams();
  // const productGroupPage = searchParams.get("productGroupPage") || "HOME";
  // const productGroupNav = productGroupNavOptions.find(
  //   (option) => pathname === option.href || productGroupPage === option.label
  // );
  const router = useRouter();
  return (
    <div className="flex cursor-pointer items-center gap-2 text-primary">
      <Image
        className="hover:opacity-80 transition-all w-[8rem] lg:w-[7rem] xl:w-[10rem]"
        src={homeLogo}
        alt="logo"
        width={80}
        height={100}
        onClick={() => router.push("/")}
      />
      {/* <Image
        className="rounded-md hover:opacity-80 transition-all"
        src={productGroupNav?.logo || homeLogo}
        alt="logo"
        width={90}
        height={100}
        onClick={() => router.push("/")}
      /> */}
      {/* <span className={`${className} text-2xl font-bold`}>Zeaper</span> */}
      <span className="hidden lg:block w-full mt-2">
        <ProductGroupNav />
      </span>
    </div>
  );
};

export default Logo;
