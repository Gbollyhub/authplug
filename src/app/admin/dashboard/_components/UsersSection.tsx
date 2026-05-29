"use client";

import { UsersIcon } from "@heroicons/react/24/outline";
import { useUsers } from "@/hooks/useUsers";

export default function UsersSection() {
  const { users, loading } = useUsers();

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold text-neutral-900 tracking-tight">Users</h2>
        <p className="text-sm text-neutral-400 mt-1">All users linked to your company.</p>
      </div>

      <div className="bg-white border border-neutral-200 rounded-xl shadow-card overflow-hidden">
        {loading ? (
          <div className="flex items-center justify-center py-16 text-neutral-400 text-sm">Loading users…</div>
        ) : users.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 gap-3 text-neutral-400">
            <UsersIcon className="w-8 h-8" />
            <p className="text-sm">No users yet.</p>
          </div>
        ) : (
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-neutral-100 bg-neutral-50">
                <th className="text-left px-6 py-3.5 font-medium text-neutral-500 uppercase tracking-wide text-xs">Email</th>
                <th className="text-left px-6 py-3.5 font-medium text-neutral-500 uppercase tracking-wide text-xs">Role</th>
                <th className="text-left px-6 py-3.5 font-medium text-neutral-500 uppercase tracking-wide text-xs">Joined</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-100">
              {users.map((u) => (
                <tr key={u.id} className="hover:bg-neutral-50 transition-colors">
                  <td className="px-6 py-4 text-neutral-700 font-medium">{u.email}</td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${u.role === "admin" ? "bg-black text-white" : "bg-neutral-100 text-neutral-600"}`}>
                      {u.role}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-neutral-400">
                    {new Date(u.joinedAt).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" })}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
