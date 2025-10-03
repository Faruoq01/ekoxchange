"use client";
import { Column } from "@/app/components/home/table";

export interface Fee {
  id: number;
  transactionType: string;
  cryptoAsset: string;
  network: string;
  feeType: string;
  currentValue: string;
  appliedTo: string;
  lastModified: string;
  status: string;
}

// --- Status badge colors
const statusColors: Record<string, string> = {
  Active: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300",
  Inactive: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300",
};

// --- Sample data
export const fees: Fee[] = [
  {
    id: 1,
    transactionType: "Sell",
    cryptoAsset: "Tron (TRX)",
    network: "Tron",
    feeType: "Fixed",
    currentValue: "NGN 20",
    appliedTo: "Basic",
    lastModified: "9/15/2025, 8:10:35 AM",
    status: "Active",
  },
  {
    id: 2,
    transactionType: "Buy",
    cryptoAsset: "Tron (TRX)",
    network: "Tron",
    feeType: "Fixed",
    currentValue: "NGN 1000",
    appliedTo: "Basic",
    lastModified: "9/15/2025, 8:04:55 AM",
    status: "Active",
  },
  {
    id: 3,
    transactionType: "Buy",
    cryptoAsset: "Bitcoin (BTC)",
    network: "Bitcoin",
    feeType: "Fixed",
    currentValue: "NGN 5000",
    appliedTo: "Basic",
    lastModified: "9/15/2025, 8:11:36 AM",
    status: "Active",
  },
  {
    id: 4,
    transactionType: "Buy",
    cryptoAsset: "USD Coin (USDC)",
    network: "Ethereum",
    feeType: "Fixed",
    currentValue: "NGN 120",
    appliedTo: "Basic",
    lastModified: "9/15/2025, 10:21:13 AM",
    status: "Active",
  },
  {
    id: 5,
    transactionType: "Buy",
    cryptoAsset: "USD Coin (USDC)",
    network: "Ethereum",
    feeType: "Fixed",
    currentValue: "NGN 12",
    appliedTo: "Basic",
    lastModified: "9/15/2025, 10:22:48 AM",
    status: "Active",
  },
  {
    id: 6,
    transactionType: "Buy",
    cryptoAsset: "Tether USD (USDT)",
    network: "Ethereum",
    feeType: "Fixed",
    currentValue: "NGN 3000",
    appliedTo: "Basic",
    lastModified: "9/20/2025, 9:43:13 AM",
    status: "Active",
  },
];

// --- Columns
export const feeColumns: Column<Fee>[] = [
  { key: "transactionType", header: "Transaction Type" },
  { key: "cryptoAsset", header: "Crypto Asset" },
  { key: "network", header: "Network" },
  { key: "feeType", header: "Fee Type" },
  { key: "currentValue", header: "Current Value" },
  { key: "appliedTo", header: "Applied To" },
  { key: "lastModified", header: "Last Modified" },
  {
    key: "status",
    header: "Status",
    render: (fee) => (
      <span
        className={`text-xs font-medium px-2.5 py-1 rounded-full ${
          statusColors[fee.status]
        }`}
      >
        {fee.status}
      </span>
    ),
  },
  {
    key: "actions",
    header: "Action",
    render: () => (
      <button className="text-text-light dark:text-text-dark hover:text-primary">
        <span className="material-icons">more_vert</span>
      </button>
    ),
  },
];
