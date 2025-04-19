import { VariationInterface } from "@/interface/interface";
// import { useEffect } from "react";

const SizeSelect = ({
  sizes,
  selectedSize,
  setSelectedSize,
  variations,
  selectedProductColor,
}: {
  sizes: string[];
  selectedSize: string;
  setSelectedSize: (size: string) => void;
  variations: VariationInterface[];
  selectedProductColor: string;
}) => {
  const selectedColorVariations = variations.filter(
    (variation) =>
      variation.colorValue?.toLocaleLowerCase() ===
      selectedProductColor.toLocaleLowerCase()
  );
  const variationSizes = selectedColorVariations.map(
    (variation) => variation.size
  );
  // useEffect(() => {
  //   if (!selectedSize || sizes?.length === 1) {
  //     setSelectedSize(sizes[0]);
  //   }
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [sizes, selectedSize]);
  return (
    <div className="flex flex-col  gap-4">
      <div className="flex items-center justify-between w-full">
        <span className="text-md font-semibold">Size</span>
        <span className="underline">View Size guide</span>
      </div>
      <div className="flex items-center gap-3">
        {sizes.map((size) => (
          <button
            key={size}
            type="button"
            disabled={!variationSizes.includes(size)}
            onClick={() => setSelectedSize(size)}
            className={`w-20 items-center justify-center flex rounded-lg px-3 py-2 text-2xl ${
              selectedSize === size
                ? "bg-primary text-white"
                : "border border-neutral-400"
            } ${size === "Custom" ? "w-fit" : ""}${
              !variationSizes.includes(size) ? "opacity-65" : ""
            }`}
            style={{
              backgroundPosition: "center",
              backgroundSize: "100%",
              backgroundImage: !variationSizes.includes(size)
                ? `url('data:image/svg+xml;utf8,<svg  xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12"/></svg>')`
                : undefined,
            }}
          >
            {size === "One Size" ? "OS" : size}
          </button>
        ))}
      </div>
    </div>
  );
};

export default SizeSelect;
