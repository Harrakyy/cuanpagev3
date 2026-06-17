"use client";

import { useQuery } from "@tanstack/react-query";
import { getData } from "@/lib/api";
import { StatusBadge } from "@/components/common/status-badge";

export default function AdminSprintPage() {
  const { data = [] } = useQuery({ queryKey: ["sprints"], queryFn: () => getData<any[]>("/api/sprints") });
  return (
    <div>
      <h1 className="mb-6 text-4xl font-bold tracking-tight">Sprint</h1>
      <div className="rounded-2xl border border-border bg-card p-4">
        {data.map((sprint) => (
          <div key={sprint.id} className="flex items-center justify-between border-b border-border py-3">
            <div><p className="font-semibold">{sprint.name}</p><p className="text-sm text-muted-foreground">{sprint.goal}</p></div>
            <StatusBadge status={sprint.status} />
          </div>
        ))}
      </div>
    </div>
  );
}
