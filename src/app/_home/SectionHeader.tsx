"use client";

import { Carousel } from "flowbite-react";

import zeapApiSlice from "@/redux/services/zeapApi.slice";
import { PromoInterface } from "@/interface/interface";
import { useSelector } from "react-redux";
import { globalSelectors } from "@/redux/services/global.slice";

import Image from "next/image";
import Link from "next/link";
import Loading from "../loading";

const SectionHeader = () => {
  const token = useSelector(globalSelectors.selectAuthToken);
  const promosQuery = zeapApiSlice.useGetPromosQuery(
    {},
    {
      skip: !token,
    }
  );
  const promos = promosQuery?.data?.data || [];

  const isLoading = promosQuery.isLoading;

  return (
    <div className="bg-primary ">
      {isLoading ? (
        <div className="grid gap-7 md:grid-cols-3 lg:grid-cols-4">
          <Loading />
        </div>
      ) : (
        <>
          <div className="h-full hidden md:block">
            <Carousel slideInterval={5000}>
              {promos?.map((promo: PromoInterface) => (
                <Link
                  key={promo?.promoId}
                  href={`/promo/${promo?.promoId}`}
                  className="relative h-full"
                >
                  {/* <div className="">
                    <div className="text-white bg-primary text-xl font-bold absolute bottom-10 left-10 border-2 border-white px-5 py-2 hover:bg-white hover:text-primary cursor-pointer rounded-md z-10">
                      Shop Now
                    </div>
                  </div> */}
                  {promo?.largeScreenImageUrl?.type === "image" ? (
                    <Image
                      key={promo?.promoId}
                      src={promo?.largeScreenImageUrl?.link}
                      alt="..."
                      layout="fill"
                      objectFit="cover"
                      className="w-full h-full"
                    />
                  ) : (
                    <video
                      key={promo?.promoId}
                      src={promo?.largeScreenImageUrl?.link}
                      autoPlay
                      muted
                      loop
                      playsInline
                      preload="none"
                      className="object-cover w-full h-full"
                    />
                  )}
                </Link>
              ))}
            </Carousel>
          </div>
          <div className="h-screen block md:hidden">
            <Carousel slideInterval={5000}>
              {promos?.map((promo: PromoInterface) => (
                <Link
                  key={promo?.promoId}
                  href={`/promo/${promo?.promoId}`}
                  className="relative h-full"
                >
                  {/* <div className="">
                    <div className="text-white z-50 bg-transparent text-sm font-bold absolute bottom-2 left-1 border-2 border-white px-5 py-2 hover:bg-white hover:text-primary cursor-pointer rounded-md">
                      Shop Now
                    </div>
                  </div> */}
                  {promo?.smallScreenImageUrl?.type === "image" ? (
                    <Image
                      key={promo?.promoId}
                      src={promo?.smallScreenImageUrl?.link}
                      alt="..."
                      layout="fill"
                      objectFit="cover"
                      className="w-full h-full"
                    />
                  ) : (
                    <video
                      key={promo?.promoId}
                      src={promo?.smallScreenImageUrl?.link}
                      autoPlay
                      muted
                      loop
                      playsInline
                      preload="none"
                      className="object-cover w-full h-full"
                    />
                  )}
                </Link>
              ))}
            </Carousel>
          </div>
        </>
      )}
    </div>
  );
};

export default SectionHeader;
