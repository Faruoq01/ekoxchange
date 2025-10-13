"use client";

import { motion } from "framer-motion";
import { Copy, ExternalLink } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

interface Transaction {
  _id: string;
  name: string;
  symbol: string;
  logo: string;
  balance: string;
  from: string;
  to: string;
  txid: string;
  blockTimestamp: string;
}

interface BalanceGroup {
  date: string;
  transactions: Transaction[];
}

export default function TransactionHistory() {
  const [copied, setCopied] = useState<string | null>(null);

  const handleCopy = async (text: string) => {
    await navigator.clipboard.writeText(text);
    setCopied(text);
    setTimeout(() => setCopied(null), 2000);
  };

  // Example data
  const balances: BalanceGroup[] = [
    {
      date: "July 28, 2024",
      transactions: [
        {
          _id: "1",
          name: "Bitcoin",
          symbol: "BTC",
          logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/46/Bitcoin.svg/1200px-Bitcoin.svg.png",
          balance: "+0.50 BTC",
          from: "1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa",
          to: "",
          txid: "f4184fc596403b9d638783c7d973b4e41e33d26a8c3d52a2814c3e803c7e8f56",
          blockTimestamp: "2024-07-28T10:45:00Z",
        },
        {
          _id: "2",
          name: "Ethereum",
          symbol: "ETH",
          logo: "https://etherscan.io/images/svg/brands/ethereum-original.svg",
          balance: "-2.00 ETH",
          from: "",
          to: "0xde0B295669a9FD93d5F28D9Ec85E40f4cb697BAe",
          txid: "0x5a0b54d5e147de9a3a9afd5e4d2b8de15c7e0b54d5e147de9a3a9afd5e4d2b8d",
          blockTimestamp: "2024-07-28T09:12:00Z",
        },
      ],
    },
  ];

  return (
    <div className="bg-card-light dark:bg-card-dark">
      {balances.map((group, index) => (
        <section key={index} className="space-y-3">
          <h4 className="text-xs font-semibold uppercase text-gray-500 dark:text-gray-400 tracking-wide pb-1">
            {group.date}
          </h4>

          {group.transactions.map((tx, i) => (
            <motion.div
              key={tx._id}
              whileHover={{ scale: 1.01 }}
              transition={{ type: "spring", stiffness: 200, damping: 14 }}
              className="relative flex items-center gap-4 p-3 bg-white dark:bg-gray-900 border rounded-[5px] hover:shadow-md transition-all"
            >
              {/* Stripe accent */}
              <span
                className={`absolute left-0 top-0 h-full w-1 rounded-l-xl ${
                  tx.balance.startsWith("-") ? "bg-red-500" : "bg-green-500"
                }`}
              />

              {/* Logo */}
              <div className="relative w-[45px] h-[45px] rounded-full ml-[5px] mr-[5px]">
                <Image src={tx.logo} alt={tx.symbol} fill />
              </div>

              {/* Content */}
              <div className="flex-1 min-w-0">
                <div className="flex justify-between items-center">
                  <h5 className="text-sm font-semibold text-gray-800 dark:text-gray-100 truncate">
                    {tx.balance.startsWith("-")
                      ? `Sent ${tx.symbol}`
                      : `Received ${tx.symbol}`}
                  </h5>
                  <p
                    className={`text-xs font-semibold ${
                      tx.balance.startsWith("-")
                        ? "text-red-600 dark:text-red-400"
                        : "text-green-600 dark:text-green-400"
                    }`}
                  >
                    {tx.balance}
                  </p>
                </div>

                <div className="mt-1.5 text-xs text-gray-600 dark:text-gray-400 space-y-0.5">
                  {tx.from && (
                    <p className="truncate">
                      <span className="text-gray-500 dark:text-gray-500">
                        From:
                      </span>{" "}
                      <span className="font-mono text-gray-700 dark:text-gray-300">
                        {tx.from.slice(0, 10)}...
                      </span>
                      <button
                        onClick={() => handleCopy(tx.from)}
                        className="ml-1 text-gray-400 hover:text-blue-500"
                      >
                        <Copy className="w-3 h-3 inline" />
                      </button>
                    </p>
                  )}
                  {tx.to && (
                    <p className="truncate">
                      <span className="text-gray-500 dark:text-gray-500">
                        To:
                      </span>{" "}
                      <span className="font-mono text-gray-700 dark:text-gray-300">
                        {tx.to.slice(0, 10)}...
                      </span>
                      <button
                        onClick={() => handleCopy(tx.to)}
                        className="ml-1 text-gray-400 hover:text-blue-500"
                      >
                        <Copy className="w-3 h-3 inline" />
                      </button>
                    </p>
                  )}
                  <p className="truncate">
                    <span className="text-gray-500 dark:text-gray-500">
                      TxID:
                    </span>{" "}
                    <span className="font-mono text-gray-700 dark:text-gray-300">
                      {tx.txid.slice(0, 10)}...
                    </span>
                    <a
                      href={`https://etherscan.io/tx/${tx.txid}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="ml-1 text-gray-400 hover:text-blue-500"
                    >
                      <ExternalLink className="w-3 h-3 inline" />
                    </a>
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </section>
      ))}

      {/* Copy feedback */}
      {copied && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
          className="fixed bottom-6 right-6 bg-green-600 text-white px-3 py-2 rounded-md shadow-md text-xs"
        >
          Copied!
        </motion.div>
      )}
    </div>
  );
}
