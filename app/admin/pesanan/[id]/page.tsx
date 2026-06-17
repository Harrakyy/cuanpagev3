"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import { getData, patchData, postData, putData } from "@/lib/api";
import { StatusBadge } from "@/components/common/status-badge";

export default function AdminDetailPesananPage() {
  const params = useParams<{ id: string }>();
  const router = useRouter();
  const qc = useQueryClient();
  const { data } = useQuery({ queryKey: ["admin-order", params.id], queryFn: () => getData<any>(`/api/admin/orders/${params.id}`) });

  const [showApprove, setShowApprove] = useState(false);
  const [price, setPrice] = useState("");
  const [duration, setDuration] = useState("");
  const [notes, setNotes] = useState("");

  const statusMutation = useMutation({
    mutationFn: (status: string) => patchData(`/api/admin/orders/${params.id}/status`, { status, note: `Status diubah ke ${status}` }),
    onSuccess: () => { toast.success("✅ Berhasil update status"); qc.invalidateQueries({ queryKey: ["admin-order", params.id] }); },
    onError: () => toast.error("❌ Gagal update status"),
  });

  const convertMutation = useMutation({
    mutationFn: () =>
      postData(`/api/admin/orders/${params.id}/convert`, {
        agreed_price: Number(price),
        agreed_duration: duration ? Number(duration) : undefined,
        admin_notes: notes || undefined,
      }),
    onSuccess: () => {
      toast.success("✅ Berhasil Approve");
      router.push("/admin/proyek");
    },
    onError: () => toast.error("❌ Gagal Approve"),
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
          <button onClick={() => setShowApprove(true)} className="w-full rounded-full bg-foreground px-4 py-2 text-background">Approve</button>
          <button onClick={() => statusMutation.mutate("rejected")} className="mt-2 w-full rounded-full border border-red-500 px-4 py-2 text-red-500">Reject</button>
          <button onClick={() => updateMutation.mutate()} className="mt-2 w-full rounded-full border border-border px-4 py-2">Simpan</button>
        </div>
      </div>

      {showApprove && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50" onClick={() => setShowApprove(false)}>
          <div className="w-[95vw] max-w-md rounded-2xl border border-border bg-card p-6" onClick={(e) => e.stopPropagation()}>
            <h3 className="text-xl font-semibold">Approve Pesanan</h3>
            <p className="mt-1 text-sm text-muted-foreground">Buat proyek dari pesanan ini</p>
            <div className="mt-4 space-y-3">
              <div>
                <label className="text-sm font-medium">Harga Disepakati *</label>
                <input type="number" value={price} onChange={(e) => setPrice(e.target.value)} className="mt-1 w-full rounded-xl border border-border bg-background px-4 py-2.5" placeholder="Rp" />
              </div>
              <div>
                <label className="text-sm font-medium">Durasi (minggu)</label>
                <input type="number" value={duration} onChange={(e) => setDuration(e.target.value)} className="mt-1 w-full rounded-xl border border-border bg-background px-4 py-2.5" placeholder="Opsional" />
              </div>
              <div>
                <label className="text-sm font-medium">Catatan Admin</label>
                <textarea value={notes} onChange={(e) => setNotes(e.target.value)} className="mt-1 w-full rounded-xl border border-border bg-background px-4 py-2.5" rows={3} placeholder="Opsional" />
              </div>
            </div>
            <div className="mt-6 flex justify-end gap-2">
              <button onClick={() => setShowApprove(false)} className="rounded-full border border-border px-4 py-2">Batal</button>
              <button onClick={() => convertMutation.mutate()} disabled={!price || convertMutation.isPending} className="rounded-full bg-foreground px-4 py-2 text-background disabled:opacity-50">
                {convertMutation.isPending ? "Memproses..." : "Konfirmasi"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
