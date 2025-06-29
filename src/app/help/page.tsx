import HelpCenter from "./components/HelpCenter";
import SearchHelpArticle from "./components/SearchHelpArticle";

const HelpCenterPage = () => {
  return (
    <div className="container mx-auto px-4 py-8 mb-28">
      {" "}
      <div className="flex flex-col gap-4 mt-8">
        <SearchHelpArticle />
        <HelpCenter />
      </div>
    </div>
  );
};

export default HelpCenterPage;
