"use client";
import Image from "next/image";
import { useAppDispatch, useAppSelector } from "@/app/lib/redux/controls";
import { SupportService } from "@/app/lib/services/support";
import { useCallback, useEffect, useState } from "react";
import {
  setMessageLoading,
  setSelectedTicket,
} from "@/app/lib/redux/slices/support";
import { SocketService } from "../../hooks/useSocket";

type TicketStatus = "open" | "closed";

interface IUser {
  _id: string | undefined;
  firstname: string;
  lastname: string;
  avatar: null | string;
}

interface ApiTicket {
  _id: string;
  id: string;
  ticketId: string;
  title: string;
  description: string;
  status: TicketStatus;
  createdAt: string;
  createdBy?: IUser;
}

interface Ticket {
  _id: string;
  displayId: string;
  title: string;
  subtitle: string;
  status: TicketStatus;
  fullname: string;
  userId: string | undefined;
  avatar: null | string | undefined;
  time: string;
  ticketId: string;
}

interface TicketListProps {
  activeTicket: string | null;
  setActiveTicket: (id: string) => void;
}

const TicketList = ({ activeTicket, setActiveTicket }: TicketListProps) => {
  const dispatch = useAppDispatch();
  const [skip] = useState(0);
  const [limit] = useState(30);
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [filter, setFilter] = useState<TicketStatus>("open");
  const [loading, setLoading] = useState(false);
  const socketService = SocketService.getInstance().getSocket();
  const [counts, setCounts] = useState<{ open: number; closed: number }>({
    open: 0,
    closed: 0,
  });
  const online = useAppSelector((state) => state.support.online);

  const isOnline = (id: string) => {
    if (Array.isArray(online)) return online.includes(id);
    if (typeof online === "object" && online !== null) return !!online[id];
    return false;
  };

  const mapApiTicket = (ticket: ApiTicket): Ticket => ({
    _id: ticket._id,
    displayId: ticket.ticketId,
    title: ticket.title,
    subtitle: ticket.description,
    status: ticket.status,
    ticketId: ticket?.ticketId,
    userId: ticket?.createdBy?._id,
    avatar: ticket?.createdBy?.avatar,
    fullname: ticket?.createdBy?.firstname + " " + ticket?.createdBy?.lastname,
    time: new Date(ticket.createdAt).toLocaleString(),
  });

  const getTicketList = useCallback(async () => {
    setLoading(true);

    const { error, payload } = await SupportService.getAllTickets(
      skip,
      limit,
      filter
    );

    if (!error && payload) {
      setTickets(payload.tickets.map(mapApiTicket));

      setCounts({
        open: payload.openCount ?? payload.counts?.open ?? payload.counts ?? 0,
        closed: payload.closedCount ?? payload.counts?.closed ?? 0,
      });
    }

    setLoading(false);
  }, [skip, limit, filter]);

  useEffect(() => {
    getTicketList();
  }, [getTicketList]);

  useEffect(() => {
    if (tickets.length === 0) return;

    let ticketToSelect = tickets.find((t) => t.ticketId === activeTicket);
    if (!ticketToSelect) {
      ticketToSelect = tickets[0];
      setActiveTicket(ticketToSelect.ticketId);
    }

    dispatch(setSelectedTicket(ticketToSelect));
    dispatch(setMessageLoading(true));

    socketService?.emit("list", {
      toUserId: ticketToSelect.userId,
      ticketId: ticketToSelect._id,
    });
  }, [activeTicket, tickets, dispatch, socketService]);

  return (
    <div className="w-1/3 flex flex-col bg-white dark:bg-surface-dark rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden">
      {/* Header */}
      <div className="p-4 border-b border-gray-100 dark:border-gray-700">
        <h2 className="text-md font-semibold dark:text-white mb-4">Tickets</h2>

        <div className="flex gap-2 p-1 bg-gray-100 dark:bg-gray-800 rounded-lg">
          <button
            className={`flex-1 py-1.5 px-3 rounded-md text-sm font-medium transition-all ${
              filter === "open"
                ? "bg-white dark:bg-gray-600 text-gray-900 dark:text-white"
                : "text-gray-500"
            }`}
            onClick={() => setFilter("open")}
          >
            Open ({counts.open})
          </button>

          <button
            className={`flex-1 py-1.5 px-3 rounded-md text-sm font-medium transition-all ${
              filter === "closed"
                ? "bg-white dark:bg-gray-600 text-gray-900 dark:text-white"
                : "text-gray-500"
            }`}
            onClick={() => setFilter("closed")}
          >
            Closed ({counts.closed})
          </button>
        </div>
      </div>

      {/* Ticket List */}
      <div className="flex-1 overflow-y-auto no-scrollbar">
        {loading && (
          <div className="flex flex-1 items-center justify-center min-h-[400px]">
            <div className="w-64">
              <div className="relative h-2 w-full overflow-hidden rounded-full bg-gray-200 dark:bg-gray-700">
                <div className="absolute inset-0 animate-loading-bar bg-gradient-to-r from-primary via-purple-500 to-primary" />
              </div>
              <p className="mt-3 text-center text-xs text-gray-500 dark:text-gray-400">
                Fetching tickets…
              </p>
            </div>
          </div>
        )}

        {!loading && tickets.length === 0 && (
          <div className="flex flex-1 items-center justify-center min-h-[250px]">
            <div className="text-center max-w-xs">
              <EmptyTicketsIllustration />
              <h3 className="text-sm font-semibold text-gray-800 dark:text-white">
                No tickets here
              </h3>
              <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                You’re all caught up. New support requests will appear here.
              </p>
            </div>
          </div>
        )}

        {tickets.map((ticket, index) => (
          <div
            key={ticket._id}
            onClick={() => setActiveTicket(ticket?.ticketId)}
            className={`p-4 border-b border-gray-100 dark:border-gray-700 cursor-pointer transition-colors ${
              ticket?.ticketId === activeTicket
                ? "bg-primary/5 dark:bg-primary/10 border-l-4 border-l-primary"
                : "border-l-4 border-l-transparent hover:bg-gray-50 dark:hover:bg-gray-800"
            }`}
          >
            <div className="flex justify-between items-start mb-1">
              <div className="flex items-center gap-2">
                <span className="text-xs font-semibold text-primary">
                  # {ticket.displayId}
                </span>

                <span
                  className={`w-2 h-2 rounded-full ${
                    isOnline(ticket._id) ? "bg-green-500" : "bg-gray-400"
                  }`}
                />
              </div>

              <span className="text-xs text-gray-400">{ticket.time}</span>
            </div>

            <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-1">
              {ticket.title}
            </h3>

            <p className="text-xs text-gray-500 dark:text-gray-400 line-clamp-1">
              {ticket.subtitle}
            </p>

            <div className="mt-[10px] flex flex-row items-center space-x-[10px]">
              <Image
                src={`https://picsum.photos/200/200?${index + 2}`}
                width={25}
                height={25}
                alt="icon"
                className="rounded-full"
              />
              <span className="select-none text-[12px] text-gray-500 font-[600]">
                {ticket?.fullname}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const EmptyTicketsIllustration = () => (
  <svg
    width="140"
    height="120"
    viewBox="0 0 180 140"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className="mx-auto"
  >
    <rect
      x="20"
      y="30"
      width="140"
      height="80"
      rx="12"
      className="fill-gray-100 dark:fill-gray-800"
    />
    <rect
      x="35"
      y="45"
      width="70"
      height="8"
      rx="4"
      className="fill-gray-300 dark:fill-gray-600"
    />
    <rect
      x="35"
      y="60"
      width="100"
      height="8"
      rx="4"
      className="fill-gray-300 dark:fill-gray-600"
    />
    <circle cx="130" cy="60" r="6" className="fill-primary" />
    <path
      d="M60 110c15 10 45 10 60 0"
      stroke="currentColor"
      strokeWidth="2"
      className="text-gray-400"
      strokeLinecap="round"
    />
  </svg>
);

export default TicketList;
