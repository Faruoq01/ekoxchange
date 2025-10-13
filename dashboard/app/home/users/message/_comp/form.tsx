"use client";
import { Send } from "lucide-react";
import React from "react";

interface Props {
  subject: string;
  setSubject: (v: string) => void;
  message: string;
  setMessage: (v: string) => void;
  onSubmit: (e: React.FormEvent) => void;
}

export const MessageForm: React.FC<Props> = ({
  subject,
  setSubject,
  message,
  setMessage,
  onSubmit,
}) => {
  return (
    <>
      <div>
        <label className="block text-sm font-medium text-gray-600 dark:text-gray-300 mb-2">
          Subject
        </label>
        <input
          type="text"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
          placeholder="Enter subject"
          className="w-full bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 pl-4 pr-4 py-3 rounded-lg text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-primary focus:border-transparent placeholder:text-gray-500"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-600 dark:text-gray-300 mb-2">
          Message
        </label>
        <textarea
          rows={8}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Write your message here..."
          className="w-full bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 pl-4 pr-4 py-3 rounded-lg text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-primary focus:border-transparent placeholder:text-gray-500"
        />
      </div>

      <div className="flex justify-end gap-4 pt-4 border-t border-gray-200 dark:border-gray-700">
        <button
          type="button"
          className="px-6 py-2.5 rounded-lg text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 font-medium transition-colors"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="bg-primary text-white px-6 py-2.5 rounded-lg hover:bg-primary/90 flex items-center gap-2 font-medium transition-colors"
        >
          <Send className="w-4 h-4" />
          <span>Send</span>
        </button>
      </div>
    </>
  );
};
