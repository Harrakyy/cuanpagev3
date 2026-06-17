import { cn } from "@/lib/utils";

const statusMap: Record<string, string> = {
  pending: "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400",
  in_progress: "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400",
  revision: "bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-400",
  completed: "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400",
  rejected: "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400",
  todo: "bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300",
  review: "bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-400",
  testing: "bg-cyan-100 text-cyan-800 dark:bg-cyan-900/30 dark:text-cyan-400",
  done: "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400",
  low: "bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400",
  medium: "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400",
  high: "bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400",
  critical: "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400",
  active: "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400",
  planning: "bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300",
  on_hold: "bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400",
};

export function StatusBadge({ status }: { status: string }) {
  return (
    <span className={cn("rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-wider", statusMap[status] ?? statusMap.todo)}>
      {status.replace("_", " ")}
    </span>
  );
}
