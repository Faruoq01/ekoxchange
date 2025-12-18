"use client";

import { useState } from "react";
import RichTextEditor from "./editor";

const Compliance = () => {
  const [publishedTerms, setPublishedTerms] = useState(true);
  const [publishedPrivacy, setPublishedPrivacy] = useState(true);
  const [publishedRisk, setPublishedRisk] = useState(true);
  const [publishedAML, setPublishedAML] = useState(true);

  return (
    <div className="p-8 space-y-8 mb-[50px]">
      {/* Header */}
      <div className="flex items-end justify-between">
        <div>
          <h1 className="text-lg font-bold text-gray-900 dark:text-white">
            Legal &amp; Content
          </h1>
          <p className="text-gray-500 dark:text-gray-400 text-[12px]">
            Manage compliance documents, user agreements, and legal notices.
          </p>
        </div>
      </div>

      {/* Terms & Conditions */}
      <div className="bg-surface-light dark:bg-surface-dark rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 transition-colors duration-300">
        <div className="p-6 md:p-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
            <div className="flex items-start md:items-center gap-4">
              <div className="w-10 h-10 rounded-lg bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 flex items-center justify-center">
                <span className="material-icons-outlined">gavel</span>
              </div>
              <div>
                <h2 className="text-lg font-bold text-gray-900 dark:text-white">
                  Terms &amp; Conditions
                </h2>
                <div className="flex items-center gap-3 mt-1">
                  <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400">
                    v2.4
                  </span>
                  <span className="text-xs text-gray-500 dark:text-gray-400 flex items-center gap-1">
                    <span className="material-icons-outlined text-[14px]">
                      schedule
                    </span>
                    Last updated: Oct 24, 2023
                  </span>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
                Published
              </span>
              <label className="inline-flex relative items-center cursor-pointer">
                <input
                  type="checkbox"
                  className="sr-only peer"
                  checked={publishedTerms}
                  onChange={() => setPublishedTerms(!publishedTerms)}
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-primary/50 dark:peer-focus:ring-primary/80 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-primary"></div>
              </label>
            </div>
          </div>
          <RichTextEditor />

          {/* Buttons */}
          <div className="flex items-center justify-between pt-2">
            <button className="flex items-center gap-2 text-primary hover:text-primary-dark font-medium text-sm transition-colors">
              <span className="material-icons-outlined text-lg">
                visibility
              </span>
              Preview Mode
            </button>
            <div className="flex items-center gap-3">
              <button className="px-4 py-2 text-sm font-medium text-gray-600 dark:text-gray-300 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                Cancel
              </button>
              <button className="px-4 py-2 text-sm font-medium text-white bg-primary hover:bg-primary-dark rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition-colors">
                Save Changes
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Privacy Policy */}
      <div className="bg-surface-light dark:bg-surface-dark rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 transition-colors duration-300">
        <div className="p-6 md:p-8">
          {/* Content */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
            <div className="flex items-start md:items-center gap-4">
              <div className="w-10 h-10 rounded-lg bg-purple-50 dark:bg-purple-900/20 text-purple-600 dark:text-purple-400 flex items-center justify-center">
                <span className="material-icons-outlined">policy</span>
              </div>
              <div>
                <h2 className="text-lg font-bold text-gray-900 dark:text-white">
                  Privacy Policy
                </h2>
                <div className="flex items-center gap-3 mt-1">
                  <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400">
                    v1.8
                  </span>
                  <span className="text-xs text-gray-500 dark:text-gray-400 flex items-center gap-1">
                    <span className="material-icons-outlined text-[14px]">
                      schedule
                    </span>
                    Last updated: Nov 02, 2023
                  </span>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
                Published
              </span>
              <label className="inline-flex relative items-center cursor-pointer">
                <input
                  type="checkbox"
                  className="sr-only peer"
                  checked={publishedPrivacy}
                  onChange={() => setPublishedPrivacy(!publishedPrivacy)}
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-primary/50 dark:peer-focus:ring-primary/80 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-primary"></div>
              </label>
            </div>
          </div>

          <RichTextEditor />

          <div className="flex items-center justify-between pt-2">
            <button className="flex items-center gap-2 text-primary hover:text-primary-dark font-medium text-sm transition-colors">
              <span className="material-icons-outlined text-lg">
                visibility
              </span>{" "}
              Preview Mode
            </button>
            <div className="flex items-center gap-3">
              <button className="px-4 py-2 text-sm font-medium text-gray-600 dark:text-gray-300 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                Cancel
              </button>
              <button className="px-4 py-2 text-sm font-medium text-white bg-primary hover:bg-primary-dark rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition-colors">
                Save Changes
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Risk Disclosure & AML */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
        {[
          {
            title: "Risk Disclosure",
            icon: "warning",
            updated: "Sep 12, 2023",
            content:
              "Crypto assets are volatile. Investing in digital assets involves a high degree of risk...",
            state: publishedRisk,
            setState: setPublishedRisk,
            color: "orange",
          },
          {
            title: "AML Compliance",
            icon: "verified_user",
            updated: "Aug 05, 2023",
            content:
              "We are committed to preventing money laundering and terrorist financing...",
            state: publishedAML,
            setState: setPublishedAML,
            color: "emerald",
          },
        ].map((doc) => (
          <div
            key={doc.title}
            className="bg-surface-light dark:bg-surface-dark rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 transition-colors duration-300 flex flex-col"
          >
            <div className="p-6 md:p-8 flex-1 flex flex-col">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div
                    className={`w-10 h-10 rounded-lg bg-${doc.color}-50 dark:bg-${doc.color}-900/20 text-${doc.color}-600 dark:text-${doc.color}-400 flex items-center justify-center`}
                  >
                    <span className="material-icons-outlined">{doc.icon}</span>
                  </div>
                  <div>
                    <h2 className="text-lg font-bold text-gray-900 dark:text-white">
                      {doc.title}
                    </h2>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                      Updated: {doc.updated}
                    </p>
                  </div>
                </div>
                <label className="inline-flex relative items-center cursor-pointer">
                  <input
                    type="checkbox"
                    className="sr-only peer"
                    checked={doc.state}
                    onChange={() => doc.setState(!doc.state)}
                  />
                  <div className="w-9 h-5 bg-gray-200 peer-focus:outline-none rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all dark:border-gray-600 peer-checked:bg-primary"></div>
                </label>
              </div>
              <div className="border border-gray-200 dark:border-gray-600 rounded-xl overflow-hidden mb-4 flex-1">
                <div className="bg-white dark:bg-gray-900 p-4 h-48 overflow-y-auto custom-scrollbar">
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    {doc.content}
                  </p>
                </div>
              </div>
              <div className="flex items-center justify-end gap-3 pt-2">
                <button className="px-3 py-1.5 text-xs font-medium text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors">
                  Cancel
                </button>
                <button className="px-3 py-1.5 text-xs font-medium text-white bg-primary hover:bg-primary-dark rounded-lg transition-colors">
                  Save
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Compliance;
