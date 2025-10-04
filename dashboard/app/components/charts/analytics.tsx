"use client";

import React, { useState } from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale,
  Filler,
  Tooltip,
  Legend,
} from "chart.js";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

ChartJS.register(
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale,
  Filler,
  Tooltip,
  Legend
);

const DoubleAreaChart = () => {
  const [tab, setTab] = useState("weekly");

  const weeklyData = {
    labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    datasets: [
      {
        label: "User Growth",
        data: [120, 200, 150, 220, 180, 250, 300],
        fill: true,
        backgroundColor: "rgba(59,130,246,0.2)",
        borderColor: "rgba(59,130,246,1)",
        borderWidth: 1.5,
        tension: 0.4,
        pointRadius: 0,
      },
      {
        label: "Trade Volume",
        data: [100, 160, 130, 180, 170, 190, 210],
        fill: true,
        backgroundColor: "rgba(239,68,68,0.2)",
        borderColor: "rgba(239,68,68,1)",
        borderWidth: 1.5,
        tension: 0.4,
        pointRadius: 0,
      },
    ],
  };

  const monthlyData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"],
    datasets: [
      {
        label: "User Growth",
        data: [1000, 1500, 1200, 1700, 1800, 2000, 2200],
        fill: true,
        backgroundColor: "rgba(16,185,129,0.2)",
        borderColor: "rgba(16,185,129,1)",
        borderWidth: 1.5,
        tension: 0.4,
        pointRadius: 0,
      },
      {
        label: "Trade Volume",
        data: [900, 1100, 1000, 1300, 1400, 1500, 1600],
        fill: true,
        backgroundColor: "rgba(249,115,22,0.2)",
        borderColor: "rgba(249,115,22,1)",
        borderWidth: 1.5,
        tension: 0.4,
        pointRadius: 0,
      },
    ],
  };

  const chartData = tab === "weekly" ? weeklyData : monthlyData;

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "bottom" as const,
        labels: {
          usePointStyle: true,
          pointStyle: "circle",
          padding: 20,
          boxWidth: 10,
          color: "#6b7280",
          font: {
            size: 13,
            weight: "bold" as const,
          },
        },
      },
      tooltip: {
        backgroundColor: "rgba(31, 41, 55, 0.9)",
        titleColor: "#fff",
        bodyColor: "#e5e7eb",
        borderColor: "rgba(75, 85, 99, 0.3)",
        borderWidth: 1,
      },
    },
    scales: {
      x: {
        grid: {
          display: false, // ❌ No vertical grid lines
        },
        ticks: {
          color: "#9ca3af",
          font: {
            size: 12,
            weight: "normal" as const,
          },
        },
      },
      y: {
        grid: {
          display: true, // ✅ Enable horizontal grid lines
          color: "rgba(229, 231, 235, 0.5)", // subtle gray lines
          drawTicks: false,
          borderDash: [4, 4], // dashed line effect
        },
        ticks: {
          color: "#9ca3af",
          font: {
            size: 12,
            weight: "normal" as const,
          },
          padding: 6,
        },
      },
    },
  };

  return (
    <div className="w-full h-[390px]">
      {/* Header */}
      <div className="flex flex-col md:flex-row items-center justify-between mb-4 gap-3">
        <h2 className="text-lg font-semibold text-heading-light dark:text-heading-dark">
          User Growth &amp; Trade Volume
        </h2>
        <Tabs value={tab} onValueChange={setTab}>
          <TabsList>
            <TabsTrigger value="weekly">Weekly</TabsTrigger>
            <TabsTrigger value="monthly">Monthly</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      {/* Chart */}
      <div className="h-[420px]">
        <Line data={chartData} options={options} />
      </div>
    </div>
  );
};

export default DoubleAreaChart;
