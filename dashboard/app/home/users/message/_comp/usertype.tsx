"use client";
import React from "react";

interface Props {
  userType: "admin" | "wallet";
  setUserType: (type: "admin" | "wallet") => void;
}

export const UserTypeSelector: React.FC<Props> = ({
  userType,
  setUserType,
}) => {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-600 dark:text-gray-300 mb-3">
        Select User Type
      </label>
      <div className="flex items-center gap-3">
        {(["admin", "wallet"] as const).map((type) => (
          <label
            key={type}
            className={`flex items-center gap-2 cursor-pointer px-[12px] py-[8px] rounded-lg border transition-all ${
              userType === type
                ? "border-primary bg-primary/10 text-primary dark:bg-primary/20 dark:text-white"
                : "border-gray-300 dark:border-gray-700 text-gray-600 dark:text-gray-300 hover:border-primary/50"
            }`}
          >
            <input
              type="radio"
              name="userType"
              value={type}
              checked={userType === type}
              onChange={() => setUserType(type)}
              className="accent-primary"
            />
            <span className="capitalize font-medium text-[13px]">
              {type === "admin" ? "Admin Users" : "Wallet Users"}
            </span>
          </label>
        ))}
      </div>
    </div>
  );
};
