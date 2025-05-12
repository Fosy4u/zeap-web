import { ThemeContext } from "@/contexts/themeContext";
import ButtonPrimary from "@/shared/Button/ButtonPrimary";
import ButtonSecondary from "@/shared/Button/ButtonSecondary";
import { Modal, ModalBody } from "flowbite-react";
import { useRouter } from "next/navigation";
import { useContext, useEffect } from "react";
import SuccessPic from "@/images/success_modal_image.png";
import Image from "next/image";

const ShopSuccessModal = ({
  showShopSuccessModal,
  setShowShopSuccessModal,
}: {
  showShopSuccessModal: boolean;
  setShowShopSuccessModal: (value: boolean) => void;
}) => {
  const { setDimBackground } = useContext(ThemeContext);
  const router = useRouter();

  useEffect(
    () => {
      setDimBackground(showShopSuccessModal);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [showShopSuccessModal]
  );
  return (
    <Modal
      show={showShopSuccessModal}
      onClose={() => {
        setShowShopSuccessModal(false);
        setDimBackground(false);
        router.push("/");
      }}
    >
      {/* <ModalHeader /> */}
      <ModalBody>
        <div className="p-8 bg-grey7 rounded-lg shadow-xl min-h-[90vh]">
          <Image src={SuccessPic} alt="success" className="w-1/2 mx-auto" />

          <h2 className="text-2xl font-semibold text-center">Hurrah!!!</h2>
          <p className="text-center mt-4">
            Welcome to Zeaper! Your sublime vendor platform for all bespoke and
            ready-made wears.
          </p>
          <p className="text-center mt-4">
            We’re excited to have you on board. Your registration has been
            received, and currently being processed.
          </p>
          <p className="text-center mt-4">
            Keep an eye on your email for updates and next steps.
          </p>
          <div className="flex flex:col md:flex-row justify-center mt-4 gap-2">
            <ButtonPrimary
              onClick={() => {
                setShowShopSuccessModal(false);
                setDimBackground(false);
                router.push(`/shop/`);
              }}
              className="w-full rounded-lg h-[3rem] "
            >
              View Shop
            </ButtonPrimary>

            <ButtonSecondary
              onClick={() => {
                setShowShopSuccessModal(false);
                setDimBackground(false);
                router.push("/");
              }}
              className="w-full rounded-lg h-[3rem] bg-secondary text-white"
            >
              Go to Home
            </ButtonSecondary>
          </div>
        </div>
      </ModalBody>
    </Modal>
  );
};

export default ShopSuccessModal;
