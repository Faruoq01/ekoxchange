"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import GeneralSettings from "./_comp/general";
import Notifications from "./_comp/notification";
import Security from "./_comp/security";
import Compliance from "./_comp/complience";
import AdBannerSettings from "./_comp/ad";

const tabs = [
  { id: "general", label: "General" },
  { id: "security", label: "Security" },
  { id: "notifications", label: "Notifications" },
  { id: "compliance", label: "Legal & Content" },
  { id: "ads", label: "Ad Banner" },
];

const Settings = () => {
  const [activeTab, setActiveTab] = useState("general");

  return (
    <main className="flex-1 overflow-y-auto mt-[20px]">
      {/* Tabs Navigation */}
      <div className="border-b border-border-light dark:border-border-dark mb-6">
        <div className="flex flex-wrap items-center gap-3">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`relative px-4 py-2 text-sm font-medium transition-all ${
                activeTab === tab.id
                  ? "text-primary font-semibold"
                  : "text-text-light dark:text-text-dark hover:text-primary/80"
              }`}
            >
              {tab.label}
              {activeTab === tab.id && (
                <motion.div
                  layoutId="underline"
                  className="absolute left-0 bottom-0 w-full h-[2px] bg-primary rounded-full"
                />
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Tabs Content */}
      <div className="space-y-10">
        <AnimatePresence mode="wait">
          {activeTab === "general" && (
            <motion.section
              key="general"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="bg-card-light dark:bg-card-dark rounded-lg w-full"
            >
              <GeneralSettings />
            </motion.section>
          )}

          {activeTab === "security" && (
            <motion.section
              key="security"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="bg-card-light dark:bg-card-dark rounded-lg w-full"
            >
              <Security />
            </motion.section>
          )}

          {activeTab === "notifications" && (
            <motion.section
              key="security"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="bg-card-light dark:bg-card-dark rounded-lg w-full"
            >
              <Notifications />
            </motion.section>
          )}

          {activeTab === "compliance" && (
            <motion.section
              key="security"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="bg-card-light dark:bg-card-dark rounded-lg w-full"
            >
              <Compliance />
            </motion.section>
          )}

          {activeTab === "ads" && <AdBannerSettings />}
        </AnimatePresence>
      </div>
    </main>
  );
};

export default Settings;
