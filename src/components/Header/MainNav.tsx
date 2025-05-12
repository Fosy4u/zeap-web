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
import DropdownNotification from "./DropdownNotification";
import CurrencyPrefence from "./CurrencyPrefence";
import { AuthContext } from "@/contexts/authContext";
import { useContext } from "react";

const MainNav = () => {
  const { user } = useContext(AuthContext);
  return (
    <div className="flex flex-col gap-0">
      <div className="p-2 flex items-center md:justify-between">
        <div className="flex-1 flex items-center gap-4">
          <Logo className="hidden xl:block" />
          { !user?.shopId && (
            <Link
              href={"/sell-on-zeap"}
              className="hidden xl:block  font-semibold bg-lightSuccess  p-2 rounded-md cursor-pointer text-sm"
            >
              Sell on Zeap
            </Link>
          )}
          {user?.shopId && (
            <Link
              href="/shop"
              className="hidden xl:block  font-semibold bg-lightSuccess  p-2 rounded-md cursor-pointer text-sm"
            >
              My Shop
            </Link>
          )}
        </div>
        <div className=" hidden md:flex   flex-1  justify-end gap-1 md:gap-7 items-center w-full lg:px-2">
          {" "}
          <SearchHeader />
          <CurrencyPrefence />
          <WishMenuBar />
          <DropdownNotification />
          <CartMenuBar />
          <UserMenuBar />
        </div>

        <div className=" flex-1  lg:hidden  h-[3rem]  justify-end gap-1 md:gap-7 flex items-center w-full">
          <SearchHeader />
          <CurrencyPrefence />
          <WishMenuBar />
          <DropdownNotification />
          <CartMenuBar />
          <MobileUserMenuBar />
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
