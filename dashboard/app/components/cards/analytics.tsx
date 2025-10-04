"use client";

import { motion } from "framer-motion";
import React from "react";

interface StatCardProps {
  title: string;
  value: string | number;
  trend: string;
  trendDirection: "up" | "down";
  gradient: string;
}

const StatCard = ({
  title,
  value,
  trend,
  trendDirection,
  gradient,
}: StatCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }} // fade-in + slide-up
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      whileHover={{ scale: 1.03 }} // subtle hover scale
      className={`bg-gradient-to-br ${gradient} p-6 rounded-lg text-white shadow-lg relative overflow-hidden h-40 flex flex-col justify-end cursor-pointer`}
    >
      {/* Background accent circle */}
      <motion.div
        className="absolute -right-8 -bottom-8 w-24 h-24 bg-white/10 rounded-full"
        animate={{
          scale: [1, 1.1, 1],
          opacity: [0.08, 0.12, 0.08],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Card Content */}
      <div>
        <p className="text-sm opacity-80 mb-1">{title}</p>
        <p className="text-3xl font-bold">{value}</p>
        <p className="text-xs flex items-center gap-1 mt-1 opacity-90">
          <span className="material-symbols-outlined text-sm">
            {trendDirection === "up" ? "trending_up" : "trending_down"}
          </span>
          {trend}
        </p>
      </div>
    </motion.div>
  );
};

export default StatCard;
