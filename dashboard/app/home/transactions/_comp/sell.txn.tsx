"use client";

import { AppPages } from "@/app/assets/appages";
import { Column } from "@/app/components/home/table";
import { useRouter } from "next/navigation";

/* --- Interface --- */
export interface SellTransaction {
  id: string;
  token: string;
  unitPrice: string;
  usdPrice: string;
  txnHash: string;
  chain: string;
  amountToPay: string;
  bank: {
    bankName: string;
    accountName: string;
    accountNumber: string;
  };
  createdAt: string;
  status: "pending" | "completed";
}

/* --- Status Colors --- */
const statusColors: Record<SellTransaction["status"], string> = {
  completed:
    "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300",
  pending:
    "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300",
};

/* --- Example Data --- */
export const sellTransactions: SellTransaction[] = [
  {
    id: "1",
    token: "USDT",
    unitPrice: "0.998",
    usdPrice: "150.20",
    txnHash: "0x1a2b...c3d4",
    chain: "BSC",
    amountToPay: "150.50",
    bank: {
      bankName: "First Bank of Nigeria",
      accountName: "John Doe",
      accountNumber: "3045678901",
    },
    createdAt: "Oct 4, 2025, 09:15 AM",
    status: "pending",
  },
  {
    id: "2",
    token: "USDC",
    unitPrice: "1.00",
    usdPrice: "1000.00",
    txnHash: "0x4f5e...d6c7",
    chain: "Ethereum",
    amountToPay: "1000.00",
    bank: {
      bankName: "Zenith Bank",
      accountName: "Jane Smith",
      accountNumber: "1023456789",
    },
    createdAt: "Oct 3, 2025, 04:45 PM",
    status: "completed",
  },
  {
    id: "3",
    token: "DAI",
    unitPrice: "0.999",
    usdPrice: "250.00",
    txnHash: "0x7c8d...e9f0",
    chain: "Polygon",
    amountToPay: "250.25",
    bank: {
      bankName: "GTBank",
      accountName: "Mike Ross",
      accountNumber: "0123456789",
    },
    createdAt: "Oct 1, 2025, 10:32 AM",
    status: "completed",
  },
];

/* --- Table Columns --- */
export const sellTransactionColumns: Column<SellTransaction>[] = [
  { key: "id", header: "Transaction ID" },
  { key: "token", header: "Token" },
  {
    key: "unitPrice",
    header: "Unit Price",
    render: (tx) => `$${tx.unitPrice}`,
  },
  {
    key: "usdPrice",
    header: "Amount (USD)",
    render: (tx) => `$${tx.usdPrice}`,
  },
  {
    key: "bank",
    header: "Bank Details",
    render: (tx) => (
      <div>
        <div className="font-medium text-text-light-primary dark:text-text-dark-primary">
          {tx.bank.accountName}
        </div>
        <div className="text-sm text-text-light-secondary dark:text-text-dark-secondary">
          {tx.bank.bankName} / {tx.bank.accountNumber}
        </div>
      </div>
    ),
  },
  {
    key: "txnHash",
    header: "Txn Hash / Chain",
    render: (tx) => (
      <div>
        <div className="font-medium text-text-light-primary dark:text-text-dark-primary">
          {tx.txnHash}
        </div>
        <div className="text-sm text-text-light-secondary dark:text-text-dark-secondary">
          {tx.chain}
        </div>
      </div>
    ),
  },
  { key: "createdAt", header: "Date & Time" },
  {
    key: "status",
    header: "Status",
    render: (tx) => (
      <span
        className={`px-2.5 py-1 text-xs font-medium rounded-full ${
          statusColors[tx.status]
        }`}
      >
        {tx.status.charAt(0).toUpperCase() + tx.status.slice(1)}
      </span>
    ),
  },
  {
    key: "actions",
    header: "Actions",
    render: () => {
      const router = useRouter();

      const goToDetails = () => {
        router.push(AppPages.home.transactions.sell);
      };

      return (
        <button
          onClick={goToDetails}
          className="text-text-light-secondary dark:text-text-dark-secondary hover:text-primary"
        >
          <span className="material-icons">visibility</span>
        </button>
      );
    },
  },
];
