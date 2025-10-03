"use client";

import { motion } from "framer-motion";

const Header = () => {
  return (
    <motion.header
      initial={{ y: -40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="flex justify-between items-center mb-5 px-[16px] sm:px-[20px] lg:px-[30px]"
    >
      {/* Left Section: Menu + Search */}
      <div className="flex items-center gap-3 sm:gap-4 w-full lg:w-auto">
        {/* Mobile Menu Button */}
        <motion.button
          whileTap={{ scale: 0.9 }}
          className="lg:hidden text-text-light dark:text-text-dark"
        >
          <span className="material-icons">menu</span>
        </motion.button>

        {/* Search Bar */}
        <motion.div
          initial={{ opacity: 0, x: -15 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="relative flex-1 max-w-full sm:max-w-md lg:w-96"
        >
          <span className="material-icons absolute left-3 top-1/2 -translate-y-1/2 text-text-light dark:text-text-dark">
            search
          </span>
          <input
            className="w-full bg-card-light dark:bg-card-dark border-none pl-10 pr-4 py-2 rounded-lg text-text-light dark:text-text-dark focus:ring-2 focus:ring-primary transition"
            placeholder="Search"
            type="text"
          />
        </motion.div>
      </div>

      {/* Right Section: Notifications + Avatar */}
      <motion.div
        initial={{ opacity: 0, x: 15 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.3 }}
        className="flex items-center gap-4 sm:gap-6 ml-4 lg:ml-0"
      >
        {/* Notifications */}
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="text-text-light dark:text-text-dark"
        >
          <span className="material-icons">notifications</span>
        </motion.button>

        {/* Avatar */}
        <motion.div
          whileHover={{ rotate: 3, scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-gradient-to-tr from-yellow-400 to-amber-500 overflow-hidden cursor-pointer"
        >
          <img
            alt="User avatar"
            className="rounded-full w-full h-full object-cover"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuARlUrdzmlIurWPF4fyBiq1V8kLAMMlA7M9mjI6oO_NAhT4prluxHNWRXqRW9TGo6fxIPrnXEs1ziZtugtIf2DWSxf6AcwtduzL77zB5bhJKAsJDNiA5VyQ2cF2YXLm4fz3Op7Ha9-3QoUCNkmBcg0-wVnFL3qgvgjohd2bOnDd4T92P_MeB0MNwBKeWy8PUp4-t9mfUi3AGspgW1EiDBpaubTZcA-ucsottyA7RgpGMIwSZfASHxjvMkRy5ib-4P0tyCPGvPdHtw"
          />
        </motion.div>
      </motion.div>
    </motion.header>
  );
};

export default Header;
