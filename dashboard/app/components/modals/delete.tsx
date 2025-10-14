"use client";
import Image from "next/image";
import { Dispatch, SetStateAction, useState } from "react";
import toast from "react-hot-toast";
import { motion, AnimatePresence } from "framer-motion";
import { useAppDispatch } from "@/app/lib/redux/controls";
import { AlertTriangle, X } from "lucide-react";

interface DeleteModalProps {
  setIsopen: Dispatch<SetStateAction<boolean>>;
  title?: string;
  message?: string;
  onDelete: () => Promise<{ error?: boolean; payload?: any }>;
  refreshHandler?: any;
  reloadState?: boolean;
}

const DeleteModal = ({
  setIsopen,
  title,
  message,
  onDelete,
  refreshHandler,
  reloadState,
}: DeleteModalProps) => {
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState(false);

  const handleDelete = async () => {
    setLoading(true);
    try {
      const { error, payload } = await onDelete();
      if (!error && payload) {
        toast.success("Deleted successfully!");
        refreshHandler?.(!reloadState);
        setIsopen(false);
      } else {
        toast.error("Failed to delete, try again!");
      }
    } catch {
      toast.error("Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.95, opacity: 0, y: 10 }}
          transition={{ type: "spring", stiffness: 220, damping: 20 }}
          className="relative w-[90%] max-w-[420px] bg-white dark:bg-gray-900 rounded-2xl shadow-xl border border-gray-100 dark:border-gray-800 p-6"
        >
          {/* Header */}
          <div className="flex justify-between items-center border-b border-gray-200 dark:border-gray-700 pb-3">
            <h2 className="text-lg font-semibold text-red-600 flex items-center gap-2">
              <AlertTriangle size={22} strokeWidth={2} />
              {title || "Confirm Deletion"}
            </h2>
            <button
              onClick={() => setIsopen(false)}
              className="hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full p-1.5 transition"
            >
              <X size={18} strokeWidth={2.5} />
            </button>
          </div>

          {/* Body */}
          <div className="mt-5 text-gray-700 dark:text-gray-300 text-[15px] leading-relaxed">
            {message || (
              <>
                Are you sure you want to delete this item?{" "}
                <span className="font-semibold text-gray-900 dark:text-gray-100">
                  This action cannot be undone.
                </span>
              </>
            )}
          </div>

          {/* Buttons */}
          <div className="flex justify-end gap-3 mt-8">
            <button
              onClick={() => setIsopen(false)}
              disabled={loading}
              className="px-5 py-2.5 rounded-lg font-semibold text-sm border border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 transition-all"
            >
              Cancel
            </button>

            <button
              onClick={handleDelete}
              disabled={loading}
              className={`px-5 py-2.5 rounded-lg font-semibold text-sm text-white bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 shadow-md shadow-red-200 dark:shadow-none transition-all ${
                loading ? "opacity-70 cursor-not-allowed" : ""
              }`}
            >
              {loading ? "Deleting..." : "Delete"}
            </button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default DeleteModal;
