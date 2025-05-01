"use client";
import { AuthContext } from "@/contexts/authContext";
import {
  Drawer,
  DrawerHeader,
  DrawerItems,
  List,
  ListItem,
  Popover,
} from "flowbite-react";
import { useCallback, useContext, useEffect, useState } from "react";
import {
  HiDatabase,
  HiGift,
  HiInbox,
  HiLogout,
  HiUserCircle,
} from "react-icons/hi";
import { LuUser2 } from "react-icons/lu";
import { SignInSignUpDrawer } from "../../authentication/SignInSignUpDrawer";
import { ThemeContext } from "@/contexts/themeContext";
import { usePathname, useRouter } from "next/navigation";
import { HiHandThumbUp, HiScissors, HiShoppingBag } from "react-icons/hi2";
import Image from "next/image";
import Link from "next/link";


const drawerTheme = {
  root: {
    base: "fixed z-50 overflow-y-auto bg-white p-4 transition-transform dark:bg-gray-800",
    backdrop: "fixed inset-0 z-30 bg-gray-900/50 dark:bg-gray-900/80",
    edge: "bottom-16",
    position: {
      right: {
        on: "right-0 top-0 h-screen w-screen md:w-[35rem] transform-none",
        off: "right-0 top-0 h-screen w-80 translate-x-full",
      },
    },
  },
};

