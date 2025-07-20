import SubMenu from "./SubMenu";
import MobileSubProductPrimaryNav from "./MobileSubProductPrimaryNav";
import { useEffect, useState } from "react";
import MobileChildrenLayout from "./childrenSubMenus/MobileChildrenLayout";

const MobileNavBar = ({ isVisable, setIsVisable }: { isVisable: boolean; setIsVisable: React.Dispatch<React.SetStateAction<boolean>>; }) => {
  const [hovered, setHovered] = useState<string | undefined>(undefined);

  useEffect(() => {
    if (isVisable) {
      setHovered(undefined);
    }
  }, [isVisable]);
  return (
    <div>
      <div
        className={`absolute left-0 w-full  bg-white z-50 transition-transform duration-300 ${
          isVisable && !hovered
            ? "translate-x-0  overflow-scroll "
            : "-translate-x-full h-0"
        }`}
      >
        <MobileSubProductPrimaryNav setIsVisable={setIsVisable} />
      </div>
      <div
        // slide in and out from right
        className={`absolute right-0 w-full bg-white z-50 transition-transform duration-300 ${
          isVisable && hovered ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <MobileChildrenLayout hovered={hovered} setHovered={setHovered} setIsVisable={setIsVisable}/>
      </div>
      <div
        className={`flex transition-opacity duration-300 ${
          isVisable ? "opacity-0" : "opacity-100"
        }`}
      >
        <SubMenu />
      </div>
    </div>
  );
};

export default MobileNavBar;
