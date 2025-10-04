"use client";
import { useState } from "react";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import { motion, AnimatePresence } from "framer-motion";
import { AuthService } from "@/app/lib/services/auth";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { AppPages } from "@/app/assets/appages";
import Cookies from "js-cookie";

const LogoutPopover = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleLogout = async () => {
    try {
      setLoading(true);

      const { error, payload } = await AuthService.logout();
      if (!error && payload) {
        toast.success("Logged out successfully!");
        Cookies.remove("loda-payment-auth-status");
        router.push(AppPages.auth.login);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Popover>
      <PopoverTrigger>
        <motion.div
          whileHover={!loading ? { rotate: 3, scale: 1.05 } : {}}
          whileTap={!loading ? { scale: 0.95 } : {}}
          className="relative w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-gradient-to-tr from-yellow-400 to-amber-500 overflow-hidden cursor-pointer flex flex-row items-center justify-center"
        >
          {/* User Avatar */}
          <img
            alt="User avatar"
            className={`rounded-full w-full h-full object-cover transition-opacity duration-300 ${
              loading ? "opacity-30" : "opacity-100"
            }`}
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuARlUrdzmlIurWPF4fyBiq1V8kLAMMlA7M9mjI6oO_NAhT4prluxHNWRXqRW9TGo6fxIPrnXEs1ziZtugtIf2DWSxf6AcwtduzL77zB5bhJKAsJDNiA5VyQ2cF2YXLm4fz3Op7Ha9-3QoUCNkmBcg0-wVnFL3qgvgjohd2bOnDd4T92P_MeB0MNwBKeWy8PUp4-t9mfUi3AGspgW1EiDBpaubTZcA-ucsottyA7RgpGMIwSZfASHxjvMkRy5ib-4P0tyCPGvPdHtw"
          />

          {/* Loading Ring Animation */}
          <AnimatePresence>
            {loading && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1, rotate: 360 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{
                  duration: 1.2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="absolute inset-0 flex items-center justify-center"
              >
                <div className="w-6 h-6 border-2 border-t-transparent border-white rounded-full" />
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </PopoverTrigger>

      <PopoverContent className="w-[200px] flex justify-center">
        <motion.button
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.95 }}
          disabled={loading}
          onClick={handleLogout}
          className="w-full py-2 rounded-md text-center text-sm font-medium bg-purple-500 text-white hover:bg-purple-600 disabled:opacity-60 transition"
        >
          {loading ? "Logging out..." : "Logout"}
        </motion.button>
      </PopoverContent>
    </Popover>
  );
};

export default LogoutPopover;
