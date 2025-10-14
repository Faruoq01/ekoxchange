"use client";

import React from "react";

interface Props {
  subject: string;
  setSubject: (v: string, validate?: boolean) => void;
  message: string;
  setMessage: (v: string, validate?: boolean) => void;
  errors?: {
    subject?: string;
    message?: string;
  };
}

export default function MessageForm({
  subject,
  setSubject,
  message,
  setMessage,
  errors = {},
}: Props) {
  return (
    <>
      {/* Subject Field */}
      <div>
        <label className="block text-sm font-medium text-gray-600 dark:text-gray-300 mb-2">
          Subject
        </label>
        <input
          type="text"
          value={subject}
          onChange={(e) => setSubject(e.target.value, true)}
          placeholder="Enter subject"
          className={`w-full bg-gray-50 dark:bg-gray-800 border ${
            errors.subject
              ? "border-red-500 focus:ring-red-500"
              : "border-gray-200 dark:border-gray-700 focus:ring-primary"
          } pl-4 pr-4 py-3 rounded-lg text-gray-900 dark:text-gray-100 focus:ring-2 focus:border-transparent placeholder:text-gray-500`}
        />
        {errors.subject && (
          <p className="mt-1 text-sm text-red-500">{errors.subject}</p>
        )}
      </div>

      {/* Message Field */}
      <div>
        <label className="block text-sm font-medium text-gray-600 dark:text-gray-300 mb-2">
          Message
        </label>
        <textarea
          rows={8}
          value={message}
          onChange={(e) => setMessage(e.target.value, true)}
          placeholder="Write your message here..."
          className={`w-full bg-gray-50 dark:bg-gray-800 border ${
            errors.message
              ? "border-red-500 focus:ring-red-500"
              : "border-gray-200 dark:border-gray-700 focus:ring-primary"
          } pl-4 pr-4 py-3 rounded-lg text-gray-900 dark:text-gray-100 focus:ring-2 focus:border-transparent placeholder:text-gray-500`}
        />
        {errors.message && (
          <p className="mt-1 text-sm text-red-500">{errors.message}</p>
        )}
      </div>
    </>
  );
}
