import Image from "next/image";
import Link from "next/link";
import type { FC } from "react";
import React from "react";
import logo from "@/images/app_logo.png";

interface LogoProps {
  className?: string;
}

const Logo: FC<LogoProps> = ({ className = "" }) => {
  return (
    <Link
      className="flex cursor-pointer items-center gap-2 text-primary"
      href="/"
    >
      <Image
        className="rounded-md"
        src={logo}
        alt="logo"
        width={50}
        height={50}
      />
      <span className={`${className} text-2xl font-bold`}>Zeap Fashion</span>
    </Link>
  );
};

export default Logo;
