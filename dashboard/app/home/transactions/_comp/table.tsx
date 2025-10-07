"use client";

import { Column } from "@/app/components/home/table";

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

/* --- BUY Transactions --- */
export const buyTransactions: Transaction[] = [
  {
    id: 1,
    type: "Buy",
    asset: "Bitcoin (BTC)",
    network: "Bitcoin",
    amount: "0.005 BTC",
    value: "≈ $340",
    status: "Completed",
    timestamp: "Oct 4, 2025, 08:20 AM",
    icon: "https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/bitcoin/info/logo.png",
  },
  {
    id: 2,
    type: "Buy",
    asset: "Ethereum (ETH)",
    network: "Ethereum",
    amount: "0.12 ETH",
    value: "≈ $360",
    status: "Pending",
    timestamp: "Oct 3, 2025, 04:45 PM",
    icon: "https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/info/logo.png",
  },
  {
    id: 4,
    type: "Buy",
    asset: "Solana (SOL)",
    network: "Solana",
    amount: "5 SOL",
    value: "≈ $210",
    status: "Failed",
    timestamp: "Oct 1, 2025, 10:32 AM",
    icon: "https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/solana/info/logo.png",
  },
];

/* --- SELL Transactions --- */
export const sellTransactions: Transaction[] = [
  {
    id: 5,
    type: "Sell",
    asset: "Ethereum (ETH)",
    network: "Ethereum",
    amount: "0.35 ETH",
    value: "≈ $1,020",
    status: "Completed",
    timestamp: "Oct 4, 2025, 09:55 AM",
    icon: "https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/info/logo.png",
  },
  {
    id: 7,
    type: "Sell",
    asset: "BNB (Binance Coin)",
    network: "BNB Chain",
    amount: "1.5 BNB",
    value: "≈ $620",
    status: "Completed",
    timestamp: "Oct 2, 2025, 05:15 PM",
    icon: "https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/binance/info/logo.png",
  },
];

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

/* --- SEND Transactions --- */
export const sendTransactions: Transaction[] = [
  {
    id: 13,
    type: "Transfer",
    asset: "USDT (Tether)",
    network: "Tron",
    amount: "250 USDT",
    value: "≈ $250",
    status: "Completed",
    timestamp: "Oct 4, 2025, 10:15 PM",
    icon: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRBcmKcHrJcPR_wk4REQeUaEdX7fHVi3uePPw&s",
  },
  {
    id: 14,
    type: "Transfer",
    asset: "Ethereum (ETH)",
    network: "Ethereum",
    amount: "0.15 ETH",
    value: "≈ $420",
    status: "Pending",
    timestamp: "Oct 3, 2025, 06:45 PM",
    icon: "https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/info/logo.png",
  },
];

/* --- Table Columns --- */
export const transactionColumns: Column<Transaction>[] = [
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
