"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import Link from "next/link";
import { useParams } from "next/navigation";
import { toast } from "sonner";
import { getData, patchData, putData } from "@/lib/api";
import { StatusBadge } from "@/components/common/status-badge";

export default function AdminDetailPesananPage() {
  const params = useParams<{ id: string }>();
  const qc = useQueryClient();
  const { data } = useQuery({ queryKey: ["admin-order", params.id], queryFn: () => getData<any>(`/api/admin/orders/${params.id}`) });
  const statusMutation = useMutation({
    mutationFn: (status: string) => patchData(`/api/admin/orders/${params.id}/status`, { status, note: `Status diubah ke ${status}` }),
    onSuccess: () => { toast.success("✅ Berhasil update status"); qc.invalidateQueries({ queryKey: ["admin-order", params.id] }); },
    onError: () => toast.error("❌ Gagal update status"),
  });
  const updateMutation = useMutation({
    mutationFn: () => putData(`/api/admin/orders/${params.id}`, { agreed_price: data.agreed_price, agreed_duration: data.agreed_duration, admin_notes: data.admin_notes }),
    onSuccess: () => toast.success("✅ Berhasil simpan"),
  });

  if (!data) return null;

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <Link href="/admin/pesanan">←</Link>
        <h1 className="text-3xl font-bold">Detail Pesanan</h1>
        <span className="rounded-full bg-muted px-3 py-1 font-mono text-sm">{data.order_number}</span>
        <StatusBadge status={data.status} />
      </div>
      <div className="grid gap-6 lg:grid-cols-3">
        <div className="rounded-2xl border border-border bg-card p-6 lg:col-span-2">
          <h2 className="text-xl font-semibold">{data.customer_name}</h2>
          <p className="mt-2 text-muted-foreground">{data.description}</p>
        </div>
        <div className="rounded-2xl border border-border bg-card p-6">
          <button onClick={() => statusMutation.mutate("in_progress")} className="w-full rounded-full bg-foreground px-4 py-2 text-background">Approve</button>
          <button onClick={() => statusMutation.mutate("rejected")} className="mt-2 w-full rounded-full border border-red-500 px-4 py-2 text-red-500">Reject</button>
          <button onClick={() => updateMutation.mutate()} className="mt-2 w-full rounded-full border border-border px-4 py-2">Simpan</button>
        </div>
      </div>
    </div>
  );
}
