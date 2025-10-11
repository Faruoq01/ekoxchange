import { motion } from "framer-motion";
import { useState } from "react";
import { Clock, Info, ChevronDown } from "lucide-react";

const dummyLogs = [
  {
    timestamp: "2023-10-27 10:30 AM",
    activity: "Logged In",
    details: "IP: 192.168.1.1, Device: Chrome on macOS",
  },
  {
    timestamp: "2023-10-27 10:32 AM",
    activity: "Viewed Balance",
    details: "Viewed BTC and ETH balance",
  },
  {
    timestamp: "2023-10-27 11:05 AM",
    activity: "Withdrawal Request",
    details: "0.5 BTC to address 3J9...",
  },
  {
    timestamp: "2023-10-27 11:06 AM",
    activity: "2FA Confirmation",
    details: "Confirmed withdrawal via authenticator app",
  },
  {
    timestamp: "2023-10-26 04:15 PM",
    activity: "Password Change",
    details: "Password updated successfully",
  },
  {
    timestamp: "2023-10-26 09:00 AM",
    activity: "API Key Created",
    details: "New read-only API key generated",
  },
];

export default function UserActivityLogs() {
  const [logs, setLogs] = useState(dummyLogs);
  const [loading, setLoading] = useState(false);

  const loadMore = () => {
    setLoading(true);
    setTimeout(() => {
      setLogs((prev) => [...prev, ...dummyLogs]);
      setLoading(false);
    }, 1200);
  };

  return (
    <motion.section
      className="bg-card-light dark:bg-card-dark rounded-xl"
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <header className="flex items-center justify-between mb-6">
        <h4 className="text-lg md:text-xl font-semibold text-gray-800 dark:text-gray-100 flex items-center gap-2">
          <Clock className="w-5 h-5 text-primary" />
          User Activity Logs
        </h4>
      </header>

      {/* Desktop Table */}
      <div className="hidden md:block overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
          <thead className="bg-gray-50 dark:bg-gray-800">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wider">
                Timestamp
              </th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wider">
                Activity
              </th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wider">
                Details
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 dark:divide-gray-700 bg-white dark:bg-gray-900">
            {logs.map((log, i) => (
              <motion.tr
                key={i}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
              >
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 dark:text-gray-300">
                  {log.timestamp}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-gray-100">
                  {log.activity}
                </td>
                <td className="px-6 py-4 text-sm text-gray-700 dark:text-gray-300">
                  {log.details}
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Card View */}
      <div className="md:hidden space-y-4">
        {logs.map((log, i) => (
          <motion.div
            key={i}
            className="border border-gray-200 dark:border-gray-700 rounded-xl p-4 bg-white dark:bg-gray-900 shadow-sm"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
          >
            <div className="flex items-center justify-between mb-2">
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {log.timestamp}
              </p>
              <Info className="w-4 h-4 text-gray-400" />
            </div>
            <h5 className="font-semibold text-gray-900 dark:text-gray-100 mb-1">
              {log.activity}
            </h5>
            <p className="text-sm text-gray-600 dark:text-gray-300">
              {log.details}
            </p>
          </motion.div>
        ))}
      </div>

      {/* Load More Button */}
      <div className="mt-6 flex justify-end">
        <motion.button
          onClick={loadMore}
          disabled={loading}
          whileTap={{ scale: 0.95 }}
          className="bg-primary/10 text-primary flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-primary/20 text-sm font-medium transition"
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
    </motion.section>
  );
}
