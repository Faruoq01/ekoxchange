"use client";

import { useRef, useEffect } from "react";

interface TicketChatProps {
  activeTicket: string | null;
}

const TicketChat = ({ activeTicket }: TicketChatProps) => {
  const chatEndRef = useRef<HTMLDivElement | null>(null);

  // Scroll to bottom whenever activeTicket changes
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [activeTicket]);

  return (
    <div className="w-2/3 flex ml-[10px] flex-col bg-surface-light dark:bg-surface-dark rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden">
      {/* Chat Header */}
      <div className="h-16 px-6 border-b border-gray-100 dark:border-gray-700 flex items-center justify-between shrink-0 bg-white dark:bg-surface-dark z-10">
        <div className="flex items-center gap-3">
          <div className="relative">
            <img
              alt="Active User"
              className="w-10 h-10 rounded-full"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuBWQ1BfZfTCNwRgm-XFaV8Ijx34qHcbEEkJUJ7Dwkqm9MrneqhREKM9BfS_2dKcyIBQ2pDOBe1b4Xx6JhZ0aMV9SaXmo3PgBFd4J3x2HMi4hfeiRYxBKvOjW3D4q0bVlIZKZ7gGueRnmeTQsIKSk_1j1qVbXMVMN9PhClVXfaI_s3YM-3fM8SU-sTDuN522ZUzDjHHqWI-dCao9adErm-1F23hcvhYXmS2tJTZVN2Nh3g_l56yuvw-hsi4wOoSwrAYLc-3AOC68qsde"
            />
            <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white dark:border-gray-800 rounded-full"></span>
          </div>
          <div>
            <h3 className="text-sm font-bold text-gray-900 dark:text-white">
              Alice Freeman
            </h3>
            <div className="flex items-center gap-2">
              <span className="text-xs text-gray-500 dark:text-gray-400">
                Ticket {activeTicket}
              </span>
              <span className="w-1 h-1 rounded-full bg-gray-300 dark:bg-gray-600"></span>
              <span className="text-xs text-primary font-medium">
                Withdrawal Issue
              </span>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors">
            <span className="material-icons-outlined">search</span>
          </button>
          <button className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors">
            <span className="material-icons-outlined">more_vert</span>
          </button>
          <button className="ml-2 px-4 py-2 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-200 text-xs font-semibold rounded-lg transition-colors">
            Close Ticket
          </button>
        </div>
      </div>

      {/* Chat Messages */}
      <div className="flex-1 overflow-y-auto p-6 space-y-6 bg-gray-50/50 dark:bg-gray-900/50">
        {/* Example Chat Bubbles */}
        <div className="flex justify-center">
          <span className="text-xs font-medium text-gray-400 bg-gray-100 dark:bg-gray-800 px-3 py-1 rounded-full">
            Today, Oct 24
          </span>
        </div>

        <div className="flex items-end gap-3">
          <img
            alt="Alice"
            className="w-8 h-8 rounded-full mb-1"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuBGVFEuFshaJmYjwGYvtjgrjAk668RL_y45yZvcuGerqPr8BVy4jmp_EZIrVRKsuSJZ59bF2xDVMNyQ5p96dAMRcdjQA-FUnQHePb5KVZutPkek54n9fEk6v8GSL5xvektaQrp57eVYmDKBUo405yZG63j8Bi6VjVBVF3atLgic370RpNVJS69OsE5LriWjTkBCLseA1AXdVji_PVzpyYdQQEUgb-akZLNgtiSyrALYP-PgDDoBjlj6AaNzPecFQFDqcJLK74KQhe47"
          />
          <div className="flex flex-col gap-1 max-w-[70%]">
            <div className="bg-white dark:bg-gray-800 p-4 rounded-2xl rounded-bl-none shadow-sm border border-gray-100 dark:border-gray-700 text-sm text-gray-800 dark:text-gray-200">
              Hi support, I initiated a withdrawal of 0.5 BTC about 4 hours ago.
              It's still processing.
            </div>
            <span className="text-[10px] text-gray-400 ml-1">10:23 AM</span>
          </div>
        </div>

        {/* Dummy div to scroll to bottom */}
        <div ref={chatEndRef}></div>
      </div>

      {/* Chat Input */}
      <div className="p-4 bg-white dark:bg-surface-dark border-t border-gray-100 dark:border-gray-700">
        <div className="relative flex items-center gap-2 bg-gray-50 dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-600 p-2 focus-within:ring-2 focus-within:ring-primary/20 focus-within:border-primary transition-all">
          <button className="p-2 mt-[7px] text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors shrink-0">
            <span className="material-icons-outlined">attach_file</span>
          </button>
          <textarea
            className="w-full bg-transparent border-none text-[12px] text-gray-800 dark:text-white placeholder-gray-400 focus:ring-0 resize-none py-2.5 max-h-32"
            placeholder="Type your reply..."
            rows={1}
          ></textarea>
          <div className="flex flex-row items-center gap-2 shrink-0 pb-1">
            <button className="text-gray-400 mt-[7px] hover:text-gray-600 dark:hover:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors">
              <span className="material-icons-outlined">
                sentiment_satisfied_alt
              </span>
            </button>
            <button className="px-[10px] py-[5px] text-[12px] bg-primary hover:bg-purple-700 text-white rounded-[5px] shadow-sm transition-colors flex items-center justify-center">
              Send
            </button>
          </div>
        </div>
        <div className="flex justify-between items-center mt-2 px-1">
          <span className="text-xs text-gray-400">
            Enter to send, Shift + Enter for new line
          </span>
          <div className="flex gap-2">
            <button className="text-xs font-medium text-gray-500 hover:text-primary transition-colors">
              Saved Replies
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TicketChat;
