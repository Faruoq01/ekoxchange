"use client";

import { ScrollArea } from "@/components/ui/scroll-area";
import Sidebar from "../components/home/sidebar";
import Header from "../components/home/header";

const HomeLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="h-full w-full flex flex-row bg-gray-200">
      <Sidebar />
      <div className="flex-1 pt-[20px]">
        <Header />
        <ScrollArea className="w-full px-[20px] lg:px-[30px] h-[88vh] mt-[10px]]">
          {children}
        </ScrollArea>
      </div>
    </div>
  );
};

export default HomeLayout;
