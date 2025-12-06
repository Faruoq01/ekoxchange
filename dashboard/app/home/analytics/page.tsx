"use client";
import StatCard from "@/app/components/cards/analytics";
import DoubleLineChart from "@/app/components/charts/analytics";
import Pagination from "@/app/components/home/pagination";
import Table from "@/app/components/home/table";
import React, { useCallback, useEffect, useState } from "react";
import { logs, logsColumns, SystemLog } from "./_comp/table";
import Text from "@/app/components/forms/text";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { AnalyticsService } from "@/app/lib/services/analytics";
import { DateRangePicker } from "@/app/components/forms/daterange";
import { useAppDispatch, useAppSelector } from "@/app/lib/redux/controls";
import { setCardStats } from "@/app/lib/redux/slices/analytics";
import { UserService } from "@/app/lib/services/users";

const Analytics = () => {
  const dispatch = useAppDispatch();
  const [status, setStatus] = useState<string>("");
  const currentYear = new Date().getFullYear();
  const cardStats = useAppSelector((state) => state.analytics.cardStats);

  const [startDate, setStartDate] = useState<string>(`${currentYear}-01-01`);
  const [endDate, setEndDate] = useState<string>(`${currentYear}-12-31`);

  const [loading, setLoading] = useState(false);
  const [skip, setSkip] = useState(0);
  const [limit, setLimit] = useState(30);
  const [logs, setLogs] = useState([]);

  const getCardStatistics = useCallback(async () => {
    const userCountProm = AnalyticsService.getUserCount(startDate, endDate);
    const transVolProm = AnalyticsService.getTradeVolume(startDate, endDate);
    const cryptoFlowProm = AnalyticsService.getCryptoFlow(startDate, endDate);

    const [userCount, tradeVolume, cryptoVolume] = await Promise.all([
      userCountProm,
      transVolProm,
      cryptoFlowProm,
    ]);

    if (!userCount?.error && !tradeVolume?.error && !cryptoVolume?.error) {
      const stats = {
        tradeVolume: tradeVolume?.payload,
        cryptoFlow: cryptoVolume?.payload,
        userCounts: userCount?.payload,
        giftcardTransactions: 0,
      };
      dispatch(setCardStats(stats));
    }
  }, []);

  useEffect(() => {
    getCardStatistics();
  }, [getCardStatistics, startDate, endDate]);

  const handleRangeChange = (range: any) => {
    setStartDate(range?.startDate);
    setEndDate(range?.endDate);
  };

  const getSystemActivityLogs = useCallback(async () => {
    setLoading(true);
    const { error, payload } = await UserService.getSystemLogs(skip, limit);
    setLoading(false);
    if (!error && payload) {
      setLogs(payload);
      console.log(payload, "payload");
    }
  }, [dispatch, skip, limit]);

  useEffect(() => {
    getSystemActivityLogs();
  }, [getSystemActivityLogs]);

  const statCards = getCards(cardStats);
  return (
    <main className="flex-1 mt-[10px]">
      <div className="flex flex-row justify-between items-center mb-[10px]">
        <h1 className="font-bold text-lg">Analytics</h1>
        <DateRangePicker onChange={handleRangeChange} />
      </div>
      {/* Stat Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mb-8">
        {statCards.map((card, i) => (
          <StatCard key={i} {...card} />
        ))}
      </div>

      {/* Chart Section */}
      <div className="bg-card-light dark:bg-card-dark p-6 rounded-lg mb-8">
        <div className="h-[500px] lg:h-[470px] w-full">
          <DoubleLineChart />
        </div>
      </div>

      <main className="flex-1 overflow-y-auto mt-[10px] mb-[100px]">
        <div className="bg-card-light dark:bg-card-dark p-6 rounded-lg">
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6 gap-4">
            <Text variant="medium" className="mb-0">
              System Activity Logs
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
            </div>
          </div>

          {/* Table */}
          <Table<SystemLog>
            columns={logsColumns}
            data={logs}
            loading={loading}
          />

          {/* Pagination */}
          <div className="mt-6">
            <Pagination total={20} perPage={5} currentPage={1} />
          </div>
        </div>
      </main>
    </main>
  );
};

const getCards = (stats: any) => {
  return [
    {
      title: "Daily Trade Volume",
      value: stats?.tradeVolume,
      trend: "+15.2%",
      trendDirection: "up" as const,
      gradient:
        "from-blue-500 to-indigo-600 dark:from-blue-600 dark:to-indigo-700",
    },
    {
      title: "Giftcard Transactions",
      value: "0",
      trend: "-3.1%",
      trendDirection: "down" as const,
      gradient:
        "from-emerald-500 to-teal-600 dark:from-emerald-600 dark:to-teal-700",
    },
    {
      title: "Crypto Flow",
      value: "$" + Number(stats?.cryptoFlow).toFixed(2),
      trend: "+8.5%",
      trendDirection: "up" as const,
      gradient:
        "from-purple-500 to-violet-600 dark:from-purple-600 dark:to-violet-700",
    },
    {
      title: "User Counts",
      value: stats?.userCounts,
      trend: "+2.1%",
      trendDirection: "up" as const,
      gradient:
        "from-amber-500 to-orange-600 dark:from-amber-600 dark:to-orange-700",
    },
  ];
};

export default Analytics;
