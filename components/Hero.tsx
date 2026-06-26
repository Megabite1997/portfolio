"use client";

import { motion, useReducedMotion } from "motion/react";
import { profile, stats } from "@/lib/data";
import { useRealtimeContext } from "@/components/RealtimeProvider";
import { ArrowIcon, DownloadIcon } from "@/components/ui/icons";

export function Hero() {
  const reduce = useReducedMotion();
  const { count, state } = useRealtimeContext();

  const fade = (delay: number) =>
    reduce
      ? {}
      : {
          initial: { opacity: 0, y: 20 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.7, delay, ease: [0.21, 0.47, 0.32, 0.98] as const },
        };

  return (
    <section
      id="top"
      className="relative mx-auto flex min-h-[100svh] w-full max-w-6xl flex-col justify-center px-5 pb-16 pt-28 sm:px-8"
    >
      {/* live availability + presence */}
      <motion.div {...fade(0)} className="mb-7 flex flex-wrap items-center gap-3">
        <span className="inline-flex items-center gap-2 rounded-full glass px-3.5 py-1.5 text-xs font-medium text-muted">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent-3 opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-accent-3" />
          </span>
          {profile.availableText}
        </span>
        <span className="inline-flex items-center gap-2 rounded-full glass px-3.5 py-1.5 font-mono text-xs text-muted">
          <span className="text-accent">{count}</span>
          {count === 1 ? "person" : "people"} viewing
          <span className="text-faint">·</span>
          <span className={state === "live" ? "text-accent-3" : "text-faint"}>
            {state === "live" ? "live" : "demo"}
          </span>
        </span>
      </motion.div>

      <motion.p
        {...fade(0.05)}
        className="mb-4 font-mono text-sm uppercase tracking-[0.3em] text-accent"
      >
        {profile.role} · {profile.tagline}
      </motion.p>

      <motion.h1
        {...fade(0.12)}
        className="max-w-4xl text-5xl font-semibold leading-[1.05] tracking-tight sm:text-7xl"
      >
        Hi, I&apos;m <span className="gradient-text">{profile.firstName}</span>.
        <br />
        I ship <span className="gradient-text">real-time</span>,{" "}
        <span className="gradient-text">secure</span> web products.
      </motion.h1>

      <motion.p
        {...fade(0.22)}
        className="mt-7 max-w-2xl text-lg leading-relaxed text-muted"
      >
        {profile.punch}
      </motion.p>

      <motion.div {...fade(0.32)} className="mt-10 flex flex-wrap items-center gap-3">
        <a
          href="#work"
          className="group inline-flex items-center gap-2 rounded-full bg-grad px-6 py-3 text-sm font-semibold text-black transition-transform hover:scale-[1.03]"
        >
          View my work
          <ArrowIcon className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
        </a>
        <a
          href="/resume.pdf"
          target="_blank"
          rel="noopener"
          className="inline-flex items-center gap-2 rounded-full border border-[var(--border-strong)] px-6 py-3 text-sm font-semibold transition-colors hover:bg-white/5"
        >
          <DownloadIcon className="h-4 w-4" />
          Download résumé
        </a>
        <a
          href="#contact"
          className="inline-flex items-center gap-2 rounded-full px-5 py-3 text-sm font-medium text-muted transition-colors hover:text-foreground"
        >
          Get in touch
        </a>
      </motion.div>

      {/* stat strip */}
      <motion.dl
        {...fade(0.45)}
        className="mt-16 grid max-w-3xl grid-cols-1 gap-px overflow-hidden rounded-2xl glass sm:grid-cols-3"
      >
        {stats.map((s) => (
          <div key={s.label} className="bg-white/[0.01] px-6 py-5">
            <dt className="font-mono text-2xl font-semibold text-foreground sm:text-3xl">
              <span className="gradient-text">{s.value}</span>
            </dt>
            <dd className="mt-1 text-sm text-muted">{s.label}</dd>
          </div>
        ))}
      </motion.dl>

      {/* scroll hint */}
      {!reduce && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 1 }}
          className="pointer-events-none absolute bottom-6 left-1/2 hidden -translate-x-1/2 sm:block"
        >
          <div className="flex h-9 w-5 items-start justify-center rounded-full border border-[var(--border-strong)] p-1.5">
            <motion.span
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 1.6, repeat: Infinity }}
              className="h-1.5 w-1 rounded-full bg-accent"
            />
          </div>
        </motion.div>
      )}
    </section>
  );
}
