"use client";
import { globalSelectors } from "@/redux/services/global.slice";
import zeapApiSlice from "@/redux/services/zeapApi.slice";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useSelector } from "react-redux";
import RenderChildrenSubMenus from "./RenderChildrenSubMenus";
import AccessImage from "@/images/access_1.jpg";
import { usePathname, useSearchParams } from "next/navigation";

const productGroupNavOptions = [
  {
    label: "HOME",
    href: "/",
    imageLink: "/collections/ageGroup=Adults/productType=accessory",
    params: {
      ageGroup: "Adults",
      productType: "accessory",
    },
    image: AccessImage,
    baseCollectionTitle: "Accessories",
  },
  {
    label: "ACCESSORIES",
    href: "/",
    imageLink: "/collections/ageGroup=Adults/productType=accessory",
    params: {
      ageGroup: "Adults",
      productType: "accessory",
    },
    image: AccessImage,
    baseCollectionTitle: "Accessories",
  },
];
interface SupMenuOption {
  name: string;
  options: { label: string; link: string; collectionTitle: string }[];
}
type productsDynamicFilterType = {
  name: string;
  options: { value: string; count: number }[];
};
const AccessoryChildrenSubMenus = ({
  setHovered,
  setIsOpen,
}: {
  setHovered: (value: string) => void;
  setIsOpen: (value: boolean) => void;
}) => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const productGroupPage = searchParams.get("productGroupPage") || "HOME";
  const token = useSelector(globalSelectors.selectAuthToken);
  const image =
    productGroupNavOptions.find(
      (option) => pathname === option.href || productGroupPage === option.label
    )?.image || "";
  const imageLink =
    productGroupNavOptions.find(
      (option) => pathname === option.href || productGroupPage === option.label
    )?.imageLink || "";
  //   const [selectedMenu, setSelectedMenu] = useState<string | undefined>(
  //     undefined
  //   );
  const [childrenSubMenus, setChildrenSubMenus] = useState<
    SupMenuOption[] | []
  >([]);

  const getQueryParamObject = useCallback(() => {
    let params = {};
    const found = productGroupNavOptions.find(
      (option) => pathname === option.href || productGroupPage === option.label
    );
    if (found?.params) {
      params = found.params;
    }
    return params;
  }, [pathname, productGroupPage]);
  const ClothingsProductsDynamicFiltersQuery =
    zeapApiSlice.useGetProductsDynamicFiltersQuery(
      {
        ...getQueryParamObject(),
      },
      {
        skip:
          !token ||
          !pathname ||
          Object.keys(getQueryParamObject()).length === 0,
      }
    );

  const filteredProductsDynamicFilters = useMemo(() => {
    const productsDynamicFilters =
      ClothingsProductsDynamicFiltersQuery?.data?.data || [];
    return productsDynamicFilters.filter(
      (field: productsDynamicFilterType) =>
        field.name.toLowerCase() === "gender" ||
        field.name.toLowerCase() === "style" ||
        field.name.toLowerCase() === "design" ||
        field.name.toLowerCase() === "brand" ||
        field.name.toLowerCase() === "occasion" ||
        field.name.toLowerCase() === "heel type"
      // field.name.toLowerCase() === "accessory type"
    );
  }, [ClothingsProductsDynamicFiltersQuery?.data?.data]);

  useEffect(() => {
    const found = productGroupNavOptions.find(
      (option) => pathname === option.href || productGroupPage === option.label
    );
    const getSubMenuLink = (name: string, value: string) => {
      if (!found) return "";
      const baseLink = found.imageLink || "";
      const params = getQueryParamObject();
      const queryParams = new URLSearchParams(params);
      queryParams.set(name.toLowerCase(), value);
      // return `${baseLink}?${queryParams.toString()}`;
      return `${baseLink}/${name.toLowerCase()}=${value}`;
    };
    if (
      filteredProductsDynamicFilters &&
      filteredProductsDynamicFilters.length > 0
    ) {
      const subMenus = filteredProductsDynamicFilters.map(
        (filter: productsDynamicFilterType) => ({
          name: filter.name,
          // sort options by count in descending order
          options:
            // filter out empty other opttion
            // limit to 10 options
            // map options to objects with label property
            [...filter.options]
              .sort((a, b) => b.count - a.count)
              .map((option) => ({
                label: option.value,
                link: getSubMenuLink(filter.name, option.value),
                collectionTitle: `${
                  found?.baseCollectionTitle
                    ? `${found.baseCollectionTitle} - `
                    : ""
                } ${option.value}`,
              }))
              .filter((option) => option.label !== "Other")
              .slice(0, 10),
        })
      );
      setChildrenSubMenus(subMenus);
    }
  }, [
    filteredProductsDynamicFilters,
    getQueryParamObject,
    pathname,
    productGroupPage,
  ]);

  const getImageObj = () => {
    const imgaeObj = {
      src: image,
      link: imageLink,
      label: "Shop All Accessories",
      collectionTitle: "ALL ACCESSORIES",
    };

    return imgaeObj;
  };
  return (
    <div className="flex ">
      {childrenSubMenus.length > 0 && (
        <RenderChildrenSubMenus
          childrenSubMenus={childrenSubMenus}
          imageObj={getImageObj()}
          setHovered={setHovered}
          setIsOpen={setIsOpen}
          subProductGroupPage={
            productGroupNavOptions.find(
              (option) =>
                pathname === option.href || productGroupPage === option.label
            )?.label || "ACCESSORIES"
          }
          productGroupPage={productGroupPage}
        />
      )}
    </div>
  );
};

export default AccessoryChildrenSubMenus;
