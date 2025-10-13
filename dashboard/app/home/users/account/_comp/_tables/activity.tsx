import { Column } from "@/app/components/home/table";
import { UserIcon } from "lucide-react";

export const activityTableColumns: Column<any>[] = [
  {
    key: "fullName",
    header: "User",
    render: (row) => (
      <div className="flex items-center gap-3">
        {row.avatar ? (
          <img
            src={row.avatar}
            alt={row.fullName}
            className="w-8 h-8 rounded-full object-cover"
          />
        ) : (
          <div className="w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center font-semibold">
            {row.fullName?.charAt(0) || <UserIcon className="w-4 h-4" />}
          </div>
        )}
        <span className="font-medium text-gray-800 dark:text-gray-100">
          {row.fullName}
        </span>
      </div>
    ),
  },
  {
    key: "description",
    header: "Activity",
    render: (row) => (
      <span className="text-gray-700 dark:text-gray-300 text-sm">
        {row.description}
      </span>
    ),
  },
  {
    key: "createdAt",
    header: "Timestamp",
    render: (row) => (
      <span className="text-xs text-gray-500 dark:text-gray-400">
        {new Date(row.createdAt).toLocaleString(undefined, {
          dateStyle: "medium",
          timeStyle: "short",
        })}
      </span>
    ),
  },
];
