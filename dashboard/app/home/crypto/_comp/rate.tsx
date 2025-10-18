"use client";
import { Column } from "@/app/components/home/table";
import { Modal } from "@/app/components/modals/modalskin";
import UpdateCryptoRate from "@/app/components/modals/updaterate";
import { useAppDispatch } from "@/app/lib/redux/controls";
import { setSingleRate } from "@/app/lib/redux/slices/crypto";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Fragment, useState } from "react";

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
  rawData: string;
}

// --- Status badge colors
const statusColors: Record<string, string> = {
  Active: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300",
  Inactive: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300",
};

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
    render: (user) => {
      const dispatch = useAppDispatch();
      const [editRate, setEditRate] = useState(false);

      const handleFeeEdit = () => {
        const data = JSON.parse(user?.rawData);
        dispatch(setSingleRate(data));
        setEditRate(true);
      };

      return (
        <Fragment>
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
                onClick={handleFeeEdit}
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
          {editRate && (
            <Modal isOpen={editRate}>
              <UpdateCryptoRate setIsopen={setEditRate} />
            </Modal>
          )}
        </Fragment>
      );
    },
  },
];
