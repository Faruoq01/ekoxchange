"use client";
import { Column } from "@/app/components/home/table";
import { Modal } from "@/app/components/modals/modalskin";
import UpdateUser from "@/app/components/modals/updateuser";
import UserDetailsModal from "@/app/components/modals/user.details";
import WalletUserDetails from "@/app/components/modals/wallet.user";
import { useAppDispatch } from "@/app/lib/redux/controls";
import { setSingleAdminUser } from "@/app/lib/redux/slices/users";
import { Badge } from "@/components/ui/badge";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Fragment, useState } from "react";

export interface AdminUser {
  id: number;
  name: string;
  username: string;
  email: string;
  phone: string;
  role: string;
  isActive: boolean;
  avatar: string;
  rawData: string;
}

export interface WalletUser {
  id: number;
  name: string;
  balance: string;
  isActive: boolean;
  avatar: string;
  isKYCDone: boolean;
  rawData: string;
}

const badgeColors = [
  "bg-pink-100 text-pink-800 border border-pink-200",
  "bg-blue-100 text-blue-800 border border-blue-200",
  "bg-green-100 text-green-800 border border-green-200",
  "bg-purple-100 text-purple-800 border border-purple-200",
  "bg-yellow-100 text-yellow-800 border border-yellow-200",
  "bg-orange-100 text-orange-800 border border-orange-200",
  "bg-cyan-100 text-cyan-800 border border-cyan-200",
];

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
  {
    key: "role",
    header: "Role",
    render: (user) => {
      const data = JSON.parse(user.rawData);
      const roles = data?.roles ?? [];
      const isSuperAdmin = data?.isSuperAdmin ?? false;

      // 🟣 If the user has no roles
      if (!roles.length) {
        if (isSuperAdmin) {
          return (
            <Badge className="bg-gradient-to-r from-indigo-500 to-purple-500 text-white text-[10px] py-0.5 px-2 rounded-full shadow-sm">
              Super Admin
            </Badge>
          );
        } else {
          return (
            <Badge className="bg-gray-300 dark:bg-gray-700 text-gray-800 dark:text-gray-200 text-[10px] py-0.5 px-2 rounded-full shadow-sm">
              No Role
            </Badge>
          );
        }
      }

      // 🟢 If the user has roles
      return (
        <div className="flex flex-wrap gap-1">
          {roles.map((role: any, i: number) => (
            <Badge
              key={i}
              className={`${
                badgeColors[i % badgeColors.length]
              } text-[10px] py-0.5 px-2 rounded-full shadow-sm`}
            >
              {role?.name || "Admin User"}
            </Badge>
          ))}
        </div>
      );
    },
  },
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
    render: (user) => {
      const dispatch = useAppDispatch();
      const [isOpen, setIsopen] = useState(false);
      const [isDetails, setIsDetails] = useState(false);

      const editUser = () => {
        const data = JSON.parse(user?.rawData);
        dispatch(setSingleAdminUser(data));
        setIsopen(true);
      };

      const viewDetails = () => {
        const data = JSON.parse(user?.rawData);
        dispatch(setSingleAdminUser(data));
        setIsDetails(true);
      };

      return (
        <Fragment>
          <Popover>
            <PopoverTrigger asChild>
              <button
                className="text-gray-500 dark:text-gray-300 hover:text-primary transition"
                title="Actions"
              >
                <span className="material-icons text-[20px]">more_vert</span>
              </button>
            </PopoverTrigger>

            <PopoverContent className="max-w-[130px] text-[12px]">
              <div
                onClick={editUser}
                className="py-[6px] border-b select-none hover:bg-gray-50 px-[10px]"
              >
                Edit user
              </div>
              <div
                onClick={viewDetails}
                className="py-[6px] select-none hover:bg-gray-50 px-[10px]"
              >
                View Details
              </div>
            </PopoverContent>
          </Popover>

          <Modal isOpen={isOpen}>
            <UpdateUser setIsopen={setIsopen} />
          </Modal>

          {isDetails && (
            <Modal isOpen={isDetails}>
              <UserDetailsModal setIsDetails={setIsDetails} />
            </Modal>
          )}
        </Fragment>
      );
    },
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
    key: "isActive",
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
    render: (user) => {
      const dispatch = useAppDispatch();
      const [isOpen, setIsopen] = useState(false);
      const [isDetails, setIsDetails] = useState(false);

      const viewDetails = () => {
        const data = JSON.parse(user?.rawData);
        dispatch(setSingleAdminUser(data));
        setIsDetails(true);
      };

      return (
        <Fragment>
          <Popover>
            <PopoverTrigger asChild>
              <button
                className="text-gray-500 dark:text-gray-300 hover:text-primary transition"
                title="Actions"
              >
                <span className="material-icons text-[20px]">more_vert</span>
              </button>
            </PopoverTrigger>

            <PopoverContent className="max-w-[150px] text-[12px]">
              <div
                onClick={viewDetails}
                className="py-[6px] select-none hover:bg-gray-50 px-[10px]"
              >
                View Details
              </div>
              <div className="py-[6px] border-b select-none hover:bg-gray-50 px-[10px]">
                Reset Password
              </div>
              <div className="py-[6px] select-none hover:bg-gray-50 px-[10px]">
                Reset 2FA
              </div>
            </PopoverContent>
          </Popover>
          {isDetails && (
            <Modal isOpen={isDetails}>
              <WalletUserDetails setIsDetails={setIsDetails} />
            </Modal>
          )}
        </Fragment>
      );
    },
  },
];
