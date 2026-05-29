import { useEffect, useState } from "react";

export interface Stats {
  totalUsers: number;
  totalRedirectUrls: number;
}

export function useStats() {
  const [stats, setStats] = useState<Stats | null>(null);

  useEffect(() => {
    fetch("/api/admin/stats")
      .then((r) => r.json())
      .then((d) => setStats(d.data));
  }, []);

  return { stats };
}
