import React from "react";
import StartSelling from "./StartSelling";
import OurDifference from "./OurDifference";
import SellingSimplified from "./SellingSimplified";
import SellingProducts from "./SellingProducts";

const SellPage = () => {
  return (
    <div className="flex flex-col p-4 md:p-12 lg:p-16">
      <h1 className="text-2xl md:text-4xl font-bold text-center">
        Earn More With Us
      </h1>
      <span>
        <p className="text-md md:text-lg mt-4 font-semibold text-center text-slate-600">
          Join our platform and start selling your products to a wider audience.
        </p>
        <p className="text-md md:text-lg  font-semibold text-center text-slate-600">
          We offer a simple and efficient way to manage your sales and reach
          customers around the world.
        </p>

        <span className="flex justify-center mt-4 ">
          <StartSelling />
        </span>
      </span>
      <div className="md:p-6 lg:p-12">
        <OurDifference />
      </div>
      <div className="md:p-6 lg:p-12">
        <SellingSimplified />
      </div>
      <div className="md:p-6 lg:p-12">
        <SellingProducts />
      </div>

      <span className="flex justify-center mt-4 ">
          <StartSelling />
        </span>
    </div>
  );
};

export default SellPage;
