"use client";

import { AppPages } from "@/app/assets/appages";
import { Column } from "@/app/components/home/table";
import { useRouter } from "next/navigation";

/* --- Interface --- */
export interface SellTransaction {
  id: number;
  user: {
    name: string;
    email: string;
    avatar: string;
  };
  amount: {
    crypto: string;
    usd: string;
  };
  paymentInfo: {
    bankName: string;
    accountNumber: string;
  };
  date: string;
  status: "Pending" | "Completed" | "Failed";
}

/* --- Status Colors --- */
const statusColors: Record<SellTransaction["status"], string> = {
  Completed:
    "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300",
  Pending:
    "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300",
  Failed: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300",
};

/* --- Example Data --- */
export const buyTransactions: SellTransaction[] = [
  {
    id: 1,
    user: {
      name: "John Doe",
      email: "johndoe@example.com",
      avatar:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuAX1y5Q_KINXF3A82l9-FI6ymTm-g_JtozAtNmrG6T2reLmJuqOb7ezNfTYwTw8eA_i8KHNxGT0YfSBi5cusJaREa0lVHniLfpRAcch5Wz14bBPAtR-iq49H-V7p7lxwXUKb6CW-JrLm6cSToq1vJr-v_fPN1Y-aUUWHYPefC8m3BiOFihBJA2VaeyVsB1SHiZTCmbaIacMXhrGSxISSZ_vS72ZooZqPKS4KdxGvL9F00UHQSSeu8Ravd4r8g4KToHy6WOD8I6vTt6n",
    },
    amount: {
      crypto: "100,000 USDT",
      usd: "$250.00",
    },
    paymentInfo: {
      bankName: "First Bank of Nigeria",
      accountNumber: "3045678901",
    },
    date: "Oct 4, 2025, 09:15 AM",
    status: "Pending",
  },
  {
    id: 2,
    user: {
      name: "Jane Smith",
      email: "janesmith@example.com",
      avatar:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuDeYyUYJbf2QE_YwZUgqX73XubDBw1Fi103AN75vzTE5WLJW7qSjhMs8B9gvh7hGMuVA_oS4IwMZ4a0bfQ0DbPEmJElXH6YEgdgY7ewN5JoaiQZBvytzKtnHbkzxp-XlQSrHQxm9hqQS5i1OGBJbBBIQvAoyLeihpixGef9zjhXaroGXHPTQbaNimOSnse-NpQC9rKljgcotLpjyckJKxZDhn6sIUGrSN_CRkwHeom2qY1mMbvTWbaLkxLA-PkAp1XC94cpyd6FjfIc",
    },
    amount: {
      crypto: "50,000 USDT",
      usd: "$125.00",
    },
    paymentInfo: {
      bankName: "Zenith Bank",
      accountNumber: "1023456789",
    },
    date: "Oct 3, 2025, 04:45 PM",
    status: "Completed",
  },
  {
    id: 3,
    user: {
      name: "Mike Ross",
      email: "mikeross@example.com",
      avatar:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuBfpD3MpeEIf7CtUM9UvRYwTjlq7cHGdyCgXVSE1HZBwieMzH43hF-iIVwEDA5nlPfrbubVPeNGLl7AuWymOy6FgMCKV-XLoufATAhpoKy-imRgFDMPVOZ2EWjURA7N8O--J05g_HocHojvC3fYC1wsVGBMkNCPzpzhX8hRjFlN3xzIHzZz-iOlg2mSHAUq9tFjiG5_SQNtd50qSQH9mCUrAFeorrHSwqCBD1eUU_EbPU2rf2dUK7jXyQjpot1aDZK6h_OwerSV7muo",
    },
    amount: {
      crypto: "200,000 USDT",
      usd: "$500.00",
    },
    paymentInfo: {
      bankName: "GTBank",
      accountNumber: "0123456789",
    },
    date: "Oct 1, 2025, 10:32 AM",
    status: "Failed",
  },
];

/* --- Table Columns --- */
export const buyTransactionColumns: Column<SellTransaction>[] = [
  {
    key: "user",
    header: "User",
    render: (tx) => (
      <div className="flex items-center gap-3">
        <img
          src={tx.user.avatar}
          alt={tx.user.name}
          className="w-10 h-10 rounded-full object-cover"
        />
        <div>
          <div className="font-medium text-text-light-primary dark:text-text-dark-primary">
            {tx.user.name}
          </div>
          <div className="text-sm text-text-light-secondary dark:text-text-dark-secondary">
            {tx.user.email}
          </div>
        </div>
      </div>
    ),
  },
  {
    key: "amount",
    header: "Amount",
    render: (tx) => (
      <div>
        <div className="font-medium text-text-light-primary dark:text-text-dark-primary">
          {tx.amount.crypto}
        </div>
        <div className="text-sm text-text-light-secondary dark:text-text-dark-secondary">
          {tx.amount.usd}
        </div>
      </div>
    ),
  },
  {
    key: "paymentInfo",
    header: "Payment Info",
    render: (tx) => (
      <div>
        <div className="font-medium text-text-light-primary dark:text-text-dark-primary">
          {tx.paymentInfo.bankName}
        </div>
        <div className="text-sm text-text-light-secondary dark:text-text-dark-secondary">
          {tx.paymentInfo.accountNumber}
        </div>
      </div>
    ),
  },
  { key: "date", header: "Date & Time" },
  {
    key: "status",
    header: "Status",
    render: (tx) => (
      <span
        className={`px-2.5 py-1 text-xs font-medium rounded-full ${
          statusColors[tx.status]
        }`}
      >
        {tx.status}
      </span>
    ),
  },
  {
    key: "actions",
    header: "Actions",
    render: () => {
      const router = useRouter();

      const goToDetails = () => {
        router.push(AppPages.home.transactions.buy);
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
