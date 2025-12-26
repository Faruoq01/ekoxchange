"use client";
import { useEffect, useState } from "react";
import { SocketService } from "./useSocket";
import { useAppDispatch } from "@/app/lib/redux/controls";
import {
  setMessageLoading,
  setMessages,
  setOnlineUsers,
} from "@/app/lib/redux/slices/support";

export default function useChatSocketListeners() {
  const socketService = SocketService.getInstance();
  const socket = socketService.getSocket();
  const dispatch = useAppDispatch();

  // 🔥 Add this small state to trigger re-render
  const [, forceRerender] = useState(0);

  // 🔥 Add the socket-ready listener HERE
  useEffect(() => {
    const refresh = () => forceRerender(Date.now());

    window.addEventListener("socket-ready", refresh);
    return () => window.removeEventListener("socket-ready", refresh);
  }, []);

  // 🔥 Your socket listeners should run AFTER socket is ready
  useEffect(() => {
    if (!socket) return;
    if (!socket.connected) return;

    const handleOnline = (userIds: string[]) => {
      dispatch(setOnlineUsers(userIds));
    };

    const handleMessaging = (msg: any) => {
      console.log(msg, "msg ======>");
    };

    const handleInitialFetch = (msg: any) => {
      dispatch(setMessages(msg));
      dispatch(setMessageLoading(false));
    };

    socket.on("online", handleOnline);
    socket.on("message", handleMessaging);
    socket.on("list", handleInitialFetch);

    return () => {
      socket.off("online", handleOnline);
      socket.off("message", handleMessaging);
      socket.off("list", handleInitialFetch);
    };
  }, [socket?.connected]);
}
