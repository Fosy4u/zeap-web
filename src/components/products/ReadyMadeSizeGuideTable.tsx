import { ToggleSwitch } from "flowbite-react";
const toggleTheme = {
  toggle: {
    base: "relative rounded-full after:absolute after:rounded-full after:border after:bg-white after:transition-all group-focus:ring-4",
    checked: {
      on: "after:translate-x-full after:border-transparent rtl:after:-translate-x-full",
      off: "bg-indigo-400 after:border-gray-300 dark:bg-gray-700",
    },
  },
};

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

const ReadyMadeSizeGuideTable = ({
  title,
  setTitle,
  setUnit,
  unit,
  tableData,
}: {
  title: string;
  setTitle: (title: string) => void;
  setUnit: (unit: string) => void;
  unit: string;
  tableData: DataInterface[];
}) => {
  const options = [
    { name: "Top", value: "top" },
    { name: "Bottom", value: "bottom" },
    { name: "Footwear", value: "footwear" },
  ];
  return (
    <div className="flex flex-col gap-4 p-1 md:px-4 py-4">
      <div className="flex flex-col gap-4 md:gap-0 md:flex-row md:items-center md:justify-between">
        <div className="flex  gap-4">
          {options.map((option) => (
            <div
              key={option.value}
              className="flex items-center gap-2 cursor-pointer"
            >
              <input
                type="checkbox"
                id={option.value}
                name="size-guide"
                value={option.value}
                checked={title === option.value}
                onChange={() => setTitle(option.value)}
                className="focus:ring-action-primary rounded-full border-neutral-400 bg-transparent text-primary hover:border-neutral-700  focus:ring-primary"
              />
              <label
                htmlFor={option.value}
                className="text-sm font-semibold text-gray-900 dark:text-gray-300"
              >
                {option.name}
              </label>
            </div>
          ))}
        </div>
        <hr className="text-sm font-semibold text-gray-500 dark:text-gray-400" />
        <div className="flex items-center gap-4">
          <ToggleSwitch
            theme={toggleTheme}
            checked={unit === "cm"}
            onChange={() => setUnit(unit === "cm" ? "inch" : "cm")}
            label={unit === "cm" ? "CM" : "INCH"}
            color="info"
          />
        </div>
      </div>
      {tableData.length === 0 && (
        <div className="flex items-center justify-center w-full h-32">
          <p className="text-sm font-semibold text-gray-500 dark:text-gray-400">
            No data available
          </p>
        </div>
      )}
      {tableData.length > 0 && (
        <div className="relative overflow-x-auto h-[60rem] ">
          <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr className="bg-slate-800  text-white">
                {Object.keys(tableData[0]).map((key) => (
                  <th key={key} scope="col" className="px-6 py-3 uppercase ">
                    {key}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {tableData.map((row, index) => (
                <tr
                  key={index}
                  className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200"
                >
                  {Object.values(row).map((value, index) => (
                    <td
                      key={index}
                      className={
                        "px-6 py-2 text-sm  text-gray-900 whitespace-nowrap dark:text-white " +
                        (index === 0 ? "font-bold bg-slate-200" : "")
                      }
                    >
                      {value}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default ReadyMadeSizeGuideTable;
