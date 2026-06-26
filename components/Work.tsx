"use client";

import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useSpring } from "motion/react";
import { Section } from "@/components/ui/Section";
import { experiences } from "@/lib/data";

export function Work() {
  const reduce = useReducedMotion();
  const railRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: railRef,
    offset: ["start 60%", "end 60%"],
  });
  const progress = useSpring(scrollYProgress, {
    stiffness: 80,
    damping: 24,
    restDelta: 0.001,
  });

  return (
    <Section
      id="work"
      eyebrow="Experience"
      title="Case studies, not job descriptions"
      intro="Five roles, four years — each framed as the problem I faced, what I built, and the impact it had."
    >
      <div ref={railRef} className="relative">
        {/* timeline rail */}
        <div className="absolute left-[15px] top-2 bottom-2 w-px bg-[var(--border)] sm:left-[19px]" />
        {!reduce && (
          <motion.div
            style={{ scaleY: progress }}
            className="absolute left-[15px] top-2 bottom-2 w-px origin-top bg-grad sm:left-[19px]"
          />
        )}

        <div className="space-y-6">
          {experiences.map((exp) => (
            <motion.article
              key={exp.company + exp.period}
              initial={reduce ? false : { opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.55, delay: 0.04 }}
              className="relative pl-12 sm:pl-16"
            >
              {/* node */}
              <span
                className={`absolute left-2 top-1.5 grid h-7 w-7 place-items-center rounded-full border sm:left-1.5 ${
                  exp.current
                    ? "border-accent-3 bg-accent-3/15"
                    : "border-[var(--border-strong)] bg-surface"
                }`}
              >
                <span
                  className={`h-2 w-2 rounded-full ${
                    exp.current ? "bg-accent-3" : "bg-faint"
                  }`}
                />
              </span>

              <div
                className={`rounded-2xl glass p-5 sm:p-6 ${
                  exp.featured ? "gradient-border" : ""
                }`}
              >
                <div className="flex flex-wrap items-start justify-between gap-2">
                  <div>
                    <h3 className="text-lg font-semibold">
                      {exp.role}
                      <span className="text-muted"> · {exp.company}</span>
                    </h3>
                    {exp.context && (
                      <p className="text-sm text-faint">{exp.context}</p>
                    )}
                  </div>
                  <span
                    className={`shrink-0 rounded-full px-3 py-1 font-mono text-xs ${
                      exp.current
                        ? "bg-accent-3/10 text-accent-3"
                        : "bg-white/[0.03] text-muted"
                    }`}
                  >
                    {exp.period}
                  </span>
                </div>

                <div className="mt-4 grid gap-4 sm:grid-cols-[auto_1fr] sm:gap-x-6">
                  <Label>Problem</Label>
                  <p className="text-sm leading-relaxed text-muted">{exp.problem}</p>

                  <Label>Built</Label>
                  <ul className="space-y-1.5">
                    {exp.built.map((b) => (
                      <li
                        key={b}
                        className="flex gap-2 text-sm leading-relaxed text-muted"
                      >
                        <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-accent" />
                        {b}
                      </li>
                    ))}
                  </ul>

                  <Label>Impact</Label>
                  <p className="text-sm font-medium leading-relaxed text-foreground">
                    {exp.impact}
                  </p>
                </div>

                <div className="mt-5 flex flex-wrap gap-1.5">
                  {exp.stack.map((s) => (
                    <span
                      key={s}
                      className="rounded-md border border-[var(--border)] bg-white/[0.02] px-2 py-1 font-mono text-[11px] text-muted"
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </Section>
  );
}

function Label({ children }: { children: React.ReactNode }) {
  return (
    <span className="font-mono text-[11px] uppercase tracking-[0.15em] text-faint sm:pt-0.5">
      {children}
    </span>
  );
}
