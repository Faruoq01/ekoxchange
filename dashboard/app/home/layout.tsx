"use client";
import { ScrollArea } from "@/components/ui/scroll-area";
import Sidebar from "../components/home/sidebar";
import Header from "../components/home/header";
import { useRouter } from "next/navigation";
import { useAppDispatch, useAppSelector } from "../lib/redux/controls";
import { useCallback, useEffect } from "react";
import { AuthService } from "../lib/services/auth";
import { setUser } from "../lib/redux/slices";
import { AppPages } from "../assets/appages";

const HomeLayout = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.auth.user);
  const isLoggedIn = useAppSelector((state) => state.auth.isLoggedIn);

  const getAuthUser = useCallback(async () => {
    const { error, payload } = await AuthService.getAuthUser();
    if (!error && payload) {
      dispatch(setUser(payload.data));
    }
  }, []);

  useEffect(() => {
    if (Object.values(user).length === 0) {
      getAuthUser();
    }
  }, [getAuthUser]);

  useEffect(() => {
    if (!isLoggedIn) {
      router.push(AppPages.auth.login);
    }
  }, [isLoggedIn]);

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
