"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { useSelector } from "react-redux";
import UserTypeSelector from "./_comp/usertype";
import RecipientSelector from "./_comp/recipient";
import MessageForm from "./_comp/form";
import Actions from "./_comp/actions";

export default function SendMessagePage() {
  const router = useRouter();

  const [userType, setUserType] = useState<"admin" | "wallet">("admin");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [selectedUsers, setSelectedUsers] = useState<any[]>([]);

  // ✅ Redux preselected users
  const { singleAdminUser, singleWalletUser } = useSelector(
    (state: any) => state.users
  );

  // ✅ Helper for fallback avatar
  const normalizeAvatar = (avatar: string | null | undefined, sig: number) => {
    if (
      !avatar ||
      avatar.trim() === "" ||
      avatar === "null" ||
      avatar === "undefined"
    ) {
      return `https://source.unsplash.com/random/200x200?face&sig=${sig}`;
    }
    return avatar;
  };

  // ✅ Preselect user from Redux when page loads
  useEffect(() => {
    if (singleAdminUser?._id) {
      setSelectedUsers([
        {
          id: singleAdminUser._id,
          name:
            `${singleAdminUser.firstname ?? ""} ${
              singleAdminUser.lastname ?? ""
            }`.trim() || "Unnamed Admin",
          username:
            singleAdminUser.email ||
            singleAdminUser.phone ||
            singleAdminUser._id,
          avatar: normalizeAvatar(singleAdminUser.avatar, 0),
          type: "admin" as const,
        },
      ]);
      setUserType("admin");
    } else if (singleWalletUser?._id) {
      setSelectedUsers([
        {
          id: singleWalletUser._id,
          name:
            `${singleWalletUser.firstname ?? ""} ${
              singleWalletUser.lastname ?? ""
            }`.trim() || "Unnamed Wallet User",
          username:
            singleWalletUser.email ||
            singleWalletUser.phone ||
            singleWalletUser._id,
          avatar: normalizeAvatar(singleWalletUser.avatar, 0),
          type: "wallet" as const,
        },
      ]);
      setUserType("wallet");
    }
  }, [singleAdminUser, singleWalletUser]);

  // ✅ Handle message submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log({ userType, selectedUsers, subject, message });
  };

  return (
    <main className="flex-1 overflow-y-auto mt-[20px] mb-[50px]">
      <div className="bg-white dark:bg-gray-900 rounded-xl shadow-lg w-full p-6 mx-auto transition-all">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <button
            type="button"
            onClick={() => router.back()}
            className="flex items-center gap-2 text-gray-700 dark:text-gray-300 hover:text-primary transition-colors px-3 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800"
          >
            <ArrowLeft className="w-5 h-5" />
            <span className="font-medium text-sm">Back</span>
          </button>
          <div className="w-[65px]" />
        </div>

        {/* Main Form */}
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
