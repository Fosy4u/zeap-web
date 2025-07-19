import AccessoryChildrenSubMenus from "./AccessoryChildrenSubMenus";
import BagsChildrenSubMenus from "./BagsChildrenSubMenus";
import BottomsChildrenSubMenus from "./BottomsChildrenSubMenus";
import BrandsChildrenSubMenus from "./BrandsChildrenSubMenus";
import ClothingChildrenSubMenus from "./ClothingChildrenSubMenus";
import DressesChildrenSubMenus from "./DressesChildrenSubMenus";
import JeansChildrenSubMenus from "./JeansChildrenSubMenus";
import KidsChildrenSubMenus from "./KidsChildrenSubMenus";
import MatchingSetsChildrenSubMenus from "./MatchingSetChildrenSubMenus";
import MenChildrenSubMenus from "./MenChildrenSubMenus";
import SalesChildrenSubMenus from "./SalesChildrenSubMenus";
import ShoeChildrenSubMenus from "./ShoesChildrenSubMenus";
import TopsChildrenSubMenus from "./TopsChildrenSubMenus";
import WeddingChildrenSubMenus from "./WeddingChildrenSubMenus";
import WomenChildrenSubMenus from "./WomenChildrenSubMenus";

const ChildrenLayout = ({
  hovered,
  setHovered,
  setIsOpen,
}: {
  hovered: string;
  setHovered: (value: string) => void;
  setIsOpen: (value: boolean) => void;
}) => {
  return (
    <>
      {hovered === "WOMEN" && (
        <WomenChildrenSubMenus setHovered={setHovered} setIsOpen={setIsOpen} />
      )}
      {hovered === "MEN" && (
        <MenChildrenSubMenus setHovered={setHovered} setIsOpen={setIsOpen} />
      )}
      {hovered === "KIDS" && (
        <KidsChildrenSubMenus setHovered={setHovered} setIsOpen={setIsOpen} />
      )}
      {hovered === "BAGS" && (
        <BagsChildrenSubMenus setHovered={setHovered} setIsOpen={setIsOpen} />
      )}
      {hovered === "ACCESSORIES" && (
        <AccessoryChildrenSubMenus
          setHovered={setHovered}
          setIsOpen={setIsOpen}
        />
      )}
      {hovered === "DRESSES" && (
        <DressesChildrenSubMenus
          setHovered={setHovered}
          setIsOpen={setIsOpen}
        />
      )}
      {hovered === "CLOTHINGS" && (
        <ClothingChildrenSubMenus
          setHovered={setHovered}
          setIsOpen={setIsOpen}
        />
      )}
      {hovered === "SHOES" && (
        <ShoeChildrenSubMenus setHovered={setHovered} setIsOpen={setIsOpen} />
      )}
      {hovered === "WEDDINGS" && (
        <WeddingChildrenSubMenus
          setHovered={setHovered}
          setIsOpen={setIsOpen}
        />
      )}
      {hovered === "JEANS" && (
        <JeansChildrenSubMenus setHovered={setHovered} setIsOpen={setIsOpen} />
      )}
      {hovered === "TOPS" && (
        <TopsChildrenSubMenus setHovered={setHovered} setIsOpen={setIsOpen} />
      )}
      {hovered === "BOTTOMS" && (
        <BottomsChildrenSubMenus
          setHovered={setHovered}
          setIsOpen={setIsOpen}
        />
      )}
      {hovered === "MATCHING SETS" && (
        <MatchingSetsChildrenSubMenus
          setHovered={setHovered}
          setIsOpen={setIsOpen}
        />
      )}
      {hovered === "BRANDS" && (
        <BrandsChildrenSubMenus setHovered={setHovered} setIsOpen={setIsOpen} />
      )}
      {hovered === "SALES" && (
        <SalesChildrenSubMenus setHovered={setHovered} setIsOpen={setIsOpen} />
      )}
    </>
  );
};

export default ChildrenLayout;
