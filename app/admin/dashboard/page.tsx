"use client";

import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import { CheckCircle, FolderOpen, Package, Zap } from "lucide-react";
import { getData } from "@/lib/api";
import { StatsCard } from "@/components/common/stats-card";
import { StatusBadge } from "@/components/common/status-badge";
import { SkeletonTable } from "@/components/common/skeletons";

export default function AdminDashboardPage() {
  const dashboard = useQuery({ queryKey: ["dashboard"], queryFn: () => getData<any>("/api/dashboard/me") });
  const orders = useQuery({ queryKey: ["orders-pending"], queryFn: () => getData<{ orders: any[]; total: number }>("/api/admin/orders?status=pending") });
  const tasks = useQuery({ queryKey: ["tasks"], queryFn: () => getData<any[]>("/api/tasks") });

  if (dashboard.isLoading || orders.isLoading || tasks.isLoading) return <SkeletonTable />;

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        <StatsCard title="Total Proyek Aktif" value={dashboard.data?.active_projects ?? 0} icon={FolderOpen} />
        <StatsCard title="Task Selesai" value={(tasks.data ?? []).filter((t) => t.status === "done").length} icon={CheckCircle} />
        <StatsCard title="Pesanan Pending" value={orders.data?.total ?? 0} icon={Package} />
        <StatsCard title="Sprint Berjalan" value={dashboard.data?.active_sprint_count ?? 0} icon={Zap} />
      </div>
      <div className="rounded-2xl border border-border bg-card p-6">
        <div className="mb-4 flex items-center justify-between"><h2 className="text-xl font-semibold">Recent Orders</h2><Link href="/admin/pesanan" className="text-sm">Lihat Semua →</Link></div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead><tr className="border-b border-border"><th>No. Order</th><th>Nama</th><th>Kategori</th><th>Status</th></tr></thead>
            <tbody>{(orders.data?.orders ?? []).slice(0, 5).map((order: any) => <tr key={order.id} className="border-b border-border"><td className="py-3">{order.order_number}</td><td>{order.customer_name}</td><td>{order.ai_category}</td><td><StatusBadge status={order.status} /></td></tr>)}</tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
