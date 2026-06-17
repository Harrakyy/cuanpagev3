"use client";

import { useMutation } from "@tanstack/react-query";
import Link from "next/link";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import api from "@/lib/axios";
import { LoadingSpinner } from "@/components/common/loading-spinner";

const schema = z.object({
  customer_name: z.string().min(2),
  customer_phone: z.string().regex(/^(08|62)\d{8,11}$/),
  customer_email: z.string().email().optional().or(z.literal("")),
  customer_company: z.string().optional(),
});

type FormData = z.infer<typeof schema>;

export default function KonsultasiPage() {
  const [step, setStep] = useState<1 | 2>(1);
  const [description, setDescription] = useState("");
  const [analysis, setAnalysis] = useState<any>(null);

  const form = useForm<FormData>({ resolver: zodResolver(schema), defaultValues: { customer_name: "", customer_phone: "", customer_email: "", customer_company: "" } });

  const analyze = useMutation({
    mutationFn: async () => (await api.post("/api/analyze", { description })).data,
    onSuccess: (data) => {
      setAnalysis(data);
      setStep(2);
    },
  });

  const order = useMutation({
    mutationFn: async (values: FormData) =>
      (
        await api.post("/api/orders/inquiry", {
          ...values,
          description,
          ai_category: analysis.category,
          ai_features: analysis.features,
          ai_price_min: analysis.price_min,
          ai_price_max: analysis.price_max,
          ai_duration_weeks: analysis.duration_weeks,
          ai_complexity: analysis.complexity,
        })
      ).data.data,
    onSuccess: (data) => {
      setTimeout(() => {
        window.open(`https://wa.me/${process.env.NEXT_PUBLIC_ADMIN_WA}?text=${encodeURIComponent(data.whatsapp_message)}`, "_blank");
      }, 1500);
      window.location.href = `/tracking/${data.order_number}`;
    },
  });

  return (
    <main className="section-padding">
      <div className="container-default max-w-4xl">
        {step === 1 ? (
          <div className="mx-auto max-w-2xl rounded-2xl border border-border bg-card p-8">
            <Link href="/" className="text-sm text-muted-foreground">← Kembali</Link>
            <p className="mt-4 text-sm text-muted-foreground">Step 1/2</p>
            <div className="mt-2 h-2 rounded-full bg-muted"><div className="h-2 w-1/2 rounded-full bg-foreground" /></div>
            <h1 className="mt-6 text-3xl font-bold">Ceritakan kebutuhan website kamu</h1>
            <textarea value={description} onChange={(e) => setDescription(e.target.value)} className="mt-6 min-h-48 w-full rounded-xl border border-border bg-background p-4" placeholder="Jelaskan kebutuhan project kamu..." maxLength={1000} />
            <p className="mt-2 text-right text-sm text-muted-foreground">{description.length}/1000</p>
            <button disabled={description.length < 20 || analyze.isPending} onClick={() => analyze.mutate()} className="mt-4 flex w-full items-center justify-center rounded-full bg-foreground px-6 py-2.5 font-semibold text-background disabled:opacity-50">
              {analyze.isPending ? <><LoadingSpinner /> <span className="ml-2">AI sedang menganalisis...</span></> : "Analisis Kebutuhan →"}
            </button>
          </div>
        ) : (
          <div className="grid gap-8 lg:grid-cols-2">
            <div className="rounded-2xl border border-border bg-card p-6">
              <p className="text-sm text-muted-foreground">Step 2/2</p>
              <div className="mt-2 h-2 rounded-full bg-muted"><div className="h-2 w-full rounded-full bg-foreground" /></div>
              <h2 className="mt-6 text-2xl font-bold">Hasil Analisis AI</h2>
              <p className="mt-3 inline-block rounded-full bg-muted px-3 py-1 text-sm font-semibold">{analysis?.category}</p>
              <p className="mt-4 text-sm">{analysis?.features?.join(", ")}</p>
              <p className="mt-3 font-semibold">Estimasi: Rp {analysis?.price_min} - Rp {analysis?.price_max}</p>
              <button onClick={() => setStep(1)} className="mt-4 rounded-lg px-4 py-2 hover:bg-muted">← Ubah Kebutuhan</button>
            </div>
            <form onSubmit={form.handleSubmit((values) => order.mutate(values))} className="rounded-2xl border border-border bg-card p-6">
              <h2 className="text-2xl font-bold">Lengkapi Data Diri</h2>
              <div className="mt-4 space-y-3">
                <input placeholder="Nama Lengkap" className="w-full rounded-xl border border-border bg-background px-4 py-3" {...form.register("customer_name")} />
                <input placeholder="Nomor WhatsApp" className="w-full rounded-xl border border-border bg-background px-4 py-3" {...form.register("customer_phone")} />
                <input placeholder="Email" className="w-full rounded-xl border border-border bg-background px-4 py-3" {...form.register("customer_email")} />
                <input placeholder="Nama Perusahaan/Brand" className="w-full rounded-xl border border-border bg-background px-4 py-3" {...form.register("customer_company")} />
              </div>
              <button type="submit" disabled={order.isPending} className="mt-6 flex w-full items-center justify-center rounded-full bg-foreground px-6 py-2.5 font-semibold text-background">
                {order.isPending ? <LoadingSpinner /> : "Kirim & Konsultasi via WhatsApp →"}
              </button>
            </form>
          </div>
        )}
      </div>
    </main>
  );
}
