import Link from "next/link";
import { CheckCircle } from "lucide-react";

const projects = {
  "1": { name: "Toko Baju Online", category: "E-Commerce", gradient: "from-blue-500 to-purple-600" },
  "2": { name: "CV Perusahaan Konstruksi", category: "Company Profile", gradient: "from-green-500 to-teal-600" },
  "3": { name: "Landing Page Startup", category: "Landing Page", gradient: "from-orange-500 to-red-600" },
  "4": { name: "SaaS Dashboard", category: "Web App", gradient: "from-violet-500 to-indigo-600" },
} as const;

export default function ProjectDetailPage({ params }: { params: { id: string } }) {
  const project = projects[params.id as keyof typeof projects];
  if (!project) return <main className="container-default py-20">Project tidak ditemukan.</main>;
  return (
    <main className="pb-20">
      <div className={`h-64 bg-gradient-to-br ${project.gradient}`} />
      <div className="container-default -mt-16">
        <div className="rounded-2xl border border-border bg-card p-8">
          <Link href="/" className="text-sm text-muted-foreground">← Kembali</Link>
          <h1 className="mt-3 text-5xl font-bold tracking-tight">{project.name}</h1>
          <span className="mt-4 inline-block rounded-full bg-muted px-3 py-1 text-xs font-semibold">{project.category}</span>
          <p className="mt-4 text-muted-foreground">Project dikembangkan untuk kebutuhan bisnis dengan performa tinggi dan desain premium.</p>
          <div className="mt-6 flex flex-wrap gap-2">{["Next.js", "React", "Tailwind", "Supabase"].map((t) => <span key={t} className="rounded-full border border-border px-3 py-1 text-sm">{t}</span>)}</div>
          <ul className="mt-6 space-y-2">
            {["UI responsive", "Optimasi SEO", "Dashboard admin"].map((f) => (
              <li key={f} className="flex items-center gap-2"><CheckCircle className="h-4 w-4" /> {f}</li>
            ))}
          </ul>
          <Link href="/konsultasi" className="mt-8 inline-block rounded-full bg-foreground px-6 py-2.5 font-semibold text-background">Mulai Project Serupa →</Link>
        </div>
      </div>
    </main>
  );
}
