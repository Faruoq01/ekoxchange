"use client";

import { useState } from "react";

interface Ticket {
  id: string;
  title: string;
  subtitle: string;
  status: "open" | "closed";
  time: string;
  userName: string;
  userAvatar: string;
  priority: "green" | "yellow" | "red";
}

interface TicketListProps {
  activeTicket: string | null;
  setActiveTicket: (id: string) => void;
}

const tickets: Ticket[] = [
  {
    id: "#TRX-9921",
    title: "Withdrawal Pending Approval",
    subtitle: "I initiated a withdrawal 4 hours ago and it's still stuck...",
    status: "open",
    time: "2m ago",
    userName: "Alice Freeman",
    userAvatar:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuB94bh9DntnNWBZTvYKrtOgLgg3aXnmPg7uagmhB8nPRxuHNn6gILugsm58IM_wWndrIu-_qlhR9uptF145FhES0zOWAUhYPshmLOWT-YCbpSNw2hzqqwww-hLkwCeOD-tutjk4iDNK_rZtK9u54S6aWZhxkRXmgRynQ2kgtZc0hrLCWzoVC-35Ajb8IYvsUPBesIY6WmJYXjORmiapws4LEl0NI-DodANQLDChzv7jyzcNcW1QjfN72QEFt8C2mjYwVzqjZtYanZdf",
    priority: "green",
  },
  {
    id: "#KYC-4402",
    title: "KYC Documents Rejected",
    subtitle: "Why was my passport photo rejected? It was clear.",
    status: "open",
    time: "1h ago",
    userName: "Robert Fox",
    userAvatar:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBJ1boX3nKQKC9jkMwkX4c7eitrEgnomE4VTkXf1wBfTky1WYjaZGTlnmgsi9boaKlBhL8KDxJIR6CP8RJcZaps-6Vu13L4706JasqYfwmVJ6w64Fnn7mRDMdj3VTZ_HPDkHNwBGlnUsqNycE7nBs8SZG-eJNgKz0kKSs26ZnaHG5yw827n4T4Bqd4CcCB9XmhrLB4hbam6AK4TvyQKmukX7rmwICFcdRhxy0bczLr4WNQPLyFp4KafBPAeP7ZnajHepWexyYN44KvF",
    priority: "yellow",
  },
];

const TicketList = ({ activeTicket, setActiveTicket }: TicketListProps) => {
  const [filter, setFilter] = useState<"open" | "closed">("open");

  const filteredTickets = tickets.filter((t) =>
    filter === "open" ? t.status === "open" : t.status === "closed"
  );

  return (
    <div className="w-1/3 flex flex-col bg-white dark:bg-surface-dark rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden">
      <div className="p-4 border-b border-gray-100 dark:border-gray-700">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold dark:text-white">Tickets</h2>
          <button className="text-primary hover:text-purple-700 text-sm font-medium flex items-center gap-1">
            <span className="material-icons-outlined text-sm">add</span> New
            Ticket
          </button>
        </div>
        <div className="flex gap-2 p-1 bg-gray-100 dark:bg-gray-800 rounded-lg">
          <button
            className={`flex-1 py-1.5 px-3 rounded-md text-sm font-medium shadow-sm transition-all ${
              filter === "open"
                ? "bg-white dark:bg-gray-600 text-gray-900 dark:text-white"
                : "text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200"
            }`}
            onClick={() => setFilter("open")}
          >
            Open ({tickets.filter((t) => t.status === "open").length})
          </button>
          <button
            className={`flex-1 py-1.5 px-3 rounded-md text-sm font-medium transition-all ${
              filter === "closed"
                ? "bg-white dark:bg-gray-600 text-gray-900 dark:text-white shadow-sm"
                : "text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200"
            }`}
            onClick={() => setFilter("closed")}
          >
            Closed
          </button>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto no-scrollbar">
        {filteredTickets.map((ticket) => (
          <div
            key={ticket.id}
            className={`p-4 border-b border-gray-100 dark:border-gray-700 cursor-pointer transition-colors ${
              ticket.id === activeTicket
                ? "bg-primary/5 dark:bg-primary/10 border-l-4 border-l-primary"
                : "border-l-4 border-l-transparent hover:bg-gray-50 dark:hover:bg-gray-800"
            }`}
            onClick={() => setActiveTicket(ticket.id)}
          >
            <div className="flex justify-between items-start mb-1">
              <div className="flex items-center gap-2">
                <span
                  className={`text-xs font-semibold ${
                    ticket.priority === "green"
                      ? "text-green-500"
                      : ticket.priority === "yellow"
                      ? "text-yellow-500"
                      : "text-red-500"
                  }`}
                >
                  {ticket.id}
                </span>
                <span
                  className={`w-1.5 h-1.5 rounded-full ${
                    ticket.priority === "green"
                      ? "bg-green-500"
                      : ticket.priority === "yellow"
                      ? "bg-yellow-500"
                      : "bg-red-500"
                  }`}
                ></span>
              </div>
              <span className="text-xs text-gray-400">{ticket.time}</span>
            </div>
            <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-1">
              {ticket.title}
            </h3>
            <p className="text-xs text-gray-500 dark:text-gray-400 line-clamp-1">
              {ticket.subtitle}
            </p>
            <div className="flex items-center gap-2 mt-3">
              <img
                alt={ticket.userName}
                className="w-6 h-6 rounded-full"
                src={ticket.userAvatar}
              />
              <span className="text-xs font-medium text-gray-600 dark:text-gray-300">
                {ticket.userName}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TicketList;
