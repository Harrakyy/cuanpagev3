"use client";

import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { AdminSidebar } from "@/components/admin/admin-sidebar";
import { AdminTopbar } from "@/components/admin/admin-topbar";

function getCookie(name: string): string | null {
  if (typeof document === "undefined") return null;
  const match = document.cookie.match(new RegExp(`(?:^|;\\s*)${name}=([^;]*)`));
  return match ? match[1] : null;
}

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  const isLogin = pathname === "/admin/login";

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    const hasToken = !!getCookie("token");
    if (!isLogin && !hasToken) router.push("/admin/login");
  }, [mounted, isLogin, router]);

  if (!mounted && !isLogin) return null;

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
