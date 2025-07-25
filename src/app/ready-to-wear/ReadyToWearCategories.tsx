"use client";

import WomenImage from "@/images/rtw_women.webp";
import MenImage from "@/images/rtw_men.webp";
import KidsImage from "@/images/rtw_kid.webp";
import DressImage from "@/images/rtw_dress.webp";
import MatchingSetImage from "@/images/rtw_matching.webp";
import zeapApiSlice from "@/redux/services/zeapApi.slice";
import { useEffect, useState } from "react";
import Link from "next/link";
import Image, { StaticImageData } from "next/image";
import { useSelector } from "react-redux";
import { globalSelectors } from "@/redux/services/global.slice";
import ShoesImage from "@/images/sneakers_1.webp";
import { getCurrencySmallSymbol } from "@/utils/helpers";

const categories = [
  {
    id: 1,
    label: "WOMEN",
    matchedHref:
      "/collections/gender=Female/ageGroup=Adults/isReadyMade=true/productType=readyMadeCloth,readyMadeShoe?collectionTitle=ALL%20WOMEN'S%20READY%20TO%20WEAR%20COLLECTIONS&productGroupPage=READY%20TO%20WEAR",
    params: {
      gender: "Female",
      ageGroup: "Adults",
      isReadyMade: true,
    },
    image: WomenImage,
  },

  {
    id: 2,
    label: "MEN",
    matchedHref:
      "/collections/gender=Male/ageGroup=Adults/isReadyMade=true/productType=readyMadeCloth,readyMadeShoe?collectionTitle=ALL%20MEN'S%20READY%20TO%20WEAR%20COLLECTIONS&productGroupPage=READY%20TO%20WEAR",
    params: {
      gender: "Male",
      ageGroup: "Adults",
      isReadyMade: true,
    },
    image: MenImage,
  },
  {
    id: 3,
    label: "KIDS",

    matchedHref:
      "/collections/ageGroup=Kids/isReadyMade=true/productType=readyMadeCloth,readyMadeShoe?collectionTitle=ALL%20KIDS%20READY%20TO%20WEAR%20COLLECTIONS&productGroupPage=READY%20TO%20WEAR",
    params: {
      ageGroup: "Kids",
      isReadyMade: true,
    },
    image: KidsImage,
  },
  {
    id: 4,
    label: "DRESSES",
    matchedHref:
      "/collections/ageGroup=Adults/gender=Female/isReadyMade=true/main=Dress/productType=readyMadeCloth?collectionTitle=ALL%20READY%20TO%20WEAR%20DRESSES&productGroupPage=READY%20TO%20WEAR",
    params: {
      isReadyMade: true,
      main: "Dress",
      ageGroup: "Adults",
      productType: "readyMadeCloth",
      gender: "Female",
    },
    image: DressImage,
  },
  {
    id: 5,
    label: "MATCHING SETS",
    matchedHref:
      "/collections/ageGroup=Adults/isReadyMade=true/main=Matching Set?collectionTitle=ALL%20READY%20TO%20WEAR%20MATCHING%20SETS&productGroupPage=READY%20TO%20WEAR",
    params: {
      isReadyMade: true,
      main: "Matching Set",
      ageGroup: "Adults",
    },
    image: MatchingSetImage,
  },
  {
    id: 6,
    label: "SHOES",
    matchedHref:
      "/collections/ageGroup=Adults/isReadyMade=true/productType=readyMadeShoe?collectionTitle=ALL%20READY%20TO%20WEAR%20SHOES&productGroupPage=READY%20TO%20WEAR",
    params: {
      isReadyMade: true,
      ageGroup: "Adults",
      productType: "readyMadeShoe",
    },
    image: ShoesImage,
  },
];

type CategoryType = {
  id: number;
  label: string;
  matchedHref: string;
  minPrice: number;
  currency: string;
  image: string | StaticImageData;
};

const ReadyToWearCategories = () => {
  const token = useSelector(globalSelectors.selectAuthToken);
  const [data, setData] = useState<CategoryType[]>();
  const [minPriceTrigger, getMinPriceTriggerStatus] =
    zeapApiSlice.useLazyGetMinProductPriceQuery();
  const isLoading = getMinPriceTriggerStatus.isLoading;
  useEffect(() => {
    if (!token) return;
    const newData: CategoryType[] = [];
    categories.forEach((category) => {
      minPriceTrigger({
        ...category.params,
      })
        .unwrap()
        .then((res) => {
          const minPrice = res.data.minPrice;
          const currency = res.data.currency || "NGN";
          if (!minPrice || minPrice <= 0) {
            return;
          }
          newData.push({
            label: category.label,
            matchedHref: category.matchedHref,
            minPrice: minPrice,
            currency: currency,
            image: category.image,
            id: category.id,
          });
          if (newData.length === categories.length) {
            setData(newData.sort((a, b) => a.id - b.id));
          }
        })
        .catch((err) => {
          console.error("Error fetching min price:", err);
        });
    });
  }, [minPriceTrigger, token]);
  return (
    <>
      {isLoading && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {Array.from({ length: 6 }).map((_, index: number) => (
            <div
              key={index}
              className="flex flex-col items-center justify-center p-4 bg-gray-200 rounded-lg shadow animate-pulse"
            >
              <div className="w-full h-48 bg-gray-300 rounded mb-2"></div>
              <div className="w-3/4 h-6 bg-gray-300 rounded mb-2"></div>
              <div className="w-1/2 h-6 bg-gray-300 rounded"></div>
            </div>
          ))}
        </div>
      )}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 ">
        {data?.map((category) => (
          <Link
            key={category.id}
            href={category.matchedHref}
            className="flex flex-col items-center justify-center p-4 rounded-lg shadow hover:shadow-lg transition-shadow duration-300"
          >
            <Image
              src={category.image}
              alt={category.label}
              width={200}
              height={200}
              loading="lazy"
              className="w-full h-[45rem] object-cover mb-2 rounded"
            />
            <span className="absolute top-2 right-2 bg-white text-gray-800 text-xs font-semibold px-2 py-1 rounded">
              {category.minPrice
                ? `$${category.minPrice}`
                : "Price Unavailable"}
            </span>
            <span className="text-lg font-bold">{category.label}</span>
            <Link
              href={category.matchedHref}
              className="mt-2 text-success hover:underline"
            >
              Shop Now
            </Link>
            {category.minPrice && (
              <span className="text-sm ">
                Starting at {getCurrencySmallSymbol(category.currency)}
                {category.minPrice}
              </span>
            )}
          </Link>
        ))}
      </div>
    </>
  );
};

export default ReadyToWearCategories;
