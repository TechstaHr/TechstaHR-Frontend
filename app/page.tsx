"use client";

import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, useInView, useScroll, useTransform } from "motion/react";
import { Space_Grotesk, DM_Sans } from "next/font/google";
import {
  Users, Clock, DollarSign, BarChart3, ChevronRight, Shield, Zap, Globe,
  Layers, CheckCircle2, ArrowRight, Target, TrendingUp, Building2,
  UserCheck, Monitor, Rocket, Menu, X, Star, Award, Lock, ArrowUpRight,
} from "lucide-react";

const spaceGrotesk = Space_Grotesk({ subsets: ["latin"], weight: ["400", "500", "600", "700"], variable: "--font-space" });
const dmSans = DM_Sans({ subsets: ["latin"], weight: ["300", "400", "500", "600", "700"], variable: "--font-dm" });

/* counter */
function useCounter(end: number, dur = 2200) {
  const [c, setC] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const iv = useInView(ref, { once: true });
  useEffect(() => {
    if (!iv) return;
    let s = 0; const inc = end / (dur / 16);
    const t = setInterval(() => { s += inc; if (s >= end) { setC(end); clearInterval(t); } else setC(Math.floor(s)); }, 16);
    return () => clearInterval(t);
  }, [iv, end, dur]);
  return { c, ref };
}

/* variants */
const rise = {
  hidden: { opacity: 0, y: 50 },
  show: (i: number) => ({ opacity: 1, y: 0, transition: { delay: i * 0.1, duration: 0.7, ease: [0.16, 1, 0.3, 1] } }),
};
const stg = { hidden: {}, show: { transition: { staggerChildren: 0.12 } } };

/* palette — warm gold on light */
const P = {
  accent: "#C48A0A",
  accentLight: "#E5A912",
  accentPale: "#FFF6DD",
  accentSoft: "rgba(196,138,10,0.14)",
  secondary: "#1C9A63",
  secondaryLight: "#35B97C",
  secondaryPale: "#EAF9F1",
  secondarySoft: "rgba(28,154,99,0.16)",
  bg: "#FEFDFB",
  card: "#FFFFFF",
  border: "rgba(0,0,0,0.06)",
  txt: "#181818",
  mid: "#555",
  lite: "#999",
  faint: "#CCC",
};

const steps = [
  { n: "01", title: "Organise", desc: "Add your team, set up roles & structure.", icon: UserCheck },
  { n: "02", title: "Manage", desc: "Track daily operations & tasks in real time.", icon: Monitor },
  { n: "03", title: "Optimise", desc: "Run payroll & access performance insights.", icon: TrendingUp },
];

const ownerBenefits = ["Save hours on manual admin", "Faster, data-driven decisions", "Reduce payroll errors", "Full visibility into performance", "Eliminate tool switching", "Scale without complexity"];
const teamWins = ["Clear roles & expectations", "Timely salary payments", "Transparent performance tracking", "Better accountability", "More motivation through clarity", "Improved collaboration"];

