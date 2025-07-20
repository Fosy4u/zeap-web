import type { FC } from "react";
import React from "react";

import MainNav from "./MainNav";

export type HeaderProps = object;

const Header: FC<HeaderProps> = () => {
  return (
    <div className="nc-Header fixed  inset-x-0 top-0 z-50 bg-white ">
      <MainNav />
    </div>
  );
};

export default Header;
