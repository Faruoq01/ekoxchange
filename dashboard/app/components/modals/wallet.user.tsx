"use client";

import { useAppDispatch, useAppSelector } from "@/app/lib/redux/controls";
import { setReload, setSingleUser } from "@/app/lib/redux/slices/users";
import { UserService } from "@/app/lib/services/users";
import { Dispatch, SetStateAction, useState } from "react";
import toast from "react-hot-toast";
import { Copy } from "lucide-react";
import { useRouter } from "next/navigation";
import { AppPages } from "@/app/assets/appages";

const WalletUserDetails = ({
  setIsDetails,
}: {
  setIsDetails: Dispatch<SetStateAction<boolean>>;
}) => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.users.singleAdminUser);
  const reload = useAppSelector((state) => state.users.reload);
  const [isLoading, setIsLoading] = useState(false);

  if (!user) return null;

  const {
    firstname,
    lastname,
    email,
    phone,
    country,
    isActive,
    createdAt,
    bitcoinAddress,
    ethereumAddress,
    solanaAddress,
    tronAddress,
    timezone,
    isVerified,
    isKYCDone,
    isPhoneVerified,
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
      setIsLoading(true);
      const { error, payload } = await UserService.changeWalletUserStatus(
        user?.id,
        !isActive
      );
      if (!error && payload) {
        toast.success(
          `Account has been ${
            isActive ? "deactivated" : "activated"
          } successfully!`
        );
        dispatch(setReload(!reload));
        setIsDetails(false);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const truncate = (addr: string, start = 6, end = 6) =>
    addr.length > start + end
      ? `${addr.slice(0, start)}...${addr.slice(-end)}`
      : addr;

  const handleCopy = (value: string) => {
    navigator.clipboard.writeText(value);
    toast.success("Copied to clipboard");
  };

  const walletList = [
    {
      label: "Bitcoin",
      icon: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/46/Bitcoin.svg/1200px-Bitcoin.svg.png",
      value: bitcoinAddress,
    },
    {
      label: "Ethereum",
      icon: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTJDn0ojTITvcdAzMsfBMJaZC4STaDHzduleQ&s",
      value: ethereumAddress,
    },
    {
      label: "Solana",
      icon: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQty1ptcBSY-tfLh_dAW_FS1GLSClUiFQTZqA&s",
      value: solanaAddress,
    },
    {
      label: "Tron",
      icon: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTBsWaz0K2kxYpSFMhQ2pPdBcnOwpQHWYEyzw&s",
      value: tronAddress,
    },
  ];

  const goToAccount = () => {
    dispatch(setSingleUser(user));
    router.push(AppPages.home.users.account);
  };

  const sendMessage = () => {
    dispatch(setSingleUser(user));
    router.push(AppPages.home.users.message);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
      <div className="relative bg-gradient-to-br from-white/90 to-slate-100 dark:from-slate-900/95 dark:to-slate-800/95 rounded-2xl shadow-2xl w-full max-w-2xl p-6 animate-fadeIn border border-white/10 max-h-[90vh] overflow-y-auto">
        {/* Close */}
        <button
          onClick={() => setIsDetails(false)}
          className="absolute top-3 right-3 text-gray-500 hover:text-primary dark:text-gray-300 dark:hover:text-white transition-all"
        >
          <span className="material-icons text-2xl">close</span>
        </button>

        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center gap-5 border-b border-gray-200 dark:border-gray-700 pb-5">
          <img
            alt="User avatar"
            className="w-20 h-20 rounded-full object-cover border-4 border-primary shadow-md"
            src={`https://picsum.photos/200/200?random=${user?.id ?? 1}`}
          />
          <div>
            <h2 className="text-xl font-bold text-heading-light dark:text-white tracking-tight">
              {fullName || "-"}
            </h2>
            <p className="text-sm text-gray-600 dark:text-gray-400">{email}</p>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
              {country || "-"} • {timezone || "-"}
            </p>
            <span
              className={`mt-2 inline-block text-xs font-medium px-2.5 py-1 rounded-full ${
                isActive
                  ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/50 dark:text-emerald-300"
                  : "bg-rose-100 text-rose-700 dark:bg-rose-900/50 dark:text-rose-300"
              }`}
            >
              {isActive ? "Active" : "Inactive"}
            </span>
          </div>
        </div>

        {/* Info Section */}
        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Contact Info */}
          <div className="bg-white/60 dark:bg-slate-800/60 p-4 rounded-xl border border-gray-200 dark:border-slate-700">
            <h3 className="text-sm font-semibold text-primary mb-2 uppercase tracking-wide">
              Contact
            </h3>
            <ul className="space-y-2 text-sm">
              <li className="flex items-center gap-3">
                <span className="material-icons text-primary text-base">
                  phone
                </span>
                {phone || "-"}
              </li>
              <li className="flex items-center gap-3">
                <span className="material-icons text-primary text-base">
                  email
                </span>
                {email || "-"}
              </li>
              <li className="flex items-center gap-3">
                <span className="material-icons text-primary text-base">
                  today
                </span>
                Joined {joinedDate}
              </li>
            </ul>
          </div>

          {/* Wallet Info */}
          <div className="bg-white/60 dark:bg-slate-800/60 p-4 rounded-xl border border-gray-200 dark:border-slate-700">
            <h3 className="text-sm font-semibold text-primary mb-2 uppercase tracking-wide">
              Wallets
            </h3>
            <div className="space-y-2 text-sm">
              {walletList.map(({ label, icon, value }) => (
                <div
                  key={label}
                  className="flex items-center justify-between bg-white/40 dark:bg-slate-700/40 px-3 py-2 rounded-lg border border-gray-200 dark:border-slate-600"
                >
                  <div className="flex items-center gap-2">
                    <img src={icon} alt={label} className="w-4 h-4" />
                    <span className="text-gray-700 dark:text-gray-300 font-medium">
                      {label}:
                    </span>
                    <span className="text-gray-600 dark:text-gray-400 font-mono">
                      {value ? truncate(value) : "-"}
                    </span>
                  </div>
                  {value && (
                    <button
                      onClick={() => handleCopy(value)}
                      className="text-gray-500 hover:text-primary transition"
                      title="Copy address"
                    >
                      <Copy size={14} />
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Verification Badges */}
        <div className="mt-5 grid grid-cols-2 md:grid-cols-4 gap-3 text-sm">
          {[
            { label: "Verified", active: isVerified },
            { label: "KYC Done", active: isKYCDone },
            { label: "Phone Verified", active: isPhoneVerified },
            { label: "Account Active", active: isActive },
          ].map(({ label, active }) => (
            <div
              key={label}
              className="flex items-center gap-2 bg-white/50 dark:bg-slate-800/50 px-3 py-2 rounded-lg border border-gray-200 dark:border-slate-700"
            >
              <span
                className={`w-2.5 h-2.5 rounded-full ${
                  active ? "bg-emerald-500" : "bg-gray-400"
                }`}
              ></span>
              {label}
            </div>
          ))}
        </div>

        {/* Actions */}
        <div className="mt-8 flex flex-wrap justify-end gap-3">
          <button
            onClick={changeStatus}
            disabled={isLoading}
            className={`px-5 py-2 rounded-lg text-sm font-medium border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-slate-700 flex items-center justify-center gap-2 transition-all ${
              isLoading ? "opacity-70 cursor-not-allowed" : ""
            }`}
          >
            {isLoading && (
              <span className="w-4 h-4 border-2 border-gray-400 border-t-transparent rounded-full animate-spin"></span>
            )}
            {isActive ? "Suspend User" : "Activate User"}
          </button>

          <button
            onClick={sendMessage}
            className="bg-gradient-to-r from-primary to-purple-600 text-white px-5 py-2 rounded-lg text-sm font-medium hover:opacity-90 shadow-md transition-all"
          >
            Send Message
          </button>

          <button
            onClick={goToAccount}
            className="bg-gradient-to-r from-blue-600 to-cyan-500 text-white px-5 py-2 rounded-lg text-sm font-medium hover:opacity-90 shadow-md transition-all"
          >
            View Wallet Account
          </button>
        </div>
      </div>
    </div>
  );
};

export default WalletUserDetails;
