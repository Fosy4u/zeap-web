import { ThemeContext } from "@/contexts/themeContext";
import { globalSelectors } from "@/redux/services/global.slice";
import zeapApiSlice from "@/redux/services/zeapApi.slice";
import { Modal,  ModalHeader, TabItem, Tabs } from "flowbite-react";
import { useContext, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Loading from "../loading/Loading";
import ReadyMadeSizeGuideTable from "./ReadyMadeSizeGuideTable";
import { HiUserCircle } from "react-icons/hi";

const tabTheme = {
  base: "flex flex-col gap-2",
  tablist: {
    base: "flex text-center",

    tabitem: {
      base: "flex items-center justify-center rounded-t-lg p-4 text-sm font-medium first:ml-0 focus:outline-none disabled:cursor-not-allowed disabled:text-gray-400 disabled:dark:text-gray-500",
      variant: {
        fullWidth: {
          base: "ml-0 flex w-full rounded-none first:ml-0",
          active: {
            on: "rounded-none bg-gray-100 p-4 text-gray-900 bg-green-200 font-bold",
            off: "rounded-none bg-white hover:bg-gray-50 hover:text-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700 dark:hover:text-white",
          },
        },
      },
    },
  },
};

const ModalTheme = {
  root: {
    base: "fixed inset-x-0 top-0 z-50 h-screen overflow-y-auto overflow-x-hidden md:inset-0 md:h-[70rem]",
    show: {
      on: "flex bg-gray-900/50 dark:bg-gray-900/80",
      off: "hidden",
    },
    sizes: {
      lg: "w-[100vw] md:max-w-4xl",
    },
  },
  content: {
    base: "fixed   w-full p:0 md:p-4 md:h-auto",
    inner:
      "relative flex h-[100vh] md:h-full md:max-h-[90dvh] flex-col rounded-lg bg-white shadow dark:bg-gray-700",
  },
};
interface ReadyMadeSizeGuideInterface {
  top: {
    cm: [
      {
        Size: string;
        Bust: string;
        Waist: string;
        Hips: string;
        UK: string;
        EU: string;
        AUS: string;
      }
    ];
    inch: [
      {
        Size: string;
        Bust: string;
        Waist: string;
        Hips: string;
        "US/CAN": string;
      }
    ];
  };
  bottom: {
    cm: [
      {
        Size: string;
        Bust: string;
        Waist: string;
        Hips: string;
        UK: string;
        EU: string;
        AUS: string;
      }
    ];
    inch: [
      {
        Size: string;
        Bust: string;
        Waist: string;
        Hips: string;
        "US/CAN": string;
      }
    ];
  };
  footwear: {
    cm: [
      {
        Size: string;
        "Foot Length": string;
        UK: string;
        EU: string;
        AUS: string;
        "US/CAN": string;
      }
    ];
    inch: [
      {
        Size: string;
        "Foot Length": string;
        UK: string;
        EU: string;
        AUS: string;
        "US/CAN": string;
      }
    ];
  };
}
interface DataInterface {
  Size?: string;
  Bust?: string;
  Waist?: string;
  Hips?: string;
  "Foot Length"?: string;
  UK?: string;
  EU?: string;
  AUS?: string;

  "US/CAN"?: string;
}
const ReadyMadeSizeGuideModal = ({
  openModal,
  setOpenModal,
  defaultUnit = "cm",
  defaultTitle = "top",
  defaultGender = "female",
}: {
  openModal: boolean;
  defaultUnit?: string;
  defaultTitle?: string;
  defaultGender?: string;
  setOpenModal: (open: boolean) => void;
}) => {
  const { setDimBackground } = useContext(ThemeContext);
  const token = useSelector(globalSelectors.selectAuthToken);
  const getReadyMadeSizeGuideQuery = zeapApiSlice.useGetReadyMadeSizeGuideQuery(
    {},
    { skip: !token }
  );
  const readyMadeSizeGuide = getReadyMadeSizeGuideQuery?.data?.data;
  const male: ReadyMadeSizeGuideInterface = readyMadeSizeGuide?.male;
  const female: ReadyMadeSizeGuideInterface = readyMadeSizeGuide?.female;
  const isLoading = getReadyMadeSizeGuideQuery?.isLoading;
  const [title, setTitle] = useState<string>(defaultTitle);

  const [unit, setUnit] = useState<string>(defaultUnit);
  const [activeTab, setActiveTab] = useState(defaultGender);

  function onCloseModal() {
    setDimBackground(false);
    setOpenModal(false);
  }
  useEffect(() => {
    if (openModal) {
      setDimBackground(true);
    }
    return () => {
      setDimBackground(false);
    };
  }, [openModal, setDimBackground]);
  const getTableData = () => {
    const selectedGenderData = activeTab === "female" ? female : male;
    console.log("selectedGenderData", selectedGenderData);
    if (!selectedGenderData) return [];

    const selectedTitleData =
      selectedGenderData[title as keyof typeof selectedGenderData];
    console.log("selectedTitleData", selectedTitleData);
    if (!selectedTitleData) return [];
    const selectedUnitData =
      unit === "cm" ? selectedTitleData.cm : selectedTitleData.inch;
    console.log("selectedUnitData", selectedUnitData);
    return selectedUnitData.map((item: DataInterface) => {
      const newObj: DataInterface = {};
      Object.keys(item).forEach((key) => {
        if (key === "Size") {
          newObj.Size = item[key];
        } else if (key === "Bust") {
          newObj.Bust = item[key];
        } else if (key === "Waist") {
          newObj.Waist = item[key];
        } else if (key === "Hips") {
          newObj.Hips = item[key];
        } else if (key === "Foot Length") {
          newObj["Foot Length"] = item[key];
        } else if (key === "UK") {
          newObj.UK = item[key];
        } else if (key === "EU") {
          newObj.EU = item[key];
        } else if (key === "AUS") {
          newObj.AUS = item[key];
        } else if (key === "US/CAN") {
          newObj["US/CAN"] = item[key];
        }
      });
      return newObj;
    });
  };
  return (
    <Modal
      theme={ModalTheme}
      show={openModal}
      size="lg"
      onClose={onCloseModal}
      popup
      position="top-center"
    >
      <ModalHeader>
        <span className="font-bold">Ready made size guide</span>
      </ModalHeader>
      <div className="w-full h-full flex flex-col gap-4 md:p-4">
        
        <div className="flex flex-col">
          {isLoading && <Loading />}
          {/* {male && <ReadyMadeSizeGuideTable title="Male" />}
          {female && <ReadyMadeSizeGuideTable title="Female" />} */}
          {readyMadeSizeGuide && (
            <div className="overflow-x-auto">
              <Tabs
                theme={tabTheme}
                aria-label="Full width tabs"
                variant="fullWidth"
              >
                {female && (
                  <TabItem
                    active={activeTab === "female"}
                    onClick={() => {
                      setActiveTab("female");
                    }}
                    title="Female"
                    icon={() => (
                      <HiUserCircle className="mr-2 h-5 w-5 text-pink-500" />
                    )}
                  >
                    <ReadyMadeSizeGuideTable
                      title={title}
                      setTitle={setTitle}
                      unit={unit}
                      setUnit={setUnit}
                      tableData={getTableData()}
                    />
                  </TabItem>
                )}
                {male && (
                  <TabItem
                    active={activeTab === "male"}
                    onClick={() => {
                      setActiveTab("male");
                    }}
                    title="Male"
                    icon={() => (
                      <HiUserCircle className="mr-2 h-5 w-5 text-blue-500" />
                    )}
                  >
                    <ReadyMadeSizeGuideTable
                      title={title}
                      setTitle={setTitle}
                      unit={unit}
                      setUnit={setUnit}
                      tableData={getTableData()}
                    />
                  </TabItem>
                )}
              </Tabs>
            </div>
          )}
        </div>
      </div>
    </Modal>
  );
};

export default ReadyMadeSizeGuideModal;
