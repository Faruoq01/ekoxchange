"use client";
import { AppPages } from "@/app/assets/appages";
import { useAppDispatch, useAppSelector } from "@/app/lib/redux/controls";
import {
  setReload,
  setSingleAdminUser,
  setSingleWalletUser,
} from "@/app/lib/redux/slices/users";
import { UserService } from "@/app/lib/services/users";
import { useRouter } from "next/navigation";
import { Dispatch, SetStateAction, useState } from "react";
import toast from "react-hot-toast";

const UserDetailsModal = ({
  setIsDetails,
}: {
  setIsDetails: Dispatch<SetStateAction<boolean>>;
}) => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.users.singleAdminUser);
  const reload = useAppSelector((state) => state.users.reload);
  const [isLoading, setIsLoading] = useState(false); // 👈 Added

  if (!user) return null;

  const {
    firstname,
    lastname,
    email,
    phone,
    gender,
    roles,
    isActive,
    userType,
    createdAt,
    avatar,
  } = user;

  const fullName = `${firstname ?? ""} ${lastname ?? ""}`.trim();
  const joinedDate = createdAt
    ? new Date(createdAt).toLocaleDateString(undefined, {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : "-";

  const changeStatus = async () => {
    try {
      setIsLoading(true); // 👈 Start loading
      const { error, payload } = await UserService.changeStatus(
        user?.id,
        isActive
      );
      if (!error && payload) {
        toast.success(
          `Account user has been ${
            isActive ? "deactivated" : "activated"
          } successfully!`
        );
        dispatch(setReload(!reload));
        setIsDetails(false);
      }
    } finally {
      setIsLoading(false); // 👈 Stop loading
    }
  };

  const sendMessage = () => {
    dispatch(setSingleAdminUser(user));
    dispatch(setSingleWalletUser({}));
    router.push(AppPages.home.users.message);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
      {/* Modal Box */}
      <div className="relative bg-white dark:bg-slate-900 rounded-xl shadow-2xl w-full max-w-2xl mx-4 sm:mx-0 p-8 animate-fadeIn overflow-y-auto max-h-[90vh]">
        {/* Close button */}
        <button
          onClick={() => setIsDetails(false)}
          className="absolute top-3 right-3 text-gray-500 hover:text-primary dark:text-gray-300 dark:hover:text-white"
        >
          <span className="material-icons">close</span>
        </button>

        {/* Header */}
        <div className="flex items-center gap-4">
          <img
            alt="User avatar"
            className="w-18 h-18 rounded-full object-cover border-3 border-purple-500 bg-gray-300"
            src={avatar || `https://picsum.photos/200/200?1`}
          />
          <div>
            <h2 className="text-xl font-bold text-heading-light dark:text-heading-dark">
              {fullName || "-"}
            </h2>
            <p className="text-sm text-text-light dark:text-text-dark">
              {email || "-"}
            </p>
            <span
              className={`mt-2 inline-block text-xs font-medium px-2.5 py-1 rounded-full ${
                isActive
                  ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
                  : "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300"
              }`}
            >
              {isActive ? "Active" : "Inactive"}
            </span>
          </div>
        </div>

        {/* Info Grid */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Contact Info */}
          <div>
            <h3 className="text-sm font-medium text-text-light dark:text-text-dark mb-2">
              Contact Information
            </h3>
            <div className="space-y-4 text-sm">
              <div className="flex items-center gap-3">
                <span className="material-icons text-primary text-lg">
                  email
                </span>
                <span className="text-heading-light dark:text-heading-dark">
                  {email || "-"}
                </span>
              </div>
              <div className="flex items-center gap-3">
                <span className="material-icons text-primary text-lg">
                  phone
                </span>
                <span className="text-heading-light dark:text-heading-dark">
                  {phone || "-"}
                </span>
              </div>
              <div className="flex items-center gap-3">
                <span className="material-icons text-primary text-lg">
                  person
                </span>
                <span className="text-heading-light dark:text-heading-dark capitalize">
                  {gender || "-"}
                </span>
              </div>
            </div>
          </div>

          {/* Role & Type */}
          <div>
            <h3 className="text-sm font-medium text-text-light dark:text-text-dark mb-2">
              User Details
            </h3>
            <div className="space-y-4 text-sm">
              <div className="flex items-center gap-3">
                <span className="material-icons text-primary text-lg">
                  badge
                </span>
                <span className="text-heading-light dark:text-heading-dark capitalize">
                  {roles && roles.length > 0
                    ? roles.map((r: any) => r.name).join(", ")
                    : userType || "-"}
                </span>
              </div>
              <div className="flex items-center gap-3">
                <span className="material-icons text-primary text-lg">
                  today
                </span>
                <span className="text-heading-light dark:text-heading-dark">
                  Joined on {joinedDate}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="mt-8 flex justify-end gap-4">
          <button
            onClick={changeStatus}
            disabled={isLoading} // 👈 prevent multiple clicks
            className={`px-6 py-2 rounded-lg text-sm border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-slate-700 flex items-center justify-center gap-2 ${
              isLoading ? "opacity-70 cursor-not-allowed" : ""
            }`}
          >
            {isLoading ? (
              <span className="w-4 h-4 border-2 border-gray-400 border-t-transparent rounded-full animate-spin"></span>
            ) : null}
            {isActive ? "Suspend User" : "Activate User"}
          </button>
          <button
            onClick={sendMessage}
            className="bg-primary text-white px-6 py-2 rounded-lg text-sm hover:bg-primary/90"
          >
            Send Message
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserDetailsModal;
