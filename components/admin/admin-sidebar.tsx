"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { BarChart2, CheckSquare, ClipboardList, FolderOpen, LayoutDashboard, Package, Zap } from "lucide-react";
import { cn } from "@/lib/utils";

const menus = [
  { href: "/admin/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/pesanan", label: "Pesanan", icon: Package },
  { href: "/admin/proyek", label: "Proyek", icon: FolderOpen },
  { href: "/admin/sprint", label: "Sprint", icon: Zap },
  { href: "/admin/tasks", label: "Tasks", icon: CheckSquare },
  { href: "/admin/backlog", label: "Backlog", icon: ClipboardList },
  { href: "/admin/laporan", label: "Laporan", icon: BarChart2 },
];

export function AdminSidebar() {
  const pathname = usePathname();
  return (
    <aside className="w-64 border-r border-border bg-card">
      <div className="p-4 text-2xl font-black">CuanPage.</div>
      <nav className="space-y-1 px-2">
        {menus.map((menu) => (
          <Link key={menu.href} href={menu.href} className={cn("mx-2 flex items-center gap-3 rounded-xl px-3 py-2 text-muted-foreground transition-all hover:bg-muted", pathname === menu.href && "bg-foreground text-background")}>
            <menu.icon className="h-4 w-4" />
            <span>{menu.label}</span>
          </Link>
        ))}
      </nav>
    </aside>
  );
}
