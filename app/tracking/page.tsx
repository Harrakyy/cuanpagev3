"use client";

import { MapPin } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function TrackingPage() {
  const [orderNumber, setOrderNumber] = useState("");
  const router = useRouter();
  return (
    <main className="flex min-h-[100dvh] items-center">
      <div className="container-default max-w-md">
        <div className="rounded-2xl border border-border bg-card p-8 text-center">
          <MapPin className="mx-auto h-10 w-10" />
          <h1 className="mt-4 text-3xl font-bold">Tracking Order</h1>
          <p className="mt-2 text-muted-foreground">Masukkan nomor order kamu untuk cek progress.</p>
          <input value={orderNumber} onChange={(e) => setOrderNumber(e.target.value.toUpperCase())} placeholder="ORD-20260614-001" className="mt-6 w-full rounded-xl border border-border bg-background px-4 py-3 uppercase" />
          <button onClick={() => router.push(`/tracking/${orderNumber.toUpperCase()}`)} className="mt-4 w-full rounded-full bg-foreground px-6 py-2.5 font-semibold text-background">Cek Status →</button>
        </div>
      </div>
    </main>
  );
}
