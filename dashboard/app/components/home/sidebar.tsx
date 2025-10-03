"use client";
import Image from "next/image";
import { AppPages } from "@/app/assets/appages";
import clsx from "clsx";
import { usePathname, useRouter } from "next/navigation";
import { AppImages } from "@/app/assets/appimages";
import { motion } from "framer-motion";

const NavItem = ({ label, icon, link }: any) => {
  const router = useRouter();
  const path = usePathname();

  const goToPage = () => {
    router.push(link);
  };

  return (
    <motion.div
      onClick={goToPage}
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.98 }}
      className={clsx(
        "flex items-center gap-3 px-3 py-2.5 rounded-lg transition text-sm select-none mb-[8px] cursor-pointer",
        path === link
          ? "bg-primary/10 text-primary"
          : "text-text-light dark:text-text-dark hover:bg-primary/10 hover:text-primary"
      )}
    >
      <span className="material-icons text-[14px] leading-none">{icon}</span>
      <span>{label}</span>
    </motion.div>
  );
};

const Sidebar = () => {
  return (
    <motion.aside
      initial={{ x: -250, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="w-64 bg-card-light dark:bg-card-dark p-6 hidden lg:flex flex-col justify-between"
    >
      <div>
        {/* Logo / Branding */}
        <motion.div
          initial={{ opacity: 0, y: -15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.4 }}
          className="flex items-center gap-2 mb-10"
        >
          <div className="relative w-[110px] h-[45px]">
            <Image fill src={AppImages.logo} alt="icon" />
          </div>
        </motion.div>

        {/* Navigation */}
        <nav className="flex flex-col">
          {navItems.map((item, index) => (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 * index + 0.3, duration: 0.3 }}
            >
              <NavItem {...item} />
            </motion.div>
          ))}
        </nav>
      </div>
    </motion.aside>
  );
};

const navItems = [
  { label: "Dashboard", icon: "dashboard", link: AppPages.home.dashboard },
  { label: "Users", icon: "people", link: AppPages.home.users },
  { label: "Crypto", icon: "currency_bitcoin", link: AppPages.home.crypto },
  {
    label: "Transactions",
    icon: "receipt_long",
    link: AppPages.home.transactions,
  },
  { label: "Analytics", icon: "analytics", link: AppPages.home.analytics },
  { label: "Support", icon: "support_agent", link: AppPages.home.support },
  { label: "Roles", icon: "admin_panel_settings", link: AppPages.home.roles },
  { label: "Gift Card", icon: "card_giftcard", link: AppPages.home.giftcards },
  { label: "Referrals", icon: "group_add", link: AppPages.home.referrals },
  { label: "Settings", icon: "settings", link: AppPages.home.settings },
];

export default Sidebar;
