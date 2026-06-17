"use client";

import { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { AdminSidebar } from "@/components/admin/admin-sidebar";
import { AdminTopbar } from "@/components/admin/admin-topbar";
import { useAuthStore } from "@/store/authStore";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const { token } = useAuthStore();
  const isLogin = pathname === "/admin/login";

  useEffect(() => {
    if (!isLogin && !token) router.push("/admin/login");
  }, [isLogin, token, router]);

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
