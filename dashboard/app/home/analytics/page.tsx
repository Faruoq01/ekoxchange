"use client";
import StatCard from "@/app/components/cards/analytics";
import DoubleLineChart from "@/app/components/charts/analytics";
import Pagination from "@/app/components/home/pagination";
import Table from "@/app/components/home/table";
import React, { useState } from "react";
import { logs, logsColumns, SystemLog } from "./_comp/table";
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
import { CalendarIcon } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { cn } from "@/lib/utils";
import { format } from "date-fns";

const statCards = [
  {
    title: "Daily Trade Volume",
    value: "$1.2M",
    trend: "+15.2%",
    trendDirection: "up" as const,
    gradient:
      "from-blue-500 to-indigo-600 dark:from-blue-600 dark:to-indigo-700",
  },
  {
    title: "Giftcard Transactions",
    value: "3,450",
    trend: "-3.1%",
    trendDirection: "down" as const,
    gradient:
      "from-emerald-500 to-teal-600 dark:from-emerald-600 dark:to-teal-700",
  },
  {
    title: "Crypto Flow (24h)",
    value: "$350K",
    trend: "+8.5%",
    trendDirection: "up" as const,
    gradient:
      "from-purple-500 to-violet-600 dark:from-purple-600 dark:to-violet-700",
  },
  {
    title: "User Counts",
    value: "15,890",
    trend: "+2.1%",
    trendDirection: "up" as const,
    gradient:
      "from-amber-500 to-orange-600 dark:from-amber-600 dark:to-orange-700",
  },
];

const Analytics = () => {
  const [status, setStatus] = useState<string>("");
  const [date, setDate] = useState<Date | undefined>(undefined);

  return (
    <main className="flex-1 mt-[10px]">
      {/* Stat Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mb-8">
        {statCards.map((card, i) => (
          <StatCard key={i} {...card} />
        ))}
      </div>

      {/* Chart Section */}
      <div className="bg-card-light dark:bg-card-dark p-6 rounded-lg mb-8">
        <div className="h-[500px] lg:h-[470px] w-full">
          <DoubleLineChart />
        </div>
      </div>

      <main className="flex-1 overflow-y-auto mt-[10px] mb-[100px]">
        <div className="bg-card-light dark:bg-card-dark p-6 rounded-lg">
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6 gap-4">
            <Text variant="medium" className="mb-0">
              Transaction Management
            </Text>

            {/* Filters */}
            <div className="flex flex-wrap items-center gap-3">
              {/* Search */}
              <Select onValueChange={setStatus} value={status}>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="Filter by Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Completed">Buy</SelectItem>
                  <SelectItem value="Pending">Sell</SelectItem>
                  <SelectItem value="Failed">Send</SelectItem>
                  <SelectItem value="Failed">Swap</SelectItem>
                </SelectContent>
              </Select>

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

          {/* Table */}
          <Table<SystemLog> columns={logsColumns} data={logs} />

          {/* Pagination */}
          <div className="mt-6">
            <Pagination total={20} perPage={5} currentPage={1} />
          </div>
        </div>
      </main>
    </main>
  );
};

export default Analytics;
