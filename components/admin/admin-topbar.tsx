"use client";

import { ChevronDown } from "lucide-react";
import { useAuthStore } from "@/store/authStore";
import { ThemeToggle } from "@/components/common/theme-toggle";

export function AdminTopbar({ title }: { title: string }) {
  const { user, logout } = useAuthStore();
  return (
    <header className="sticky top-0 z-40 flex h-16 items-center justify-between border-b border-border bg-card/80 px-6 backdrop-blur-md">
      <h1 className="text-xl font-semibold">{title}</h1>
      <div className="flex items-center gap-3">
        <ThemeToggle />
        <div className="flex items-center gap-2 rounded-full border border-border px-3 py-1.5">
          <div className="flex h-7 w-7 items-center justify-center rounded-full bg-foreground text-xs font-bold text-background">{user?.name?.[0] ?? "A"}</div>
          <p className="text-sm">{user?.name ?? "Admin"}</p>
          <button onClick={() => { logout(); window.location.href = "/admin/login"; }}>
            <ChevronDown className="h-4 w-4" />
          </button>
        </div>
      </div>
    </header>
  );
}
