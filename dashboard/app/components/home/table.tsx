"use client";

import React from "react";
import { motion } from "framer-motion";

export interface Column<T> {
  key: keyof T | string;
  header: string;
  render?: (row: T) => React.ReactNode;
}

interface TableProps<T> {
  columns: Column<T>[];
  data: T[];
}

const Table = <T extends { id: string | number }>({
  columns,
  data,
}: TableProps<T>) => {
  // Animation variants for rows
  const row = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <div className="w-full">
      {/* Table view (desktop only) */}
      <div className="hidden lg:block overflow-x-auto">
        <table className="w-full text-left">
          <thead>
            <tr className="text-xs text-text-light dark:text-text-dark uppercase border-b border-gray-200 dark:border-gray-700">
              {columns.map((col) => (
                <th key={String(col.key)} className="py-3 px-4 font-medium">
                  {col.header}
                </th>
              ))}
            </tr>
          </thead>

          <motion.tbody
            initial="hidden"
            animate="visible"
            className="divide-y divide-gray-200 dark:divide-gray-700"
          >
            {data.map((rowData) => (
              <motion.tr
                key={rowData.id}
                variants={row}
                transition={{ duration: 0.4, ease: "easeOut" }}
                className="text-sm text-heading-light dark:text-heading-dark hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
              >
                {columns.map((col) => (
                  <td key={String(col.key)} className="py-4 px-4">
                    {col.render
                      ? col.render(rowData)
                      : String(rowData[col.key as keyof T])}
                  </td>
                ))}
              </motion.tr>
            ))}
          </motion.tbody>
        </table>
      </div>

      {/* Card view (mobile + tablet) */}
      <div className="grid gap-4 lg:hidden">
        {data.map((rowData) => (
          <motion.div
            key={rowData.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="rounded-xl bg-card-light dark:bg-card-dark shadow-md p-4 border border-gray-200 dark:border-gray-700"
          >
            {columns.map((col) => (
              <div
                key={String(col.key)}
                className="flex justify-between items-start py-2 border-b last:border-0 border-gray-100 dark:border-gray-700"
              >
                <span className="text-sm font-medium text-text-light dark:text-text-dark">
                  {col.header}
                </span>
                <span className="text-sm text-heading-light dark:text-heading-dark">
                  {col.render
                    ? col.render(rowData)
                    : String(rowData[col.key as keyof T])}
                </span>
              </div>
            ))}
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Table;
