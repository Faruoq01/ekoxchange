"use client";
import Image from "next/image";
import { AppPages } from "@/app/assets/appages";
import clsx from "clsx";
import { usePathname, useRouter } from "next/navigation";
import { AppImages } from "@/app/assets/appimages";

const NavItem = ({ label, icon, link }: any) => {
  const router = useRouter();
  const path = usePathname();

  const goToPage = () => {
    router.push(link);
  };

  return (
    <div
      onClick={goToPage}
      className={clsx(
        "flex items-center gap-3 px-3 py-2.5 rounded-lg transition text-sm select-none mb-[8px] cursor-pointer",
        path === link
          ? "bg-primary/10 text-primary"
          : "text-text-light dark:text-text-dark hover:bg-primary/10 hover:text-primary"
      )}
    >
      <span className="material-icons text-[12px] leading-none">{icon}</span>
      <span>{label}</span>
    </div>
  );
};

const Sidebar = () => {
  return (
    <aside className="w-64 bg-card-light dark:bg-card-dark p-6 hidden lg:flex flex-col justify-between">
      <div>
        {/* Logo / Branding */}
        <div className="flex items-center gap-2 mb-10">
          <div className="relative w-[110px] h-[45px]">
            <Image fill src={AppImages.logo} alt="icon" />
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex flex-col">
          {navItems.map((item) => (
            <NavItem key={item.label} {...item} />
          ))}
        </nav>
      </div>
    </aside>
  );
};

const navItems = [
  {
    label: "Dashboard",
    icon: "dashboard",
    link: AppPages.home.dashboard,
  },
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
