"use client";

import Pagination from "@/app/components/home/pagination";
import Table, { Column } from "@/app/components/home/table";
import { AnimatePresence, motion } from "framer-motion";
import { Fragment } from "react";

/* --- Interface --- */
export interface Transaction {
  id: number;
  type: "Buy" | "Sell" | "Swap" | "Transfer";
  asset: string;
  network: string;
  amount: string;
  value: string;
  status: "Pending" | "Completed" | "Failed";
  timestamp: string;
  icon: string;
}

/* --- Status Colors --- */
const statusColors: Record<string, string> = {
  Completed:
    "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300",
  Pending:
    "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300",
  Failed: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300",
};

/* --- SWAP Transactions --- */
export const swapTransactions: Transaction[] = [
  {
    id: 9,
    type: "Swap",
    asset: "USDT → USDC",
    network: "Ethereum",
    amount: "300 USDT",
    value: "≈ $300",
    status: "Completed",
    timestamp: "Oct 4, 2025, 08:00 AM",
    icon: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRBcmKcHrJcPR_wk4REQeUaEdX7fHVi3uePPw&s",
  },
  {
    id: 10,
    type: "Swap",
    asset: "ETH → WBTC",
    network: "Ethereum",
    amount: "0.25 ETH",
    value: "≈ $740",
    status: "Pending",
    timestamp: "Oct 3, 2025, 06:45 PM",
    icon: "https://1000logos.net/wp-content/uploads/2023/01/Ethereum-logo.png",
  },
];

/* --- Table Columns --- */
export const swapTransactionColumns: Column<Transaction>[] = [
  {
    key: "type",
    header: "Transaction Type",
    render: (tx) => <span className="capitalize font-medium">{tx.type}</span>,
  },
  {
    key: "asset",
    header: "Crypto Asset",
    render: (tx) => (
      <div className="flex items-center gap-3">
        <img
          src={tx.icon}
          alt={tx.asset}
          className="w-8 h-8 rounded-full object-cover"
        />
        <span className="font-semibold">{tx.asset}</span>
      </div>
    ),
  },
  { key: "network", header: "Network" },
  { key: "amount", header: "Amount" },
  { key: "value", header: "Value (USD)" },
  {
    key: "status",
    header: "Status",
    render: (tx) => (
      <span
        className={`text-xs font-medium px-2.5 py-1 rounded-full ${
          statusColors[tx.status]
        }`}
      >
        {tx.status}
      </span>
    ),
  },
  { key: "timestamp", header: "Date & Time" },
  {
    key: "actions",
    header: "Actions",
    render: () => (
      <button className="text-text-light dark:text-text-dark hover:text-primary">
        <span className="material-icons">more_vert</span>
      </button>
    ),
  },
];

export const SwapComponent = ({ activeTab }: { activeTab: string }) => {
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
            data={swapTransactions}
            columns={swapTransactionColumns}
          />
        </motion.div>
      </AnimatePresence>

      <Pagination total={30} perPage={30} currentPage={1} />
    </Fragment>
  );
};
