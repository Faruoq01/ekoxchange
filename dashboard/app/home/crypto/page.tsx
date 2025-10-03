"use client";
import Button from "@/app/components/forms/button";
import Text from "@/app/components/forms/text";
import Pagination from "@/app/components/home/pagination";
import Table from "@/app/components/home/table";
import { Plus } from "lucide-react";
import React from "react";
import { columns, Rate, rates } from "./_comp/table";
import { Fee, feeColumns, fees } from "./_comp/fee";

// Types
interface Wallet {
  name: string;
  symbol: string;
  amount: string;
  value: string;
  change: string;
  img: string;
}

// Reusable WalletCard
const WalletCard: React.FC<Wallet> = ({
  name,
  symbol,
  amount,
  value,
  change,
  img,
}) => (
  <div className="bg-card-light dark:bg-card-dark p-6 rounded-lg flex flex-col justify-between">
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
      <p className="text-lg font-bold text-heading-light dark:text-heading-dark">
        {amount}
      </p>
      <p className="text-text-light dark:text-text-dark">{value}</p>
    </div>
  </div>
);

const Crypto = () => {
  const wallets: Wallet[] = [
    {
      name: "Bitcoin",
      symbol: "BTC",
      amount: "3.529020 BTC",
      value: "$190,500.55",
      change: "+1.5%",
      img: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/46/Bitcoin.svg/1200px-Bitcoin.svg.png",
    },
    {
      name: "Ethereum",
      symbol: "ETH",
      amount: "15.253 ETH",
      value: "$45,750.22",
      change: "-0.8%",
      img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTJDn0ojTITvcdAzMsfBMJaZC4STaDHzduleQ&s",
    },
    {
      name: "Solana",
      symbol: "SOL",
      amount: "250.75 SOL",
      value: "$25,075.00",
      change: "+3.2%",
      img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQty1ptcBSY-tfLh_dAW_FS1GLSClUiFQTZqA&s",
    },
    {
      name: "Tron",
      symbol: "TRX",
      amount: "250.75 TRX",
      value: "$25,075.00",
      change: "+3.2%",
      img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTBsWaz0K2kxYpSFMhQ2pPdBcnOwpQHWYEyzw&s",
    },
    {
      name: "Tether",
      symbol: "USDT",
      amount: "5,000 USDT",
      value: "$5,000.00",
      change: "0.0%",
      img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRBcmKcHrJcPR_wk4REQeUaEdX7fHVi3uePPw&s",
    },
    {
      name: "USD Coin",
      symbol: "USDC",
      amount: "5,000 USDC",
      value: "$5,000.00",
      change: "0.0%",
      img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ43MuDqq54iD1ZCRL_uthAPkfwSSL-J5qI_Q&s",
    },
  ];

  return (
    <main className="flex-1 mt-[10px]">
      {/* Wallets */}
      <div className="mb-8">
        <Text variant="medium" className="mb-1">
          Wallet Balances
        </Text>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {wallets.map((wallet) => (
            <WalletCard key={wallet.symbol} {...wallet} />
          ))}
        </div>
      </div>

      <main className="flex-1 overflow-y-auto mt-[40px]">
        <div className="flex items-end justify-between mb-[10px]">
          <Text variant="medium" className="mb-0">
            Fee Management
          </Text>

          <div className="w-[140px]">
            <Button
              variant="primary"
              className="flex items-center gap-2 w-auto px-2 py-2.5 text-sm"
              onClick={() => console.log("Add rate clicked")}
            >
              <Plus className="w-5 h-5" />
              Add Fee
            </Button>
          </div>
        </div>
        <div className="bg-card-light dark:bg-card-dark p-6 rounded-lg shadow-md">
          {/* Table (responsive: table on desktop, cards on mobile) */}
          <Table<Fee> columns={feeColumns} data={fees} />

          {/* Pagination */}
          <div className="mt-6">
            <Pagination total={20} perPage={5} currentPage={1} />
          </div>
        </div>
      </main>

      <main className="flex-1 overflow-y-auto mt-[40px] mb-[50px]">
        <div className="flex items-center justify-between mb-[10px]">
          <Text variant="medium" className="mt-3">
            Rates Management
          </Text>

          <div className="w-[140px]">
            <Button
              variant="primary"
              className="flex items-center gap-2 w-auto px-2 py-2.5 text-sm"
              onClick={() => console.log("Add rate clicked")}
            >
              <Plus className="w-5 h-5" />
              Add Rate
            </Button>
          </div>
        </div>
        <div className="bg-card-light dark:bg-card-dark p-6 rounded-lg shadow-md">
          {/* Table (responsive: table on desktop, cards on mobile) */}
          <Table<Rate> columns={columns} data={rates} />

          {/* Pagination */}
          <div className="mt-6">
            <Pagination total={20} perPage={5} currentPage={1} />
          </div>
        </div>
      </main>
    </main>
  );
};

export default Crypto;
