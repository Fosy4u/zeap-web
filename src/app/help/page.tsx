import HelpCenter from "./components/HelpCenter";
import SearchHelpArticle from "./components/SearchHelpArticle";

const HelpCenterPage = () => {
  return (
    <div className="container mx-auto px-4 py-8 mb-28">
      {" "}
      <div className="flex flex-col gap-4 mt-8">
        <div className="flex items-center justify-center ">
          <p className="text-2xl md:text-3xl lg:text-4xl font-semibold text-gray-800 mb-4">
            Welcome to the Help Center
          </p>
        </div>
        <SearchHelpArticle />
        <HelpCenter />
      </div>
    </div>
  );
};

export default HelpCenterPage;
