"use client";

import React, { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { X, CalendarDays } from "lucide-react";
import { format, differenceInDays } from "date-fns";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

interface TransactionSyncModalProps {
  open: boolean;
  onClose: () => void;
  onConfirm: (days: number) => void;
  loading?: boolean;
}

const TransactionSyncModal: React.FC<TransactionSyncModalProps> = ({
  open,
  onClose,
  onConfirm,
  loading = false,
}) => {
  const today = new Date();
  const [fromDate, setFromDate] = useState<Date | undefined>(undefined);

  const daysCount = useMemo(() => {
    if (!fromDate) return 0;
    return differenceInDays(today, fromDate) + 1; // Include today
  }, [fromDate, today]);

  const handleConfirm = () => {
    if (!fromDate) return;
    onConfirm(daysCount);
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center p-4"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="bg-gradient-to-br from-white to-gray-50 dark:from-neutral-900 dark:to-neutral-950 w-full max-w-md rounded-2xl shadow-2xl border border-gray-200/50 dark:border-neutral-800 overflow-hidden"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100 dark:border-neutral-800 bg-gradient-to-r from-violet-600/10 to-transparent">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                Sync Transactions
              </h2>
              <button
                onClick={onClose}
                className="p-2 hover:bg-gray-100 dark:hover:bg-neutral-800 rounded-full transition"
              >
                <X size={18} />
              </button>
            </div>

            {/* Body */}
            <div className="px-5 py-6 flex flex-col gap-4">
              <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
                Select the date you want to sync transactions{" "}
                <strong>from</strong>. The system will automatically include
                today’s date in the sync range.
              </p>

              {/* Date Pickers */}
              <div className="grid grid-cols-1 gap-4">
                {/* From Date */}
                <div>
                  <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    From Date
                  </label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className="w-full mt-1 justify-start text-left font-normal"
                      >
                        <CalendarDays className="mr-2 h-4 w-4" />
                        {fromDate ? format(fromDate, "PPP") : "Pick a date"}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={fromDate}
                        onSelect={setFromDate}
                        disabled={(date) => date > today}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                </div>

                {/* To Date */}
                <div>
                  <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    To Date
                  </label>
                  <Button
                    variant="outline"
                    className="w-full mt-1 justify-start text-left font-normal cursor-not-allowed opacity-70"
                    disabled
                  >
                    <CalendarDays className="mr-2 h-4 w-4" />
                    {format(today, "PPP")} (Today)
                  </Button>
                </div>

                {/* Days Count */}
                {fromDate && (
                  <div className="text-sm text-gray-600 dark:text-gray-400 mt-2">
                    Total days to sync:{" "}
                    <span className="font-medium text-violet-600 dark:text-violet-400">
                      {daysCount} day{daysCount > 1 ? "s" : ""}
                    </span>
                  </div>
                )}
              </div>
            </div>

            {/* Actions */}
            <div className="flex justify-end gap-3 px-5 py-4 border-t border-gray-100 dark:border-neutral-800 bg-gray-50 dark:bg-neutral-950">
              <Button
                onClick={onClose}
                variant="outline"
                className="rounded-xl"
                disabled={loading}
              >
                Cancel
              </Button>
              <Button
                onClick={handleConfirm}
                disabled={!fromDate || loading}
                className="rounded-xl bg-violet-600 hover:bg-violet-700 text-white font-medium px-4"
              >
                {loading ? "Syncing..." : "Start Sync"}
              </Button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default TransactionSyncModal;
