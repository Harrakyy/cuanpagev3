import { LucideIcon } from "lucide-react";

export function StatsCard({
  title,
  value,
  icon: Icon,
}: {
  title: string;
  value: string | number;
  icon: LucideIcon;
}) {
  return (
    <div className="rounded-2xl border border-border bg-card p-6 shadow-sm transition-all duration-200 hover:shadow-md">
      <div className="mb-3 flex items-center justify-between">
        <p className="text-sm text-muted-foreground">{title}</p>
        <div className="rounded-full bg-muted p-2">
          <Icon className="h-4 w-4" />
        </div>
      </div>
      <h3 className="text-2xl font-bold">{value}</h3>
    </div>
  );
}
