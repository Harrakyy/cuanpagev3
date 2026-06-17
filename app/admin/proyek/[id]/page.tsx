"use client";

import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import { getData } from "@/lib/api";
import { PageHeader } from "@/components/common/page-header";
import { StatusBadge } from "@/components/common/status-badge";

export default function AdminDetailProyekPage() {
  const params = useParams<{ id: string }>();
  const project = useQuery({ queryKey: ["project", params.id], queryFn: () => getData<any>(`/api/projects/${params.id}`) });
  const sprints = useQuery({ queryKey: ["sprints"], queryFn: () => getData<any[]>("/api/sprints") });
  const backlog = useQuery({ queryKey: ["backlog", params.id], queryFn: () => getData<any[]>(`/api/projects/${params.id}/backlog`) });
  const members = useQuery({ queryKey: ["members", params.id], queryFn: () => getData<any[]>(`/api/projects/${params.id}/members`) });

  if (!project.data) return null;
  return (
    <div className="space-y-6">
      <PageHeader title={project.data.name} subtitle={project.data.description} />
      <StatusBadge status={project.data.status} />
      <div className="grid gap-6 lg:grid-cols-2">
        <div className="rounded-2xl border border-border bg-card p-6"><h3 className="text-xl font-semibold">Sprint</h3><p className="mt-2 text-muted-foreground">Total: {sprints.data?.length ?? 0}</p></div>
        <div className="rounded-2xl border border-border bg-card p-6"><h3 className="text-xl font-semibold">Backlog</h3><p className="mt-2 text-muted-foreground">Total: {backlog.data?.length ?? 0}</p></div>
        <div className="rounded-2xl border border-border bg-card p-6"><h3 className="text-xl font-semibold">Members</h3><p className="mt-2 text-muted-foreground">Total: {members.data?.length ?? 0}</p></div>
      </div>
    </div>
  );
}
