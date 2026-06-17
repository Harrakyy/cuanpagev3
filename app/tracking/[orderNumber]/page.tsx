"use client";

import { useQuery } from "@tanstack/react-query";
import { Clock, XCircle } from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { getData } from "@/lib/api";
import { StatusBadge } from "@/components/common/status-badge";
import { SkeletonCard } from "@/components/common/skeletons";
import { formatDateID } from "@/lib/utils";

export default function DetailTrackingPage() {
  const params = useParams<{ orderNumber: string }>();
  const { data, isLoading, isError } = useQuery({
    queryKey: ["tracking", params.orderNumber],
    queryFn: () => getData<any>(`/api/orders/track/${params.orderNumber}`),
  });

  if (isLoading) return <main className="container-default py-16 space-y-4"><SkeletonCard /><SkeletonCard /></main>;
  if (isError || !data)
    return (
      <main className="container-default py-16 max-w-xl">
        <div className="rounded-2xl border border-border bg-card p-8 text-center">
          <XCircle className="mx-auto h-10 w-10 text-red-500" />
          <h1 className="mt-4 text-2xl font-bold">Order tidak ditemukan</h1>
          <Link href="/tracking" className="mt-4 inline-block rounded-full bg-foreground px-6 py-2.5 text-background">Coba tracking lagi →</Link>
        </div>
      </main>
    );

  return (
    <main className="container-default max-w-2xl py-16 space-y-6">
      <div className="rounded-2xl border border-border bg-card p-6">
        <p className="font-mono text-sm">{data.order_number}</p>
        <h1 className="mt-2 text-3xl font-bold">{data.customer_name}</h1>
        <div className="mt-4 flex items-center gap-3">
          <span className="rounded-full bg-muted px-3 py-1 text-sm">{data.ai_category}</span>
          <StatusBadge status={data.status} />
        </div>
      </div>
      <div className="rounded-2xl border border-border bg-card p-6">
        <h2 className="flex items-center gap-2 text-xl font-semibold"><Clock className="h-5 w-5" /> Riwayat Status</h2>
        <div className="mt-4 space-y-4">
          {data.tracking_logs?.map((log: any) => (
            <div key={log.id} className="border-l border-border pl-4">
              <StatusBadge status={log.status} />
              <p className="mt-1">{log.note}</p>
              <p className="text-sm text-muted-foreground">{formatDateID(log.created_at)}</p>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
