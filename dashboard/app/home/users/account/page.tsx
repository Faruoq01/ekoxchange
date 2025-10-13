"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import KYCDocumentsTab from "./_comp/kyc";
import UserActivityLogs from "./_comp/activity";
import WalletBalances from "./_comp/wallet";
import TransactionHistory from "./_comp/transactions";
import { useAppSelector } from "@/app/lib/redux/controls";
import { AppPages } from "@/app/assets/appages";

const tabs = [
  { label: "KYC Documents", component: KYCDocumentsTab },
  { label: "User Activity Logs", component: UserActivityLogs },
  { label: "Wallet Balances", component: WalletBalances },
  { label: "Transaction History", component: TransactionHistory },
];

const UpdateAdminUsers = () => {
  const [activeTab, setActiveTab] = useState("KYC Documents");
  const user = useAppSelector((state) => state.users.user);
  console.log(user, "user");
  const router = useRouter();

  const ActiveComponent =
    tabs.find((t) => t.label === activeTab)?.component || KYCDocumentsTab;

  useEffect(() => {
    if (Object.values(user).length === 0) {
      router.push(AppPages.home.users.index);
    }
  }, [user]);

  return (
    <main className="flex-1 overflow-y-auto mt-[20px] mb-[50px]">
      <motion.div
        className="bg-card-light dark:bg-card-dark rounded-xl shadow-xl w-full h-full flex flex-col"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        {/* Header */}
        <header className="relative p-4 sm:p-6 border-b border-border-light dark:border-border-dark flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3">
          {/* Back Button */}
          <button
            onClick={() => router.back()}
            className="absolute left-4 top-4 sm:static flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300 hover:text-primary transition-all duration-200 group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform duration-200" />
            <span className="hidden sm:inline font-medium">Back</span>
          </button>

          {/* Title and Info */}
          <div className="sm:ml-8 flex-1 text-center sm:text-left">
            <h2 className="text-xl font-semibold text-heading-dark dark:text-heading-light">
              Manage User Account
            </h2>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
              John Doe • john.doe@example.com
            </p>
          </div>
        </header>

        {/* User Info */}
        <div className="p-4 sm:p-6 flex-1 overflow-y-auto">
          <motion.div
            className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-6 mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <img
              alt="User avatar"
              className="w-24 h-24 sm:w-20 sm:h-20 rounded-full object-cover mx-auto sm:mx-0 shadow-md"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuBHFoanIMmn5gzi-q_c7N0oH4k7s0ZDp3FizegkbSeQCsYaamTA_xeR15tELjIk8VSwopNg7NKHaQmjzcRVndsQnt7r3Wi2Pd63iuqyDOB2TuNfeW-J9SthBeR_tv-mUDRubcS91TNkfLgyxiSP_ncnrtWwCIWfRL2QG9k8F2LZwEZWurf-G7MBZp-fQWkBjNnZg9QBxj1CWLSX-6v3dcW-6k9jM7pgR78ql686wm5bWxBLPw5JR1t5yCGWx1cs9MZkddSaSjAUnw"
            />
            <div className="text-center sm:text-left">
              <h3 className="text-lg sm:text-xl font-semibold">John Doe</h3>
              <p className="text-sm text-text-light dark:text-text-dark">
                john.doe@example.com
              </p>
              <div className="mt-2 flex flex-wrap justify-center sm:justify-start items-center gap-2">
                <span className="bg-green-100 text-green-800 text-xs font-medium px-2.5 py-1 rounded-full dark:bg-green-900 dark:text-green-300">
                  Active
                </span>
                <span className="text-text-light dark:text-text-dark text-sm">
                  Joined: Jan 15, 2023
                </span>
              </div>
            </div>
          </motion.div>

          {/* Tabs */}
          <div className="border-b border-border-light dark:border-border-dark">
            {/* Mobile Tabs */}
            <div className="sm:hidden flex flex-wrap justify-center gap-2 p-2">
              {tabs.map((tab) => (
                <button
                  key={tab.label}
                  onClick={() => setActiveTab(tab.label)}
                  className={`px-4 py-2 text-sm font-medium rounded-full transition-all duration-200 ${
                    activeTab === tab.label
                      ? "bg-primary text-white shadow-md"
                      : "bg-gray-100 dark:bg-slate-800 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-slate-700"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Desktop Tabs */}
            <nav className="hidden sm:flex space-x-8 px-4 overflow-x-auto">
              {tabs.map((tab) => (
                <button
                  key={tab.label}
                  onClick={() => setActiveTab(tab.label)}
                  className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm transition-all duration-200 ${
                    activeTab === tab.label
                      ? "text-primary border-primary"
                      : "text-text-light dark:text-text-dark hover:text-heading-dark hover:border-gray-300 dark:hover:border-gray-600 border-transparent"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </nav>
          </div>

          {/* Active Tab */}
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="pt-6"
          >
            <ActiveComponent />
          </motion.div>
        </div>
      </motion.div>
    </main>
  );
};

export default UpdateAdminUsers;
