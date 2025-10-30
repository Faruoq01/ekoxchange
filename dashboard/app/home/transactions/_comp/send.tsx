"use client";
import Image from "next/image";
import Pagination from "@/app/components/home/pagination";
import Table, { Column } from "@/app/components/home/table";
import { useAppDispatch, useAppSelector } from "@/app/lib/redux/controls";
import { setSendTransaction } from "@/app/lib/redux/slices/transaction";
import { TransactionService } from "@/app/lib/services/transaction";
import { AnimatePresence, motion } from "framer-motion";
import { Fragment, useCallback, useEffect, useState } from "react";

/* --- Status Colors --- */
const statusColors: Record<string, string> = {
  Success: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300",
  Pending:
    "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300",
  Failed: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300",
};

/* --- Table Columns --- */
export const sendTransactionColumns: Column<any>[] = [
  {
    key: "user",
    header: "User Info",
    render: (tx) => (
      <div className="flex flex-row items-center">
        <Image
          src={tx?.user?.avatar}
          width={40}
          height={40}
          alt="icon"
          className="rounded-full mr-[10px]"
        />
        <div className="flex flex-col">
          <span className="font-semibold">
            {tx.user.firstname} {tx.user.lastname}
          </span>
          <span className="text-sm text-gray-500">{tx.user.email}</span>
        </div>
      </div>
    ),
  },
  {
    key: "direction",
    header: "Type",
    render: (tx) => (
      <span
        className={`capitalize font-medium ${
          tx.direction === "Received" ? "text-green-600" : "text-red-600"
        }`}
      >
        {tx.direction}
      </span>
    ),
  },
  {
    key: "chain",
    header: "Network",
    render: (tx) => (
      <div className="flex items-center gap-2">
        <img
          src={tx.logo}
          alt={tx.chain}
          className="w-6 h-6 rounded-full object-cover"
        />
        <span className="font-semibold">{tx.chain}</span>
      </div>
    ),
  },
  {
    key: "amount",
    header: "Amount",
    render: (tx) => (
      <span className="font-medium">
        {tx.amount.toFixed(6)}{" "}
        {tx.chain === "Ethereum" ? "ETH" : tx.chain.slice(0, 3).toUpperCase()}
      </span>
    ),
  },
  {
    key: "status",
    header: "Status",
    render: (tx) => (
      <span
        className={`text-xs font-medium px-2.5 py-1 rounded-full ${
          statusColors[tx.status] || "bg-gray-100 text-gray-800"
        }`}
      >
        {tx.status}
      </span>
    ),
  },
  {
    key: "timestamp",
    header: "Date & Time",
    render: (tx) => (
      <span>
        {new Date(tx.timestamp).toLocaleString("en-US", {
          dateStyle: "medium",
          timeStyle: "short",
        })}
      </span>
    ),
  },
  {
    key: "explorer",
    header: "Explorer",
    render: (tx) => (
      <a
        href={tx.explorer}
        target="_blank"
        rel="noopener noreferrer"
        className="text-blue-600 hover:underline"
      >
        View
      </a>
    ),
  },
];

/* --- Component --- */
export const SendComponent = ({ activeTab }: { activeTab: string }) => {
  const dispatch = useAppDispatch();
  const [skip, setSkip] = useState(0);
  const [limit, setLimit] = useState(30);
  const [currentPage, setCurrentpage] = useState(1);
  const [total, setTotal] = useState(30);
  const [loading, setLoading] = useState(false);
  const send = useAppSelector((state) => state.transaction.send);

  const getSendTransactions = useCallback(async () => {
    setLoading(true);
    const { error, payload } = await TransactionService.sendTransactions(
      skip,
      limit
    );
    setLoading(false);
    if (!error && payload) {
      setCurrentpage(payload?.totalPages);
      setTotal(payload?.total);
      dispatch(setSendTransaction(payload?.data));
    }
  }, [dispatch, skip, limit]);

  useEffect(() => {
    getSendTransactions();
  }, [getSendTransactions]);

  const filterRowData = (): any[] => {
    return (
      send?.map((rawTx: any, index: number) => ({
        id: rawTx.id || rawTx._id,
        chain: rawTx.chain || "Unknown",
        direction: rawTx.direction || "Unknown",
        amount: Number(rawTx.amount) || 0,
        fee: Number(rawTx.fee) || 0,
        status: rawTx.status || "Pending",
        from: rawTx.from || "",
        to: rawTx.to || "",
        hash: rawTx.hash || "",
        explorer: rawTx.explorer || "",
        logo:
          rawTx.logo ||
          `https://raw.githubusercontent.com/spothq/cryptocurrency-icons/master/128/color/${rawTx.chain?.toLowerCase()}.png`,
        timestamp: rawTx.timestamp || Date.now(),
        createdAt: rawTx.createdAt || Date.now(),
        updatedAt: rawTx.updatedAt || Date.now(),
        user: {
          firstname: rawTx.user?.firstname || "",
          lastname: rawTx.user?.lastname || "",
          email: rawTx.user?.email || "",
          avatar:
            rawTx?.user?.avatar || `https://picsum.photos/200/200?${index + 2}`,
        },
      })) || []
    );
  };

  const filteredData = filterRowData();

  return (
    <Fragment>
      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.3 }}
        >
          <Table<any>
            data={filteredData}
            columns={sendTransactionColumns}
            loading={loading}
          />
        </motion.div>
      </AnimatePresence>

      <Pagination total={total} perPage={limit} currentPage={currentPage} />
    </Fragment>
  );
};
