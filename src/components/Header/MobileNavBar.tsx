"use client";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { subNavPrimaryData } from "@/data/content";
import MobileSubProductPrimaryNav from "./MobileSubProductPrimaryNav";
import { useEffect, useState } from "react";
import MobileChildrenLayout from "./childrenSubMenus/MobileChildrenLayout";

const MobileNavBar = ({
  isVisable,
  setIsVisable,
}: {
  isVisable: boolean;
  setIsVisable: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const productGroupPage = searchParams.get("productGroupPage") || "HOME";
  const [hovered, setHovered] = useState<string | undefined>(undefined);
  const getFilteredSubNavData = () => {
    if (!productGroupPage) {
      return subNavPrimaryData.filter(
        (item) => item.productGroupNav === "HOME"
      );
    }
    const navData =
      subNavPrimaryData.filter(
        (item) =>
          item.productGroupNav === productGroupPage ||
          item.matchedHref === pathname
      ) || [];
    //ensure no duplicate labels
    const uniqueLabels = new Set();
    return navData.filter((item) => {
      if (uniqueLabels.has(item.label)) {
        return false;
      }
      uniqueLabels.add(item.label);
      return true;
    });
  };

  const filteredSubNavData = getFilteredSubNavData();

  useEffect(() => {
    if (isVisable) {
      setHovered(undefined);
    }
  }, [isVisable]);
  const getSalesLink = () => {
    if (productGroupPage === "READY TO WEAR") {
      return "/sales?productGroupPage=READY TO WEAR";
    } else if (productGroupPage === "BESPOKE") {
      return "/sales?productGroupPage=BESPOKE";
    } else {
      return "/sales";
    }
  };
  return (
    <div>
      <div
        className={`absolute left-0 w-full  bg-white z-50 transition-transform duration-300 ${
          isVisable && !hovered
            ? "translate-x-0  overflow-scroll "
            : "-translate-x-full h-0"
        }`}
      >
        <MobileSubProductPrimaryNav
          setIsVisable={setIsVisable}
          setHovered={setHovered}
        />
      </div>
      {isVisable && (
        <div
          // slide in and out from right
          className={`absolute right-0 w-full bg-white z-50 transition-transform duration-300 ${
            hovered && hovered !== undefined
              ? "translate-x-0"
              : "translate-x-full"
          }`}
        >
          <MobileChildrenLayout
            hovered={hovered}
            setHovered={setHovered}
            setIsVisable={setIsVisable}
          />
        </div>
      )}
      <div
        className={`flex transition-opacity duration-300 ${
          isVisable ? "opacity-0" : "opacity-100"
        }`}
      >
        <div className="flex gap-4 w-[100vw] overflow-auto lg:bg-primary lg:justify-start lg:items-center lg:gap-2 lg:px-4 lg:py-2 no-scrollbar">
          {filteredSubNavData?.length > 0 &&
            filteredSubNavData.map((item) => (
              <Link
                key={item.label + item.productGroupNav}
                href={{
                  pathname: item.matchedHref,
                  query: {
                    productGroupPage: item.productGroupNav,
                    subProductGroupPage: item.label,
                    collectionTitle: item.collectionTitle,
                  },
                }}
                onClick={() => {
                  if (setIsVisable) setIsVisable(false);
                }}
                className={`text-xs font-extrabold text-slate-900 lg:text-white  transition-all duration-300 ease-in-out p-1 lg:px-2`}
              >
                {item.label}
              </Link>
            ))}
          <Link
            href={getSalesLink()}
            onClick={() => {
              if (setIsVisable) setIsVisable(false);
            }}
            className={`text-xs font-bold text-gold transition-all duration-300 ease-in-out p-1 px-2 cursor-pointer `}
          >
            SALES
          </Link>
        </div>
      </div>
    </div>
  );
};

export default MobileNavBar;
