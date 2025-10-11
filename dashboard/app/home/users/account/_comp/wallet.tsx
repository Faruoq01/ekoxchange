"use client";
import { motion } from "framer-motion";
import { Copy, CheckCircle2, Coins } from "lucide-react";
import { useState } from "react";

interface Wallet {
  name: string;
  symbol: string;
  logo: string;
  balance: string;
  value: string;
  network?: string;
  address?: string;
}

const walletData: Wallet[] = [
  {
    name: "Bitcoin",
    symbol: "BTC",
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/46/Bitcoin.svg/1200px-Bitcoin.svg.png",
    balance: "2.5432 BTC",
    value: "≈ $152,592.00",
  },
  {
    name: "Ethereum",
    symbol: "ETH",
    logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTJDn0ojTITvcdAzMsfBMJaZC4STaDHzduleQ&s",
    balance: "15.123 ETH",
    value: "≈ $45,369.00",
  },
  {
    name: "Solana",
    symbol: "SOL",
    logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQty1ptcBSY-tfLh_dAW_FS1GLSClUiFQTZqA&s",
    balance: "150.75 SOL",
    value: "≈ $15,075.00",
  },
  {
    name: "Tron",
    symbol: "TRX",
    logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTBsWaz0K2kxYpSFMhQ2pPdBcnOwpQHWYEyzw&s",
    balance: "250,000 TRX",
    value: "≈ $27,500.00",
  },
  {
    name: "USDT (Ethereum)",
    symbol: "USDT",
    logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRBcmKcHrJcPR_wk4REQeUaEdX7fHVi3uePPw&s",
    balance: "50,123.45 USDT",
    value: "≈ $50,123.45",
    network: "ERC-20",
  },
  {
    name: "USDC (Ethereum)",
    symbol: "USDC",
    logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ43MuDqq54iD1ZCRL_uthAPkfwSSL-J5qI_Q&s",
    balance: "25,540.10 USDC",
    value: "≈ $25,540.10",
    network: "ERC-20",
  },
  {
    name: "USDT (Tron)",
    symbol: "USDT",
    logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRBcmKcHrJcPR_wk4REQeUaEdX7fHVi3uePPw&s",
    balance: "10,000 USDT",
    value: "≈ $10,000.00",
    network: "TRC-20",
  },
];

export default function WalletBalances() {
  const [copied, setCopied] = useState<string | null>(null);

  const copyToClipboard = (text?: string) => {
    if (!text) return;
    navigator.clipboard.writeText(text);
    setCopied(text);
    setTimeout(() => setCopied(null), 1500);
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

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {walletData.map((wallet, index) => (
          <motion.div
            key={wallet.name}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.08 }}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
            className="relative rounded-2xl p-[1px] bg-gradient-to-tr from-primary/40 via-purple-400/40 to-blue-400/40 hover:shadow-[0_0_35px_-5px_rgba(100,149,237,0.25)] transition-all duration-500"
          >
            <div className="relative bg-white/90 dark:bg-gray-900/70 backdrop-blur-2xl rounded-2xl p-5 h-full flex flex-col justify-between border border-white/30 dark:border-gray-800/50">
              {/* Floating Glow */}
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-tr from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

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
                      {wallet.network || wallet.symbol}
                    </p>
                  </div>
                </div>
              </div>

              {/* Balance */}
              <div className="mt-6">
                <p className="text-xl font-bold bg-gradient-to-r from-primary to-blue-500 bg-clip-text text-transparent">
                  {wallet.balance}
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                  {wallet.value}
                </p>
              </div>

              {/* Address (if available) */}
              {wallet.address && (
                <div className="mt-5 flex items-center justify-between border-t border-gray-200/60 dark:border-gray-700/60 pt-3">
                  <p className="text-xs text-gray-500 dark:text-gray-400 truncate max-w-[180px]">
                    {wallet.address.length > 15
                      ? `${wallet.address.slice(
                          0,
                          10
                        )}...${wallet.address.slice(-6)}`
                      : wallet.address}
                  </p>
                  <button
                    onClick={() => copyToClipboard(wallet.address)}
                    className="text-primary hover:text-primary/80 flex items-center gap-1"
                  >
                    {copied === wallet.address ? (
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
    </motion.section>
  );
}
