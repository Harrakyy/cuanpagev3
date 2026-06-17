"use client";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { Eye, EyeOff } from "lucide-react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import api from "@/lib/axios";
import { useAuthStore } from "@/store/authStore";

const schema = z.object({ email: z.string().email(), password: z.string().min(6) });
type FormData = z.infer<typeof schema>;

export default function AdminLoginPage() {
  const router = useRouter();
  const [show, setShow] = useState(false);
  const { token, login } = useAuthStore();

  useEffect(() => {
    if (token) router.push("/admin/dashboard");
  }, [token, router]);
  const form = useForm<FormData>({ resolver: zodResolver(schema) });
  const mutation = useMutation({
    mutationFn: async (values: FormData) => (await api.post("/api/auth/login", values)).data.data,
    onSuccess: (data) => {
      login(data.access_token, data.user);
      localStorage.setItem(
        "auth-storage",
        JSON.stringify({
          state: { token: data.access_token, user: data.user },
          version: 0,
        }),
      );
      document.cookie = `token=${data.access_token}; path=/; max-age=86400`;
      window.location.href = "/admin/dashboard";
    },
    onError: () => toast.error("Email atau password salah"),
  });

  return (
    <main className="flex min-h-[100dvh] items-center justify-center bg-background p-4">
      <div className="w-full max-w-sm rounded-2xl border border-border bg-card p-8 shadow-xl">
        <h1 className="text-center text-3xl font-black">CuanPage.</h1>
        <p className="mt-1 text-center text-muted-foreground">Admin Dashboard</p>
        <form onSubmit={form.handleSubmit((v) => mutation.mutate(v))} className="mt-6 space-y-4">
          <input className="w-full rounded-xl border border-border bg-background px-4 py-3" placeholder="Email" {...form.register("email")} />
          <div className="relative">
            <input type={show ? "text" : "password"} className="w-full rounded-xl border border-border bg-background px-4 py-3 pr-10" placeholder="Password" {...form.register("password")} />
            <button type="button" className="absolute right-3 top-3" onClick={() => setShow((s) => !s)}>{show ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}</button>
          </div>
          <button
            type="submit"
            disabled={mutation.isPending}
            className="w-full rounded-full bg-foreground px-6 py-2.5 font-semibold text-background disabled:opacity-50"
          >
            {mutation.isPending ? "Masuk..." : "Masuk"}
          </button>
        </form>
      </div>
    </main>
  );
}
