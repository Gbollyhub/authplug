import { useEffect, useState } from "react";

export interface User {
  id: string;
  email: string;
  role: string;
  joinedAt: string;
}

export function useUsers() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/admin/users")
      .then((r) => r.json())
      .then((d) => setUsers(d.data ?? []))
      .finally(() => setLoading(false));
  }, []);

  return { users, loading };
}
