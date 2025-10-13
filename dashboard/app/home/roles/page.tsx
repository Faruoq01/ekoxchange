"use client";
import React, { useCallback, useEffect, useState } from "react";
import Button from "@/app/components/forms/button";
import Text from "@/app/components/forms/text";
import Pagination from "@/app/components/home/pagination";
import Table from "@/app/components/home/table";
import { Plus } from "lucide-react";
import { motion } from "framer-motion";
import { Column } from "@/app/components/home/table";
import { RoleService } from "@/app/lib/services/roles";
import { useAppDispatch, useAppSelector } from "@/app/lib/redux/controls";
import { setRoles } from "@/app/lib/redux/slices/roles";
import { formatTimestamp } from "@/app/lib/utils";
import { AppPages } from "@/app/assets/appages";
import { useRouter } from "next/navigation";

/* ------------------------------ Types ------------------------------ */
export interface Role {
  id: number;
  name: string;
  description: string;
  dateModified: string;
  userCount: number;
}

/* ------------------------------ Table Columns ------------------------------ */
export const roleColumns: Column<Role>[] = [
  {
    key: "name",
    header: "Role Name",
    render: (role) => (
      <span className="font-semibold text-heading-light dark:text-heading-dark">
        {role.name}
      </span>
    ),
  },
  {
    key: "description",
    header: "Description",
    render: (role) => (
      <p className="text-sm text-text-light dark:text-text-dark text-left">
        {role.description}
      </p>
    ),
  },
  {
    key: "dateModified",
    header: "Date Modified",
    render: (role) => (
      <p className="text-sm text-text-light dark:text-text-dark">
        {role.dateModified}
      </p>
    ),
  },
  {
    key: "userCount",
    header: "Users",
    render: (role) => (
      <span className="font-medium text-gray-800 dark:text-gray-200">
        {role.userCount}
      </span>
    ),
  },
  {
    key: "actions",
    header: "Actions",
    render: () => (
      <div className="flex items-center gap-2">
        <button
          className="text-gray-500 hover:text-primary transition"
          title="Edit Role"
        >
          <span className="material-icons text-[20px]">edit</span>
        </button>
        <button
          className="text-gray-500 hover:text-red-500 transition"
          title="Delete Role"
        >
          <span className="material-icons text-[20px]">delete</span>
        </button>
      </div>
    ),
  },
];

const Roles = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [skip, setSkip] = useState(0);
  const [limit, setLimit] = useState(30);
  const [loading, setLoading] = useState(false);
  const roleList = useAppSelector((state) => state.roles.roleList);

  const getRoleList = useCallback(async () => {
    setLoading(true);
    const { error, payload } = await RoleService.getRoles(skip, limit);
    setLoading(false);
    if (!error && payload) {
      dispatch(setRoles(payload));
    }
  }, []);

  useEffect(() => {
    getRoleList();
  }, [getRoleList]);

  const getRoleData = () => {
    return roleList?.map((item: any, index: number) => {
      return {
        id: index + 1,
        name: item.name,
        userCount: item.userCount,
        description: item.description,
        dateModified: item?.updatedAt
          ? formatTimestamp(item?.updatedAt)
          : "System generated",
      };
    });
  };

  const goToCreateRole = () => {
    router.push(AppPages.home.roles.create);
  };

  const roleRows = getRoleData();
  return (
    <main className="p-4 md:p-6 bg-card-light dark:bg-card-dark rounded-lg mt-[20px] mb-[50px]">
      {/* Header */}
      <div className="flex items-center justify-between mb-[20px] bg-white">
        <Text variant="medium" className="mb-0">
          Role Management
        </Text>

        <Button
          variant="primary"
          className="w-auto px-3 py-2.5 text-sm"
          onClick={goToCreateRole}
        >
          <Plus className="w-5 h-5" />
          <span>Add Role</span>
        </Button>
      </div>

      {/* Roles Table */}
      <motion.div
        className="bg-card-light dark:bg-card-dark"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
      >
        <Table<Role> columns={roleColumns} data={roleRows} loading={loading} />

        {/* Pagination */}
        <div className="mt-6">
          <Pagination total={roleRows.length} perPage={15} currentPage={1} />
        </div>
      </motion.div>
    </main>
  );
};

export default Roles;
