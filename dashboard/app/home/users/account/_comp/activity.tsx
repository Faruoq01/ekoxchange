"use client";
import { motion } from "framer-motion";
import { useCallback, useEffect, useState } from "react";
import { Clock, ChevronDown, User as UserIcon } from "lucide-react";
import { UserService } from "@/app/lib/services/users";
import { useAppDispatch, useAppSelector } from "@/app/lib/redux/controls";
import { setWalletUserLogs } from "@/app/lib/redux/slices/users";
import Table from "@/app/components/home/table";
import { activityTableColumns } from "./_tables/activity";

export default function UserActivityLogs() {
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState(false);
  const [skip, setSkip] = useState(0);
  const [limit] = useState(30);
  const user = useAppSelector((state) => state.users.user);
  const walletUserLogs = useAppSelector((state) => state.users.walletUserLogs);

  const getUserActivityLogs = useCallback(async () => {
    setLoading(true);
    const { error, payload } = await UserService.getWalletUserLogs(
      user?.id,
      skip,
      limit
    );
    setLoading(false);
    if (!error && payload) dispatch(setWalletUserLogs(payload));
  }, [dispatch, user?.id, skip, limit]);

  useEffect(() => {
    getUserActivityLogs();
  }, [getUserActivityLogs]);

  const loadMore = async () => {
    setLoading(true);
    setTimeout(() => {
      setSkip((prev) => prev + limit);
      setLoading(false);
    }, 1000);
  };

  return (
    <motion.section
      className="bg-card-light dark:bg-card-dark rounded-xl p-4 sm:p-6"
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      {/* Header */}
      <header className="flex items-center justify-between mb-6">
        <h4 className="text-lg md:text-xl font-semibold text-gray-800 dark:text-gray-100 flex items-center gap-2">
          <Clock className="w-5 h-5 text-primary" />
          User Activity Logs
        </h4>
      </header>

      {/* Universal Table */}
      <Table
        columns={activityTableColumns}
        data={walletUserLogs || []}
        loading={loading}
        emptyText="No user activity logs found."
      />

      {/* Load More Button */}
      {walletUserLogs?.length > 0 && (
        <div className="mt-6 flex justify-end">
          <motion.button
            onClick={loadMore}
            disabled={loading}
            whileTap={{ scale: 0.95 }}
            className="bg-primary/10 text-primary flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-primary/20 text-sm font-medium transition disabled:opacity-50"
          >
            {loading ? (
              <motion.span className="inline-block w-4 h-4 border-2 border-primary border-t-transparent rounded-full animate-spin" />
            ) : (
              <>
                <ChevronDown className="w-4 h-4" />
                Load More
              </>
            )}
          </motion.button>
        </div>
      )}
    </motion.section>
  );
}
