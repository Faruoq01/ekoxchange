"use client";

import { useState } from "react";
import Pagination from "@/app/components/home/pagination";
import Table from "@/app/components/home/table";
import Text from "@/app/components/forms/text";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import {
  buyTransactions,
  sellTransactions,
  swapTransactions,
  sendTransactions,
  transactionColumns,
  Transaction,
} from "./_comp/table";
import { AnimatePresence, motion } from "framer-motion";

const Transactions = () => {
  const [status, setStatus] = useState<string>("");
  const [date, setDate] = useState<Date | undefined>(undefined);
  const [activeTab, setActiveTab] = useState<"buy" | "sell" | "swap" | "send">(
    "buy"
  );

  const tabs = [
    { key: "buy", label: "Buy" },
    { key: "sell", label: "Sell" },
    { key: "swap", label: "Swap" },
    { key: "send", label: "Send" },
  ];

  const getTransactions = (): Transaction[] => {
    switch (activeTab) {
      case "buy":
        return buyTransactions;
      case "sell":
        return sellTransactions;
      case "swap":
        return swapTransactions;
      case "send":
        return sendTransactions;
      default:
        return [];
    }
  };

  return (
    <main className="flex-1 overflow-y-auto mt-[10px]">
      <div className="bg-card-light dark:bg-card-dark p-6 rounded-lg">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6 gap-4">
          <Text variant="medium" className="mb-0">
            Transaction Management
          </Text>

          {/* Filters */}
          <div className="flex flex-wrap items-center gap-3">
            {/* Status Filter */}
            <Select onValueChange={setStatus} value={status}>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Filter by Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Completed">Completed</SelectItem>
                <SelectItem value="Pending">Pending</SelectItem>
                <SelectItem value="Failed">Failed</SelectItem>
              </SelectContent>
            </Select>

            {/* Date Filter */}
            <Popover>
              <PopoverTrigger asChild>
                <button
                  className={cn(
                    "flex items-center justify-between w-44 px-3 py-2 border border-border-light dark:border-border-dark rounded-lg text-sm hover:bg-accent transition-colors",
                    !date && "text-muted-foreground"
                  )}
                >
                  {date ? format(date, "PPP") : <span>Filter by Date</span>}
                  <CalendarIcon className="w-4 h-4 ml-2 opacity-60" />
                </button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={setDate}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-4 mb-6 border-b border-border-light dark:border-border-dark">
          {tabs.map((tab) => (
            <button
              key={tab.key}
              onClick={() =>
                setActiveTab(tab.key as "buy" | "sell" | "swap" | "send")
              }
              className={`relative pb-2 text-sm font-medium transition ${
                activeTab === tab.key
                  ? "text-primary"
                  : "text-text-light dark:text-text-dark opacity-70"
              }`}
            >
              {tab.label}
              {activeTab === tab.key && (
                <motion.div
                  layoutId="tab-underline"
                  className="absolute left-0 right-0 bottom-0 h-[2px] bg-primary rounded-full"
                  transition={{ type: "spring", stiffness: 500, damping: 30 }}
                />
              )}
            </button>
          ))}
        </div>

        {/* Table Section */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
          >
            <Table<Transaction>
              data={getTransactions()}
              columns={transactionColumns}
            />
          </motion.div>
        </AnimatePresence>

        <Pagination total={30} perPage={30} currentPage={1} />
      </div>
    </main>
  );
};

export default Transactions;
