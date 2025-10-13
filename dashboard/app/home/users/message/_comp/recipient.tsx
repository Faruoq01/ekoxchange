"use client";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { X, Loader2 } from "lucide-react";
import { User } from "./hooks";

interface Props {
  userType: "admin" | "wallet";
  adminUsers: User[];
  walletUsers: User[];
  selectedUsers: User[];
  setSelectedUsers: React.Dispatch<React.SetStateAction<User[]>>;
  loadUsers: (type: "admin" | "wallet", nextPage?: boolean) => void;
  loading: boolean;
  hasMore: { admin: boolean; wallet: boolean };
}

export const RecipientSelector: React.FC<Props> = ({
  userType,
  adminUsers,
  walletUsers,
  selectedUsers,
  setSelectedUsers,
  loadUsers,
  loading,
  hasMore,
}) => {
  const [search, setSearch] = useState("");
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [filteredUsers, setFilteredUsers] = useState<User[]>([]);
  const debounceTimer = useRef<NodeJS.Timeout | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Filter users
  useEffect(() => {
    if (debounceTimer.current) clearTimeout(debounceTimer.current);
    debounceTimer.current = setTimeout(() => {
      const list = userType === "admin" ? adminUsers : walletUsers;
      const filtered = list.filter(
        (u) =>
          u.name.toLowerCase().includes(search.toLowerCase()) &&
          !selectedUsers.some((s) => s.username === u.username)
      );
      setFilteredUsers(filtered);
    }, 200);
    return () => {
      if (debounceTimer.current) clearTimeout(debounceTimer.current);
    };
  }, [search, adminUsers, walletUsers, selectedUsers, userType]);

  // Close on outside click
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      )
        setDropdownOpen(false);
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  const handleSelect = (user: User) => {
    setSelectedUsers((prev) => [...prev, user]);
    setSearch("");
    setDropdownOpen(false);
  };

  const handleRemove = (username: string) => {
    setSelectedUsers((prev) => prev.filter((u) => u.username !== username));
  };

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const el = e.currentTarget;
    if (el.scrollTop + el.clientHeight >= el.scrollHeight - 20 && !loading) {
      loadUsers(userType, true);
    }
  };

  return (
    <div ref={dropdownRef}>
      <label className="block text-sm font-medium text-gray-600 dark:text-gray-300 mb-2">
        Recipient
      </label>
      <div className="relative">
        <div
          className="flex flex-wrap gap-2 p-2 py-[10px] border border-gray-200 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-800"
          onClick={() => setDropdownOpen(true)}
        >
          {selectedUsers
            .filter((u) => u.type === userType)
            .map((user) => (
              <div
                key={user.username}
                className="flex items-center gap-2 bg-primary/10 text-primary dark:bg-primary/20 dark:text-white px-2 py-1 rounded-full"
              >
                <Image
                  src={user.avatar}
                  alt={user.name}
                  width={24}
                  height={24}
                  className="rounded-full"
                />
                <span className="text-sm">{user.name}</span>
                <button onClick={() => handleRemove(user.username)}>
                  <X className="w-3 h-3" />
                </button>
              </div>
            ))}
          <input
            type="text"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setDropdownOpen(true);
            }}
            placeholder="Add more users..."
            className="flex-1 bg-transparent border-none focus:ring-0 text-sm text-gray-900 dark:text-gray-100"
          />
        </div>

        {dropdownOpen && (
          <div
            className="absolute z-10 w-full mt-1 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg max-h-60 overflow-y-auto"
            onScroll={handleScroll}
          >
            {filteredUsers.length > 0 ? (
              filteredUsers.map((user) => (
                <div
                  key={user.username}
                  onClick={() => handleSelect(user)}
                  className="flex items-center gap-3 px-4 py-2 hover:bg-primary/10 cursor-pointer"
                >
                  <Image
                    src={user.avatar}
                    alt={user.name}
                    width={32}
                    height={32}
                    className="rounded-full"
                  />
                  <div>
                    <p className="font-semibold text-sm">{user.name}</p>
                    <p className="text-xs text-gray-500">{user.username}</p>
                  </div>
                </div>
              ))
            ) : loading ? (
              <div className="flex justify-center py-4">
                <Loader2 className="w-5 h-5 animate-spin text-primary" />
              </div>
            ) : (
              <p className="px-4 py-2 text-sm text-gray-500">No users found.</p>
            )}
            {hasMore[userType] && !loading && filteredUsers.length > 0 && (
              <button
                type="button"
                onClick={() => loadUsers(userType, true)}
                className="w-full text-center text-sm py-2 hover:bg-gray-100 dark:hover:bg-gray-800 text-primary"
              >
                Load more
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
