import Link from "next/link";
import ReadyToWearCategories from "./ReadyToWearCategories";
import ReadyToWearPromo from "./ReadyToWearPromo";
import Guarantee from "./Guarantee";
import ReadyToWearLatest from "./ReadyToWearLatest";

const backGroundVideoUrl =
  "https://firebasestorage.googleapis.com/v0/b/zeap-7de3d.appspot.com/o/video%2FrtwHome.mov?alt=media&token=73c9fa7b-a5cf-4059-b552-cf67f390b578";
// const backGroundVideoUrl =
//   "https://v.ftcdn.net/08/55/17/10/700_F_855171022_WdV2T0PBBIHtOEIHTT8wwsl7MFkGsEm5_ST.mp4";
const ReadyToWearPage = () => {
  return (
    <>
      <Link
        href="/collections/isBespoke=true?productGroupPage=BESPOKE&collectionTitle=Bespoke Collections"
        className="relative flex h-screen  w-full items-center justify-center bg-black"
      >
        <video
          src={backGroundVideoUrl}
          autoPlay
          muted
          loop
          playsInline
          preload="none"
          className="absolute inset-0 w-full h-full object-cover opacity-50"
        />

        <div className="relative z-10 text-white text-center">
          <h1 className="text-4xl md:text-6xl font-extrabold mb-4">
            Ready to Wear Fashion
          </h1>
          <p className="text-lg md:text-xl font-bold">
            Instant Chic. Zero Fuss
          </p>
          <button className="mt-6 bg-primary text-white px-6 py-3 rounded-md hover:bg-secondary transition-colors">
            Explore Our Latest Collections
          </button>
        </div>
      </Link>
      <ReadyToWearCategories />
      <Guarantee />
      <ReadyToWearPromo />
      <ReadyToWearLatest />
    </>
  );
};

export default ReadyToWearPage;
