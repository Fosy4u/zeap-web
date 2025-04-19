import { ProductInterface } from "@/interface/interface";
import pluralize from "pluralize";
import ProductCard from "./ProductCard";
import Link from "next/link";

const ProductCollectionDisplay = ({
  products,
  title = "Collections",
  subMenus,
  subTitle,
  setSubTitle,
  colorOptions,
}: {
  products: ProductInterface[];
  title?: string;
  subMenus?: { value: string; link: string }[];
  subTitle?: string;
  setSubTitle: (value: string) => void;
  colorOptions: { name: string; hex?: string; background?: string }[];
}) => {
  console.log("subTitle", subTitle);
  return (
    <div className=" min-h-[70vh] max-h-[100vh] flex flex-col gap-4 overflow-auto ">
      <span className="flex gap-2 items-center">
        {title && (
          <p className="text-lg font-semibold text-gray-800 mb-4">{title}</p>
        )}
        {subTitle && (
          <p className="text-md  text-gray-800 mb-4">- {subTitle}</p>
        )}
      </span>
      <div className="flex overflow-scroll gap-2 w-full ">
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
      <div className="grid gap-2 md:gap-4 grid-cols-2 md:grid-cols-3 2xl:grid-cols-4 ">
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
