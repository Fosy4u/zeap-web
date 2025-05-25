import { ProductInterface } from "@/interface/interface";
import pluralize from "pluralize";
import ProductCard from "./ProductCard";
import Link from "next/link";
import { MobileProductFilters } from "./MobileProductFilters";

const ProductCollectionDisplay = ({
  products,
  title = "Collections",
  subMenus,
  subTitle,
  setSubTitle,
  colorOptions,
  showMobileFilters = false,
  dynamicFilters,
  totalCount,
}: {
  products: ProductInterface[];
  title?: string;
  subMenus?: { value: string; link: string }[];
  subTitle?: string;
  setSubTitle: (value: string) => void;
  colorOptions: { name: string; hex?: string; background?: string }[];
  showMobileFilters?: boolean;
  dynamicFilters: {
    name: string;
    type: string;
    options: Record<string, { value: string }>;
  }[];
  totalCount: number;
}) => {
  console.log("subTitle", subTitle);
  return (
    <div className="max-h-full md:max-h-[150vh] 2xl:max-h-[200vh] overflow-auto  flex flex-col gap-4  ">
      <span className="flex gap-2 items-center">
        {title && (
          <p className="text-lg font-semibold text-gray-800 mb-4">{title}</p>
        )}
        {subTitle && (
          <p className="text-md  text-gray-800 mb-4">- {subTitle}</p>
        )}
      </span>
      <div className="flex  gap-2 w-full ">
        {subMenus?.slice(0, 10)?.map((menu, index) => (
          <Link
            href={menu?.link?.replace("&", "%26")}
            key={index}
            onClick={() => setSubTitle(menu.value)}
          >
            <div className=" flex md:h-10 min-w-[6rem] w-full rounded-md border p-1 md:p-2 justify-center text-center items-center bg-slate-100 cursor-pointer hover:bg-slate-200 whitespace-nowrap text-xs">
              {pluralize(menu?.value || "")}
            </div>
          </Link>
        ))}
      </div>
      {showMobileFilters && (
        <div className="flex lg:hidden">
          <MobileProductFilters
            dynamicFilters={dynamicFilters}
            totalCount={totalCount}
            setSubTitle={setSubTitle}
            colorOptions={colorOptions}
          />
        </div>
      )}
      <div className="grid gap-1 md:gap-4 grid-cols-2 md:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-5 ">
        {products.map((item) => (
          <ProductCard
            product={item}
            key={item._id}
            colorOptions={colorOptions}
          />
        ))}
      </div>
    </div>
  );
};

export default ProductCollectionDisplay;
