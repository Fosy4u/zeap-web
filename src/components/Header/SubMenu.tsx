import React, { useContext, useEffect, useState } from "react";
import SubProductPrimaryNav from "./SubProductPrimaryNav";
import ChildrenLayout from "./childrenSubMenus/ChildrenLayout";
import { ThemeContext } from "@/contexts/themeContext";

const SubMenu = ({
  setIsVisable
}:{setIsVisable?: React.Dispatch<React.SetStateAction<boolean>>;}) => {
  const { setDimBackground } = useContext(ThemeContext);
  const [isOpen, setIsOpen] = useState(false);
  const [hovered, setHovered] = useState("");

  useEffect(() => {
    setDimBackground(isOpen);
  }, [isOpen, setDimBackground]);

  return (
    <div
      className="nc-SubMenu relative flex flex-col  bg-white mb-2 lg:mb-0"
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => {
        setIsOpen(false);
        setHovered("");
      }}
      data-nc-id="SubMenu"
    >
      {" "}
      <div className="  gap-4 ">
        <SubProductPrimaryNav hovered={hovered} setHovered={setHovered} setIsOpen={setIsOpen} setIsVisable={setIsVisable} />
      </div>
      {/* subMenu Children */}
      {isOpen && (
        <div
          className={`flex w-full ${
            isOpen ? "opacity-100 h-[40vh]  " : "opacity-0 h-0 scale-0"
          } transition-all duration-300 ease-in-out`}
          // onClick={() => {
          //   setIsOpen(true);
          //   setHovered("");
          // }}
        >
          {/* This div is used to create a hover effect */}
          {/* animate slide in */}

          <ChildrenLayout
            hovered={hovered}
            setHovered={setHovered}
            setIsOpen={setIsOpen}
          />
        </div>
      )}
    </div>
  );
};

export default SubMenu;
