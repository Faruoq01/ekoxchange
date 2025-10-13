"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import RecipientSelector from "./_comp/recipient";
import MessageForm from "./_comp/form";
import Actions from "./_comp/actions";
import UserTypeSelector from "./_comp/usertype";

export default function SendMessagePage() {
  const router = useRouter();

  const [userType, setUserType] = useState<"admin" | "wallet">("admin");
  const [selectedUsers, setSelectedUsers] = useState<any[]>([]);
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log({ userType, selectedUsers, subject, message });
  };

  return (
    <main className="flex-1 overflow-y-auto mt-[20px] mb-[50px]">
      <div className="bg-white dark:bg-gray-900 rounded-xl shadow-lg w-full p-6 mx-auto transition-all">
        {/* Header with Back Button */}
        <div className="flex items-center justify-between mb-4">
          <button
            type="button"
            onClick={() => router.back()}
            className="flex items-center gap-2 text-gray-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors px-3 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800"
          >
            <ArrowLeft className="w-5 h-5" />
            <span className="font-medium text-sm">Back</span>
          </button>
          <div className="w-[65px]" /> {/* spacer for symmetry */}
        </div>

        {/* Message Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          <UserTypeSelector userType={userType} setUserType={setUserType} />

          <RecipientSelector
            userType={userType}
            selectedUsers={selectedUsers}
            setSelectedUsers={setSelectedUsers}
          />

          <MessageForm
            subject={subject}
            setSubject={setSubject}
            message={message}
            setMessage={setMessage}
          />

          <Actions />
        </form>
      </div>
    </main>
  );
}