export default function LandingPage() {
  const [nav, setNav] = useState(false);
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const heroY = useTransform(scrollYProgress, [0, 1], [0, 120]);

  const Num = ({ v, s, l }: { v: number; s: string; l: string }) => {
    const { c, ref } = useCounter(v);
    return (
      <div ref={ref} className="text-center">
        <p className="tabular-nums" style={{ fontFamily: "var(--font-space)", fontSize: "clamp(2rem, 4vw, 3rem)", fontWeight: 700, color: P.accent }}>{c}{s}</p>
        <p className="mt-1 text-xs font-medium uppercase tracking-[0.15em]" style={{ color: P.lite }}>{l}</p>
      </div>
    );
  };

  return (
    <div className={`${spaceGrotesk.variable} ${dmSans.variable}`} style={{ fontFamily: "var(--font-dm)", background: P.bg, color: P.txt }}>

      {/* ━━━ NAVBAR ━━━ */}
      <header className="fixed inset-x-0 top-0 z-50 backdrop-blur-2xl" style={{ background: "rgba(254,253,251,0.9)", borderBottom: `1px solid ${P.border}` }}>
        <div className="mx-auto flex h-16 max-w-[1200px] items-center justify-between px-6">
          <Link href="/"><Image src="/images/techstahr-logo.svg" alt="TechstaHR" width={70} height={18} /></Link>

          <nav className="hidden md:flex items-center gap-7">
            {["Features", "Process", "Benefits"].map(t => (
              <a key={t} href={`#${t.toLowerCase()}`} className="text-[13px] font-medium transition hover:opacity-70" style={{ color: P.mid }}>{t}</a>
            ))}
          </nav>

          <div className="hidden md:flex items-center gap-3">
            <Link href="/login" className="text-[13px] font-medium px-4 py-2 rounded-lg transition hover:opacity-70" style={{ color: P.mid }}>Sign In</Link>
            <Link href="/register" className="text-[13px] font-semibold px-5 py-2.5 rounded-lg text-white shadow transition hover:shadow-lg" style={{ background: P.accent }}>
              Get Started Free
            </Link>
          </div>

          <button className="md:hidden" onClick={() => setNav(!nav)} style={{ color: P.mid }}>{nav ? <X size={22} /> : <Menu size={22} />}</button>
        </div>

        {nav && (
          <div className="md:hidden border-t px-6 pb-5 pt-3" style={{ borderColor: P.border, background: P.bg }}>
            {["Features", "Process", "Benefits"].map(t => (
              <a key={t} href={`#${t.toLowerCase()}`} className="block py-2 text-sm" style={{ color: P.mid }} onClick={() => setNav(false)}>{t}</a>
            ))}
            <Link href="/login" className="block py-2 text-sm" style={{ color: P.mid }}>Sign In</Link>
            <Link href="/register" className="mt-2 block rounded-lg py-2.5 text-center text-sm font-semibold text-white" style={{ background: P.accent }}>Get Started</Link>
          </div>
        )}
      </header>

      {/* ━━━ HERO ━━━ */}
      <section ref={heroRef} className="relative overflow-hidden pt-28 pb-20 md:pt-36 md:pb-28 lg:pt-44 lg:pb-36">
        {/* mesh gradient bg */}
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute top-0 right-0 w-[55%] h-full" style={{ background: `linear-gradient(160deg, ${P.accentPale} 0%, transparent 70%)` }} />
          <div className="absolute -bottom-20 left-[20%] h-[400px] w-[400px] rounded-full blur-[180px]" style={{ background: "rgba(229,169,18,0.08)" }} />
          <div className="absolute -top-10 left-0 h-[280px] w-[280px] rounded-full blur-[150px]" style={{ background: P.secondarySoft }} />
        </div>

        <div className="relative z-10 mx-auto max-w-[1200px] px-6">
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-8 items-center">
            <motion.div initial="hidden" animate="show" variants={stg}>
              {/* overline */}
              <motion.div variants={rise} custom={0} className="flex items-center gap-2 mb-6">
                <div className="h-px w-8" style={{ background: P.accent }} />
                <span className="text-[11px] font-semibold uppercase tracking-[0.2em]" style={{ color: P.accent }}>Workforce Management Platform</span>
              </motion.div>

              <motion.div variants={rise} custom={1} className="inline-flex items-center gap-2 rounded-full px-3 py-1 text-[11px] font-medium" style={{ background: P.secondaryPale, color: P.secondary }}>
                <span className="h-2 w-2 rounded-full" style={{ background: P.secondaryLight }} />
                Payroll, performance, and team ops in sync
              </motion.div>

              {/* headline */}
              <motion.h1 variants={rise} custom={2} className="mt-6" style={{ fontFamily: "var(--font-space)", fontSize: "clamp(2.5rem, 6vw, 5rem)", fontWeight: 700, lineHeight: 1.05, letterSpacing: "-0.03em" }}>
                Your People.<br />
                <span style={{ color: P.accent }}>Your Payroll.</span><br />
                One Platform.
              </motion.h1>

              <motion.p variants={rise} custom={3} className="mt-6 max-w-lg text-base leading-relaxed md:text-lg" style={{ color: P.mid }}>
                Stop juggling spreadsheets. Manage your team, track performance, and run payroll — all from one place.
              </motion.p>

              <motion.div variants={rise} custom={4} className="mt-8 flex flex-wrap gap-3">
                <Link href="/register" className="group inline-flex items-center gap-2 rounded-lg px-6 py-3.5 text-sm font-semibold text-white shadow-lg transition hover:shadow-xl" style={{ background: P.accent }}>
                  Start for Free <ArrowUpRight size={15} className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                </Link>
                <Link href="/login" className="inline-flex items-center gap-2 rounded-lg border px-6 py-3.5 text-sm font-medium transition hover:shadow" style={{ borderColor: P.border, color: P.mid }}>
                  Sign In <ArrowRight size={15} />
                </Link>
              </motion.div>

              {/* social proof strip */}
              <motion.div variants={rise} custom={5} className="mt-12 flex flex-wrap items-center gap-8">
                {[{ v: 500, s: "+", l: "Teams" }, { v: 98, s: "%", l: "Uptime" }, { v: 40, s: "%", l: "Time Saved" }].map(st => (
                  <Num key={st.l} v={st.v} s={st.s} l={st.l} />
                ))}
              </motion.div>
            </motion.div>

            {/* Right — Product image */}
            <motion.div initial="hidden" animate="show" variants={stg} className="hidden lg:block relative lg:ml-auto w-full max-w-[560px]" style={{ y: heroY }}>
              <motion.div variants={rise} custom={2} className="relative rounded-2xl overflow-hidden border shadow-2xl" style={{ borderColor: P.border, background: P.card, transform: "perspective(1000px) rotateY(-8deg) rotateX(4deg)", transformStyle: "preserve-3d" }}>
                <div className="absolute inset-0 z-10 pointer-events-none rounded-2xl ring-1 ring-inset ring-black/5" />
                {/* Minimal browser bar */}
                <div className="bg-[#f8f9fa] border-b border-black/5 px-4 py-3 flex items-center gap-2">
                  <div className="flex gap-1.5">
                    <div className="w-2.5 h-2.5 rounded-full bg-[#ff5f56]" />
                    <div className="w-2.5 h-2.5 rounded-full bg-[#ffbd2e]" />
                    <div className="w-2.5 h-2.5 rounded-full bg-[#27c93f]" />
                  </div>
                </div>
                {/* Mockup Image */}
                <div className="relative w-full aspect-[4/3] bg-gray-50">
                  <Image
                    src="/images/image.png"
                    alt="TechstaHR Platform Dashboard interface"
                    fill
                    className="object-cover object-left-top"
                    priority
                  />
                </div>
              </motion.div>

              {/* decorative element */}
              <motion.div variants={rise} custom={3} className="absolute -bottom-6 -left-12 rounded-xl p-4 shadow-xl border flex items-center gap-3" style={{ background: P.card, borderColor: P.border }}>
                <div className="h-10 w-10 rounded-full flex items-center justify-center shrink-0" style={{ background: P.secondaryPale, color: P.secondary }}>
                  <Star size={18} />
                </div>
                <div>
                  <p className="text-xs font-bold" style={{ fontFamily: "var(--font-space)" }}>Top Rated HR</p>
                  <p className="text-[11px]" style={{ color: P.mid }}>By 500+ growing teams and payroll leads</p>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ━━━ MARQUEE ━━━ */}
      <section className="overflow-hidden py-5" style={{ borderTop: `1px solid ${P.border}`, borderBottom: `1px solid ${P.border}` }}>
        <div className="flex animate-marquee whitespace-nowrap gap-12">
          {[...Array(2)].map((_, j) => (
            <React.Fragment key={j}>
              {["Employee Management", "Payroll Automation", "Time Tracking", "Performance Insights", "Team Analytics", "HR Compliance"].map((t, i) => (
                <span key={`${j}-${t}`} className="inline-flex items-center gap-3 text-sm font-medium" style={{ color: P.lite }}>
                  <span className="h-1.5 w-1.5 rounded-full" style={{ background: i % 2 === 0 ? P.accent : P.secondary }} /> {t}
                </span>
              ))}
            </React.Fragment>
          ))}
        </div>
        <style>{`@keyframes marquee{0%{transform:translateX(0)}100%{transform:translateX(-50%)}}.animate-marquee{animation:marquee 25s linear infinite}`}</style>
      </section>

      {/* ━━━ PROBLEM ━━━ */}
      <section className="py-24 lg:py-32" style={{ background: "#fff" }}>
        <div className="mx-auto max-w-[1200px] px-6">
          <motion.div initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.3 }} variants={stg} className="max-w-2xl">
            <motion.div variants={rise} custom={0} className="flex items-center gap-2 mb-4">
              <div className="h-px w-6" style={{ background: P.accent }} />
              <span className="text-[11px] font-semibold uppercase tracking-[0.2em]" style={{ color: P.accent }}>The Problem</span>
            </motion.div>
            <motion.h2 variants={rise} custom={1} style={{ fontFamily: "var(--font-space)", fontSize: "clamp(1.5rem,3.5vw,2.4rem)", fontWeight: 700, lineHeight: 1.15, letterSpacing: "-0.02em" }}>
              Most businesses use 4+ tools just to manage their team. That&apos;s broken.
            </motion.h2>
          </motion.div>

          <motion.div initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.15 }} variants={stg} className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { icon: Layers, t: "Tool Overload", d: "Disconnected apps for HR, payroll, and performance." },
              { icon: Target, t: "Manual Errors", d: "Spreadsheets and manual processes cause costly mistakes." },
              { icon: BarChart3, t: "Zero Visibility", d: "No real-time insight into team productivity." },
              { icon: Clock, t: "Time Drain", d: "Hours wasted on admin instead of growing the business." },
            ].map((item, i) => (
              <motion.div key={i} variants={rise} custom={i} className="rounded-xl border p-6 transition hover:shadow-md" style={{ borderColor: P.border }}>
                <div className="mb-3 inline-flex rounded-lg p-2.5" style={{ background: "#FEF2F2", color: "#EF4444" }}><item.icon size={18} /></div>
                <h3 className="text-sm font-bold mb-1" style={{ fontFamily: "var(--font-space)" }}>{item.t}</h3>
                <p className="text-[13px] leading-relaxed" style={{ color: P.mid }}>{item.d}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ━━━ FEATURES ━━━ */}
      <section id="features" className="py-24 lg:py-32">
        <div className="mx-auto max-w-[1200px] px-6">
          <motion.div initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.3 }} variants={stg} className="max-w-2xl mx-auto text-center">
            <motion.div variants={rise} custom={0} className="flex items-center justify-center gap-2 mb-4">
              <div className="h-px w-6" style={{ background: P.accent }} />
              <span className="text-[11px] font-semibold uppercase tracking-[0.2em]" style={{ color: P.accent }}>Features</span>
              <div className="h-px w-6" style={{ background: P.accent }} />
            </motion.div>
            <motion.h2 variants={rise} custom={1} style={{ fontFamily: "var(--font-space)", fontSize: "clamp(1.5rem,3.5vw,2.4rem)", fontWeight: 700, lineHeight: 1.15, letterSpacing: "-0.02em" }}>
              One platform to replace them all.
            </motion.h2>
          </motion.div>

          <motion.div initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.1 }} variants={stg} className="mt-14 grid gap-5 md:grid-cols-2">
            {[
              { icon: Users, t: "Employee Management", d: "Centralise all team data, roles, departments, and records. Onboard new hires in minutes.", col: "md:row-span-2", img: "/images/features-employees.png" },
              { icon: Clock, t: "Time & Productivity", d: "Real-time work tracking without micromanaging. Know who's doing what, when.", col: "", img: "" },
              { icon: DollarSign, t: "Payroll Automation", d: "Calculate, process, and deliver salaries accurately — on time, every time.", col: "", img: "" },
              { icon: BarChart3, t: "Performance Insights", d: "Data-driven dashboards so you can make smarter decisions about your team's growth.", col: "md:col-span-2 w-full", img: "/images/features-analytics.png" },
            ].map((f, i) => (
              <motion.div key={f.t} variants={rise} custom={i} className={`group relative overflow-hidden rounded-2xl border transition hover:shadow-xl flex flex-col ${f.col}`} style={{ borderColor: P.border, background: P.card }}>
                <div className="absolute -right-8 -top-8 h-20 w-20 rounded-full blur-[50px] opacity-0 transition group-hover:opacity-100" style={{ background: i % 2 === 0 ? P.accentSoft : P.secondarySoft }} />

                <div className="relative z-10 p-8 flex-1">
                  <div className="mb-4 inline-flex rounded-xl p-3 text-white" style={{ background: i % 2 === 0 ? P.accent : P.secondary }}><f.icon size={20} /></div>
                  <h3 className="text-lg font-bold mb-2" style={{ fontFamily: "var(--font-space)" }}>{f.t}</h3>
                  <p className="text-[13px] leading-relaxed max-w-md" style={{ color: P.mid }}>{f.d}</p>
                </div>

                {f.img && (
                  <div className="relative w-full border-t bg-[#f8f9fa] overflow-hidden" style={{ borderColor: P.border, minHeight: f.t === "Employee Management" ? "240px" : "320px", marginTop: "auto" }}>
                    <div className="absolute left-6 top-6 right-0 bottom-0 rounded-tl-xl border-t border-l shadow-2xl overflow-hidden" style={{ borderColor: P.border, background: "#fff" }}>
                      <Image
                        src={f.img}
                        alt={f.t}
                        fill
                        className="object-cover object-left-top"
                        sizes="(max-width: 768px) 100vw, 50vw"
                      />
                    </div>
                  </div>
                )}
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ━━━ PROCESS ━━━ */}
      <section id="process" className="py-24 lg:py-32" style={{ background: "#fff" }}>
        <div className="mx-auto max-w-[1200px] px-6">
          <motion.div initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.3 }} variants={stg}>
            <motion.div variants={rise} custom={0} className="flex items-center gap-2 mb-4">
              <div className="h-px w-6" style={{ background: P.accent }} />
              <span className="text-[11px] font-semibold uppercase tracking-[0.2em]" style={{ color: P.accent }}>Process</span>
            </motion.div>
            <motion.h2 variants={rise} custom={1} style={{ fontFamily: "var(--font-space)", fontSize: "clamp(1.5rem,3.5vw,2.4rem)", fontWeight: 700, lineHeight: 1.15, letterSpacing: "-0.02em" }}>
              Three steps. Zero headaches.
            </motion.h2>
          </motion.div>

          <motion.div initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.1 }} variants={stg} className="mt-14 grid gap-px lg:grid-cols-3 rounded-2xl overflow-hidden border" style={{ borderColor: P.border }}>
            {steps.map((s, i) => (
              <motion.div key={s.n} variants={rise} custom={i} className="relative p-8 lg:p-10" style={{ background: P.card }}>
                <span style={{ fontFamily: "var(--font-space)", fontSize: "4.5rem", fontWeight: 700, lineHeight: 1, color: i === 1 ? "rgba(28,154,99,0.10)" : "rgba(196,138,10,0.07)" }}>{s.n}</span>
                <div className="mt-2 inline-flex rounded-lg p-2.5" style={{ background: i === 1 ? P.secondaryPale : P.accentPale, color: i === 1 ? P.secondary : P.accent }}><s.icon size={18} /></div>
                <h3 className="mt-3 text-base font-bold" style={{ fontFamily: "var(--font-space)" }}>{s.title}</h3>
                <p className="mt-1.5 text-[13px] leading-relaxed" style={{ color: P.mid }}>{s.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ━━━ BENEFITS ━━━ */}
      <section id="benefits" className="py-24 lg:py-32">
        <div className="mx-auto max-w-[1200px] px-6">
          <motion.div initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.3 }} variants={stg} className="max-w-2xl mx-auto text-center mb-14">
            <motion.div variants={rise} custom={0} className="flex items-center justify-center gap-2 mb-4">
              <div className="h-px w-6" style={{ background: P.accent }} />
              <span className="text-[11px] font-semibold uppercase tracking-[0.2em]" style={{ color: P.accent }}>Benefits</span>
              <div className="h-px w-6" style={{ background: P.accent }} />
            </motion.div>
            <motion.h2 variants={rise} custom={1} style={{ fontFamily: "var(--font-space)", fontSize: "clamp(1.5rem,3.5vw,2.4rem)", fontWeight: 700, lineHeight: 1.15, letterSpacing: "-0.02em" }}>
              Built for owners. Loved by teams.
            </motion.h2>
          </motion.div>

          <motion.div initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.1 }} variants={stg} className="grid gap-6 lg:grid-cols-2">
            {[{ lab: "For Business Owners", ico: Building2, list: ownerBenefits }, { lab: "For Your Team", ico: Users, list: teamWins }].map((card, ci) => (
              <motion.div key={card.lab} variants={rise} custom={ci} className="rounded-2xl border p-8" style={{ borderColor: P.border, background: P.card }}>
                <div className="mb-5 inline-flex items-center gap-2 rounded-full px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.1em]" style={{ background: ci === 1 ? P.secondaryPale : P.accentPale, color: ci === 1 ? P.secondary : P.accent }}>
                  <card.ico size={12} /> {card.lab}
                </div>
                <ul className="space-y-3">
                  {card.list.map((b, i) => (
                    <li key={i} className="flex items-start gap-2.5 text-[13px]" style={{ color: P.mid }}>
                      <CheckCircle2 size={15} className="mt-0.5 shrink-0" style={{ color: ci === 1 ? P.secondary : P.accent }} />{b}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </motion.div>

          {/* bottom line */}
          <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={rise} custom={0} className="mx-auto mt-14 max-w-lg rounded-xl p-6 text-center" style={{ background: `linear-gradient(135deg, ${P.accentPale} 0%, ${P.secondaryPale} 100%)` }}>
            <p className="text-sm font-bold" style={{ fontFamily: "var(--font-space)", color: P.secondary }}>Better Systems → Better Teams → More Revenue</p>
          </motion.div>
        </div>
      </section>

      {/* ━━━ AUDIENCE + DIFFERENTIATORS ━━━ */}
      <section className="py-24 lg:py-32" style={{ background: "#fff" }}>
        <div className="mx-auto max-w-[1200px] px-6 grid gap-16 lg:grid-cols-2">
          <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={stg}>
            <motion.div variants={rise} custom={0} className="flex items-center gap-2 mb-3">
              <div className="h-px w-6" style={{ background: P.accent }} />
              <span className="text-[11px] font-semibold uppercase tracking-[0.2em]" style={{ color: P.accent }}>Built For</span>
            </motion.div>
            <motion.h3 variants={rise} custom={1} className="text-xl font-bold mb-5" style={{ fontFamily: "var(--font-space)" }}>Teams that want to grow</motion.h3>
            <div className="flex flex-wrap gap-2">
              {[{ i: Rocket, l: "Founders" }, { i: Users, l: "HR Teams" }, { i: Globe, l: "Remote Teams" }, { i: Building2, l: "SMEs" }].map((a, i) => (
                <motion.span key={a.l} variants={rise} custom={i} className="inline-flex items-center gap-2 rounded-full border px-4 py-2 text-xs font-medium" style={{ borderColor: P.border, color: P.mid }}>
                  <a.i size={13} style={{ color: P.accent }} />{a.l}
                </motion.span>
              ))}
            </div>
          </motion.div>

          <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={stg}>
            <motion.div variants={rise} custom={0} className="flex items-center gap-2 mb-3">
              <div className="h-px w-6" style={{ background: P.accent }} />
              <span className="text-[11px] font-semibold uppercase tracking-[0.2em]" style={{ color: P.accent }}>Why Us</span>
            </motion.div>
            <motion.h3 variants={rise} custom={1} className="text-xl font-bold mb-5" style={{ fontFamily: "var(--font-space)" }}>What makes TechstaHR different</motion.h3>
            <ul className="space-y-3">
              {["All-in-one — no more tool fragmentation", "Built for African and global teams", "Intuitive interface, zero learning curve", "Scales as your business grows"].map((d, i) => (
                <motion.li key={i} variants={rise} custom={i} className="flex items-start gap-2.5 text-[13px]" style={{ color: P.mid }}>
                  <Award size={15} className="mt-0.5 shrink-0" style={{ color: P.accent }} />{d}
                </motion.li>
              ))}
            </ul>
          </motion.div>
        </div>
      </section>

      {/* ━━━ TRUST BAR ━━━ */}
      <section className="py-12" style={{ borderTop: `1px solid ${P.border}`, borderBottom: `1px solid ${P.border}` }}>
        <div className="mx-auto max-w-[1200px] px-6 flex flex-wrap items-center justify-center gap-8">
          {[{ i: Lock, l: "Bank-Level Encryption" }, { i: Shield, l: "SOC 2 Compliance" }, { i: Zap, l: "99.9% Uptime SLA" }, { i: Star, l: "24/7 Support" }].map((t, i) => (
            <div key={t.l} className="flex items-center gap-2 text-xs font-medium" style={{ color: P.lite }}>
              <t.i size={14} style={{ color: i % 2 === 0 ? P.secondary : P.accent }} />{t.l}
            </div>
          ))}
        </div>
      </section>

      {/* ━━━ CTA ━━━ */}
      <section className="py-24 lg:py-32">
        <div className="mx-auto max-w-[1200px] px-6">
          <motion.div initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.3 }} variants={stg} className="rounded-3xl p-10 md:p-16 text-center relative overflow-hidden" style={{ background: `linear-gradient(135deg, ${P.accent} 0%, ${P.accentLight} 52%, ${P.secondary} 100%)` }}>
            <div className="pointer-events-none absolute inset-0 opacity-20" style={{ backgroundImage: `radial-gradient(circle at 30% 80%, rgba(255,255,255,0.2) 0%, transparent 50%), radial-gradient(circle at 70% 20%, rgba(255,255,255,0.15) 0%, transparent 50%)` }} />
            <div className="relative z-10">
              <motion.h2 variants={rise} custom={0} className="text-white" style={{ fontFamily: "var(--font-space)", fontSize: "clamp(1.6rem,4vw,2.8rem)", fontWeight: 700, lineHeight: 1.1, letterSpacing: "-0.02em" }}>
                Ready to simplify your{" "}<br className="hidden md:block" />workforce management?
              </motion.h2>
              <motion.p variants={rise} custom={1} className="mt-4 text-sm mx-auto max-w-md" style={{ color: "rgba(255,255,255,0.75)" }}>
                Join hundreds of teams already saving time and growing faster with TechstaHR.
              </motion.p>
              <motion.div variants={rise} custom={2} className="mt-8 flex flex-wrap justify-center gap-3">
                <Link href="/register" className="group inline-flex items-center gap-2 rounded-lg px-7 py-3.5 text-sm font-semibold transition shadow-lg hover:shadow-xl" style={{ background: "#fff", color: P.secondary }}>
                  Get Started Free <ArrowUpRight size={15} className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                </Link>
                <a href="#" className="inline-flex items-center gap-2 rounded-lg border px-7 py-3.5 text-sm font-medium text-white transition" style={{ borderColor: "rgba(255,255,255,0.3)" }}>
                  Book a Demo <ChevronRight size={15} />
                </a>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ━━━ FOOTER ━━━ */}
      <footer className="py-10" style={{ borderTop: `1px solid ${P.border}` }}>
        <div className="mx-auto flex max-w-[1200px] flex-col items-center justify-between gap-5 px-6 sm:flex-row">
          <Link href="/"><Image src="/images/techstahr-logo.svg" alt="TechstaHR" width={105} height={26} /></Link>
          <div className="flex gap-6 text-[11px]" style={{ color: P.lite }}>
            <a href="#features" className="hover:underline">Features</a>
            <a href="#process" className="hover:underline">Process</a>
            <Link href="/login" className="hover:underline">Sign In</Link>
          </div>
          <p className="text-[11px]" style={{ color: P.faint }}>© {new Date().getFullYear()} TechstaHR</p>
        </div>
      </footer>
    </div>
  );
}
