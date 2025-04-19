import React from "react";

// import { NavLinks } from '@/data/content';
import Logo from "@/shared/Logo/Logo";

// import CartSideBar from "../CartSideBar";
// import NavigationItem from '../NavItem';
import MenuBar from "./MenuBar";
import DesktopMenuBar from "./DesktopMenuBar";
import SearchHeader from "./SearchHeader";
import CartMenuBar from "./CartMenuBar";
import WishMenuBar from "./WishMenuBar";
import { UserMenuBar } from "./UserMenuBar";
import { MobileUserMenuBar } from "./MobileUserMenuBar";

const MainNav = () => {
  return (
    <div className="flex flex-col gap-0">
      <div className="p-2 flex items-center justify-between">
        <div className="flex-1 flex items-center gap-4">
          <Logo className="hidden xl:block" />
          <span className="hidden xl:block  font-semibold bg-lightSuccess  p-2 rounded-md cursor-pointer text-sm">
            Sell on Zeap
          </span>
        </div>

        <div className=" flex-1   justify-end gap-7 flex items-center">
          <SearchHeader />
          <div className="hidden lg:flex">
            <UserMenuBar />
          </div>
          <div className="lg:hidden">
            <MobileUserMenuBar />
          </div>
          <WishMenuBar />

          {/* <CartSideBar /> */}
          <CartMenuBar />
        </div>

        <div className="lg:hidden">
          <MenuBar />
        </div>
      </div>
      <div className="hidden items-center gap-4 lg:flex justify-center">
        {/* {NavLinks.map((item) => (
          <NavigationItem key={item.id} menuItem={item} />
        ))} */}
        <DesktopMenuBar />
      </div>
    </div>
  );
};

export default MainNav;
