"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import UserTypeSelector from "./_comp/usertype";
import RecipientSelector from "./_comp/recipient";
import MessageForm from "./_comp/form";
import Actions from "./_comp/actions";

// ✅ Validation schema
const messageSchema = z.object({
  subject: z
    .string()
    .min(3, "Subject must be at least 3 characters")
    .max(100, "Subject cannot exceed 100 characters"),
  message: z
    .string()
    .min(10, "Message must be at least 10 characters")
    .max(2000, "Message too long"),
  userType: z.enum(["admin", "wallet"]),
  selectedUsers: z
    .array(
      z.object({
        id: z.string(),
        name: z.string(),
        username: z.string(),
        avatar: z.string().optional(),
        type: z.enum(["admin", "wallet"]),
      })
    )
    .min(1, "Please select at least one recipient"),
});

type MessageFormValues = z.infer<typeof messageSchema>;

export default function SendMessagePage() {
  const router = useRouter();
  const { singleAdminUser, singleWalletUser } = useSelector(
    (state: any) => state.users
  );

  const [selectedUsers, setSelectedUsers] = useState<any[]>([]);
  const [userType, setUserType] = useState<"admin" | "wallet">("admin");

  // ✅ useForm with validation onChange
  const {
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<MessageFormValues>({
    resolver: zodResolver(messageSchema),
    mode: "onChange", // ✅ live validation
    defaultValues: {
      subject: "",
      message: "",
      userType: "admin",
      selectedUsers: [],
    },
  });

  const subject = watch("subject");
  const message = watch("message");

  // ✅ Avatar normalizer
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

  // ✅ Preselect user from Redux
  useEffect(() => {
    if (singleAdminUser?._id) {
      const adminUser = {
        id: singleAdminUser._id,
        name:
          `${singleAdminUser.firstname ?? ""} ${
            singleAdminUser.lastname ?? ""
          }`.trim() || "Unnamed Admin",
        username:
          singleAdminUser.email || singleAdminUser.phone || singleAdminUser._id,
        avatar: normalizeAvatar(singleAdminUser.avatar, 0),
        type: "admin" as const,
      };
      setSelectedUsers([adminUser]);
      setUserType("admin");
      setValue("userType", "admin");
      setValue("selectedUsers", [adminUser]);
    } else if (singleWalletUser?._id) {
      const walletUser = {
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
      };
      setSelectedUsers([walletUser]);
      setUserType("wallet");
      setValue("userType", "wallet");
      setValue("selectedUsers", [walletUser]);
    }
  }, [singleAdminUser, singleWalletUser, setValue]);

  // ✅ Sync selected users & type with form state
  useEffect(() => {
    setValue("userType", userType);
    setValue("selectedUsers", selectedUsers);
  }, [userType, selectedUsers, setValue]);

  // ✅ Submit handler
  const onSubmit = async (data: MessageFormValues) => {
    const payload = {
      emails: data.selectedUsers.map((user) => user.username),
      subject: data.subject,
      message: data.message,
    };
    console.log("✅ Valid form data:", payload);
  };

  return (
    <main className="flex-1 overflow-y-auto mt-[10px] mb-[50px]">
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

        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <UserTypeSelector userType={userType} setUserType={setUserType} />

          <div className="flex flex-col">
            <RecipientSelector
              userType={userType}
              selectedUsers={selectedUsers}
              setSelectedUsers={setSelectedUsers}
            />
            {errors.selectedUsers && (
              <p className="text-red-500 text-sm mt-[8px]">
                {errors.selectedUsers.message}
              </p>
            )}
          </div>

          <MessageForm
            subject={subject}
            setSubject={(v) => setValue("subject", v, { shouldValidate: true })}
            message={message}
            setMessage={(v) => setValue("message", v, { shouldValidate: true })}
            errors={{
              subject: errors.subject?.message,
              message: errors.message?.message,
            }}
          />

          <Actions isSubmitting={isSubmitting} />
        </form>
      </div>
    </main>
  );
}
