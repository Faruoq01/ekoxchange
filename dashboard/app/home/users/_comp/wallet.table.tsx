"use client";
import Table from "@/app/components/home/table";
import { Fragment, useCallback, useEffect, useState } from "react";
import { walletColumns, WalletUser } from "./table";
import { UserService } from "@/app/lib/services/users";
import Pagination from "@/app/components/home/pagination";
import { useAppDispatch, useAppSelector } from "@/app/lib/redux/controls";
import { setWalletUserList } from "@/app/lib/redux/slices/users";
import { formatTimestamp } from "@/app/lib/utils";

const WalletTable = () => {
  const dispatch = useAppDispatch();
  const [skip, setSkip] = useState(0);
  const [limit, setLimit] = useState(30);
  const [loading, setLoading] = useState(false);
  const walletUsers = useAppSelector((state) => state.users.walletUsers);
  const reload = useAppSelector((state) => state.users.reload);

  const getWalletUsers = useCallback(async () => {
    setLoading(true);
    const { error, payload } = await UserService.getWalletUsers(skip, limit);
    setLoading(false);
    if (!error && payload) {
      const walletData = {
        data: payload?.data,
        total: payload?.total,
      };
      dispatch(setWalletUserList(walletData));
    }
  }, [reload]);

  useEffect(() => {
    getWalletUsers();
  }, [getWalletUsers, reload]);

  const walletRows = () => {
    return walletUsers?.data?.map((data: any, index: number) => {
      return {
        id: index + 1,
        name: data?.firstname + " " + data?.lastname,
        email: data?.email,
        createdAt: formatTimestamp(data?.createdAt),
        isKYCDone: data?.isKYCDone,
        status: data?.status,
        isActive: data?.isActive,
        avatar: `https://picsum.photos/200/200?${index + 2}`,
        rawData: JSON.stringify(data),
      };
    });
  };

  const users = walletRows();
  return (
    <Fragment>
      <Table<WalletUser>
        data={users}
        columns={walletColumns}
        loading={loading}
      />
      <Pagination total={walletUsers?.total} perPage={30} currentPage={1} />
    </Fragment>
  );
};

export default WalletTable;
