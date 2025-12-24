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
import { SocketService } from "./hooks/useSocket";
import useChatSocketListeners from "./hooks/useChatListeners";

const HomeLayout = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const socketService = SocketService.getInstance();
  useChatSocketListeners();
  const user = useAppSelector((state) => state.auth.user);
  const isLoggedIn = useAppSelector((state) => state.auth.isLoggedIn);

  const getAuthUser = useCallback(async () => {
    const { error, payload } = await AuthService.getAuthUser();
    if (!error && payload) {
      dispatch(setUser(payload));
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
    const s = socketService.connect();
    return () => {
      s?.disconnect();
    };
  }, [isLoggedIn]);

  return (
    <div className="h-full w-full flex flex-row bg-gray-200">
      <Sidebar />
      <div className="flex-1 pt-[20px] flex flex-col items-center">
        <div className="w-full h-full max-w-[1800px]">
          <Header />
          <ScrollArea className="w-full px-[20px] lg:px-[30px] h-[88vh] mt-[10px]">
            {children}
          </ScrollArea>
        </div>
      </div>
    </div>
  );
};

export default HomeLayout;
