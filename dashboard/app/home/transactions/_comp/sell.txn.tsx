"use client";

import { AppPages } from "@/app/assets/appages";
import Pagination from "@/app/components/home/pagination";
import Table, { Column } from "@/app/components/home/table";
import { useAppDispatch, useAppSelector } from "@/app/lib/redux/controls";
import { SellOrder } from "@/app/lib/redux/interfaces/transaction";
import {
  setSellOrder,
  setSingleSellOrder,
} from "@/app/lib/redux/slices/transaction";
import { TransactionService } from "@/app/lib/services/transaction";
import { formatTimestamp, shortenTxnHash } from "@/app/lib/utils";
import { AnimatePresence, motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { Fragment, useCallback, useEffect, useState } from "react";

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
  amountToPay: string;
  chain: string;
  bank: {
    bankName: string;
    accountName: string;
    accountNumber: string;
  };
  createdAt: string;
  status: "pending" | "completed";
  rawData: string;
}

/* --- Status Colors --- */
const statusColors: Record<SellTransaction["status"], string> = {
  completed:
    "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300",
  pending:
    "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300",
};

/* --- Table Columns --- */
export const sellTransactionColumns: Column<SellTransaction>[] = [
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
    key: "amountToPay",
    header: "Amount to pay",
    render: (tx) => (
      <div>
        <div className="font-medium text-text-light-primary dark:text-text-dark-primary">
          ~ ₦{tx?.amountToPay}
        </div>
      </div>
    ),
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
    render: (user) => {
      const router = useRouter();
      const dispatch = useAppDispatch();

      const goToDetails = () => {
        const data = JSON.parse(user?.rawData);
        dispatch(setSingleSellOrder(data));
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

export const SellOrderComponent = ({ activeTab }: { activeTab: string }) => {
  const dispatch = useAppDispatch();
  const [skip, setSkip] = useState(0);
  const [limit, setLimit] = useState(30);
  const [loading, setLoading] = useState(false);
  const sellOrders = useAppSelector((state) => state.transaction.sellOrders);

  const getBuyOrderList = useCallback(async () => {
    setLoading(true);
    const { error, payload } = await TransactionService.sellOrder(skip, limit);
    setLoading(false);
    if (!error && payload) {
      dispatch(setSellOrder(payload));
    }
  }, []);

  useEffect(() => {
    getBuyOrderList();
  }, [getBuyOrderList]);

  const rowData = () => {
    return sellOrders?.map((item: SellOrder, index: number) => {
      return {
        id: index + 1,
        user: {
          name: item?.createdBy?.firstname + " " + item?.createdBy?.lastname,
          email: item?.createdBy?.email,
          avatar: item?.createdBy?.avatar
            ? item?.createdBy?.avatar
            : `https://picsum.photos/200/200?${index + 2}`,
        },
        amount: {
          crypto: item?.amountToPay + " " + item?.selectedToken.symbol,
          usd: "$" + item?.usdPrice,
        },
        amountToPay: (
          Number(item?.usdPrice) * Number(item?.selectedToken?.rate?.buyRate)
        ).toLocaleString(),
        bank: {
          bankName: item?.bankName,
          accountName: item?.accountName,
          accountNumber: item?.accountNumber,
        },
        createdAt: formatTimestamp(item?.createdAt),
        status: item?.status,
        rawData: JSON.stringify(item),
      };
    });
  };

  const processedRow = rowData();

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
            data={processedRow}
            columns={sellTransactionColumns}
            loading={loading}
          />
        </motion.div>
      </AnimatePresence>

      <Pagination total={30} perPage={30} currentPage={1} />
    </Fragment>
  );
};
