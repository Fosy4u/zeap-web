import { AuthContext } from "@/contexts/authContext";
import { globalSelectors } from "@/redux/services/global.slice";
import zeapApiSlice from "@/redux/services/zeapApi.slice";
import { useCallback, useContext, useEffect, useState } from "react";
import { HiMinus, HiPlus } from "react-icons/hi";
import { useSelector } from "react-redux";
import LoadingDots from "../loading/LoadingDots";
import Image from "next/image";
import { Alert } from "flowbite-react";
import ReactTimeAgo from "react-time-ago";
import NoPic from "@/images/noPhoto.png";
import { HiTrash } from "react-icons/hi";

const MobileNotification = () => {
  const { user } = useContext(AuthContext);
  const token = useSelector(globalSelectors.selectAuthToken);

  const [active, setActive] = useState(false);

  const [error, setError] = useState<string>("");
  const getNotificationsQuery = zeapApiSlice.useGetNotificationsQuery(
    {},
    { skip: !token || !user?._id }
  );
  const notifications = getNotificationsQuery?.data?.data.notifications;
  const [deleteNotification, deleteNotificationStatus] =
    zeapApiSlice.useDeleteNotificationMutation();
  const [deleteAllNotifications, deleteAllNotificationsStatus] =
    zeapApiSlice.useDeleteAllNotificationsMutation();

  const isDeleting =
    deleteNotificationStatus.isLoading ||
    deleteAllNotificationsStatus.isLoading;
  const [animate, setAnimate] = useState("");

  // Animate Wishlist Number
  const handleAnimate = useCallback(() => {
    if (notifications?.length === 0) return;
    setAnimate("animate-bounce");
  }, [notifications, setAnimate]);

  // Set animate when no of wishlist changes
  useEffect(() => {
    handleAnimate();
    setTimeout(() => {
      setAnimate("");
    }, 1000);
  }, [handleAnimate]);
  const handleDelete = (notification_id: string) => {
    const payload = { notification_id };
    deleteNotification({ payload })
      .unwrap()
      .then(() => {})
      .catch((err) => {
        setError(err.data.error);
        setTimeout(() => {
          setError("");
        }, 5000);
      });
  };
  const handleDeleteAll = () => {
    deleteAllNotifications({})
      .unwrap()
      .then(() => {
        setActive(false);
      })
      .catch((err) => {
        setError(err.data.error);
        setTimeout(() => {
          setError("");
        }, 5000);
      });
  };
  const handleClick = () => {
    setActive(!active);
  };

  return (
    <div
      id="accordion-flush"
      data-accordion="collapse"
      data-active-classes="bg-white dark:bg-gray-900 text-gray-900 dark:text-white"
      data-inactive-classes="text-gray-500 dark:text-gray-400"
    >
      <h2 id="accordion-flush-heading-1">
        <button
          onClick={handleClick}
          type="button"
          className="flex font-extrabold text-lg text-info items-center justify-between w-full py-5 px-2 font-medium rtl:text-right text-gray-500 border-b border-gray-200 dark:border-gray-700 dark:text-gray-400 gap-3"
          data-accordion-target="#accordion-flush-body-1"
          aria-expanded="true"
          aria-controls="accordion-flush-body-1"
        >
          <div>
            <span className="inline-flex items-center gap-2">
              {" "}
              <span className="relative inline-flex items-center p-2 text-sm  text-center  rounded-full hover:bg-slate-200  focus:outline-none">
                <svg
                  className="fill-current duration-700 ease-in-out"
                  width="18"
                  height="18"
                  viewBox="0 0 18 18"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M16.1999 14.9343L15.6374 14.0624C15.5249 13.8937 15.4687 13.7249 15.4687 13.528V7.67803C15.4687 6.01865 14.7655 4.47178 13.4718 3.31865C12.4312 2.39053 11.0812 1.7999 9.64678 1.6874V1.1249C9.64678 0.787402 9.36553 0.478027 8.9999 0.478027C8.6624 0.478027 8.35303 0.759277 8.35303 1.1249V1.65928C8.29678 1.65928 8.24053 1.65928 8.18428 1.6874C4.92178 2.05303 2.4749 4.66865 2.4749 7.79053V13.528C2.44678 13.8093 2.39053 13.9499 2.33428 14.0343L1.7999 14.9343C1.63115 15.2155 1.63115 15.553 1.7999 15.8343C1.96865 16.0874 2.2499 16.2562 2.55928 16.2562H8.38115V16.8749C8.38115 17.2124 8.6624 17.5218 9.02803 17.5218C9.36553 17.5218 9.6749 17.2405 9.6749 16.8749V16.2562H15.4687C15.778 16.2562 16.0593 16.0874 16.228 15.8343C16.3968 15.553 16.3968 15.2155 16.1999 14.9343ZM3.23428 14.9905L3.43115 14.653C3.5999 14.3718 3.68428 14.0343 3.74053 13.6405V7.79053C3.74053 5.31553 5.70928 3.23428 8.3249 2.95303C9.92803 2.78428 11.503 3.2624 12.6562 4.2749C13.6687 5.1749 14.2312 6.38428 14.2312 7.67803V13.528C14.2312 13.9499 14.3437 14.3437 14.5968 14.7374L14.7655 14.9905H3.23428Z"
                    fill=""
                  />
                </svg>

                <span className="sr-only">Notifications</span>
                {notifications?.length > 0 && (
                  <div
                    className={`absolute inline-flex items-center justify-center w-fit p-1 h-5  text-xs font-bold text-white bg-green-500 border-2 border-white rounded-full -top-1 -end-0 dark:border-gray-900 ${animate}`}
                  >
                    {notifications?.length}
                  </div>
                )}
              </span>{" "}
              Notifications
            </span>
          </div>
          {active ? <HiMinus /> : <HiPlus />}
        </button>
      </h2>
      <div
        id="accordion-flush-body-1"
        className={`py-5 px-2 border-b border-gray-200 dark:border-gray-700 text-sm flex flex-col ${
          active ? "block" : "hidden"
        }`}
        aria-labelledby="accordion-flush-heading-1"
      >
        {notifications?.length === 0 && (
          <div className="flex flex-col items-center justify-center gap-4 p-4 bg-grey7 my-16">
            <div className="flex flex-col items-center gap-1 text-info   rounded-lg">
              <span className="font-medium">
                You have no notifications yet.
              </span>
            </div>
          </div>
        )}
        {notifications?.length > 0 && (
          <>
            <div className="px-4.5 py-3 flex justify-between items-center ">
              <button
                className="text-xs text-danger hover:underline"
                onClick={() => {
                  handleDeleteAll();
                }}
              >
                Clear All
              </button>
            </div>
            <ul className="flex h-auto flex-col overflow-y-auto">
              {error && (
                <div className="p-4 mb-2">
                  <Alert color="failure">Error - {error}</Alert>{" "}
                </div>
              )}
              {notifications?.map(
                (notification: {
                  createdAt: Date;
                  title: string;
                  body: string;
                  image: string;
                  _id: string;
                }) => (
                  <li key={notification._id}>
                    <div className="flex flex-col gap-2.5  px-2 py-3 bg-slate-200 mb-2 hover:bg-gray-2  dark:hover:bg-meta-4 w-full">
                      <div className="flex gap-2">
                        <Image
                          src={notification?.image || NoPic.src}
                          alt="notification"
                          className="h-6 w-6 rounded-full"
                          width={24}
                          height={24}
                        />
                        <h5 className="text-sm font-bold text-slate-900 dark:text-white">
                          {notification?.title}
                        </h5>
                      </div>
                      <p className="text-xs">{notification?.body}</p>
                      <div className="flex justify-between items-center">
                        <p className="text-xs text-success">
                          <ReactTimeAgo
                            date={notification?.createdAt}
                            locale="en-US"
                          />
                        </p>
                        <div
                          className="bg-lightDanger p-2 text-danger rounded-full cursor-pointer hover:bg-danger hover:text-white transition duration-200 ease-in-out"
                          onClick={() => {
                            handleDelete(notification._id);
                          }}
                        >
                          {isDeleting ? (
                            <LoadingDots />
                          ) : (
                            <HiTrash className="" />
                          )}
                        </div>
                      </div>
                    </div>
                  </li>
                )
              )}
            </ul>
          </>
        )}
      </div>
    </div>
  );
};

export default MobileNotification;
