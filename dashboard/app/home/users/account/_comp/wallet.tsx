"use client";
import { useAppDispatch, useAppSelector } from "@/app/lib/redux/controls";
import { setWalletUserBalances } from "@/app/lib/redux/slices/users";
import { UserService } from "@/app/lib/services/users";
import { motion } from "framer-motion";
import { Copy, CheckCircle2, Coins } from "lucide-react";
import { useCallback, useEffect, useState } from "react";

export default function WalletBalances() {
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState<string | null>(null);

  const user = useAppSelector((state) => state.users.user);
  const walletUserBalances = useAppSelector(
    (state) => state.users.walletUserBalances
  );

  const getUserWalletBalances = useCallback(async () => {
    if (!user?.id) return;
    setLoading(true);
    const { error, payload } = await UserService.getWalletUserBalances(user.id);
    setLoading(false);
    if (!error && payload) dispatch(setWalletUserBalances(payload?.balances));
  }, [dispatch, user?.id]);

  useEffect(() => {
    getUserWalletBalances();
  }, [getUserWalletBalances]);

  const copyToClipboard = (text?: string) => {
    if (!text) return;
    navigator.clipboard.writeText(text);
    setCopied(text);
    setTimeout(() => setCopied(null), 1500);
  };

  const wallets = walletUserBalances?.length ? walletUserBalances : [];

  /** Format balance in a readable way per token type **/
  const formatBalance = (balance: string, symbol: string): string => {
    const num = parseFloat(balance);
    if (isNaN(num) || num === 0) return "0.00";

    let decimals = 4;
    if (symbol === "BTC") decimals = 8;
    else if (symbol === "ETH" || symbol === "SOL") decimals = 6;
    else if (symbol === "USDT" || symbol === "USDC") decimals = 2;
    else if (num < 1) decimals = 6;

    return num.toFixed(decimals).replace(/\.?0+$/, "");
  };

  return (
    <motion.section
      className="bg-transparent"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <header className="flex items-center justify-between mb-8">
        <h4 className="text-lg font-semibold text-gray-900 dark:text-gray-100 flex items-center gap-3">
          <Coins className="w-6 h-6 text-primary" />
          Wallet Balances
        </h4>
      </header>

      {/* Loading Spinner */}
      {loading ? (
        <div className="flex flex-col items-center justify-center h-64">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{
              repeat: Infinity,
              duration: 1.2,
              ease: "linear",
            }}
            className="relative w-12 h-12"
          >
            <div className="absolute inset-0 rounded-full border-4 border-transparent border-t-purple-500 border-r-purple-400 shadow-[0_0_15px_rgba(168,85,247,0.7)]" />
            <div className="absolute inset-2 rounded-full border-2 border-gray-200 dark:border-gray-700" />
          </motion.div>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="mt-4 text-gray-500 dark:text-gray-400 text-sm font-medium tracking-wide"
          >
            Loading balances...
          </motion.p>
        </div>
      ) : wallets.length === 0 ? (
        <p className="text-center text-gray-500 dark:text-gray-400">
          No wallet balances available.
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {wallets.map((wallet: any, index: number) => (
            <motion.div
              key={`${wallet.name}-${wallet.symbol}-${wallet.chain}-${index}`}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.08 }}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              className="relative rounded-2xl p-[1px] bg-gradient-to-tr from-primary/40 via-purple-400/40 to-blue-400/40 hover:shadow-[0_0_35px_-5px_rgba(100,149,237,0.25)] transition-all duration-500"
            >
              <div className="relative bg-white/90 dark:bg-gray-900/70 backdrop-blur-2xl rounded-2xl p-5 h-full flex flex-col justify-between border border-white/30 dark:border-gray-800/50">
                {/* Header */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <img
                      src={wallet.logo}
                      alt={wallet.name}
                      className="w-10 h-10 rounded-full object-contain drop-shadow-md"
                    />
                    <div>
                      <p className="text-base font-semibold text-gray-900 dark:text-gray-100">
                        {wallet.name}
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        {wallet.chain || wallet.symbol}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Balance */}
                <div className="mt-6">
                  <p className="text-xl font-bold bg-gradient-to-r from-primary to-blue-500 bg-clip-text text-transparent">
                    {formatBalance(wallet.balance, wallet.symbol)}{" "}
                    {wallet.symbol}
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                    ≈ $
                    {Number(wallet.usdValue).toLocaleString(undefined, {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    })}
                  </p>
                </div>

                {/* Token Address */}
                {wallet.tokenAddress && (
                  <div className="mt-5 flex items-center justify-between border-t border-gray-200/60 dark:border-gray-700/60 pt-3">
                    <p className="text-xs text-gray-500 dark:text-gray-400 truncate max-w-[180px]">
                      {wallet.tokenAddress.length > 15
                        ? `${wallet.tokenAddress.slice(
                            0,
                            10
                          )}...${wallet.tokenAddress.slice(-6)}`
                        : wallet.tokenAddress}
                    </p>
                    <button
                      onClick={() => copyToClipboard(wallet.tokenAddress)}
                      className="text-primary hover:text-primary/80 flex items-center gap-1"
                    >
                      {copied === wallet.tokenAddress ? (
                        <CheckCircle2 className="w-4 h-4 text-green-500" />
                      ) : (
                        <Copy className="w-4 h-4" />
                      )}
                    </button>
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </motion.section>
  );
}
