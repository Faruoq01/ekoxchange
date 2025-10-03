"use client";
import { motion } from "framer-motion";

const Dashboard = () => {
  // Reusable animation variants
  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <main className="flex-1 pb-6">
      <motion.div
        className="grid grid-cols-1 lg:grid-cols-3 gap-6"
        initial="hidden"
        animate="visible"
        transition={{ staggerChildren: 0.2 }}
      >
        {/* Left section */}
        <div className="lg:col-span-2 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Earnings Card */}
            <motion.div
              variants={cardVariants}
              transition={{ duration: 0.6 }}
              className="bg-gradient-to-br from-primary to-purple-600 p-6 rounded-lg text-white relative overflow-hidden"
            >
              <div className="absolute -right-8 -bottom-8 w-32 h-32 bg-white/10 rounded-full"></div>
              <div className="flex justify-between items-center mb-4">
                <div className="p-3 bg-white/20 rounded-lg">
                  <span className="material-icons">account_balance_wallet</span>
                </div>
                <button className="text-white/80">
                  <span className="material-icons">more_horiz</span>
                </button>
              </div>
              <p className="text-3xl font-bold">$500.00</p>
              <p className="text-sm text-white/80">Total Earning</p>
            </motion.div>

            {/* Orders Card */}
            <motion.div
              variants={cardVariants}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="bg-gradient-to-br from-cyan-500 to-blue-600 p-6 rounded-lg text-white relative overflow-hidden"
            >
              <svg
                className="absolute bottom-0 right-0 opacity-20"
                fill="none"
                height="100"
                viewBox="0 0 150 100"
                width="150"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M0 80C20 95, 40 95, 60 80C80 65, 100 65, 120 80L150 50"
                  fill="none"
                  stroke="white"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={4}
                ></path>
              </svg>
              <div className="flex justify-between items-center mb-4">
                <div className="p-3 bg-white/20 rounded-lg">
                  <span className="material-icons">shopping_bag</span>
                </div>
                <div className="flex gap-2 items-center text-sm bg-white/20 px-3 py-1 rounded-full">
                  <span>Month</span>
                  <span className="bg-white text-blue-600 px-2 py-0.5 rounded-full">
                    Year
                  </span>
                </div>
              </div>
              <p className="text-3xl font-bold">$961</p>
              <p className="text-sm text-white/80">Total Order</p>
            </motion.div>
          </div>

          {/* Growth Chart */}
          <motion.div
            variants={cardVariants}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-card-light dark:bg-card-dark p-6 rounded-lg"
          >
            <div className="flex justify-between items-center mb-4">
              <div>
                <p className="text-text-light dark:text-text-dark text-sm">
                  Total Growth
                </p>
                <p className="text-2xl font-bold text-heading-light dark:text-heading-dark">
                  $2,324.00
                </p>
              </div>
              <button className="flex items-center gap-2 border border-gray-200 dark:border-gray-600 px-3 py-1.5 rounded-lg text-sm text-text-light dark:text-text-dark">
                <span>Today</span>
                <span className="material-icons text-base">expand_more</span>
              </button>
            </div>
            <motion.div
              className="h-64 flex items-end justify-between"
              initial={{ scaleY: 0 }}
              animate={{ scaleY: 1 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              style={{ transformOrigin: "bottom" }}
            >
              <div
                className="w-8 bg-gray-200 dark:bg-gray-700 rounded-t-md"
                style={{ height: "25%" }}
              ></div>
              <div
                className="w-8 bg-gray-200 dark:bg-gray-700 rounded-t-md"
                style={{ height: "50%" }}
              ></div>
              <div
                className="w-8 bg-gray-200 dark:bg-gray-700 rounded-t-md"
                style={{ height: "75%" }}
              ></div>
              <div
                className="w-8 bg-purple-300 dark:bg-purple-700 rounded-t-md"
                style={{ height: "90%" }}
              ></div>
              <div
                className="w-8 bg-primary rounded-t-md"
                style={{ height: "60%" }}
              ></div>
              <div
                className="w-8 bg-gray-200 dark:bg-gray-700 rounded-t-md"
                style={{ height: "40%" }}
              ></div>
              <div
                className="w-8 bg-primary rounded-t-md"
                style={{ height: "55%" }}
              ></div>
              <div
                className="w-8 bg-gray-200 dark:bg-gray-700 rounded-t-md"
                style={{ height: "30%" }}
              ></div>
              <div
                className="w-8 bg-purple-300 dark:bg-purple-700 rounded-t-md"
                style={{ height: "70%" }}
              ></div>
              <div
                className="w-8 bg-primary rounded-t-md"
                style={{ height: "20%" }}
              ></div>
            </motion.div>
          </motion.div>
        </div>

        {/* Right section */}
        <div className="space-y-6">
          <motion.div
            variants={cardVariants}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="p-6 rounded-lg bg-gradient-to-br from-blue-500 to-cyan-400 text-white"
          >
            <div className="flex items-center gap-3">
              <div className="p-3 bg-white/20 rounded-lg">
                <span className="material-icons">account_balance</span>
              </div>
              <div>
                <p className="text-xl font-bold">$203k</p>
                <p className="text-sm text-white/80">Total Income</p>
              </div>
            </div>
          </motion.div>

          <motion.div
            variants={cardVariants}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="p-6 rounded-lg bg-yellow-100 dark:bg-yellow-900/50"
          >
            <div className="flex items-center gap-3">
              <div className="p-3 bg-yellow-400/30 rounded-lg text-yellow-600 dark:text-yellow-400">
                <span className="material-icons">paid</span>
              </div>
              <div>
                <p className="text-xl font-bold text-yellow-800 dark:text-yellow-200">
                  $203k
                </p>
                <p className="text-sm text-yellow-700 dark:text-yellow-400">
                  Total Income
                </p>
              </div>
            </div>
          </motion.div>

          <motion.div
            variants={cardVariants}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="bg-card-light dark:bg-card-dark p-6 rounded-lg"
          >
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-heading-light dark:text-heading-dark">
                Popular Stocks
              </h3>
              <button className="text-text-light dark:text-text-dark">
                <span className="material-icons">more_horiz</span>
              </button>
            </div>
            {/* Stocks Card */}
            <motion.div
              className="bg-purple-50 dark:bg-purple-900/30 p-4 rounded-lg mb-4"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.6 }}
            >
              <div className="flex justify-between items-start">
                <div>
                  <p className="font-semibold text-purple-800 dark:text-purple-200">
                    Bajaj Finery
                  </p>
                  <p className="text-sm text-purple-600 dark:text-purple-400">
                    10% Profit
                  </p>
                </div>
                <p className="font-bold text-purple-800 dark:text-purple-200">
                  $1839.00
                </p>
              </div>
              <div className="h-20 mt-2">
                <svg
                  className="w-full h-full"
                  preserveAspectRatio="none"
                  viewBox="0 0 100 50"
                >
                  <path
                    d="M 0 40 Q 25 10, 50 25 T 100 20"
                    fill="url(#grad)"
                    stroke="#A78BFA"
                    strokeWidth={2}
                  ></path>
                  <defs>
                    <linearGradient id="grad" x1="0%" x2="0%" y1="0%" y2="100%">
                      <stop
                        offset="0%"
                        style={{ stopColor: "#a78bfa", stopOpacity: "0.4" }}
                      ></stop>
                      <stop
                        offset="100%"
                        style={{ stopColor: "#a78bfa", stopOpacity: "0" }}
                      ></stop>
                    </linearGradient>
                  </defs>
                </svg>
              </div>
            </motion.div>

            {/* Other stocks */}
            <div className="space-y-4">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: 0.7 }}
                className="flex justify-between items-center"
              >
                <div>
                  <p className="font-semibold text-heading-light dark:text-heading-dark">
                    Bajaj Finery
                  </p>
                  <p className="text-sm text-text-light dark:text-text-dark">
                    10% Profit
                  </p>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-heading-light dark:text-heading-dark">
                    $1839.00
                  </p>
                  <p className="text-sm text-green-500 flex items-center justify-end">
                    <span className="material-icons text-base">
                      arrow_upward
                    </span>
                    1.5%
                  </p>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: 0.8 }}
                className="flex justify-between items-center"
              >
                <div>
                  <p className="font-semibold text-heading-light dark:text-heading-dark">
                    TTML
                  </p>
                  <p className="text-sm text-text-light dark:text-text-dark">
                    10% Loss
                  </p>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-heading-light dark:text-heading-dark">
                    $100.00
                  </p>
                  <p className="text-sm text-red-500 flex items-center justify-end">
                    <span className="material-icons text-base">
                      arrow_downward
                    </span>
                    2.5%
                  </p>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </main>
  );
};

export default Dashboard;
