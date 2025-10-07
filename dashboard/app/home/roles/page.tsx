"use client";

import React from "react";
import Button from "@/app/components/forms/button";
import Text from "@/app/components/forms/text";
import Pagination from "@/app/components/home/pagination";
import Table from "@/app/components/home/table";
import { Plus } from "lucide-react";
import { motion } from "framer-motion";
import { Column } from "@/app/components/home/table";

/* ------------------------------ Types ------------------------------ */
export interface Role {
  id: number;
  name: string;
  description: string;
  userCount: number;
}

/* ------------------------------ Dummy Data ------------------------------ */
export const roles: Role[] = [
  {
    id: 1,
    name: "Super Admin",
    description:
      "Full access to all system configurations and user management.",
    userCount: 3,
  },
  {
    id: 2,
    name: "Administrator",
    description: "Manages users, permissions, and high-level operations.",
    userCount: 8,
  },
  {
    id: 3,
    name: "Moderator",
    description: "Oversees content and ensures policy compliance.",
    userCount: 12,
  },
  {
    id: 4,
    name: "Trader",
    description: "Handles asset management and trading operations.",
    userCount: 25,
  },
  {
    id: 5,
    name: "Analyst",
    description: "Responsible for reporting, insights, and data monitoring.",
    userCount: 10,
  },
];

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
      <p className="text-sm text-text-light dark:text-text-dark">
        {role.description}
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

/* ------------------------------ Component ------------------------------ */
const Roles = () => {
  return (
    <main className="p-4 md:p-6 bg-card-light dark:bg-card-dark rounded-lg mt-[20px]">
      {/* Header */}
      <div className="flex items-center justify-between mb-[20px] bg-white">
        <Text variant="medium" className="mb-0">
          Role Management
        </Text>

        <Button
          variant="primary"
          className="w-auto px-3 py-2.5 text-sm"
          onClick={() => console.log("Add new role clicked")}
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
        <Table<Role> columns={roleColumns} data={roles} />

        {/* Pagination */}
        <div className="mt-6">
          <Pagination total={roles.length} perPage={5} currentPage={1} />
        </div>
      </motion.div>
    </main>
  );
};

export default Roles;
