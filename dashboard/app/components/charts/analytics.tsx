"use client";

import React, { useEffect, useState } from "react";
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
import { AnalyticsService } from "@/app/lib/services/analytics";

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
  const [tab, setTab] = useState<"daily" | "weekly" | "monthly">("daily");
  const [chartData, setChartData] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  // Utility: determine date ranges (could also come from props)
  const getDateRange = () => {
    const now = new Date();
    const startDate = new Date(now.getFullYear(), 0, 1);
    const endDate = new Date(now.getFullYear(), 11, 31);
    return {
      startDate: startDate.toISOString().split("T")[0],
      endDate: endDate.toISOString().split("T")[0],
    };
  };

  const fetchChartData = async () => {
    setLoading(true);
    const { startDate, endDate } = getDateRange();

    try {
      let userApi, txApi;

      switch (tab) {
        case "daily":
          userApi = AnalyticsService.getDailyUserVolume(startDate, endDate);
          txApi = AnalyticsService.getDailyTransactionVolume(
            startDate,
            endDate
          );
          break;
        case "weekly":
          userApi = AnalyticsService.getWeeklyUserVolume(startDate, endDate);
          txApi = AnalyticsService.getWeeklyTransactionVolume(
            startDate,
            endDate
          );
          break;
        case "monthly":
          userApi = AnalyticsService.getMonthlyUserVolume(startDate, endDate);
          txApi = AnalyticsService.getMonthlyTransactionVolume(
            startDate,
            endDate
          );
          break;
      }

      // Fetch both in parallel
      const [userRes, txRes] = await Promise.all([userApi, txApi]);

      if (userRes.error || txRes.error) throw new Error("Error fetching data");

      // Transform data to fit chart
      const userData = userRes.payload || [];
      const txData = txRes.payload || [];

      // Determine labels depending on tab
      const labels =
        tab === "daily"
          ? userData.map((d: any) => d.dayCount)
          : tab === "weekly"
          ? userData.map((d: any) => `Week ${d.week}`)
          : userData.map((d: any) => `${d.month} ${d.year}`);

      // Ensure alignment between user and transaction data
      const userCounts = userData.map((d: any) => d.userCount);
      const txCounts = txData.map((d: any) => d.transactionCount);

      setChartData({
        labels,
        datasets: [
          {
            label: "User Growth",
            data: userCounts,
            fill: true,
            backgroundColor: "rgba(59,130,246,0.2)",
            borderColor: "rgba(59,130,246,1)",
            borderWidth: 1.5,
            tension: 0.4,
            pointRadius: 0,
          },
          {
            label: "Trade Volume",
            data: txCounts,
            fill: true,
            backgroundColor: "rgba(239,68,68,0.2)",
            borderColor: "rgba(239,68,68,1)",
            borderWidth: 1.5,
            tension: 0.4,
            pointRadius: 0,
          },
        ],
      });
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  // Fetch when tab changes
  useEffect(() => {
    fetchChartData();
  }, [tab]);

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
        grid: { display: false },
        ticks: {
          color: "#9ca3af",
          font: { size: 12, weight: "normal" as const },
        },
      },
      y: {
        grid: {
          display: true,
          color: "rgba(229, 231, 235, 0.5)",
          drawTicks: false,
          borderDash: [4, 4],
        },
        ticks: {
          color: "#9ca3af",
          font: { size: 12, weight: "normal" as const },
          padding: 6,
        },
      },
    },
  };

  return (
    <div className="w-full h-[390px]">
      <div className="flex flex-col md:flex-row items-center justify-between mb-4 gap-3">
        <h2 className="text-lg font-semibold text-heading-light dark:text-heading-dark">
          User Growth &amp; Trade Volume
        </h2>
        <Tabs value={tab} onValueChange={(val) => setTab(val as any)}>
          <TabsList>
            <TabsTrigger value="daily">Daily</TabsTrigger>
            <TabsTrigger value="weekly">Weekly</TabsTrigger>
            <TabsTrigger value="monthly">Monthly</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      <div className="h-[420px] flex items-center justify-center">
        {loading ? (
          <p className="text-gray-500">Loading data...</p>
        ) : chartData ? (
          <Line data={chartData} options={options} />
        ) : (
          <p className="text-gray-400">No data available</p>
        )}
      </div>
    </div>
  );
};

export default DoubleAreaChart;
