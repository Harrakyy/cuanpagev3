"use client";

import { useQuery } from "@tanstack/react-query";
import { getData } from "@/lib/api";
import { StatusBadge } from "@/components/common/status-badge";

export default function AdminBacklogPage() {
  const projects = useQuery({ queryKey: ["projects"], queryFn: () => getData<any[]>("/api/projects") });
  const allBacklogs = useQuery({
    queryKey: ["backlogs", projects.data?.length],
    enabled: !!projects.data,
    queryFn: async () => {
      const rows = await Promise.all((projects.data ?? []).map(async (p) => ({ project: p, items: await getData<any[]>(`/api/projects/${p.id}/backlog`) })));
      return rows.flatMap((row) => row.items.map((item) => ({ ...item, project_name: row.project.name })));
    },
  });

  return (
    <div>
      <h1 className="mb-6 text-4xl font-bold tracking-tight">Backlog</h1>
      <div className="rounded-2xl border border-border bg-card p-4">
        <table className="w-full text-left text-sm">
          <thead><tr className="border-b border-border"><th>Title</th><th>Proyek</th><th>Priority</th><th>Status</th></tr></thead>
          <tbody>{(allBacklogs.data ?? []).map((item) => <tr key={item.id} className="border-b border-border"><td className="py-3">{item.title}</td><td>{item.project_name}</td><td><StatusBadge status={item.priority} /></td><td><StatusBadge status={item.status} /></td></tr>)}</tbody>
        </table>
      </div>
    </div>
  );
}
