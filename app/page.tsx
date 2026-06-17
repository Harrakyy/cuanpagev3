/* eslint-disable react/no-unescaped-entities */
"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion, useMotionValueEvent, useScroll } from "framer-motion";
import { useMemo, useRef, useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  BarChart2,
  Menu,
  MessageSquare,
  Package,
  Phone,
  User,
} from "lucide-react";
import { ThemeToggle } from "@/components/common/theme-toggle";

export default function Home() {
  const router = useRouter();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [navSolid, setNavSolid] = useState(false);
  const [trackingNo, setTrackingNo] = useState("");
  const testimonialRef = useRef<HTMLDivElement>(null);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (value) => {
    setNavSolid(value > 24);
  });

  const fadeUp = useMemo(
    () => ({
      hidden: { opacity: 0, y: 40 },
      visible: (i = 0) => ({
        opacity: 1,
        y: 0,
        transition: { duration: 0.7, delay: i * 0.1 },
      }),
    }),
    [],
  );

  const portfolio = [
    ["TokoFresh - E-Commerce Sembako Online", "E-Commerce", "Next.js + Laravel", "from-emerald-500 to-teal-600", "Platform toko online sembako dengan fitur real-time stock, payment Midtrans, dan admin panel lengkap."],
    ["KlinikSehat - Sistem Booking Dokter", "Booking System", "Next.js + Express.js", "from-blue-500 to-cyan-600", "Sistem reservasi dokter online dengan notifikasi WhatsApp otomatis dan manajemen jadwal dokter."],
    ["CV Maju Jaya Konstruksi - Company Profile", "Company Profile", "Next.js", "from-amber-500 to-orange-600", "Website company profile modern dengan portofolio proyek, galeri, dan form konsultasi terintegrasi."],
    ["TrackPro - Sistem Manajemen Project", "Project Tracker", "Next.js + Express.js", "from-violet-500 to-purple-600", "Platform manajemen proyek dengan fitur Agile sprint, kanban board, dan tracking progress real-time."],
    ["AgroAI - Dashboard Pertanian Pintar", "AI Website", "Next.js + Django", "from-green-500 to-lime-600", "Dashboard analitik pertanian dengan prediksi cuaca AI, monitoring sensor IoT, dan rekomendasi tanam."],
    ["BelajarKu - Platform E-Learning", "Web App", "Laravel + React", "from-rose-500 to-pink-600", "Platform belajar online dengan video streaming, quiz interaktif, sertifikat otomatis, dan dashboard siswa."],
  ];

  return (
    <main className="animate-in fade-in duration-300">
      <header className={`sticky top-0 z-40 transition-all duration-300 ${navSolid ? "border-b border-border bg-background/80 backdrop-blur-md" : "bg-transparent"}`}>
        <div className="container-default flex h-16 items-center justify-between">
          <p className="text-2xl font-black tracking-tight">CuanPage.</p>
          <nav className="hidden items-center gap-4 whitespace-nowrap text-sm font-medium text-muted-foreground lg:flex">
            {["home", "layanan", "cara-kerja", "portfolio", "teknologi", "testimoni", "faq", "tracking"].map((item) => (
              <a key={item} href={item === "tracking" ? "/tracking" : `#${item}`} className="transition-colors hover:text-foreground">
                {item === "tracking" ? "TRACKING" : item.replace("-", " ").toUpperCase()}
              </a>
            ))}
          </nav>
          <div className="flex items-center gap-2">
            <ThemeToggle />
            <Link href="/konsultasi" className="rounded-full bg-foreground px-6 py-2.5 text-sm font-semibold text-background">
              Mulai Project →
            </Link>
            <Link
              href="/admin/login"
              title="Admin Login"
              className="ml-2 flex items-center gap-2"
            >
              <span className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-full border border-border bg-muted transition-all hover:bg-muted-foreground/20">
                <User size={16} />
              </span>
              <span className="hidden text-xs font-medium text-muted-foreground md:inline">Masuk</span>
            </Link>
            <button onClick={() => setMobileOpen((v) => !v)} className="rounded-lg p-2 lg:hidden">
              <Menu className="h-5 w-5" />
            </button>
          </div>
        </div>
        {mobileOpen ? (
          <div className="border-t border-border bg-background lg:hidden">
            <div className="container-default flex flex-col py-4 text-sm font-medium">
              {["home", "layanan", "cara-kerja", "portfolio", "teknologi", "testimoni", "faq", "tracking"].map((item) => (
                <a key={item} href={item === "tracking" ? "/tracking" : `#${item}`} className="py-2" onClick={() => setMobileOpen(false)}>
                  {item === "tracking" ? "TRACKING" : item.replace("-", " ").toUpperCase()}
                </a>
              ))}
            </div>
          </div>
        ) : null}
      </header>

      <section id="home" className="relative flex min-h-[100dvh] items-center justify-center overflow-hidden">
        <div className="container-default text-center">
          <motion.p initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0 }} className="mb-4 text-xs font-semibold uppercase tracking-[0.3em] text-muted-foreground">Jasa Pembuatan Website Profesional</motion.p>
          <motion.h1 initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="mx-auto max-w-5xl text-6xl font-black leading-none tracking-tighter md:text-8xl">Website Canggih Terintegrasi AI, Selesai Tepat Waktu.</motion.h1>
          <motion.p initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="mx-auto mt-6 max-w-3xl text-lg text-muted-foreground">Dari toko online, company profile, sistem booking, hingga web app bertenaga AI - semua dikerjakan dengan teknologi terkini.</motion.p>
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }} className="mt-10 flex flex-wrap justify-center gap-4">
            <Link href="/konsultasi" className="rounded-full bg-foreground px-6 py-2.5 font-semibold text-background">Mulai Project →</Link>
            <a href="#portfolio" className="rounded-full border-2 border-foreground px-6 py-2.5 font-semibold">Lihat Portfolio</a>
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.7 }} className="mt-6 flex flex-wrap justify-center gap-4 text-sm text-muted-foreground">
            <span>✓ Konsultasi Gratis</span><span>✓ Estimasi Harga Instan</span><span>✓ Tracking Progress Real-time</span>
          </motion.div>
          <motion.p initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.8 }} className="mt-3 text-sm font-medium text-muted-foreground">
            Mulai dari Rp 500.000 · Konsultasi Gratis · Estimasi Harga Instan
          </motion.p>
        </div>
        {[
          ["Ahmad Rizki", "Websitenya cepat dan super rapi!", "top-20 left-8", "0s"],
          ["Budi Santoso", "Hasil kerjanya sangat memuaskan!", "bottom-32 left-4", "0.8s"],
          ["Dewi Sartika", "CuanPage is the best! Project selesai on time!", "top-24 right-8", "1.6s"],
          ["Siti Nurhaliza", "Komunikasi lancar, hasil maksimal!", "bottom-20 right-4", "2.4s"],
        ].map((item, i) => (
          <motion.div
            key={item[0]}
            initial={{ opacity: 0, x: i % 2 === 0 ? -40 : 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.8 + i * 0.1 }}
            style={{ animationDelay: item[3] }}
            className={`hidden md:block animate-float absolute w-56 rounded-2xl border border-border bg-card p-4 shadow-lg ${item[2]}`}
          >
            <div className="mb-2 flex items-center gap-2"><div className="flex h-8 w-8 items-center justify-center rounded-full bg-foreground text-xs font-bold text-background">{item[0].split(" ").map((n) => n[0]).join("")}</div><p className="text-sm font-semibold">{item[0]}</p></div>
            <p className="text-yellow-500">★★★★★</p><p className="text-sm text-muted-foreground">{item[1]}</p>
          </motion.div>
        ))}
      </section>

      <section className="w-full overflow-hidden border-y border-border bg-muted/30 py-6">
        <div className="w-full overflow-hidden text-sm font-medium text-muted-foreground">
          <div className="animate-marquee flex whitespace-nowrap gap-6">
            {["Next.js", "Laravel", "Express.js", "Django", "React", "Tailwind CSS", "Supabase", "PostgreSQL", "REST API", "AI Integration", "Next.js", "Laravel"].map((t, i) => <span key={`m1-${t}-${i}`}>{t} ·</span>)}
          </div>
        </div>
        <div className="mt-3 w-full overflow-hidden text-sm font-medium text-muted-foreground">
          <div className="animate-marquee-reverse flex whitespace-nowrap gap-6">
            {["E-Commerce", "Company Profile", "Booking System", "AI Website", "Project Tracker", "Dashboard", "Landing Page", "Web App", "SaaS", "E-Commerce"].map((t, i) => <span key={`m2-${t}-${i}`}>{t} ·</span>)}
          </div>
        </div>
      </section>

      <section id="layanan" className="section-padding">
        <div className="container-default">
          <motion.p variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">Layanan Kami</motion.p>
          <motion.h2 variants={fadeUp} custom={1} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} className="mt-3 text-4xl font-bold tracking-tight">Apa yang Bisa Kami Bangun untuk Kamu?</motion.h2>
          <motion.p variants={fadeUp} custom={2} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} className="mt-3 max-w-3xl text-muted-foreground">Semua project bersifat custom, dikerjakan sesuai kebutuhan spesifik bisnis kamu.</motion.p>
          <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} className="lg:col-span-2 rounded-2xl bg-foreground p-8 text-background">
              <div className="mb-3 inline-block rounded-full bg-background/20 px-3 py-1 text-xs font-semibold uppercase tracking-widest">Unggulan</div>
              <h3 className="text-2xl font-bold">🤖 Website Terintegrasi AI</h3>
              <p className="mt-3 text-background/80">Website bisnis kamu dilengkapi fitur AI - chatbot, rekomendasi otomatis, analisis data, atau asisten virtual.</p>
              <p className="mt-3 text-sm font-semibold">Mulai dari Rp 4.000.000</p>
              <p className="mt-4 text-sm font-semibold">Teknologi: Next.js + Groq / OpenAI API</p>
              <div className="mt-4 flex flex-wrap gap-2">{["AI Chatbot", "Auto Recommendations", "Smart Analytics", "Voice Assistant"].map((f) => <span key={f} className="rounded-full border border-background/30 px-3 py-1 text-xs">{f}</span>)}</div>
            </motion.div>
            {[
              ["🛒 E-Commerce & Toko Online", "Toko online lengkap dengan katalog produk, keranjang belanja, payment gateway, dan panel admin.", "Mulai dari Rp 3.000.000", "Framework: Next.js / Laravel"],
              ["🏢 Company Profile & Branding", "Website profesional yang merepresentasikan bisnis kamu - clean, fast, dan SEO-friendly.", "Mulai dari Rp 1.500.000", "Framework: Next.js / Laravel"],
              ["📅 Sistem Jadwal & Booking", "Kelola jadwal, reservasi, dan appointment secara otomatis. Cocok untuk klinik, salon, gym, konsultan.", "Mulai dari Rp 2.000.000", "Framework: Next.js + Express.js"],
              ["📦 Sistem Tracking & Manajemen", "Pantau status pesanan, project, atau pengiriman secara real-time dengan dashboard yang informatif.", "Mulai dari Rp 2.000.000", "Framework: Next.js + Express.js / Django"],
              ["📊 Dashboard & Data Analytics", "Visualisasi data bisnis kamu dalam dashboard yang interaktif dan mudah dipahami.", "Mulai dari Rp 3.000.000", "Framework: Next.js + Django / Express.js"],
              ["🧩 Landing Page Conversion", "Landing page cepat dengan struktur CTA yang jelas, performa tinggi, dan siap iklan.", "Mulai dari Rp 500.000", "Framework: Next.js"],
            ].map((item, i) => (
              <motion.div key={item[0]} variants={fadeUp} custom={i + 1} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} whileHover={{ scale: 1.02 }} className="rounded-2xl border border-border bg-card p-6 shadow-sm transition-all hover:shadow-lg">
                <h3 className="text-xl font-semibold">{item[0]}</h3>
                <p className="mt-3 text-muted-foreground">{item[1]}</p>
                <p className="mt-4 text-sm font-semibold">{item[2]}</p>
                <p className="mt-2 inline-block rounded-full bg-muted px-3 py-1 text-xs font-semibold">{item[3]}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section id="cara-kerja" className="section-padding bg-muted/40">
        <div className="container-default">
          <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">Proses</p>
          <h2 className="mt-3 text-4xl font-bold tracking-tight">Dari Konsultasi hingga Website Jadi</h2>
          <div className="mt-12 grid gap-6 lg:grid-cols-3">
            {[
              { no: "01", icon: MessageSquare, title: "Ceritakan Kebutuhan", desc: "Isi form kebutuhan kamu. AI kami langsung menganalisis dan memberikan estimasi harga + durasi pengerjaan secara instan.", cta: "Coba Sekarang →", href: "/konsultasi" },
              { no: "02", icon: Phone, title: "Konsultasi & Deal", desc: "Hasil analisis AI dikirim langsung ke WhatsApp aku. Kita diskusi detail, finalisasi harga, dan mulai pengerjaan.", cta: "Tidak ada biaya konsultasi. 100% gratis.", href: "" },
              { no: "03", icon: BarChart2, title: "Pantau Progress", desc: "Setiap update pengerjaan bisa kamu pantau real-time lewat halaman tracking dengan nomor order kamu.", cta: "Cek Tracking →", href: "/tracking" },
            ].map((step, i) => {
              const Icon = step.icon;
              return (
                <motion.div key={step.no} variants={fadeUp} custom={i} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} className="relative rounded-2xl border border-border bg-card p-6">
                  <p className="text-4xl font-black text-muted">{step.no}</p>
                  <Icon className="mt-4 h-6 w-6" />
                  <h3 className="mt-3 text-xl font-semibold">{step.title}</h3>
                  <p className="mt-2 text-muted-foreground">{step.desc}</p>
                  {step.href ? <Link href={step.href} className="mt-4 inline-block font-semibold">{step.cta}</Link> : <p className="mt-4 text-sm font-semibold text-muted-foreground">{step.cta}</p>}
                  {i < 2 ? <span className="absolute -right-5 top-1/2 hidden h-px w-10 bg-border lg:block" /> : null}
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      <section id="portfolio" className="section-padding">
        <div className="container-default">
          <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">Portfolio</p>
          <h2 className="mt-3 text-4xl font-bold tracking-tight">Project yang Sudah Kami Kerjakan</h2>
          <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {portfolio.map((p, i) => (
              <motion.div key={p[0]} variants={fadeUp} custom={i} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} className="group overflow-hidden rounded-2xl border border-border bg-card">
                <div className={`relative h-44 bg-gradient-to-br ${p[3]} transition-transform duration-300 group-hover:scale-105`}>
                  <div className="absolute inset-0 bg-black/0 transition-all duration-300 group-hover:bg-black/35" />
                  <div className="absolute bottom-4 left-4 opacity-0 transition-all duration-300 group-hover:opacity-100"><button className="rounded-full bg-white px-4 py-2 text-sm font-semibold text-black">Lihat Detail →</button></div>
                </div>
                <div className="p-6">
                  <h3 className="text-lg font-semibold">{p[0]}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">{p[1]} · {p[2]}</p>
                  <p className="mt-3 text-sm text-muted-foreground">{p[4]}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section id="teknologi" className="section-padding bg-muted/40">
        <div className="container-default">
          <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">Teknologi</p>
          <h2 className="mt-3 text-4xl font-bold tracking-tight">Stack yang Kami Kuasai</h2>
          <div className="mt-10 grid gap-3 md:grid-cols-2 lg:grid-cols-4">
            {["Next.js", "React", "Tailwind CSS", "TypeScript", "Express.js", "Laravel", "Django", "Node.js", "PostgreSQL", "MySQL", "Supabase", "MongoDB", "Groq API", "OpenAI", "Vercel", "Git"].map((tech, i) => (
              <motion.div key={tech} variants={fadeUp} custom={i * 0.2} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} className="flex items-center gap-2 rounded-full border border-border px-4 py-2 text-sm font-medium">
                <span className="h-2 w-2 rounded-full bg-foreground" />
                {tech}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section id="testimoni" className="section-padding">
        <div className="container-default">
          <div className="mb-8 flex items-end justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">Testimoni</p>
              <h2 className="mt-3 text-4xl font-bold tracking-tight">Apa Kata Mereka</h2>
            </div>
            <div className="hidden gap-2 md:flex">
              <button onClick={() => testimonialRef.current?.scrollBy({ left: -320, behavior: "smooth" })} className="rounded-full border border-border p-2"><ArrowLeft className="h-4 w-4" /></button>
              <button onClick={() => testimonialRef.current?.scrollBy({ left: 320, behavior: "smooth" })} className="rounded-full border border-border p-2"><ArrowRight className="h-4 w-4" /></button>
            </div>
          </div>
          <div ref={testimonialRef} className="flex snap-x snap-mandatory gap-4 overflow-x-auto pb-2">
            {[
              ["Budi Santoso", "Owner TokoFresh", "Websitenya bagus banget dan selesai tepat waktu! Fitur trackingnya bikin aku tenang karena bisa pantau progress kapan saja."],
              ["dr. Sinta Rahayu", "KlinikSehat", "Sistem booking-nya sangat membantu. Pasien kami naik 40% setelah pakai website baru ini."],
              ["Ahmad Fauzi", "CV Maju Jaya", "Company profile kami jadi jauh lebih profesional. Banyak klien yang bilang terkesan dengan websitenya."],
              ["Rina Kusuma", "TrackPro", "Manajemen project kami jadi lebih rapi. Kanban board-nya sangat intuitif untuk tim developer kami."],
              ["Pak Hendra", "AgroAI", "Dashboard AI-nya luar biasa! Prediksi cuaca dan rekomendasinya akurat dan sangat membantu petani kami."],
              ["Maya Putri", "BelajarKu", "Platform e-learning kami selesai lebih cepat dari ekspektasi. Kualitas kodenya bersih dan mudah di-maintain."],
            ].map((t) => (
              <div key={t[0]} className="min-w-80 snap-start rounded-2xl border border-border bg-card p-6">
                <p className="text-yellow-500">★★★★★</p>
                <p className="mt-3">{t[2]}</p>
                <p className="mt-4 font-semibold">{t[0]}</p>
                <p className="text-sm text-muted-foreground">{t[1]}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-y border-border bg-muted/50 py-16">
        <div className="container-default grid items-center gap-12 lg:grid-cols-2">
          <div>
            <Package className="h-12 w-12" />
            <h2 className="mt-4 text-4xl font-bold tracking-tight">Sudah Pesan? Pantau Progress Website Kamu</h2>
            <p className="mt-3 text-muted-foreground">Masukkan nomor order yang kamu terima setelah konsultasi untuk melihat update pengerjaan secara real-time.</p>
            <div className="mt-4 flex flex-wrap gap-4 text-sm text-muted-foreground"><span>✓ Update real-time</span><span>✓ Timeline lengkap</span><span>✓ Progress sprint</span><span>✓ Tanpa login</span></div>
          </div>
          <form onSubmit={(e) => { e.preventDefault(); if (trackingNo.trim()) router.push(`/tracking/${trackingNo.toUpperCase()}`); }} className="rounded-2xl border border-border bg-card p-8">
            <input value={trackingNo} onChange={(e) => setTrackingNo(e.target.value)} placeholder="Masukkan nomor order... (ORD-xxx)" className="w-full rounded-xl border border-border bg-background px-4 py-3" />
            <button className="mt-4 w-full rounded-full bg-foreground px-6 py-2.5 font-semibold text-background">Cek Status →</button>
          </form>
        </div>
      </section>

      <section id="faq" className="section-padding">
        <div className="container-default">
          <h2 className="text-center text-4xl font-bold tracking-tight">Pertanyaan Umum</h2>
          <div className="mx-auto mt-10 max-w-3xl space-y-4">
            {["Berapa lama pengerjaan website?", "Apakah bisa custom fitur AI?", "Framework apa yang digunakan?", "Bagaimana cara tracking progress pengerjaan?", "Apakah ada garansi revisi?", "Bagaimana cara mulai order?"].map((q) => (
              <details key={q} className="rounded-2xl border border-border bg-card p-5">
                <summary className="cursor-pointer font-semibold">{q}</summary>
                <p className="mt-2 text-muted-foreground">Kami sesuaikan dengan kebutuhan, kompleksitas, dan target waktu project kamu.</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section className="section-padding bg-foreground text-background">
        <div className="container-default text-center">
          <h2 className="text-5xl font-bold tracking-tight">Siap Wujudkan Website Impian Kamu?</h2>
          <p className="mx-auto mt-4 max-w-2xl text-background/80">Konsultasi gratis, estimasi harga instan, dan progress bisa dipantau kapan saja.</p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Link href="/konsultasi" className="rounded-full bg-background px-6 py-2.5 font-semibold text-foreground">Mulai Konsultasi Gratis →</Link>
            <a href="#portfolio" className="rounded-full border border-background/30 px-6 py-2.5 font-semibold">Lihat Portfolio</a>
          </div>
        </div>
      </section>

      <footer className="bg-[#111] py-14 text-white">
        <div className="container-default grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          <div><p className="text-2xl font-black">CuanPage.</p><p className="mt-2 text-sm text-white/70">Website custom untuk bisnis modern.</p></div>
          <div><p className="font-semibold">Layanan</p><p className="mt-2 space-y-1 text-sm text-white/70">E-Commerce<br />Company Profile<br />Booking System<br />AI Website<br />Dashboard</p></div>
          <div><p className="font-semibold">Link</p><p className="mt-2 space-y-1 text-sm text-white/70">Home<br />Portfolio<br />Cara Kerja<br />Tracking Order<br />Konsultasi</p></div>
          <div><p className="font-semibold">Kontak</p><p className="mt-2 text-sm text-white/70">WhatsApp: 08xxxxxxxxxx<br />Email: hello@cuanpage.id</p></div>
        </div>
        <div className="container-default mt-10 border-t border-white/10 pt-5 text-sm text-white/60">Copyright © 2026 CuanPage. · Made with Next.js & ☕</div>
      </footer>
    </main>
  );
}
