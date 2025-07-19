// import { NavLinks } from '@/data/content';
import Logo from "@/shared/Logo/Logo";

// import CartSideBar from "../CartSideBar";
// import NavigationItem from '../NavItem';
import MenuBar from "./MenuBar";
// import DesktopMenuBar from "./DesktopMenuBar";
import SearchHeader from "./SearchHeader";
import CartMenuBar from "./CartMenuBar";
import WishMenuBar from "./WishMenuBar";
import { UserMenuBar } from "./UserMenuBar";
import { MobileUserMenuBar } from "./MobileUserMenuBar";
import Link from "next/link";
import DropdownNotification from "./DropdownNotification";
import CurrencyPrefence from "./CurrencyPrefence";
import { AuthContext } from "@/contexts/authContext";
import { useContext, useState } from "react";

import ProductGroupNav from "./ProductGroupNav";
import MobileNavBar from "./MobileNavBar";
import SubMenu from "./SubMenu";

const MainNav = () => {
  const [isVisable, setIsVisable] = useState(false);
  const { user } = useContext(AuthContext);
  return (
    <div className="flex h-full flex-col gap-0">
      <div className="px-2 flex items-center md:justify-between">
        <div
          onClick={() => {
            if (isVisable) {
              setIsVisable(false);
            }
          }}
          className=" flex items-center gap-4 w-full"
        >
          <Logo className="hidden lg:block" />
        </div>
        <div className=" hidden lg:flex     justify-end gap-1 md:gap-2 lg:gap-4 items-center w-full lg:px-2 my-2">
          {" "}
          {!user?.shopId && (
            <Link
              href={"/sell-on-zeap"}
              className="hidden lg:block  font-semibold bg-lightSuccess  p-2 rounded-md cursor-pointer text-sm"
            >
              Sell on Zeap
            </Link>
          )}
          {user?.shopId && (
            <Link
              href="/shop"
              className="hidden lg:block  font-semibold bg-lightSuccess  p-2 rounded-md cursor-pointer text-sm "
            >
              My Shop
            </Link>
          )}
          <SearchHeader />
          <CurrencyPrefence />
          <WishMenuBar />
          <DropdownNotification />
          <CartMenuBar />
          <UserMenuBar />
        </div>

        <div
          onClick={() => {
            if (isVisable) {
              setIsVisable(false);
            }
          }}
          className="hidden md:flex flex-1  lg:hidden  h-[3rem]  justify-end gap-1 md:gap-7 flex items-center w-full"
        >
          <SearchHeader />
          <CurrencyPrefence />
          <WishMenuBar />
          <DropdownNotification />
          <CartMenuBar />
          <MobileUserMenuBar />
          <MenuBar isVisable={isVisable} setIsVisable={setIsVisable} />
        </div>
        <div
          onClick={() => {
            if (isVisable) {
              setIsVisable(false);
            }
          }}
          className=" flex-1  md:hidden  h-[3rem]  justify-end gap-1 md:gap-7 flex items-center w-full"
        >
          <SearchHeader />
          {/* <CurrencyPrefence /> */}
          <WishMenuBar />
          {/* <DropdownNotification /> */}
          <CartMenuBar />
          <MobileUserMenuBar />
          <MenuBar isVisable={isVisable} setIsVisable={setIsVisable} />
        </div>
      </div>
      <span className="block lg:hidden w-full p-1 py-2 bg-primary text-white  font-extrabold my-2 md:px-4">
        <ProductGroupNav />
      </span>
      <div className="hidden lg:flex  ">
        <SubMenu />
      </div>
      <div className="flex gap-4 h-full lg:hidden ">
        <MobileNavBar isVisable={isVisable} setIsVisable={setIsVisable} />
      </div>
      {/* <div className="hidden items-center gap-4 lg:flex justify-center">
        

        <DesktopMenuBar />
      </div> */}
    </div>
  );
};

export default MainNav;
