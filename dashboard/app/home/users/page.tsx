"use client";

import Pagination from "@/app/components/home/pagination";
import Table from "@/app/components/home/table";
import { columns, User, users } from "./_comp/table";
import { Plus } from "lucide-react";
import Text from "@/app/components/forms/text";
import Button from "@/app/components/forms/button";

const UserPage = () => {
  return (
    <main className="flex-1 overflow-y-auto mt-[10px]">
      <div className="bg-card-light dark:bg-card-dark p-6 rounded-lg">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <Text variant="medium" className="mb-0">
            User Management
          </Text>

          <div className="w-[120px]">
            <Button
              variant="primary"
              className="flex items-center gap-2 w-auto px-2 py-2.5 text-sm"
              onClick={() => console.log("Add new user clicked")}
            >
              <Plus className="w-5 h-5" />
              Add User
            </Button>
          </div>
        </div>

        {/* Table */}
        <Table<User> columns={columns} data={users} />

        {/* Pagination */}
        <div className="mt-6">
          <Pagination total={20} perPage={5} currentPage={1} />
        </div>
      </div>
    </main>
  );
};

export default UserPage;
