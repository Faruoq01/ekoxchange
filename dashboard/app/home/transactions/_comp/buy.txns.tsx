"use client";

import { AppPages } from "@/app/assets/appages";
import Pagination from "@/app/components/home/pagination";
import Table, { Column } from "@/app/components/home/table";
import { useAppDispatch, useAppSelector } from "@/app/lib/redux/controls";
import { BuyOrder } from "@/app/lib/redux/interfaces/transaction";
import {
  setBuyOrder,
  setSingleBuyOrder,
} from "@/app/lib/redux/slices/transaction";
import { TransactionService } from "@/app/lib/services/transaction";
import { formatTimestamp } from "@/app/lib/utils";
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
  paymentInfo: {
    bankName: string;
    accountNumber: string;
  };
  date: string;
  status: "pending" | "paid" | "failed";
  rawData: string;
}

/* --- Status Colors --- */
const statusColors: Record<SellTransaction["status"], string> = {
  paid: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300",
  pending:
    "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300",
  failed: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300",
};

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
    render: (user) => {
      const router = useRouter();
      const dispatch = useAppDispatch();

      const goToDetails = () => {
        const data = JSON.parse(user?.rawData);
        dispatch(setSingleBuyOrder(data));
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

export const BuyOrderComponent = ({ activeTab }: { activeTab: string }) => {
  const dispatch = useAppDispatch();
  const [skip, setSkip] = useState(0);
  const [limit, setLimit] = useState(30);
  const [loading, setLoading] = useState(false);
  const buyOrders = useAppSelector((state) => state.transaction.buyOrders);

  const getBuyOrderList = useCallback(async () => {
    setLoading(true);
    const { error, payload } = await TransactionService.buyOrder(skip, limit);
    setLoading(false);
    if (!error && payload) {
      dispatch(setBuyOrder(payload));
    }
  }, []);

  useEffect(() => {
    getBuyOrderList();
  }, [getBuyOrderList]);

  const rowData = () => {
    return buyOrders?.map((item: BuyOrder, index: number) => {
      return {
        id: index,
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
        paymentInfo: {
          bankName: item?.bankName,
          accountNumber: item?.accountNumber,
        },
        date: formatTimestamp(item?.createdAt),
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
            columns={buyTransactionColumns}
            loading={loading}
          />
        </motion.div>
      </AnimatePresence>

      <Pagination total={30} perPage={30} currentPage={1} />
    </Fragment>
  );
};
