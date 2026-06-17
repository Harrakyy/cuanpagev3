"use client";

import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { AdminSidebar } from "@/components/admin/admin-sidebar";
import { AdminTopbar } from "@/components/admin/admin-topbar";
import { useAuthStore } from "@/store/authStore";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const { token } = useAuthStore();
  const [hydrated, setHydrated] = useState(false);
  const isLogin = pathname === "/admin/login";

  useEffect(() => {
    const unsub = useAuthStore.persist.onFinishHydration(() => setHydrated(true));
    if (useAuthStore.persist.hasHydrated()) setHydrated(true);
    return unsub;
  }, []);

  useEffect(() => {
    if (hydrated && !isLogin && !token) router.push("/admin/login");
  }, [hydrated, isLogin, token, router]);

  if (!hydrated && !isLogin) return null;

  if (isLogin) return <>{children}</>;

  return (
    <div className="flex min-h-[100dvh] bg-background">
      <AdminSidebar />
      <div className="flex flex-1 flex-col overflow-auto">
        <AdminTopbar title="Admin Panel" />
        <main className="p-6">{children}</main>
      </div>
    </div>
  );
}
