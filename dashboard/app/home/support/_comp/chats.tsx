"use client";
import Image from "next/image";
import { useAppSelector } from "@/app/lib/redux/controls";
import { useEffect, useRef, useState } from "react";
import clsx from "clsx";
import { SocketService } from "../../hooks/useSocket";
import toast from "react-hot-toast";
import { error } from "console";

interface TicketChatProps {
  activeTicket: string | null;
}

const TicketChat = ({ activeTicket }: TicketChatProps) => {
  const chatEndRef = useRef<HTMLDivElement | null>(null);
  const [chatText, setChatText] = useState("");
  const selectedTicket = useAppSelector((state) => state.support.singleTicket);
  const messages = useAppSelector((state) => state.support.messages);
  console.log(messages, "messages ====>");
  const loading = useAppSelector((state) => state.support.loading);
  const socketService = SocketService.getInstance().getSocket();

  const online = useAppSelector((state) => state.support.online);
  const authUser = useAppSelector((state) => state.auth.user);

  const isUserOnline = online?.includes(selectedTicket?.userId ?? "");

  /* 🔽 Auto-scroll to bottom */
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [activeTicket, messages?.length]);

  const handleChat = () => {
    if (!chatText.trim()) return toast.error("Please type the message");
    if (!selectedTicket?.userId || !selectedTicket?._id)
      return toast.error("no selected user");

    const payload = {
      to: selectedTicket.userId,
      text: chatText.trim(),
      ticketId: selectedTicket._id,
    };

    socketService?.emit("message", payload);
    setChatText("");
  };

  return (
    <div className="w-2/3 flex ml-[15px] flex-col bg-surface-light dark:bg-surface-dark rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden">
      {/* ================= HEADER ================= */}
      <div className="h-16 px-6 border-b border-gray-100 dark:border-gray-700 flex items-center justify-between shrink-0 bg-white dark:bg-surface-dark">
        <div className="flex items-center gap-3">
          <div className="relative">
            <Image
              src={
                selectedTicket?.avatar ?? `https://picsum.photos/200/200?${2}`
              }
              width={36}
              height={36}
              alt="avatar"
              className="rounded-full"
            />
            <span
              className={clsx(
                "absolute bottom-0 right-0 w-3 h-3 border-2 rounded-full",
                isUserOnline
                  ? "bg-green-500 border-white"
                  : "bg-gray-400 border-white"
              )}
            />
          </div>

          <div>
            <h3 className="text-sm font-bold text-gray-900 dark:text-white">
              {selectedTicket?.fullname}
            </h3>
            <span className="text-xs text-gray-500">
              {isUserOnline ? "Online" : "Offline"}
            </span>
          </div>
        </div>

        <button className="ml-2 px-4 py-2 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-200 text-xs font-semibold rounded-lg">
          Close Ticket
        </button>
      </div>

      {/* ================= MESSAGES ================= */}
      <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-gray-50/50 dark:bg-gray-900/50">
        {/* 🔹 Skeleton Loader */}
        {loading && (
          <>
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex gap-3 animate-pulse">
                <div className="w-8 h-8 bg-gray-300 rounded-full" />
                <div className="flex-1 space-y-2">
                  <div className="h-4 bg-gray-300 rounded w-1/3" />
                  <div className="h-4 bg-gray-200 rounded w-2/3" />
                </div>
              </div>
            ))}
          </>
        )}

        {/* 🔹 Empty Placeholder */}
        {!loading && messages?.length === 0 && (
          <div className="h-full flex flex-col items-center justify-center text-center">
            <div className="text-4xl mb-3">💬</div>
            <h4 className="font-semibold text-gray-700 dark:text-gray-200">
              No messages yet
            </h4>
            <p className="text-sm text-gray-400 max-w-xs">
              Start the conversation and help the user resolve their issue.
            </p>
          </div>
        )}

        {/* 🔹 Chat Messages */}
        {messages?.map((msg, index) => {
          const isMine = msg.from === authUser?._id?.toString();

          return (
            <div
              key={msg._id}
              className={clsx(
                "flex items-end",
                isMine ? "justify-end" : "justify-start"
              )}
            >
              <Image
                src={`https://picsum.photos/200/200?${index + 2}`}
                width={25}
                height={25}
                alt="icon"
                className="rounded-full"
              />

              <div className="flex flex-col gap-1 max-w-[70%]">
                <div
                  className={clsx(
                    "p-4 rounded-2xl shadow-sm border text-sm",
                    isMine
                      ? "bg-primary text-white rounded-br-none"
                      : "bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 rounded-bl-none"
                  )}
                >
                  {msg.text}
                </div>
                <span className="text-[10px] text-gray-400 ml-1">
                  {new Date(msg.createdAt).toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </span>
              </div>
            </div>
          );
        })}

        <div ref={chatEndRef} />
      </div>

      {/* ================= INPUT (UI UNCHANGED) ================= */}
      <div className="p-4 bg-white dark:bg-surface-dark border-t border-gray-100 dark:border-gray-700">
        <div className="relative flex items-center gap-2 bg-gray-50 dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-600 p-2">
          <textarea
            value={chatText}
            className="w-full bg-transparent border-none text-[12px] text-gray-800 dark:text-white placeholder-gray-400 focus:ring-0 resize-none py-2.5 max-h-32"
            placeholder="Type your reply..."
            rows={1}
            onChange={(e) => setChatText(e.target.value)}
          />
          <button
            onClick={handleChat}
            className="px-[10px] py-[5px] text-[12px] bg-primary hover:bg-purple-700 text-white rounded-[5px]"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default TicketChat;
