"use client";
import Table from "@/app/components/home/table";
import { Fragment, useCallback, useEffect, useState } from "react";
import { adminColumns, AdminUser } from "./table";
import Pagination from "@/app/components/home/pagination";
import { formatTimestamp } from "@/app/lib/utils";
import { setAdminUserList } from "@/app/lib/redux/slices/users";
import { UserService } from "@/app/lib/services/users";
import { useAppDispatch, useAppSelector } from "@/app/lib/redux/controls";

const UserTable = () => {
  const dispatch = useAppDispatch();
  const [skip, setSkip] = useState(0);
  const [limit, setLimit] = useState(30);
  const [loading, setLoading] = useState(false);
  const adminUsers = useAppSelector((state) => state.users.adminUsers);
  const reload = useAppSelector((state) => state.users.reload);

  const getAdminUsers = useCallback(async () => {
    setLoading(true);
    const { error, payload } = await UserService.getAdminUsers(skip, limit);
    setLoading(false);
    if (!error && payload) {
      const walletData = {
        data: payload?.data,
        total: payload?.total,
      };
      dispatch(setAdminUserList(walletData));
    }
  }, [reload]);

  useEffect(() => {
    getAdminUsers();
  }, [getAdminUsers, reload]);

  const walletRows = () => {
    return adminUsers?.data?.map((data: any, index: number) => {
      return {
        id: index + 1,
        name: data?.firstname + " " + data?.lastname,
        username: "@" + data?.email.split("@")[0],
        email: data?.email,
        phone: data?.phone,
        role: data?.roles?.length === 0 ? "Super Admin" : "Admin User",
        isActive: data?.isActive,
        avatar: "https://picsum.photos/200/200?1",
      };
    });
  };

  const users = walletRows();

  return (
    <Fragment>
      <Table<AdminUser> data={users} columns={adminColumns} loading={loading} />
      <Pagination total={adminUsers?.total} perPage={30} currentPage={1} />
    </Fragment>
  );
};

export default UserTable;
