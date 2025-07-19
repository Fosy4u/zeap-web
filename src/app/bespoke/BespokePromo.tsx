"use client";

import zeapApiSlice from "@/redux/services/zeapApi.slice";
import { PromoInterface } from "@/interface/interface";
import { useSelector } from "react-redux";
import { globalSelectors } from "@/redux/services/global.slice";
import Image from "next/image";

const BespokePromo = () => {
  const token = useSelector(globalSelectors.selectAuthToken);
  const permittedProductTypes = ["bespokeCloth", "bespokeShoe"];
  const promosQuery = zeapApiSlice.useGetPromosQuery(
    {
      permittedProductTypes,
    },
    {
      skip: !token,
    }
  );
  const promos = promosQuery?.data?.data || [];

  const getPromoSubtitle = (promo: PromoInterface) => {
    if (promo.discount.fixedPercentage) {
      return `Get ${promo.discount.fixedPercentage}% off`;
    }
    if (promo.discount.rangePercentage) {
      return `Get ${promo.discount.rangePercentage.min}% - ${promo.discount.rangePercentage.max}% off`;
    }
    return "Limited time offer";
  };

  const getDuplicate = () => {
    if (promos.length === 0 || !promos) {
      return [];
    }
    const min = 20;
    if (promos.length < min) {
      const duplicates = Math.ceil(min / promos.length);
      return Array.from({ length: duplicates }, () => promos).flat();
    }
    return promos;
  };

  return (
    <div className="bg-black mt-10 flex flex-col items-center justify-center w-full py-4">
      <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-4">
        SALES
      </h2>
      <p className="text-lg md:text-xl text-slate-300 mb-6">
        Discover our exclusive bespoke fashion offers
      </p>
      <div className="overflow-hidden  flex">
        <ul className="flex  gap-10   animate-infinite-scroll py-4 ">
          {getDuplicate().map((promo: PromoInterface, index: number) => (
            <li
              key={index}
              className="flex gap-2 items-center w-full cursor-pointer"
            >
              <div className="flex flex-col p-4 text-white min-w-[40rem]">
                {promo?.largeScreenImageUrl?.type && (
                  <>
                    <div className="hidden md:block">
                      {promo?.largeScreenImageUrl?.type === "image" ? (
                        <Image
                          src={promo?.largeScreenImageUrl?.link}
                          alt="Promo Image"
                          width={100}
                          height={100}
                          layout="responsive"
                          className="w-[60rem] h-auto  rounded-md"
                        />
                      ) : (
                        <video
                          src={promo?.largeScreenImageUrl?.link}
                          controls
                          className="w-[60rem] h-auto rounded-md"
                          preload="none"
                          autoPlay
                          muted
                          loop
                          playsInline
                          style={{ objectFit: "cover" }}
                        />
                      )}
                    </div>
                    <div className="md:hidden">
                      {promo?.smallScreenImageUrl?.type === "image" ? (
                        <Image
                          src={promo?.smallScreenImageUrl?.link}
                          alt="Promo Image"
                          width={100}
                          height={100}
                          layout="responsive"
                          className="w-[40rem] h-auto rounded-md"
                        />
                      ) : (
                        <video
                          src={promo?.smallScreenImageUrl?.link}
                          controls
                          className="w-[40rem] h-auto rounded-md"
                          preload="none"
                          autoPlay
                          muted
                          loop
                          playsInline
                          style={{ objectFit: "cover" }}
                        />
                      )}
                    </div>
                    {!promo?.largeScreenImageUrl?.type && (
                      // displate title and subtitle
                      <div className="flex flex-col items-center">
                        <h3 className="text-lg font-semibold w-full">
                          {promo.title}
                        </h3>
                        <p className="text-sm w-full">
                          {getPromoSubtitle(promo)}
                        </p>
                      </div>
                    )}
                  </>
                )}
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default BespokePromo;

{
  /* <li key={index} className="flex gap-2 items-center w-full">
<div className=" flex flex-col p-4 text-white min-w-[20rem]">
  <h3 className="text-lg font-semibold w-full">
    {promo.title}
  </h3>
  <p className="text-sm w-full">{getPromoSubtitle(promo)}</p>
</div>
</li> */
}
