"use client";

import Pagination from "@/app/components/home/pagination";
import Table, { Column } from "@/app/components/home/table";

export interface User {
  id: number;
  name: string;
  username: string;
  email: string;
  role: string;
  status: string;
  lastLogin: string;
  avatar: string;
}

const statusColors: Record<string, string> = {
  Active: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300",
  Pending:
    "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300",
  Inactive: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300",
};

export const users: User[] = [
  {
    id: 1,
    name: "John Doe",
    username: "@johndoe",
    email: "john.doe@example.com",
    role: "Admin",
    status: "Active",
    lastLogin: "2 hours ago",
    avatar: "https://picsum.photos/200/200?1",
  },
  {
    id: 2,
    name: "Jane Smith",
    username: "@janesmith",
    email: "jane.smith@example.com",
    role: "Trader",
    status: "Active",
    lastLogin: "5 hours ago",
    avatar: "https://picsum.photos/200/200?2",
  },
  {
    id: 3,
    name: "Sam Wilson",
    username: "@samwilson",
    email: "sam.wilson@example.com",
    role: "Analyst",
    status: "Pending",
    lastLogin: "1 day ago",
    avatar: "https://picsum.photos/200/200?3",
  },
];

export const columns: Column<User>[] = [
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
    header: "",
    render: () => (
      <button className="text-text-light dark:text-text-dark hover:text-primary">
        <span className="material-icons">more_vert</span>
      </button>
    ),
  },
];
