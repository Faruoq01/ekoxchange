"use client";
import { Column } from "@/app/components/home/table";

export interface SystemLog {
  id: number;
  user: string;
  action: string;
  category: string;
  status: string;
  timestamp: string;
  icon: string;
}

const statusColors: Record<string, string> = {
  Success: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300",
  Warning:
    "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300",
  Error: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300",
};

export const logs: SystemLog[] = [
  {
    id: 1,
    user: "John Doe",
    action: "Logged in successfully",
    category: "Authentication",
    status: "Success",
    timestamp: "2 minutes ago",
    icon: "login",
  },
  {
    id: 2,
    user: "Jane Smith",
    action: "Executed BTC/ETH trade",
    category: "Trading",
    status: "Success",
    timestamp: "15 minutes ago",
    icon: "currency_bitcoin",
  },
  {
    id: 3,
    user: "System",
    action: "Auto backup completed",
    category: "System",
    status: "Success",
    timestamp: "1 hour ago",
    icon: "cloud_done",
  },
  {
    id: 4,
    user: "Sam Wilson",
    action: "Failed withdrawal attempt",
    category: "Payments",
    status: "Error",
    timestamp: "3 hours ago",
    icon: "error",
  },
  {
    id: 5,
    user: "Admin",
    action: "Updated system configuration",
    category: "Settings",
    status: "Warning",
    timestamp: "Yesterday",
    icon: "settings",
  },
];

export const logsColumns: Column<SystemLog>[] = [
  {
    key: "action",
    header: "Activity",
    render: (log) => (
      <div className="flex items-center gap-3">
        <span className="material-icons text-primary">{log.icon}</span>
        <div>
          <p className="font-semibold">{log.action}</p>
          <p className="text-xs text-text-light dark:text-text-dark">
            {log.category}
          </p>
        </div>
      </div>
    ),
  },
  {
    key: "user",
    header: "User",
    render: (log) => (
      <p className="font-medium text-text-light dark:text-text-dark">
        {log.user}
      </p>
    ),
  },
  {
    key: "status",
    header: "Status",
    render: (log) => (
      <span
        className={`text-xs font-medium px-2.5 py-1 rounded-full ${
          statusColors[log.status]
        }`}
      >
        {log.status}
      </span>
    ),
  },
  { key: "timestamp", header: "Time" },
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
