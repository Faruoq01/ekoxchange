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
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { Transaction, transactionColumns, transactions } from "./_comp/table";

const Transactions = () => {
  const [status, setStatus] = useState<string>("");
  const [date, setDate] = useState<Date | undefined>(undefined);
  const [search, setSearch] = useState("");

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
        <Table<Transaction> columns={transactionColumns} data={transactions} />

        {/* Pagination */}
        <div className="mt-6">
          <Pagination total={20} perPage={5} currentPage={1} />
        </div>
      </div>
    </main>
  );
};

export default Transactions;
