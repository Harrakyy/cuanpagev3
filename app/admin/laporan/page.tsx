"use client";

import { useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { Bar, BarChart, Cell, Pie, PieChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { getData } from "@/lib/api";
import { formatIDR } from "@/lib/utils";
import { StatsCard } from "@/components/common/stats-card";
import { FolderOpen, Package, Wallet } from "lucide-react";

export default function AdminLaporanPage() {
  const projects = useQuery({ queryKey: ["projects"], queryFn: () => getData<any[]>("/api/projects") });
  const orders = useQuery({ queryKey: ["orders"], queryFn: () => getData<any[]>("/api/admin/orders") });

  const revenue = useMemo(
    () => (orders.data ?? []).filter((o) => o.status === "completed").reduce((sum, o) => sum + (o.agreed_price || 0), 0),
    [orders.data],
  );
  const byStatus = useMemo(() => Object.entries((projects.data ?? []).reduce((acc: Record<string, number>, p) => ({ ...acc, [p.status]: (acc[p.status] || 0) + 1 }), {})).map(([name, value]) => ({ name, value })), [projects.data]);

  return (
    <div className="space-y-6">
      <h1 className="text-4xl font-bold tracking-tight">Laporan</h1>
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        <StatsCard title="Total Revenue" value={formatIDR(revenue)} icon={Wallet} />
        <StatsCard title="Total Project Selesai" value={(projects.data ?? []).filter((p) => p.status === "completed").length} icon={FolderOpen} />
        <StatsCard title="Total Pesanan" value={(orders.data ?? []).length} icon={Package} />
        <StatsCard title="Rata-rata Durasi" value={`${Math.round(((orders.data ?? []).filter((o) => o.status === "completed").reduce((sum, o) => sum + (o.agreed_duration || 0), 0) || 0) / Math.max((orders.data ?? []).filter((o) => o.status === "completed").length, 1))} minggu`} icon={Package} />
      </div>
      <div className="grid gap-6 lg:grid-cols-2">
        <div className="rounded-2xl border border-border bg-card p-6">
          <h2 className="mb-4 text-xl font-semibold">Projects by Status</h2>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart><Pie data={byStatus} dataKey="value" nameKey="name" outerRadius={100}>{byStatus.map((_, i) => <Cell key={i} fill={["#111827", "#1D4ED8", "#16A34A", "#F59E0B"][i % 4]} />)}</Pie><Tooltip /></PieChart>
            </ResponsiveContainer>
          </div>
        </div>
        <div className="rounded-2xl border border-border bg-card p-6">
          <h2 className="mb-4 text-xl font-semibold">Orders per Month</h2>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={(orders.data ?? []).slice(-6).map((o) => ({ month: new Date(o.created_at).toLocaleDateString("id-ID", { month: "short" }), total: 1 }))}>
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="total" fill="#111827" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}
