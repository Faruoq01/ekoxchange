import { useEffect, useState } from "react";

export interface User {
  name: string;
  username: string;
  avatar: string;
  type: "admin" | "wallet";
}

export function useUsers() {
  const [adminUsers, setAdminUsers] = useState<User[]>([]);
  const [walletUsers, setWalletUsers] = useState<User[]>([]);
  const [page, setPage] = useState({ admin: 1, wallet: 1 });
  const [hasMore, setHasMore] = useState({ admin: true, wallet: true });
  const [loading, setLoading] = useState(false);

  // simulate async fetch
  const fetchUsers = async (type: "admin" | "wallet", pageNum: number) => {
    setLoading(true);
    await new Promise((r) => setTimeout(r, 3000));
    const newUsers: User[] = Array.from({ length: 5 }, (_, i) => ({
      name: `${type === "admin" ? "Admin" : "Wallet"} User ${pageNum * 5 + i}`,
      username: `@${type}${pageNum * 5 + i}`,
      avatar:
        "https://i.pravatar.cc/150?img=" + (Math.floor(Math.random() * 70) + 1),
      type,
    }));
    setLoading(false);
    return newUsers;
  };

  const loadUsers = async (type: "admin" | "wallet", nextPage?: boolean) => {
    if (!hasMore[type] && nextPage) return;
    const pageNum = nextPage ? page[type] + 1 : 1;
    const fetched = await fetchUsers(type, pageNum);

    if (type === "admin") {
      setAdminUsers((prev) => (nextPage ? [...prev, ...fetched] : fetched));
      setPage((prev) => ({ ...prev, admin: pageNum }));
      setHasMore((prev) => ({ ...prev, admin: fetched.length > 0 }));
    } else {
      setWalletUsers((prev) => (nextPage ? [...prev, ...fetched] : fetched));
      setPage((prev) => ({ ...prev, wallet: pageNum }));
      setHasMore((prev) => ({ ...prev, wallet: fetched.length > 0 }));
    }
  };

  useEffect(() => {
    loadUsers("admin");
    loadUsers("wallet");
  }, []);

  return { adminUsers, walletUsers, loadUsers, loading, hasMore };
}
