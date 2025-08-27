import StripeProvider from "@/contexts/stripeProvider";

export default function CheckoutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
    console.log("Rendering CheckoutLayout");
  return <StripeProvider>{children}</StripeProvider>;
}