export function UserMenuBar() {
  const pathname = usePathname()
  const { isAuthenticated, user, logout } = useContext(AuthContext);
  const router = useRouter();
  const { setDimBackground } = useContext(ThemeContext);
  const [isOpen, setIsOpen] = useState(false);
  const handleClose = useCallback(() => {
    document.body.classList.remove("overflow-y-hidden");
    setIsOpen(false);
  }, [setIsOpen]);

  useEffect(() => {
    if (isOpen) {
      setDimBackground(true);
    } else {
      setDimBackground(false);
    }
  }, [isOpen, setDimBackground]);

  useEffect(() => {
    if (isOpen) {
      document.body.classList.add("overflow-y-hidden");
    } else {
      document.body.classList.remove("overflow-y-hidden");
    }
  }, [isOpen]);

  useEffect(() => {
    if (isAuthenticated && !user?.isGuest) {
      handleClose();
    }
  }, [isAuthenticated, user?.isGuest, handleClose]);

  const content = (
    <div className="w-64 text-sm text-gray-500 dark:text-gray-400 flex flex-col gap-2 bg-white">
      <div className="flex flex-col items-center gap-2 w-full ">
        {(!user || user?.isGuest) && (
          <div className="flex flex-col gap-1 w-full bg-grey7">
            <div className="flex justify-center gap-2 w-full p-2">
              <span
                onClick={() => {
                  if (!user || user?.isGuest) {
                    localStorage.setItem("redirectSignInPath", pathname);
                    return setIsOpen(true);
                  }
                  return;
                }}
                className="font-semibold text-sm border bg-primary text-white px-6 py-2 rounded-full items-center justify-center flex cursor-pointer"
              >
                Sign In
              </span>
              <span
                onClick={() => {
                  if (!user || user?.isGuest) {
                    // save the current pathname to local storage
                    localStorage.setItem("redirectSignInPath", pathname);
                    return setIsOpen(true);
                  }
                  return;
                }}
                className="font-semibold text-sm border bg-lightGold text-black px-6 py-2 rounded-full items-center justify-center flex cursor-pointer"
              >
                Sign Up
              </span>
            </div>
            <hr className="border-b border-slate-300 w-full" />
          </div>
        )}
        {user && !user?.isGuest && (
          <div className="flex flex-col gap-1 w-full bg-grey7">
            <div className="flex justify-center gap-2 w-full p-2 font-bold">
              Hi {user?.firstName}
            </div>
          </div>
        )}

        <div className="flex w-full p-2 ">
          <List className="w-full flex flex-col gap-4">
            <ListItem
              className="hover:bg-slate-100 p-2 rounded-md cursor-pointer"
              icon={() => <HiDatabase className="text-info mr-3" />}
              onClick={() => {
                if (!user || user?.isGuest) {
                  return setIsOpen(true);
                }
                router.push("/account/dashboard");
              }}
            >
              Dashboard
            </ListItem>
            <ListItem
              className="hover:bg-slate-100 p-2 rounded-md cursor-pointer"
              icon={() => <HiUserCircle className="text-info mr-3" />}
              onClick={() => {
                if (!user || user?.isGuest) {
                  return setIsOpen(true);
                }
                router.push("/account/profile");
              }}
            >
              My Info
            </ListItem>
            <ListItem
              className="hover:bg-slate-100 p-2 rounded-md cursor-pointer"
              icon={() => <HiShoppingBag className="text-info mr-3" />}
              onClick={() => {
                if (!user || user?.isGuest) {
                  return setIsOpen(true);
                }
                router.push("/account/orders");
              }}
            >
              Orders
            </ListItem>
            <ListItem
              className="hover:bg-slate-100 p-2 rounded-md cursor-pointer"
              icon={() => <HiScissors className="text-info mr-3" />}
              onClick={() => {
                if (!user || user?.isGuest) {
                  return setIsOpen(true);
                }
                router.push("/account/measurement-templates");
              }}
            >
              Measurement Templates
            </ListItem>
            <ListItem
              className="hover:bg-slate-100 p-2 rounded-md cursor-pointer"
              icon={() => <HiHandThumbUp className="text-info mr-3" />}
              onClick={() => {
                if (!user || user?.isGuest) {
                  return setIsOpen(true);
                }
                router.push("/account/reviews");
              }}
            >
              Reviews & Ratings
            </ListItem>

            <ListItem
              className="hover:bg-slate-100 p-2 rounded-md cursor-pointer"
              icon={() => <HiInbox className="text-info mr-3" />}
              onClick={() => {
                if (!user || user?.isGuest) {
                  return setIsOpen(true);
                }
                router.push("/account/notifications");
              }}
            >
              Notifications
            </ListItem>
            <ListItem
              className="hover:bg-slate-100 p-2 rounded-md cursor-pointer"
              icon={() => <HiGift className="text-info mr-3" />}
              onClick={() => {
                if (!user || user?.isGuest) {
                  return setIsOpen(true);
                }
                router.push("/account/rewards");
              }}
            >
              Points & Vouchers
            </ListItem>
          </List>
        </div>
        {user && !user?.isGuest && (
          <div onClick={logout} className="flex flex-col w-full ">
            <hr className="border-b border-slate-300 w-full my-2" />
            <ListItem
              className="hover:bg-slate-100 p-2 rounded-md cursor-pointer text-danger"
              icon={() => <HiLogout className=" mr-3" />}
            >
              Logout
            </ListItem>
            <hr className="border-b border-slate-300 w-full mb-2" />
          </div>
        )}
        <Link
          href={!user || user?.isGuest ? "/account/login" : "/sell-on-zeap"}
          className="flex w-full p-2 justify-center mt-6"
        >
          <span className="block  font-semibold bg-lightSuccess  p-2 rounded-md cursor-pointer text-sm w-full text-center">
            Sell on Zeap
          </span>
        </Link>
      </div>
    </div>
  );

  return (
    <div className="flex gap-2">
      <Popover content={content} trigger="hover">
        <button
          type="button"
          className="relative inline-flex items-center p-3 text-sm  text-center  rounded-full hover:bg-slate-200  focus:outline-none"
          onClick={() => {
            if (!user || user?.isGuest) {
              return setIsOpen(true);
            }
            router.push("/account/dashboard");
          }}
        >
          {user?.imageUrl?.link ? (
            <span className="w-8 h-8 rounded-full overflow-hidden">
              <Image
                src={user?.imageUrl?.link}
                alt="user image"
                width={100}
                height={100}
                className="object-cover w-full h-full rounded-full"
              />
            </span>
          ) : (
            <LuUser2 className="text-2xl" />
          )}
        </button>
      </Popover>
      {isOpen && (
        <Drawer
          theme={drawerTheme}
          open={isOpen}
          onClose={handleClose}
          position="right"
        >
          <DrawerHeader />
          <DrawerItems>
            <SignInSignUpDrawer callBack={handleClose} />{" "}
          </DrawerItems>
        </Drawer>
      )}
    </div>
  );
}
