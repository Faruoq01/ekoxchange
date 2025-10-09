"use client";
import { Column } from "@/app/components/home/table";

export interface AdminUser {
  id: number;
  name: string;
  username: string;
  email: string;
  phone: string;
  role: string;
  isActive: boolean;
  avatar: string;
}

export interface WalletUser {
  id: number;
  name: string;
  balance: string;
  status: string;
  avatar: string;
  isKYCDone: boolean;
}

const statusColors: Record<string, string> = {
  Active: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300",
  Pending:
    "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300",
  Inactive: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300",
};

/* --- Column Configs --- */
export const adminColumns: Column<AdminUser>[] = [
  {
    key: "name",
    header: "User",
    render: (user) => (
      <div className="flex items-center gap-3">
        <img
          src={user.avatar}
          alt="avatar"
          className="w-10 h-10 rounded-full object-cover"
        />
        <div>
          <p className="font-semibold">{user.name}</p>
          <p className="text-xs text-text-light dark:text-text-dark">
            {user.username}
          </p>
        </div>
      </div>
    ),
  },
  { key: "email", header: "Email" },
  { key: "phone", header: "Phone" },
  { key: "role", header: "Role" },
  {
    key: "status",
    header: "Status",
    render: (user) => (
      <span
        className={`text-xs font-medium px-2.5 py-1 rounded-full ${
          statusColors[user.isActive ? "Active" : "Inactive"]
        }`}
      >
        {user.isActive ? "Active" : "Inactive"}
      </span>
    ),
  },
  {
    key: "actions",
    header: "Actions",
    render: () => (
      <button
        className="text-gray-500 dark:text-gray-300 hover:text-primary transition"
        title="Actions"
      >
        <span className="material-icons text-[20px]">more_vert</span>
      </button>
    ),
  },
];

/* --- Wallet Users Table --- */
export const walletColumns: Column<WalletUser>[] = [
  {
    key: "name",
    header: "User",
    render: (user) => (
      <div className="flex items-center gap-3">
        <img
          src={user.avatar}
          alt="avatar"
          className="w-10 h-10 rounded-full object-cover"
        />
        <div>
          <p className="font-semibold">{user.name}</p>
        </div>
      </div>
    ),
  },
  { key: "email", header: "Email" },
  { key: "createdAt", header: "Date Registered" },
  {
    key: "isKYCDone",
    header: "Kyc Status",
    render: (user) => (
      <span
        className={`text-xs font-medium px-2.5 py-1 rounded-full ${
          statusColors[user.isKYCDone ? "Active" : "Inactive"]
        }`}
      >
        {user.isKYCDone ? "Completed" : "Pending"}
      </span>
    ),
  },
  {
    key: "status",
    header: "Status",
    render: (user) => (
      <span
        className={`text-xs font-medium px-2.5 py-1 rounded-full ${
          statusColors[user.status]
        }`}
      >
        {user.status}
      </span>
    ),
  },
  {
    key: "actions",
    header: "Actions",
    render: () => (
      <button
        className="text-gray-500 dark:text-gray-300 hover:text-primary transition"
        title="Actions"
      >
        <span className="material-icons text-[20px]">more_vert</span>
      </button>
    ),
  },
];
