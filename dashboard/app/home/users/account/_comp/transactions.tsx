"use client";

import { useAppSelector } from "@/app/lib/redux/controls";
import { TransactionService } from "@/app/lib/services/transaction";
import { motion } from "framer-motion";
import { Copy, ExternalLink } from "lucide-react";
import Image from "next/image";
import { useCallback, useEffect, useState } from "react";

interface Transaction {
  _id: string;
  id: string;
  hash: string;
  chain: string;
  direction: "Sent" | "Received";
  from: string;
  to: string;
  amount: number;
  fee: number;
  status: "Success" | "Failed" | "Pending" | "Confirmed" | string;
  explorer: string;
  logo: string;
  user: string;
  createdAt: number;
  updatedAt: number;
  timestamp: number;
  __v: number;
}

interface BalanceGroup {
  date: string;
  transactions: Transaction[];
}

export default function TransactionHistory() {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState<string | null>(null);
  const singleAdminUser = useAppSelector(
    (state) => state.users.singleAdminUser
  );
  console.log(transactions, "transactions ===>");

  const handleCopy = async (text: string) => {
    await navigator.clipboard.writeText(text);
    setCopied(text);
    setTimeout(() => setCopied(null), 2000);
  };

  // Example mock data
  const balances: BalanceGroup[] = [
    {
      date: "16th October, 2025",
      transactions: [
        {
          _id: "68fc9864a16801813eefbaaf",
          hash: "0x9c2461e575257fff7956350f323abe49c4e3439be9efc27236c0022667ed7de9",
          __v: 0,
          amount: 0.000124,
          chain: "Ethereum",
          createdAt: 1761384547694,
          direction: "Received",
          explorer:
            "https://etherscan.io/tx/0x9c2461e575257fff7956350f323abe49c4e3439be9efc27236c0022667ed7de9",
          fee: 0.000037,
          from: "0x782a8f38ee5737e54f00c0038ead6a1061589aff",
          id: "253b8c5a-06f8-4b5a-950e-c1f97eee3ec3",
          status: "Success",
          timestamp: 1760621579000,
          to: "0x0c808363f344785e3606e33f0b2e8986c3f66ecc",
          updatedAt: 1761460205861,
          user: "67b71417f1230a7a4ca2a608",
          logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTJDn0ojTITvcdAzMsfBMJaZC4STaDHzduleQ&s",
        },
      ],
    },
    {
      date: "14th October, 2025",
      transactions: [
        {
          _id: "68fc9864a16801813eefbab0",
          hash: "e1db804764954193d298b7b5f9b8ef2e302a50ac886fb5dfbdceb1ff518f1c1a",
          __v: 0,
          amount: 0.0001787,
          chain: "Bitcoin",
          createdAt: 1761384547694,
          direction: "Received",
          explorer:
            "https://blockstream.info/tx/e1db804764954193d298b7b5f9b8ef2e302a50ac886fb5dfbdceb1ff518f1c1a",
          fee: 0.00000424,
          from: "bc1qj2r090g9efs5w5prpun6y8apw5l0jyq7dhfyxc",
          id: "a98003ab-03eb-4154-901f-0845efb72739",
          status: "Confirmed",
          timestamp: 1760482281000,
          to: "1JwwzhR59V6DTJkSbnLpz5zqUndQHLPx4A",
          updatedAt: 1761459641571,
          user: "67b71417f1230a7a4ca2a608",
          logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSVf76udEp1pdq1KPlJJn2l88D_4g9vzFgNJQ&s",
        },
        {
          _id: "68fc9864a16801813eefbab4",
          hash: "420d2d9efce77152893ce0c89610a313999f891107f5a668b547c0ad405324f7",
          __v: 0,
          amount: 33.333333,
          chain: "Tron",
          createdAt: 1761384547694,
          direction: "Received",
          explorer:
            "https://tronscan.org/#/transaction/420d2d9efce77152893ce0c89610a313999f891107f5a668b547c0ad405324f7",
          fee: 0,
          from: "TJqyxZ5BTbN9DiGZ87Rj9PjkR81QTLanta",
          id: "d309f6e0-b188-4500-876e-184d3eeec580",
          status: "Success",
          timestamp: 1760447085000,
          to: "TTwjQ4hsn9N7XcPqyGp4FKH8gVL9dL2QDK",
          updatedAt: 1761459641571,
          user: "67b71417f1230a7a4ca2a608",
          logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT6GlNXgqS5qrgwTYFKITBBuExwDjBp7QCaGw&s",
        },
      ],
    },
    {
      date: "13th October, 2025",
      transactions: [
        {
          _id: "68fc9864a16801813eefbab5",
          hash: "6d8e059fd929183f98cdfd7903904548305d50dcded57ea8ce7cd632eac45324",
          __v: 0,
          amount: 0,
          chain: "Tron",
          createdAt: 1761384547694,
          direction: "Sent",
          explorer:
            "https://tronscan.org/#/transaction/6d8e059fd929183f98cdfd7903904548305d50dcded57ea8ce7cd632eac45324",
          fee: 0.608,
          from: "TTwjQ4hsn9N7XcPqyGp4FKH8gVL9dL2QDK",
          id: "fb3492eb-bd8c-490a-af46-1c1b523a63bd",
          status: "Failed",
          timestamp: 1760359950000,
          to: "N/A",
          updatedAt: 1761459641571,
          user: "67b71417f1230a7a4ca2a608",
          logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT6GlNXgqS5qrgwTYFKITBBuExwDjBp7QCaGw&s",
        },
        {
          _id: "68fc9864a16801813eefbab6",
          hash: "e1cd2eadcc83ac3afd69efa109fcb99f53288e4086a64d7512f84deec365e7d7",
          __v: 0,
          amount: 0,
          chain: "Tron",
          createdAt: 1761384547694,
          direction: "Sent",
          explorer:
            "https://tronscan.org/#/transaction/e1cd2eadcc83ac3afd69efa109fcb99f53288e4086a64d7512f84deec365e7d7",
          fee: 6.7745,
          from: "TTwjQ4hsn9N7XcPqyGp4FKH8gVL9dL2QDK",
          id: "b9d744a0-27f2-4107-8cdd-599c8b0d2aba",
          status: "Success",
          timestamp: 1760359665000,
          to: "N/A",
          updatedAt: 1761459641571,
          user: "67b71417f1230a7a4ca2a608",
          logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT6GlNXgqS5qrgwTYFKITBBuExwDjBp7QCaGw&s",
        },
        {
          _id: "68fc9864a16801813eefbab7",
          hash: "0e7d52ff17c3422362296ff53098ab12d8368324aae1ac83cb58b880807e7eb9",
          __v: 0,
          amount: 0,
          chain: "Tron",
          createdAt: 1761384547694,
          direction: "Sent",
          explorer:
            "https://tronscan.org/#/transaction/0e7d52ff17c3422362296ff53098ab12d8368324aae1ac83cb58b880807e7eb9",
          fee: 13.0285,
          from: "TTwjQ4hsn9N7XcPqyGp4FKH8gVL9dL2QDK",
          id: "5c874764-f630-427f-86fb-f3112168acb0",
          status: "Success",
          timestamp: 1760359575000,
          to: "N/A",
          updatedAt: 1761459641571,
          user: "67b71417f1230a7a4ca2a608",
          logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT6GlNXgqS5qrgwTYFKITBBuExwDjBp7QCaGw&s",
        },
      ],
    },
    {
      date: "12th October, 2025",
      transactions: [
        {
          _id: "68fc9864a16801813eefbab8",
          hash: "87769f4154983d43f17f85fbac03d8ee6635006a1c491d01e4ad6307ddb220db",
          __v: 0,
          amount: 8888.88,
          chain: "Tron",
          createdAt: 1761384547694,
          direction: "Received",
          explorer:
            "https://tronscan.org/#/transaction/87769f4154983d43f17f85fbac03d8ee6635006a1c491d01e4ad6307ddb220db",
          fee: 0,
          from: "THcxXii7TKv9ufMHvZoqD1ghuvBfRh7xWS",
          id: "acd79ccf-8e4b-43f3-8db9-cdb39bf6df82",
          status: "Success",
          timestamp: 1760252106000,
          to: "TTwjQ4hsn9N7XcPqyGp4FKH8gVL9dL2QDK",
          updatedAt: 1761459641571,
          user: "67b71417f1230a7a4ca2a608",
          logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT6GlNXgqS5qrgwTYFKITBBuExwDjBp7QCaGw&s",
        },
        {
          _id: "68fc9864a16801813eefbab9",
          hash: "23d7548630f152d407a44b1916967ffc1f510f155993d9d536c4db9c7c693d89",
          __v: 0,
          amount: 8888.88,
          chain: "Tron",
          createdAt: 1761384547694,
          direction: "Received",
          explorer:
            "https://tronscan.org/#/transaction/23d7548630f152d407a44b1916967ffc1f510f155993d9d536c4db9c7c693d89",
          fee: 0,
          from: "TSLYrX5RFpLjyrhQR2BaM2vtXcrS9Kdai4",
          id: "2336e0f4-4b1f-4d83-9cd1-ece3dbb4e9da",
          status: "Success",
          timestamp: 1760252103000,
          to: "TTwjQ4hsn9N7XcPqyGp4FKH8gVL9dL2QDK",
          updatedAt: 1761459641571,
          user: "67b71417f1230a7a4ca2a608",
          logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT6GlNXgqS5qrgwTYFKITBBuExwDjBp7QCaGw&s",
        },
      ],
    },
    {
      date: "23rd August, 2025",
      transactions: [
        {
          _id: "68fc9864a16801813eefbaba",
          hash: "c31108c4b522424f9edb0c8266b9af0900f33e7dfb71b777d02da256a04d2f43",
          __v: 0,
          amount: 0.01,
          chain: "Tron",
          createdAt: 1761384547694,
          direction: "Sent",
          explorer:
            "https://tronscan.org/#/transaction/c31108c4b522424f9edb0c8266b9af0900f33e7dfb71b777d02da256a04d2f43",
          fee: 0,
          from: "TTwjQ4hsn9N7XcPqyGp4FKH8gVL9dL2QDK",
          id: "676bb216-a7df-4152-aa11-44c6c7acba42",
          status: "Success",
          timestamp: 1755951285000,
          to: "TCV8aDAeFUPVJLmDYP6Ks3g2NZXQQkKdMw",
          updatedAt: 1761459641571,
          user: "67b71417f1230a7a4ca2a608",
          logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT6GlNXgqS5qrgwTYFKITBBuExwDjBp7QCaGw&s",
        },
      ],
    },
    {
      date: "25th April, 2025",
      transactions: [
        {
          _id: "68fc9864a16801813eefbabb",
          hash: "22b43babad1e124c6ee8a011bfa6dcc44fa2e9fc10b749ad60aa14a57ab5eb76",
          __v: 0,
          amount: 20.421004,
          chain: "Tron",
          createdAt: 1761384547694,
          direction: "Received",
          explorer:
            "https://tronscan.org/#/transaction/22b43babad1e124c6ee8a011bfa6dcc44fa2e9fc10b749ad60aa14a57ab5eb76",
          fee: 0.1,
          from: "TCBa4DkFfgBSHifcYBQe2AqjKa4sMy9QHg",
          id: "09f72cb6-8580-402f-bfc0-89bdd2e3e622",
          status: "Success",
          timestamp: 1745564964000,
          to: "TTwjQ4hsn9N7XcPqyGp4FKH8gVL9dL2QDK",
          updatedAt: 1761459641571,
          user: "67b71417f1230a7a4ca2a608",
          logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT6GlNXgqS5qrgwTYFKITBBuExwDjBp7QCaGw&s",
        },
        {
          _id: "68fc9864a16801813eefbab1",
          hash: "3vG7c962mkMons4GCfxmckJdbhdaj6QqEdVsXtUm172FMtxvhfcJ1j8qvYozB4Mjin6KpmA7P6YWNgJbhfV1aarZ",
          __v: 0,
          amount: -0.03023782,
          chain: "Solana",
          createdAt: 1761384547694,
          direction: "Received",
          explorer:
            "https://solscan.io/tx/3vG7c962mkMons4GCfxmckJdbhdaj6QqEdVsXtUm172FMtxvhfcJ1j8qvYozB4Mjin6KpmA7P6YWNgJbhfV1aarZ",
          fee: 0.00002,
          from: "6MVuquFofqrbdFj6FSTAqaxbJESEzW4jB2pBd1RQoami",
          id: "ec14d237-9ca9-4374-b60a-67504d35629f",
          status: "Success",
          timestamp: 1745564768000,
          to: "E1FJrRxJoAZDELASzdR4TYBQgc681gDnJYTDzvfkQY9C",
          updatedAt: 1761459641571,
          user: "67b71417f1230a7a4ca2a608",
          logo: "https://images.seeklogo.com/logo-png/42/2/solana-sol-logo-png_seeklogo-423095.png",
        },
      ],
    },
    {
      date: "10th April, 2025",
      transactions: [
        {
          _id: "68fc9864a16801813eefbab2",
          hash: "0x9401d136d74891ffd63684cfcfee05d6053fa498e1fde523afbf86f2510a25a1",
          __v: 0,
          amount: 0.003139,
          chain: "Ethereum",
          createdAt: 1761384547694,
          direction: "Received",
          explorer:
            "https://etherscan.io/tx/0x9401d136d74891ffd63684cfcfee05d6053fa498e1fde523afbf86f2510a25a1",
          fee: 0.000033,
          from: "0x1b378764edbcd996487020bbcbcc4c007300d769",
          id: "c274a17a-e844-48da-91b6-c2e10b31c10d",
          status: "Success",
          timestamp: 1744276607000,
          to: "0x0c808363f344785e3606e33f0b2e8986c3f66ecc",
          updatedAt: 1761459641571,
          user: "67b71417f1230a7a4ca2a608",
          logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTJDn0ojTITvcdAzMsfBMJaZC4STaDHzduleQ&s",
        },
      ],
    },
    {
      date: "23rd February, 2025",
      transactions: [
        {
          _id: "68fc9864a16801813eefbab3",
          hash: "350562bcc24c643ec9ed6aca27f421939dcf62a1c21a927e6924bdf9bb37a11f",
          __v: 0,
          amount: 0.00002418,
          chain: "Bitcoin",
          createdAt: 1761384547694,
          direction: "Received",
          explorer:
            "https://blockstream.info/tx/350562bcc24c643ec9ed6aca27f421939dcf62a1c21a927e6924bdf9bb37a11f",
          fee: 0.00002712,
          from: "1MEoN1hNMTKyPP1ExcCxsLGqV5tG2FZvWi",
          id: "516e596c-eee0-488e-bf28-2a3cc925935a",
          status: "Confirmed",
          timestamp: 1740338790000,
          to: "1JwwzhR59V6DTJkSbnLpz5zqUndQHLPx4A",
          updatedAt: 1761459641571,
          user: "67b71417f1230a7a4ca2a608",
          logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSVf76udEp1pdq1KPlJJn2l88D_4g9vzFgNJQ&s",
        },
      ],
    },
  ];

  const getAllTransactions = useCallback(async () => {
    setLoading(true);
    const { error, payload } = await TransactionService.walletTransaction(
      singleAdminUser?.id
    );
    setLoading(false);

    if (!error && payload) {
      setTransactions(payload?.balances);
    }
  }, []);

  useEffect(() => {
    getAllTransactions();
  }, [getAllTransactions]);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-20">
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
          Loading...
        </motion.p>
      </div>
    );
  }

  // ✅ Empty state
  if (!loading && transactions.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-15">
        <Image
          src={"/empty.svg"}
          alt="Empty data"
          width={100}
          height={100}
          className="opacity-80"
        />
        <p className="mt-4 text-gray-500 dark:text-gray-400 text-sm">
          No records found
        </p>
      </div>
    );
  }

  return (
    <div className="w-full space-y-10">
      {transactions.map((group: any) => (
        <div key={group.date}>
          {/* Date Header */}
          <div className="pb-3 border-b border-border-light dark:border-border-dark">
            <p className="text-sm font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wide">
              {group.date}
            </p>
          </div>

          {/* Transaction Cards */}
          <div className="mt-6 space-y-6">
            {group.transactions.map((tx: any) => {
              const isReceived = tx.direction === "Received";
              const isFailed = tx.status === "Failed";
              const isSuccess =
                tx.status === "Success" || tx.status === "Confirmed";

              return (
                <motion.div
                  key={tx._id}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4 }}
                  className="relative rounded-2xl bg-white/70 dark:bg-gray-900/60 backdrop-blur-md border border-gray-200 dark:border-gray-700 shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden"
                >
                  <div className="flex flex-col md:flex-row justify-between items-start md:items-center p-6 gap-6">
                    {/* Left: Logo and Chain Info */}
                    <div className="flex items-center gap-4">
                      <div className="relative flex-shrink-0">
                        <div className="relative px-[20px] py-[20px] rounded-full">
                          <Image
                            src={tx.logo}
                            alt={tx.chain}
                            fill
                            className="rounded-full"
                          />
                        </div>
                      </div>

                      <div>
                        <p className="text-base font-semibold text-gray-900 dark:text-white">
                          {isReceived ? "Received" : "Sent"} {tx.chain}
                        </p>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          {new Date(tx.timestamp).toLocaleTimeString()}
                        </p>
                      </div>
                    </div>

                    {/* Middle: Transaction Details */}
                    <div className="flex flex-col gap-2 text-sm text-gray-600 dark:text-gray-300 w-full md:w-1/2">
                      <div className="flex justify-between">
                        <span className="font-medium text-gray-500">From</span>
                        <span
                          className="truncate font-mono cursor-pointer hover:text-indigo-500"
                          onClick={() => handleCopy(tx.from)}
                        >
                          {tx.from.slice(0, 8)}...{tx.from.slice(-6)}
                          {copied === tx.from && (
                            <span className="text-green-500 text-xs ml-1">
                              Copied!
                            </span>
                          )}
                        </span>
                      </div>

                      <div className="flex justify-between">
                        <span className="font-medium text-gray-500">To</span>
                        <span
                          className="truncate font-mono cursor-pointer hover:text-indigo-500"
                          onClick={() => handleCopy(tx.to)}
                        >
                          {tx.to.slice(0, 8)}...{tx.to.slice(-6)}
                          {copied === tx.to && (
                            <span className="text-green-500 text-xs ml-1">
                              Copied!
                            </span>
                          )}
                        </span>
                      </div>

                      <div className="flex justify-between">
                        <span className="font-medium text-gray-500">Hash</span>
                        <a
                          href={tx.explorer}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="truncate font-mono text-indigo-500 hover:underline flex items-center gap-1"
                        >
                          {tx.hash.slice(0, 8)}...{tx.hash.slice(-6)}
                          <ExternalLink className="w-3 h-3" />
                        </a>
                      </div>
                    </div>

                    {/* Right: Amount & Status */}
                    <div className="text-right w-full md:w-auto flex flex-col items-end gap-2">
                      <p
                        className={`text-md font-bold ${
                          isReceived
                            ? "text-green-600 dark:text-green-400"
                            : "text-red-600 dark:text-red-400"
                        }`}
                      >
                        {isReceived ? "+" : "-"}
                        {tx.amount} {mapChainToSymbol[tx?.chain]}
                      </p>

                      <span
                        className={`inline-flex items-center gap-1 text-xs font-medium px-3 py-1.5 rounded-full ${
                          isFailed
                            ? "bg-red-100 text-red-700 dark:bg-red-900/40 dark:text-red-300"
                            : isSuccess
                            ? "bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-300"
                            : "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/40 dark:text-yellow-300"
                        }`}
                      >
                        <span className="material-symbols-outlined text-sm">
                          {isFailed
                            ? "cancel"
                            : isSuccess
                            ? "check_circle"
                            : "pending"}
                        </span>
                        {tx.status}
                      </span>
                    </div>
                  </div>

                  {/* Gradient Accent Bar */}
                  <div
                    className={`absolute left-0 bottom-0 h-[3px] w-full rounded-b-xl ${
                      isReceived
                        ? "bg-gradient-to-r from-green-400 via-emerald-500 to-green-600"
                        : "bg-gradient-to-r from-red-400 via-rose-500 to-red-600"
                    }`}
                  ></div>
                </motion.div>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
}

const mapChainToSymbol: any = {
  ["Bitcoin"]: "BTC",
  ["Ethereum"]: "ETH",
  ["Solana"]: "SOL",
  ["Tron"]: "TRX",
  ["USDC"]: "USDC",
  ["USDT"]: "USDT",
};
