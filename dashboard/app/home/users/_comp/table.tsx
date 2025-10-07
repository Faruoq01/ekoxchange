"use client";
import { Column } from "@/app/components/home/table";

export interface AdminUser {
  id: number;
  name: string;
  username: string;
  email: string;
  role: string;
  status: string;
  lastLogin: string;
  avatar: string;
}

export interface WalletUser {
  id: number;
  name: string;
  walletAddress: string;
  balance: string;
  status: string;
  lastActive: string;
  avatar: string;
}

const statusColors: Record<string, string> = {
  Active: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300",
  Pending:
    "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300",
  Inactive: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300",
};

/* --- Admin Users --- */
export const users: AdminUser[] = [
  {
    id: 1,
    name: "John Doe",
    username: "@johndoe",
    email: "john.doe@example.com",
    role: "Super Admin",
    status: "Active",
    lastLogin: "2 hours ago",
    avatar: "https://picsum.photos/200/200?1",
  },
  {
    id: 2,
    name: "Jane Smith",
    username: "@janesmith",
    email: "jane.smith@example.com",
    role: "Moderator",
    status: "Active",
    lastLogin: "5 hours ago",
    avatar: "https://picsum.photos/200/200?2",
  },
];

/* --- Wallet Users --- */
export const walletUsers: WalletUser[] = [
  {
    id: 1,
    name: "Alice Johnson",
    walletAddress: "0xAbC123...789D",
    balance: "1.25 ETH",
    status: "Active",
    lastActive: "1 hour ago",
    avatar: "https://picsum.photos/200/200?5",
  },
  {
    id: 2,
    name: "Bob Williams",
    walletAddress: "0x9876Ef...321A",
    balance: "0.54 ETH",
    status: "Inactive",
    lastActive: "2 days ago",
    avatar: "https://picsum.photos/200/200?6",
  },
];

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
  { key: "role", header: "Role" },
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
  { key: "lastLogin", header: "Last Login" },
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
          <p className="text-xs text-text-light dark:text-text-dark">
            {user.walletAddress}
          </p>
        </div>
      </div>
    ),
  },
  { key: "balance", header: "Balance" },
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
  { key: "lastActive", header: "Last Active" },
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
