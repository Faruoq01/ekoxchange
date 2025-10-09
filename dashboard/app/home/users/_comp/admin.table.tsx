"use client";
import Table from "@/app/components/home/table";
import { Fragment } from "react";
import { adminColumns, AdminUser, users } from "./table";
import Pagination from "@/app/components/home/pagination";

const UserTable = () => {
  return (
    <Fragment>
      <Table<AdminUser> data={users} columns={adminColumns} />
      <Pagination total={30} perPage={30} currentPage={1} />
    </Fragment>
  );
};

export default UserTable;
