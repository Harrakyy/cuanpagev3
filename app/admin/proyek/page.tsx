"use client";

import Link from "next/link";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { deleteData, getData, postData } from "@/lib/api";
import { PageHeader } from "@/components/common/page-header";
import { StatusBadge } from "@/components/common/status-badge";

export default function AdminProyekPage() {
  const qc = useQueryClient();
  const { data = [] } = useQuery({ queryKey: ["projects"], queryFn: () => getData<any[]>("/api/projects") });
  const create = useMutation({
    mutationFn: () => postData("/api/projects", { name: "Project Baru", description: "Deskripsi proyek", status: "planning" }),
    onSuccess: () => { toast.success("✅ Berhasil tambah proyek"); qc.invalidateQueries({ queryKey: ["projects"] }); },
  });
  const remove = useMutation({
    mutationFn: (id: number) => deleteData(`/api/projects/${id}`),
    onSuccess: () => { toast.success("✅ Berhasil hapus proyek"); qc.invalidateQueries({ queryKey: ["projects"] }); },
  });

  return (
    <div>
      <PageHeader title="Daftar Proyek" action={<button onClick={() => create.mutate()} className="rounded-full bg-foreground px-6 py-2.5 text-background">+ Proyek Baru</button>} />
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {data.map((project) => (
          <div key={project.id} className="rounded-2xl border border-border bg-card p-6">
            <div className="mb-3 flex justify-end"><StatusBadge status={project.status} /></div>
            <h3 className="text-xl font-semibold">{project.name}</h3>
            <p className="mt-2 line-clamp-2 text-muted-foreground">{project.description}</p>
            <div className="mt-4 flex gap-3">
              <Link href={`/admin/proyek/${project.id}`} className="text-sm font-semibold">Kelola →</Link>
              <button onClick={() => remove.mutate(project.id)} className="text-sm text-red-500">Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
