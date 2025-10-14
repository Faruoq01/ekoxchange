"use client";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { X, Users, Loader2 } from "lucide-react";
import { useSelector } from "react-redux";
import { UserService } from "@/app/lib/services/users";

interface User {
  id: string;
  name: string;
  username: string;
  avatar?: string | null;
  type: "admin" | "wallet";
  isAll?: boolean;
}

interface Props {
  userType: "admin" | "wallet";
  selectedUsers: User[];
  setSelectedUsers: React.Dispatch<React.SetStateAction<User[]>>;
}

export default function RecipientSelector({
  userType,
  selectedUsers,
  setSelectedUsers,
}: Props) {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [skip, setSkip] = useState(0);
  const limit = 10;
  const dropdownRef = useRef<HTMLDivElement>(null);

  // ✅ Redux preselected user
  const { singleAdminUser, singleWalletUser } = useSelector(
    (state: any) => state.users
  );

  // ✅ Fetch users from API
  const fetchUsers = async (initial = false) => {
    try {
      if (initial) setLoading(true);
      else setLoadingMore(true);

      const res =
        userType === "admin"
          ? await UserService.getAdminUsers(initial ? 0 : skip, limit)
          : await UserService.getWalletUsers(initial ? 0 : skip, limit);

      if (!res.error) {
        const rawUsers = res.payload?.data || [];
        const newUsers = rawUsers.map((u: any, i: number) => ({
          id: u.id || u._id || `${userType}-${skip + i}`,
          name:
            `${u.firstname ?? ""} ${u.lastname ?? ""}`.trim() || "Unnamed User",
          username: u.email || u.phone || u.id || `unknown-${skip + i}`,
          avatar: `https://picsum.photos/200/200?${i + 2}`,
          type: userType,
        }));

        setUsers((prev) => (initial ? newUsers : [...prev, ...newUsers]));
        setSkip((prev) => (initial ? limit : prev + limit));
      }
    } catch (err) {
      console.error("Error fetching users:", err);
    } finally {
      setLoading(false);
      setLoadingMore(false);
    }
  };

  // ✅ Reset and refetch when userType changes
  useEffect(() => {
    setUsers([]);
    setSkip(0);
    fetchUsers(true);
  }, [userType]);

  // ✅ Preselect from Redux if available
  useEffect(() => {
    if (userType === "admin" && singleAdminUser?._id) {
      const pre = {
        id: singleAdminUser._id,
        name: `${singleAdminUser.firstname ?? ""} ${
          singleAdminUser.lastname ?? ""
        }`.trim(),
        username:
          singleAdminUser.email || singleAdminUser.phone || singleAdminUser._id,
        avatar: `https://picsum.photos/200/200?${0 + 2}`,
        type: "admin" as const,
      };
      setSelectedUsers((prev) => {
        const exists = prev.some((u) => u.username === pre.username);
        return exists ? prev : [...prev, pre];
      });
    } else if (userType === "wallet" && singleWalletUser?._id) {
      const pre = {
        id: singleWalletUser._id,
        name: `${singleWalletUser.firstname ?? ""} ${
          singleWalletUser.lastname ?? ""
        }`.trim(),
        username:
          singleWalletUser.email ||
          singleWalletUser.phone ||
          singleWalletUser._id,
        avatar: `https://picsum.photos/200/200?${1 + 2}`,
        type: "wallet" as const,
      };
      setSelectedUsers((prev) => {
        const exists = prev.some((u) => u.username === pre.username);
        return exists ? prev : [...prev, pre];
      });
    }
  }, [singleAdminUser, singleWalletUser, userType]);

  // ✅ Search filter
  const filtered = users.filter((u) => {
    const name = u.name?.toLowerCase?.() || "";
    const username = u.username?.toLowerCase?.() || "";
    const term = search.toLowerCase();
    return (
      (name.includes(term) || username.includes(term)) &&
      !selectedUsers.some((s) => s.username === u.username)
    );
  });

  const handleSelect = (user: User) => {
    const filteredSelection = selectedUsers.filter(
      (u) => !(u.type === userType && u.isAll)
    );
    setSelectedUsers([...filteredSelection, user]);
    setSearch("");
    setDropdownOpen(false);
  };

  const handleRemove = (username: string) =>
    setSelectedUsers((prev) => prev.filter((u) => u.username !== username));

  const handleSelectAll = () => {
    const others = selectedUsers.filter((u) => u.type !== userType);
    const allUser: User = {
      id: `all-${userType}`,
      name: `All ${userType === "admin" ? "Admins" : "Wallet Users"}`,
      username: `all-${userType}`,
      avatar: "",
      type: userType,
      isAll: true,
    };
    setSelectedUsers([...others, allUser]);
    setDropdownOpen(false);
  };

  // ✅ Close dropdown when clicking outside
  useEffect(() => {
    const handleOutside = (e: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      )
        setDropdownOpen(false);
    };
    document.addEventListener("mousedown", handleOutside);
    return () => document.removeEventListener("mousedown", handleOutside);
  }, []);

  return (
    <div ref={dropdownRef}>
      <label className="block text-sm font-medium text-gray-600 dark:text-gray-300 mb-2">
        Recipient
      </label>

      <div className="relative">
        {/* Selected Users */}
        <div
          className="flex flex-wrap gap-2 p-2 py-[10px] border border-gray-200 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-800"
          onClick={() => setDropdownOpen(true)}
        >
          {selectedUsers
            .filter((u) => u.type === userType)
            .map((user, index) => (
              <div
                key={user.id}
                className={`flex items-center gap-2 ${
                  user.isAll
                    ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300"
                    : "bg-primary/10 text-primary dark:bg-primary/20 dark:text-white"
                } px-2 py-1 rounded-full`}
              >
                {user.isAll ? (
                  <Users className="w-4 h-4" />
                ) : (
                  <Image
                    src={`https://picsum.photos/200/200?${index + 2}`}
                    alt={user.name}
                    width={24}
                    height={24}
                    className="rounded-full object-cover"
                  />
                )}
                <span className="text-sm font-medium truncate max-w-[100px]">
                  {user.name}
                </span>
                <button
                  type="button"
                  onClick={() => handleRemove(user.username)}
                  className="hover:text-red-500"
                >
                  <X className="w-3 h-3" />
                </button>
              </div>
            ))}

          <input
            type="text"
            placeholder="Add more users..."
            className="flex-1 bg-transparent border-none focus:ring-0 p-1 text-sm text-gray-800 dark:text-gray-100 placeholder:text-gray-500"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setDropdownOpen(true);
            }}
          />
        </div>

        {/* Dropdown */}
        {dropdownOpen && (
          <div className="absolute z-10 w-full mt-1 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg max-h-60 overflow-y-auto">
            <button
              type="button"
              onClick={handleSelectAll}
              className="w-full text-left px-4 py-2 text-sm font-medium text-green-600 hover:bg-green-50 dark:text-green-400 dark:hover:bg-green-900/20"
            >
              ✅ Select All {userType === "admin" ? "Admins" : "Wallet Users"}
            </button>

            {loading ? (
              <div className="flex flex-col items-center justify-center py-6 space-y-2">
                <Loader2 className="w-6 h-6 text-primary animate-spin" />
                <p className="text-xs text-gray-500 dark:text-gray-400 animate-pulse">
                  Fetching users...
                </p>
              </div>
            ) : filtered.length > 0 ? (
              <>
                {filtered.map((user, index) => (
                  <div
                    key={`${user.id}-${index}`}
                    className="flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-primary/10 cursor-pointer transition-colors"
                    onClick={() => handleSelect(user)}
                  >
                    <Image
                      src={`https://picsum.photos/200/200?${index + 2}`}
                      alt={user.name}
                      width={32}
                      height={32}
                      className="rounded-full object-cover"
                    />
                    <div>
                      <p className="font-semibold text-sm text-gray-800 dark:text-gray-100">
                        {user.name}
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        {user.username}
                      </p>
                    </div>
                  </div>
                ))}

                <div className="flex justify-center p-3 border-t border-gray-100 dark:border-gray-800">
                  <button
                    disabled={loadingMore}
                    onClick={() => fetchUsers(false)}
                    className="group relative overflow-hidden rounded-full px-5 py-2.5 text-sm font-semibold text-white bg-gradient-to-r from-primary to-purple-600 hover:from-purple-600 hover:to-primary focus:outline-none transition-all disabled:opacity-60"
                  >
                    <span className="relative z-10 flex items-center gap-2">
                      {loadingMore ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin" />
                          Loading...
                        </>
                      ) : (
                        <>
                          Load More
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="w-4 h-4 group-hover:translate-x-1 transition-transform"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth="2"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M12 4v16m8-8H4"
                            />
                          </svg>
                        </>
                      )}
                    </span>
                  </button>
                </div>
              </>
            ) : (
              <p className="px-4 py-2 text-sm text-gray-500">No users found.</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
