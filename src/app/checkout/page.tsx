"use client";

import { useContext, useEffect, useRef, useState } from "react";
import ContactInfo from "./ContactInfo";
// import PaymentMethod from "./PaymentMethod";
import ShippingAddress from "./ShippingAddress";
import CartItem from "@/components/cart/CartItem";
import zeapApiSlice from "@/redux/services/zeapApi.slice";
import { useSelector } from "react-redux";
import { globalSelectors } from "@/redux/services/global.slice";
import { getCurrencySmallSymbol, numberWithCommas } from "@/utils/helpers";
import ApplyDiscount from "@/components/cart/ApplyDiscount";
import Skeleton from "@/components/loading/Skeleton";
import MobileCheckoutSummary from "./MobileCheckoutSummary";
import { Alert } from "flowbite-react";
import ButtonPrimary from "@/shared/Button/ButtonPrimary";
import LoadingDots from "@/components/loading/LoadingDots";
import { AuthContext } from "@/contexts/authContext";
//  import { usePaystackPayment } from "react-paystack";
import OrderSuccessModal from "./OrderSuccessModal";
import Loading from "../loading";
import EmptyBasket from "@/components/cart/EmptyBasket";

interface ColInterface {
  name: string;
  hex?: string;
  background?: string;
}

const CheckoutPage = () => {
  const { user } = useContext(AuthContext);
  const lastChildDiv = useRef<HTMLDivElement>(null);
  const [listDivISFocused, setListDivIsFocused] = useState(false);
  const [tabActive, setTabActive] = useState<
    "ContactInfo" | "ShippingAddress" | "PaymentMethod"
  >("ShippingAddress");
  const token = useSelector(globalSelectors.selectAuthToken);
  const [showOrderSuccessModal, setShowOrderSuccessModal] = useState(false);
  const [orderId, setOrderId] = useState("");
  const [serverError, setServerError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isLastItemVisible, setIsLastItemVisible] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState(user?.email);
  const [acceptMarketing, setAcceptMarketing] = useState(
    user?.acceptMarketing ? true : false
  );
  const [address, setAddress] = useState("");
  const [region, setRegion] = useState("");
  const [country, setCountry] = useState("Nigeria");
  const [postCode, setPostCode] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [shippingErrors, setErrors] = useState<{
    firstName?: string;
    lastName?: string;
    address?: string;
    region?: string;
    country?: string;
    phoneNumber?: string;
  }>({});
  const productOptionsQuery = zeapApiSlice.useGetProductsOptionsQuery(
    {},
    { skip: !token }
  );
  const options = productOptionsQuery?.data?.data;
  const colorOptions: ColInterface[] = options?.readyMadeClothes?.colorEnums;
  const cartQuery = zeapApiSlice.useGetCartQuery({}, { skip: !token });
  const isFulfilled = cartQuery?.status === "fulfilled";
  const cart = cartQuery?.data?.data;
  const basketItems = cart?.basketItems || [];
  // const deliveryFee = cart?.deliveryFee === 0 ? "Free" : cart?.deliveryFee;
  // const subTotal = cart?.subTotal;
  // const total = cart?.total;
  const getBasketTotalQuery = zeapApiSlice.useGetBasketTotalQuery(
    { country },
    { skip: !token || !country }
  );
  const basketCalc = getBasketTotalQuery?.data?.data;
  console.log("basketCalc", basketCalc);
  const deliveryFee =
    basketCalc?.deliveryFee === 0 ? "Free" : basketCalc?.deliveryFee;
  const subTotal = basketCalc?.subTotal;
  const appliedVoucherAmount = basketCalc?.appliedVoucherAmount;
  const total = basketCalc?.total;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [paystackPayment, setPaystackPayment] = useState<any>();

  useEffect(() => {
    const loadPaystack = async () => {
      const paystackPayment = await import("react-paystack");
      console.log("initializePayment", paystackPayment);

      setPaystackPayment(() => paystackPayment.usePaystackPayment);
    };
    loadPaystack();
  }, []);

  const [getReferenceTrigger, getReferenceTriggerStatus] =
    zeapApiSlice.useLazyGetPaymentReferenceQuery();
  const [verifyPayment, verifyPaymentStatus] =
    zeapApiSlice.useVerifyPaymentMutation();

  const handleScrollToEl = (id: string) => {
    const element = document.getElementById(id);
    setTimeout(() => {
      element?.scrollIntoView({ behavior: "smooth" });
    }, 80);
  };
  useEffect(() => {
    if (lastChildDiv.current) {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setIsLastItemVisible(true);
            } else {
              setIsLastItemVisible(false);
            }
          });
        },
        { threshold: 0.5 }
      );
      observer.observe(lastChildDiv.current);
    }
  }, []);
  useEffect(() => {
    if (user) {
      if (user?.email && user?.email !== "") {
        setEmail(user?.email);
        setTabActive("ShippingAddress");
      }
    }
  }, [user]);

  useEffect(() => {
    if (!email) {
      return setTabActive("ContactInfo");
    }
  }, [firstName, lastName, email]);

  const validateShipping = () => {
    const newErrors = {
      firstName: "",
      lastName: "",
      address: "",
      region: "",
      country: "",
      phoneNumber: "",
    };
    if (!firstName) {
      newErrors.firstName = "First name is required";
    }
    if (!lastName) {
      newErrors.lastName = "Last name is required";
    }
    if (!address) {
      newErrors.address = "Address is required";
    }
    if (!region) {
      newErrors.region = "Region is required";
    }
    if (!country) {
      newErrors.country = "Country is required";
    }
    if (!phoneNumber) {
      newErrors.phoneNumber = "Phone number is required";
    }
    setErrors(newErrors);

    const found = Object.values(newErrors).find((error) => error !== "");

    if (found) {
      return false;
    }
    return true;
  };
  // you can call this function anything
  const onSuccess = (paymentRef: string) => {
    setShowOrderSuccessModal(true);
    // Implementation for whatever you want to do with reference and after success call.
    const payload = {
      reference: paymentRef,
    };
    verifyPayment({ payload })
      .unwrap()
      .then((result) => {
        const data = result?.data;

        setOrderId(data?.order?.orderId);
        setIsLoading(false);
      })
      .catch((err) => {
        setServerError(err.data.error);
        setIsLoading(false);
        setTimeout(() => {
          setServerError("");
        }, 5000);
      });
  };

  // you can call this function anything
  const onClose = () => {
    setIsLoading(false);
    // implementation for  whatever you want to do when the Paystack dialog closed.
  };

  const handlePayment = () => {
    setIsLoading(true);
    const isValid = validateShipping();
    if (!isValid) {
      setIsLoading(false);
      return;
    }

    getReferenceTrigger(
      {
        firstName,
        lastName,
        email,
        address,
        region,
        country,
        postCode,
        phoneNumber,
      }
      // true
    )
      .unwrap()
      .then((result) => {
        const data = result?.data;
        const paymentStatus = data?.paymentStatus;

        if (paymentStatus === "success") {
          setOrderId(data?.orderId);
          setIsLoading(false);
          setShowOrderSuccessModal(true);
          return;
        }
        const config = {
          reference: data?.reference,
          email,
          amount: data?.amount || total, //Amount is in the country's lowest currency. E.g Kobo, so 20000 kobo = N200
          publicKey: "pk_test_4f90ef116c7a9b4fece9328bb19f57ded43a9a0c",
        };
        const initializePayment = paystackPayment(config);
        // pass reference to initializePayment onSucess
        initializePayment({
          onSuccess: () => onSuccess(data?.reference),
          onClose,
        });
        // initializePayment({
        //   onSuccess,
        //   onClose,
        // });
        // setTimeout(() => {
        //   initializePayment(onSuccess, onClose);
        // }, 5000);
      })
      .catch((err) => {
        setServerError(err.data.error);
        setIsLoading(false);
        setTimeout(() => {
          setServerError("");
        }, 5000);
      });
  };

  const renderLeft = () => {
    return (
      <div className="space-y-8">
        <div id="ContactInfo" className="scroll-mt-24">
          <ContactInfo
            isActive={tabActive === "ContactInfo"}
            onOpenActive={() => {
              setTabActive("ContactInfo");
              handleScrollToEl("ContactInfo");
            }}
            onCloseActive={() => {
              setTabActive("ShippingAddress");
              handleScrollToEl("ShippingAddress");
            }}
            email={email || ""}
            setEmail={setEmail}
            acceptMarketing={acceptMarketing}
            setAcceptMarketing={setAcceptMarketing}
          />
        </div>

        <div id="ShippingAddress" className="scroll-mt-24">
          <ShippingAddress
            isActive={tabActive === "ShippingAddress"}
            onOpenActive={() => {
              setTabActive("ShippingAddress");
              handleScrollToEl("ShippingAddress");
            }}
            onCloseActive={() => {
              setTabActive("PaymentMethod");
              handleScrollToEl("PaymentMethod");
            }}
            firstName={firstName}
            setFirstName={setFirstName}
            lastName={lastName}
            setLastName={setLastName}
            address={address}
            setAddress={setAddress}
            region={region}
            setRegion={setRegion}
            country={country}
            setCountry={setCountry}
            postCode={postCode}
            setPostCode={setPostCode}
            phoneNumber={phoneNumber}
            setPhoneNumber={setPhoneNumber}
            errors={shippingErrors}
            validateShipping={validateShipping}
          />
        </div>
        {serverError && <Alert color="failure">{serverError}</Alert>}
        {email && (
          <ButtonPrimary
            className="mt-8 w-full"
            onClick={handlePayment}
            disabled={
              isLoading ||
              !email ||
              getReferenceTriggerStatus.isLoading ||
              verifyPaymentStatus.isLoading
            }
            // onClick={handleTest}
          >
            {" "}
            {isLoading ||
            getReferenceTriggerStatus.isLoading ||
            verifyPaymentStatus.isLoading ? (
              <LoadingDots />
            ) : (
              "Proceed to payment"
            )}
          </ButtonPrimary>
        )}

        {/* <div id="PaymentMethod" className="scroll-mt-24">
          <PaymentMethod
            isActive={tabActive === "PaymentMethod"}
            onOpenActive={() => {
              setTabActive("PaymentMethod");
              handleScrollToEl("PaymentMethod");
            }}
            onCloseActive={() => setTabActive("PaymentMethod")}
            serverError={serverError}
            isLoading={isLoading}
          />
        </div> */}
      </div>
    );
  };

  return (
    <div className="nc-CheckoutPage">
      {verifyPaymentStatus.isLoading && <Loading />}
      {cartQuery.isLoading &&
        Array.from({ length: 24 }).map((_, i) => <Skeleton key={i} />)}
      {isFulfilled && basketItems?.length === 0 && (
        <div className="flex flex-col items-center justify-center h-[50vh]">
          {" "}
          <EmptyBasket />
        </div>
      )}
      {basketItems?.length > 0 && (
        <main className="container py-2 lg:pb-28  ">
          <div className="mb-4 flex flex-col lg:flex-row">
            <div className="flex flex-1  flex-col">
              <div className="mb-4">
                <h2 className="block text-2xl font-semibold sm:text-3xl lg:text-4xl ">
                  Checkout
                </h2>
              </div>
              <div className="flex md:hidden">
                <MobileCheckoutSummary
                  cart={cart}
                  setIsLoading={setIsLoading}
                  setServerError={setServerError}
                  colorOptions={colorOptions}
                />
              </div>

              <div className="flex flex-col lg:flex-row">
                <div className="flex-1">{renderLeft()}</div>

                <div className="my-10 shrink-0 border-t border-neutral-300 lg:mx-10 lg:my-0 lg:border-l lg:border-t-0 xl:lg:mx-14 2xl:mx-16 " />
              </div>
            </div>
            <div className="w-full lg:w-[36%] ">
              {/* <h3 className="text-md font-semibold">Order summary</h3> */}
              <div className="hidden md:block md:relative  md:max-h-[500px] overflow-y-auto">
                <div
                  className=" divide-y divide-neutral-300 "
                  onWheel={() => setListDivIsFocused(true)}
                  onMouseLeave={() => setListDivIsFocused(false)}
                >
                  {basketItems?.length > 0 &&
                    [...basketItems]
                      .reverse()
                      .map((item) => (
                        <CartItem
                          key={item._id}
                          item={item}
                          cart={cart}
                          setServerError={setServerError}
                          setIsLoading={setIsLoading}
                          colorOptions={colorOptions}
                        />
                      ))}
                  <div ref={lastChildDiv}></div>
                </div>
                {!isLastItemVisible &&
                  !listDivISFocused &&
                  basketItems?.length > 0 && (
                    <div className="sticky bottom-2 left[20%]  ">
                      <div className="flex justify-center w-[200px] mx-auto text-center p-4 bg-slate-400 text-white z-50 w-full rounded-full items-center">
                        Scroll for more{" "}
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={1.5}
                          stroke="currentColor"
                          className="size-6"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M15.75 17.25 12 21m0 0-3.75-3.75M12 21V3"
                          />
                        </svg>
                      </div>
                    </div>
                  )}
              </div>

              <div className="mt-10 border-t border-neutral-300 pt-6 text-sm">
                <ApplyDiscount />
                {getBasketTotalQuery.isLoading && <Loading />}
                <div className="mt-4 flex justify-between pb-4">
                  <span>Subtotal</span>
                  <span className="font-semibold">
                    {" "}
                    {getCurrencySmallSymbol(cart?.currency)}
                    {numberWithCommas(subTotal)}
                  </span>
                </div>
                <div className="flex justify-between py-4">
                  <span>Estimated Delivery & Handling</span>
                  <span className="font-semibold">
                    {deliveryFee !== "Free" &&
                      getCurrencySmallSymbol(cart?.currency)}
                    {numberWithCommas(deliveryFee)}
                  </span>
                </div>
                {/* <div className="flex justify-between py-4">
                <span>Estimated taxes</span>
                <span className="font-semibold">$24.90</span>
              </div> */}
                {appliedVoucherAmount > 0 && (
                  <div className="flex justify-between py-4">
                    <span>Applied Voucher</span>
                    <span className="font-semibold">
                      {getCurrencySmallSymbol(cart?.currency)}
                      {numberWithCommas(appliedVoucherAmount)}
                    </span>
                  </div>
                )}
                <div className="flex justify-between pt-4 text-base font-semibold">
                  <span>Total</span>
                  <span>
                    {" "}
                    {getCurrencySmallSymbol(cart?.currency)}
                    {numberWithCommas(total)}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </main>
      )}
      {showOrderSuccessModal && (
        <OrderSuccessModal
          orderId={orderId}
          showOrderSuccessModal={showOrderSuccessModal}
          setShowOrderSuccessModal={setShowOrderSuccessModal}
          isLoading={isLoading}
          serverError={serverError}
        />
      )}
    </div>
  );
};

export default CheckoutPage;
