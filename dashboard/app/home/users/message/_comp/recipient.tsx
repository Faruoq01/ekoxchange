import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { X, Loader2, Users } from "lucide-react";

interface User {
  name: string;
  username: string;
  avatar: string;
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
  const [adminUsers, setAdminUsers] = useState<User[]>([]);
  const [walletUsers, setWalletUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [search, setSearch] = useState("");

  const dropdownRef = useRef<HTMLDivElement>(null);

  const fetchUsers = async (type: "admin" | "wallet") => {
    setLoading(true);
    await new Promise((r) => setTimeout(r, 700));
    const newUsers = Array.from({ length: 20 }, (_, i) => ({
      name: `${type === "admin" ? "Admin" : "Wallet"} User ${i + 1}`,
      username: `@${type}${i + 1}`,
      avatar:
        "https://i.pravatar.cc/150?img=" + (Math.floor(Math.random() * 70) + 1),
      type,
    }));
    setLoading(false);
    return newUsers;
  };

  useEffect(() => {
    (async () => {
      if (adminUsers.length === 0) setAdminUsers(await fetchUsers("admin"));
      if (walletUsers.length === 0) setWalletUsers(await fetchUsers("wallet"));
    })();
  }, []);

  const users = userType === "admin" ? adminUsers : walletUsers;
  const filtered = users.filter(
    (u) =>
      u.name.toLowerCase().includes(search.toLowerCase()) &&
      !selectedUsers.some((s) => s.username === u.username)
  );

  const handleSelect = (user: User) => {
    // If "All" was previously selected for this type, remove it
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
    // Remove all individual users of this type
    const others = selectedUsers.filter((u) => u.type !== userType);
    // Add the "All" placeholder user
    const allUser: User = {
      name: `All ${userType === "admin" ? "Admins" : "Wallet Users"}`,
      username: `all-${userType}`,
      avatar: "",
      type: userType,
      isAll: true,
    };
    setSelectedUsers([...others, allUser]);
    setDropdownOpen(false);
  };

  // Close dropdown on outside click
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
        <div
          className="flex flex-wrap gap-2 p-2 py-[10px] border border-gray-200 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-800"
          onClick={() => setDropdownOpen(true)}
        >
          {selectedUsers
            .filter((u) => u.type === userType)
            .map((user) => (
              <div
                key={user.username}
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
                    src={user.avatar}
                    alt={user.name}
                    width={24}
                    height={24}
                    className="rounded-full"
                  />
                )}
                <span className="text-sm font-medium">{user.name}</span>
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
              <div className="flex justify-center items-center py-4">
                <Loader2 className="w-5 h-5 animate-spin text-primary" />
              </div>
            ) : filtered.length > 0 ? (
              filtered.map((user) => (
                <div
                  key={user.username}
                  className="flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-primary/10 cursor-pointer transition-colors"
                  onClick={() => handleSelect(user)}
                >
                  <Image
                    src={user.avatar}
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
              ))
            ) : (
              <p className="px-4 py-2 text-sm text-gray-500">No users found.</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
