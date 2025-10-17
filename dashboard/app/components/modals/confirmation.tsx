"use client";
import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";

interface ConfirmModalProps {
  title?: string;
  message?: string;
  confirmText?: string;
  cancelText?: string;
  onConfirm: () => void;
  onCancel: () => void;
  loading?: boolean;
}

const ConfirmModal: React.FC<ConfirmModalProps> = ({
  title = "Confirm Action",
  message = "Are you sure you want to continue with this action?",
  confirmText = "Yes, Continue",
  cancelText = "Cancel",
  onConfirm,
  onCancel,
  loading = false,
}) => {
  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center"
      >
        <motion.div
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          transition={{ duration: 0.2, ease: "easeOut" }}
          className="bg-white dark:bg-neutral-900 w-[90%] max-w-md rounded-2xl shadow-xl overflow-hidden"
        >
          {/* Header */}
          <div className="flex items-center justify-between border-b border-gray-100 dark:border-neutral-800 px-5 py-3">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
              {title}
            </h2>
            <button
              onClick={onCancel}
              className="p-2 hover:bg-gray-100 dark:hover:bg-neutral-800 rounded-full transition"
            >
              <X size={18} />
            </button>
          </div>

          {/* Body */}
          <div className="px-5 py-4 text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
            {message}
          </div>

          {/* Actions */}
          <div className="flex justify-end gap-3 px-5 py-4 border-t border-gray-100 dark:border-neutral-800 bg-gray-50 dark:bg-neutral-950">
            <Button onClick={onCancel} variant="outline" className="rounded-xl">
              {cancelText}
            </Button>
            <Button
              onClick={onConfirm}
              disabled={loading}
              className="rounded-xl bg-violet-600 hover:bg-violet-700 text-white font-medium px-4"
            >
              {loading ? "Processing..." : confirmText}
            </Button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default ConfirmModal;
