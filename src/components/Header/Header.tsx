import type { FC } from "react";
import React from "react";

import MainNav from "./MainNav";

export type HeaderProps = object;

const Header: FC<HeaderProps> = () => {
  return (
    <div className="nc-Header sticky inset-x-0 top-0 z-50 bg-white  md:py-1 ">
      <MainNav />
    </div>
  );
};

export default Header;
