import React, { useContext } from "react";

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
import Link from "next/link";
import { AuthContext } from "@/contexts/authContext";
import DropdownNotification from "./DropdownNotification";

const MainNav = () => {
  const { user } = useContext(AuthContext);
  return (
    <div className="flex flex-col gap-0">
      <div className="p-2 flex items-center md:justify-between">
        <div className="flex-1 flex items-center gap-4">
          <Logo className="hidden xl:block" />
          <Link
            href={!user || user?.isGuest ? "/account/login" : "/sell-on-zeap"}
            className="hidden xl:block  font-semibold bg-lightSuccess  p-2 rounded-md cursor-pointer text-sm"
          >
            Sell on Zeap
          </Link>
        </div>

        <div className=" flex-1   justify-end gap-1 md:gap-7 flex items-center w-full">
          <div className="hidden lg:flex">
            <UserMenuBar />
          </div>
          <SearchHeader />
          <WishMenuBar />

          {/* <CartSideBar /> */}

          <DropdownNotification />
          <CartMenuBar />

          <div className="lg:hidden flex items-center gap-1 w-full">
            <MobileUserMenuBar />

            <MenuBar />
          </div>
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
