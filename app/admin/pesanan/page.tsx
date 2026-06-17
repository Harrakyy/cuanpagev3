"use client";

import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import { useMemo, useState } from "react";
import { getData } from "@/lib/api";
import { PageHeader } from "@/components/common/page-header";
import { StatusBadge } from "@/components/common/status-badge";

export default function AdminPesananPage() {
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("");
  const { data = [] } = useQuery({ queryKey: ["admin-orders", status], queryFn: () => getData<any[]>(`/api/admin/orders?status=${status}&search=${search}`) });
  const filtered = useMemo(() => data.filter((d) => d.order_number.toLowerCase().includes(search.toLowerCase()) || d.customer_name.toLowerCase().includes(search.toLowerCase())), [data, search]);

  return (
    <div className="space-y-4">
      <PageHeader title="Daftar Pesanan" subtitle={`${filtered.length} pesanan`} />
      <div className="flex flex-wrap gap-2">
        <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Cari..." className="w-full max-w-sm rounded-xl border border-border bg-background px-4 py-2.5" />
        {["", "pending", "in_progress", "revision", "completed", "rejected"].map((tab) => (
          <button key={tab || "all"} onClick={() => setStatus(tab)} className="rounded-full border border-border px-4 py-2 text-sm capitalize">{tab || "semua"}</button>
        ))}
      </div>
      <div className="rounded-2xl border border-border bg-card p-4">
        <table className="w-full text-left text-sm">
          <thead><tr className="border-b border-border"><th>No. Order</th><th>Nama Customer</th><th>No. WA</th><th>Kategori AI</th><th>Status</th><th>Aksi</th></tr></thead>
          <tbody>{filtered.map((order) => <tr key={order.id} className="border-b border-border"><td className="py-3">{order.order_number}</td><td>{order.customer_name}</td><td><a href={`https://wa.me/${order.customer_phone}`} target="_blank">{order.customer_phone}</a></td><td>{order.ai_category}</td><td><StatusBadge status={order.status} /></td><td><Link href={`/admin/pesanan/${order.id}`}>Detail →</Link></td></tr>)}</tbody>
        </table>
      </div>
    </div>
  );
}
