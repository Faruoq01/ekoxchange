import { motion } from "framer-motion";

interface Transaction {
  id: string;
  type: string;
  date: string;
  amount: string;
  status: "Completed" | "Pending" | "Failed";
}

const transactions: Transaction[] = [
  {
    id: "#TXN12345678",
    type: "Deposit",
    date: "2024-07-28 14:30",
    amount: "+ 0.5 BTC",
    status: "Completed",
  },
  {
    id: "#TXN12345679",
    type: "Withdrawal",
    date: "2024-07-27 10:15",
    amount: "- 10.0 ETH",
    status: "Pending",
  },
  {
    id: "#TXN12345680",
    type: "Trade",
    date: "2024-07-26 18:45",
    amount: "BTC/USDT",
    status: "Completed",
  },
  {
    id: "#TXN12345681",
    type: "Deposit",
    date: "2024-07-25 09:00",
    amount: "+ 1,000 USDT",
    status: "Completed",
  },
  {
    id: "#TXN12345682",
    type: "Withdrawal",
    date: "2024-07-24 12:00",
    amount: "- 500 SOL",
    status: "Failed",
  },
  {
    id: "#TXN12345683",
    type: "Trade",
    date: "2024-07-23 20:30",
    amount: "ETH/BTC",
    status: "Completed",
  },
  {
    id: "#TXN12345684",
    type: "Deposit",
    date: "2024-07-22 11:55",
    amount: "+ 250,000 TRX",
    status: "Completed",
  },
];

export default function TransactionHistory() {
  const statusColor = (status: Transaction["status"]) => {
    switch (status) {
      case "Completed":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300";
      case "Pending":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300";
      case "Failed":
        return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300";
      default:
        return "";
    }
  };

  return (
    <motion.section
      className="bg-card-light dark:bg-card-dark rounded-xl"
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <header className="flex items-center justify-between mb-4">
        <h4 className="text-lg md:text-xl font-semibold text-gray-800 dark:text-gray-100">
          Transaction History
        </h4>
      </header>

      {/* Desktop Table */}
      <div className="hidden md:block overflow-x-auto rounded-lg border border-gray-200 dark:border-gray-700">
        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
          <thead className="bg-gray-50 dark:bg-gray-800">
            <tr>
              {["Transaction ID", "Type", "Date", "Amount", "Status"].map(
                (heading) => (
                  <th
                    key={heading}
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wider"
                  >
                    {heading}
                  </th>
                )
              )}
            </tr>
          </thead>
          <tbody className="bg-white dark:bg-gray-900 divide-y divide-gray-100 dark:divide-gray-800">
            {transactions.map((txn, i) => (
              <motion.tr
                key={txn.id}
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                className="hover:bg-gray-50 dark:hover:bg-gray-800 transition"
              >
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-gray-100">
                  {txn.id}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 dark:text-gray-400">
                  {txn.type}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 dark:text-gray-400">
                  {txn.date}
                </td>
                <td
                  className={`px-6 py-4 whitespace-nowrap text-sm ${
                    txn.amount.startsWith("+")
                      ? "text-green-600 dark:text-green-500"
                      : txn.amount.startsWith("-")
                      ? "text-red-600 dark:text-red-500"
                      : "text-gray-700 dark:text-gray-300"
                  }`}
                >
                  {txn.amount}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">
                  <span
                    className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${statusColor(
                      txn.status
                    )}`}
                  >
                    {txn.status}
                  </span>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Cards */}
      <div className="grid gap-4 md:hidden">
        {transactions.map((txn, i) => (
          <motion.div
            key={txn.id}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            className="border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 rounded-lg p-4 shadow-sm"
          >
            <div className="flex justify-between items-center mb-2">
              <span className="font-semibold text-gray-900 dark:text-gray-100">
                {txn.type}
              </span>
              <span
                className={`px-2 text-xs rounded-full ${statusColor(
                  txn.status
                )}`}
              >
                {txn.status}
              </span>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">
              <strong>ID:</strong> {txn.id}
            </p>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">
              <strong>Date:</strong> {txn.date}
            </p>
            <p
              className={`text-sm font-medium ${
                txn.amount.startsWith("+")
                  ? "text-green-600 dark:text-green-500"
                  : txn.amount.startsWith("-")
                  ? "text-red-600 dark:text-red-500"
                  : "text-gray-700 dark:text-gray-300"
              }`}
            >
              {txn.amount}
            </p>
          </motion.div>
        ))}
      </div>
    </motion.section>
  );
}
