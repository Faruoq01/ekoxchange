"use client";
import React, { useCallback, useEffect } from "react";
import { motion } from "framer-motion";
import { Skeleton } from "@/components/ui/skeleton";
import { CryptoService } from "@/app/lib/services/crypto";
import { useAppDispatch, useAppSelector } from "@/app/lib/redux/controls";
import { setWalletBalances } from "@/app/lib/redux/slices/crypto";
import FeeTable from "./_comp/fee.table";
import RateTable from "./_comp/rate.table";

interface WalletCardProps {
  name: string;
  symbol: string;
  amount: string;
  value: string;
  change: string;
  img: string;
}

const WalletCard: React.FC<WalletCardProps> = ({
  name,
  symbol,
  amount,
  value,
  change,
  img,
}) => (
  <motion.div
    className="bg-card-light dark:bg-card-dark p-6 rounded-lg flex flex-col justify-between"
    initial={{ opacity: 0, y: 12 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.45, ease: "easeOut" }}
    whileHover={{ scale: 1.03 }}
    whileTap={{ scale: 0.99 }}
  >
    <div className="flex items-start justify-between mb-4">
      <div className="flex items-center gap-3">
        <img alt={name} className="w-10 h-10 rounded-full" src={img} />
        <div>
          <p className="font-semibold text-heading-light dark:text-heading-dark">
            {name}
          </p>
          <p className="text-sm text-text-light dark:text-text-dark">
            {symbol}
          </p>
        </div>
      </div>
      <span
        className={`text-sm font-medium ${
          change.startsWith("-")
            ? "text-red-500"
            : change === "0.0%"
            ? "text-gray-500 dark:text-gray-400"
            : "text-green-500"
        }`}
      >
        {change}
      </span>
    </div>
    <div>
      <p className="text-lg font-bold dark:text-heading-dark text-gray-700">
        {amount}
      </p>
      <p className="text-text-light dark:text-text-dark">{value}</p>
    </div>
  </motion.div>
);

const WalletCardSkeleton = () => (
  <div className="bg-card-light dark:bg-card-dark p-6 rounded-lg flex flex-col justify-between">
    <div className="flex items-start justify-between mb-4">
      <div className="flex items-center gap-3">
        <Skeleton className="w-10 h-10 rounded-full" />
        <div className="space-y-2">
          <Skeleton className="h-4 w-24" />
          <Skeleton className="h-3 w-16" />
        </div>
      </div>
      <Skeleton className="h-4 w-10" />
    </div>
    <div className="space-y-2">
      <Skeleton className="h-5 w-24" />
      <Skeleton className="h-4 w-20" />
    </div>
  </div>
);

const Crypto: React.FC = () => {
  const dispatch = useAppDispatch();
  const walletBalances = useAppSelector((state) => state.crypto.walletBalances);
  const [loading, setLoading] = React.useState(true);

  const getWalletBalances = useCallback(async () => {
    setLoading(true);
    const { error, payload } = await CryptoService.getWalletBalances();
    if (!error && payload) dispatch(setWalletBalances(payload?.balances));
    setLoading(false);
  }, [dispatch]);

  useEffect(() => {
    getWalletBalances();
  }, [getWalletBalances]);

  return (
    <main className="flex-1 mt-[10px]">
      {/* Wallet Balances */}
      <div className="mb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {loading
            ? Array.from({ length: 4 }).map((_, index) => (
                <WalletCardSkeleton key={index} />
              ))
            : walletBalances?.map((wallet: any, index: number) => (
                <WalletCard
                  key={wallet.id || `${wallet.symbol}-${index}`}
                  name={wallet.name}
                  symbol={wallet.symbol}
                  amount={`${wallet.balance} ${wallet.symbol}`}
                  value={`$${Number(wallet.usdValue).toFixed(2)}`}
                  change="0.0%"
                  img={wallet.logo}
                />
              ))}
        </div>
      </div>

      {/* Fee & Rate Tables */}
      <FeeTable />
      <RateTable />
    </main>
  );
};

export default Crypto;
