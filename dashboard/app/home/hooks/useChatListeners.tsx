"use client";
import { useEffect, useState } from "react";
import { SocketService } from "./useSocket";
import { useAppDispatch } from "@/app/lib/redux/controls";
import { setOnlineUsers } from "@/app/lib/redux/slices/support";

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

    socket.on("online", handleOnline);

    return () => {
      socket.off("online", handleOnline);
    };
  }, [socket?.connected]);
}
