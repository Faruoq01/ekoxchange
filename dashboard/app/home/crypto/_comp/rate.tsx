"use client";
import { Column } from "@/app/components/home/table";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

// --- Types
export interface Rate {
  id: number;
  cryptocurrency: string;
  symbol: string;
  network: string;
  buyRate: string;
  sellRate: string;
  spread: string;
  dateRange: string;
  status: string;
  lastUpdated: string;
}

// --- Status badge colors
const statusColors: Record<string, string> = {
  Active: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300",
  Inactive: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300",
};

// --- Sample data
export const rates: Rate[] = [
  {
    id: 1,
    cryptocurrency: "Bitcoin",
    symbol: "BTC",
    network: "Bitcoin",
    buyRate: "N/A",
    sellRate: "₦1,000",
    spread: "N/A",
    dateRange: "02/10/2025 - 14/10/2025",
    status: "Inactive",
    lastUpdated: "02/10/2025 13:12:57",
  },
  {
    id: 2,
    cryptocurrency: "Tether USD",
    symbol: "USDT",
    network: "Ethereum",
    buyRate: "₦1,000",
    sellRate: "N/A",
    spread: "N/A",
    dateRange: "29/09/2025 - 06/10/2025",
    status: "Inactive",
    lastUpdated: "29/09/2025 21:10:22",
  },
  {
    id: 3,
    cryptocurrency: "Tether USD",
    symbol: "USDT",
    network: "Tron",
    buyRate: "₦1,000",
    sellRate: "N/A",
    spread: "N/A",
    dateRange: "29/09/2025 - 06/10/2025",
    status: "Inactive",
    lastUpdated: "29/09/2025 21:11:30",
  },
  {
    id: 4,
    cryptocurrency: "Tether USD",
    symbol: "USDT",
    network: "Ethereum",
    buyRate: "₦1,575",
    sellRate: "₦1,480",
    spread: "-6.03",
    dateRange: "29/09/2025 - 30/09/2025",
    status: "Inactive",
    lastUpdated: "29/09/2025 12:40:56",
  },
  {
    id: 5,
    cryptocurrency: "Tether USD",
    symbol: "USDT",
    network: "Tron",
    buyRate: "₦1,575",
    sellRate: "₦1,480",
    spread: "-6.03",
    dateRange: "29/09/2025 - 30/09/2025",
    status: "Inactive",
    lastUpdated: "29/09/2025 12:41:39",
  },
  {
    id: 6,
    cryptocurrency: "USD Coin",
    symbol: "USDC",
    network: "Ethereum",
    buyRate: "₦1,000",
    sellRate: "N/A",
    spread: "N/A",
    dateRange: "29/09/2025 - 06/10/2025",
    status: "Inactive",
    lastUpdated: "29/09/2025 21:10:55",
  },
];

// --- Columns
export const columns: Column<Rate>[] = [
  {
    key: "cryptocurrency",
    header: "Cryptocurrency",
    render: (rate) => (
      <div>
        <p className="font-semibold">{rate.cryptocurrency}</p>
        <p className="text-xs text-text-light dark:text-text-dark">
          {rate.symbol}
        </p>
      </div>
    ),
  },
  { key: "network", header: "Network" },
  { key: "buyRate", header: "Buy Rate (NGN)" },
  { key: "sellRate", header: "Sell Rate (NGN)" },
  { key: "spread", header: "Spread (%)" },
  { key: "dateRange", header: "Date Range" },
  {
    key: "status",
    header: "Status",
    render: (rate) => (
      <span
        className={`text-xs font-medium px-2.5 py-1 rounded-full ${
          statusColors[rate.status]
        }`}
      >
        {rate.status}
      </span>
    ),
  },
  { key: "lastUpdated", header: "Last Updated" },
  {
    key: "actions",
    header: "Actions",
    render: () => {
      return (
        <Popover>
          <PopoverTrigger asChild>
            <button
              className="text-gray-500 dark:text-gray-300 hover:text-primary transition"
              title="Actions"
            >
              <span className="material-icons text-[20px]">more_vert</span>
            </button>
          </PopoverTrigger>

          <PopoverContent className="max-w-[150px] text-[12px]">
            <div
              // onClick={viewDetails}
              className="py-[6px] select-none border-b hover:bg-gray-50 px-[10px]"
            >
              Edit Rate
            </div>
            <div
              // onClick={() => setResetPassword(true)}
              className="py-[6px] select-none hover:bg-gray-50 px-[10px]"
            >
              Delete
            </div>
          </PopoverContent>
        </Popover>
      );
    },
  },
];
