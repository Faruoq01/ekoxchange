"use client";
import { Column } from "@/app/components/home/table";

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

const statusColors: Record<string, string> = {
  Completed:
    "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300",
  Pending:
    "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300",
  Failed: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300",
};

export const transactions: Transaction[] = [
  {
    id: 1,
    type: "Buy",
    asset: "Bitcoin (BTC)",
    network: "Bitcoin",
    amount: "0.005 BTC",
    value: "≈ $340",
    status: "Completed",
    timestamp: "Oct 4, 2025, 08:20 AM",
    icon: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/46/Bitcoin.svg/1200px-Bitcoin.svg.png",
  },
  {
    id: 2,
    type: "Sell",
    asset: "Ethereum (ETH)",
    network: "Ethereum",
    amount: "0.25 ETH",
    value: "≈ $720",
    status: "Pending",
    timestamp: "Oct 4, 2025, 09:55 AM",
    icon: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTJDn0ojTITvcdAzMsfBMJaZC4STaDHzduleQ&s",
  },
  {
    id: 3,
    type: "Swap",
    asset: "Solana (SOL)",
    network: "Solana",
    amount: "10 SOL",
    value: "≈ $410",
    status: "Failed",
    timestamp: "Oct 3, 2025, 11:05 PM",
    icon: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQty1ptcBSY-tfLh_dAW_FS1GLSClUiFQTZqA&s",
  },
];

export const transactionColumns: Column<Transaction>[] = [
  {
    key: "type",
    header: "Transaction Type",
    render: (tx) => (
      <div className="flex items-center gap-2">
        <span className="capitalize font-medium">{tx.type}</span>
      </div>
    ),
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
    header: "",
    render: () => (
      <button className="text-text-light dark:text-text-dark hover:text-primary">
        <span className="material-icons">more_vert</span>
      </button>
    ),
  },
];
