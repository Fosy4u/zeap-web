"use client";

import { AddShop } from "@/components/shop/AddShop";
import { AuthContext } from "@/contexts/authContext";

import ButtonPrimary from "@/shared/Button/ButtonPrimary";
import { usePathname } from "next/navigation";
//import { useRouter } from "next/navigation";
import { useContext, useState } from "react";

const StartSelling = ({
  setIsOpen,
}: {
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const { user } = useContext(AuthContext);
  const pathname = usePathname();
  const [openModal, setOpenModal] = useState(false);
  // const router = useRouter();

  return (
    <>
      {!user?.shopId && (
        <ButtonPrimary
          className="w-full md:w-auto"
          onClick={() => {
            if (!user || user?.isGuest) {
              localStorage.setItem("redirectSignInPath", pathname);
              return setIsOpen(true);
            }

            return setOpenModal(true);
            // router.push("/account/dashboard");
          }}
        >
          Start Selling
        </ButtonPrimary>
      )}

      {user?.shopId && (
        <ButtonPrimary
          className="w-full md:w-auto"
          onClick={() => {
            // router.push("/account/dashboard");
          }}
        >
          My Shop
        </ButtonPrimary>
      )}
      {openModal && (
        <AddShop setOpenModal={setOpenModal} openModal={openModal} />
      )}
    </>
  );
};

export default StartSelling;
