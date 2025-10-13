"use client";
import { useState } from "react";
import { User, useUsers } from "./_comp/hooks";
import { UserTypeSelector } from "./_comp/usertype";
import { RecipientSelector } from "./_comp/recipient";
import { MessageForm } from "./_comp/form";

export default function SendMessagePage() {
  const { adminUsers, walletUsers, loadUsers, loading, hasMore } = useUsers();
  const [userType, setUserType] = useState<"admin" | "wallet">("admin");
  const [selectedUsers, setSelectedUsers] = useState<User[]>([]);
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log({ userType, selectedUsers, subject, message });
  };

  return (
    <main className="flex-1 overflow-y-auto mt-[20px] mb-[50px]">
      <div className="bg-white dark:bg-gray-900 rounded-xl shadow-lg w-full p-6 mx-auto transition-all">
        <form onSubmit={handleSubmit} className="space-y-6">
          <UserTypeSelector userType={userType} setUserType={setUserType} />
          <RecipientSelector
            userType={userType}
            adminUsers={adminUsers}
            walletUsers={walletUsers}
            selectedUsers={selectedUsers}
            setSelectedUsers={setSelectedUsers}
            loadUsers={loadUsers}
            loading={loading}
            hasMore={hasMore}
          />
          <MessageForm
            subject={subject}
            setSubject={setSubject}
            message={message}
            setMessage={setMessage}
            onSubmit={handleSubmit}
          />
        </form>
      </div>
    </main>
  );
}
