"use client";
import { AuthContext } from "@/contexts/authContext";
import { useRouter } from "next/navigation";
import React, { useContext, useEffect } from "react";

import AccountNavBar from "@/components/account/AccountNavBar";

import MyRecommendedProducts from "@/components/products/MyRecommendedProducts";
import { useSelector } from "react-redux";
import { globalSelectors } from "@/redux/services/global.slice";
import zeapApiSlice from "@/redux/services/zeapApi.slice";
import Loading from "@/app/loading";

const ReviewsPage = () => {
  const router = useRouter();
  const token = useSelector(globalSelectors.selectAuthToken);
  const { user } = useContext(AuthContext);
  const getUserReviewsQuery = zeapApiSlice.useGetUserReviewsQuery(
    {},
    { skip: !token }
  );
  const reviews = getUserReviewsQuery?.data?.data;
  const isLoading = getUserReviewsQuery.isLoading;
  const isFulfilled = getUserReviewsQuery?.status === "fulfilled";

  useEffect(() => {
    if (user?.isGuest) {
      router.push("/account/login");
    }
  }, [user, router]);
  return (
    <div className="min-h-screen md:px-2 h-full overflow-auto ">
      <div className="grid  grid-cols-1 md:grid-cols-4 p-4 md:p-6 md:px-10">
        <div className="hidden md:col-span-1 md:block">
          <AccountNavBar />
        </div>
        {user && !user?.isGuest && (
          <div className="col-span-1 md:col-span-3 ">
            <h1 className="text-2xl  font-bold sm:text-3xl lg:text-4xl mb-4">
              My Reviews
            </h1>
            {reviews?.length === 0 && isFulfilled && (
              <div className="flex flex-col items-center justify-center h-full">
                <h2 className="text-xl font-semibold">No Reviews Yet</h2>
                <p className="text-gray-500">
                  Start shopping and share your thoughts!
                </p>
              </div>
            )}
            {isLoading && <Loading />}
          </div>
        )}
      </div>
      <MyRecommendedProducts />
    </div>
  );
};

export default ReviewsPage;
