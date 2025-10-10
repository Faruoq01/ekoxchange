"use client";
import React, { Fragment, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import WalletTable from "./_comp/wallet.table";
import UserTable from "./_comp/admin.table";
import { Modal } from "@/app/components/modals/modalskin";
import CreateUser from "@/app/components/modals/createuser";

export default function UserPage() {
  const [isOpen, setIsopen] = useState(false);
  const [activeTab, setActiveTab] = useState<"admin" | "wallet">("wallet");
  const handleTabChange = (tab: "admin" | "wallet") => setActiveTab(tab);

  const tabs = [
    { key: "wallet", label: "Wallet Users" },
    { key: "admin", label: "Admin Users" },
  ];

  return (
    <Fragment>
      <div className="p-4 md:p-6 bg-card-light dark:bg-card-dark rounded-lg mt-[20px] mb-[30px]">
        {/* Header */}
        <div className="flex items-center justify-between mb-4 h-[50px]">
          <h1 className="text-xl font-bold text-gray-900 dark:text-text-dark">
            User Management
          </h1>
          {activeTab === "admin" && (
            <Button
              variant="default"
              className="w-auto px-3 py-2.5 text-sm"
              onClick={() => setIsopen(true)}
            >
              <Plus className="w-5 h-5" />
              <span>Add User</span>
            </Button>
          )}
        </div>

        {/* Tabs */}
        <div className="flex gap-4 mb-6 border-b border-border-light dark:border-border-dark">
          {tabs.map((tab) => (
            <button
              key={tab.key}
              onClick={() => handleTabChange(tab.key as "admin" | "wallet")}
              className={`relative pb-2 text-sm font-medium transition ${
                activeTab === tab.key
                  ? "text-primary"
                  : "text-text-light dark:text-text-dark opacity-70"
              }`}
            >
              {tab.label}
              {activeTab === tab.key && (
                <motion.div
                  layoutId="tab-underline"
                  className="absolute left-0 right-0 bottom-0 h-[2px] bg-primary rounded-full"
                  transition={{ type: "spring", stiffness: 500, damping: 30 }}
                />
              )}
            </button>
          ))}
        </div>

        {/* Table Section */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
          >
            {activeTab === "admin" ? <UserTable /> : <WalletTable />}
          </motion.div>
        </AnimatePresence>
      </div>
      <Modal isOpen={isOpen}>
        <CreateUser setIsopen={setIsopen} />
      </Modal>
    </Fragment>
  );
}
