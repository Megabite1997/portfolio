"use client";

import { motion, useReducedMotion } from "motion/react";
import { Section } from "@/components/ui/Section";
import { skillGroups } from "@/lib/data";

export function Skills() {
  const reduce = useReducedMotion();

  return (
    <Section
      id="skills"
      eyebrow="Toolkit"
      title="Skills that span front end to infrastructure"
      intro="Not just a list — these are the tools I've shipped real, production systems with."
    >
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {skillGroups.map((group, gi) => (
          <motion.div
            key={group.title}
            initial={reduce ? false : { opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5, delay: gi * 0.08 }}
            className="group relative overflow-hidden rounded-2xl glass p-5"
          >
            <div
              className="absolute -right-8 -top-8 h-24 w-24 rounded-full opacity-20 blur-2xl transition-opacity group-hover:opacity-40"
              style={{ background: group.accent }}
            />
            <h3 className="mb-4 flex items-center gap-2 text-sm font-semibold">
              <span
                className="h-2 w-2 rounded-full"
                style={{ background: group.accent }}
              />
              {group.title}
            </h3>
            <ul className="flex flex-wrap gap-2">
              {group.skills.map((skill, si) => (
                <motion.li
                  key={skill}
                  initial={reduce ? false : { opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: gi * 0.08 + si * 0.04 }}
                  className="rounded-lg border border-[var(--border)] bg-white/[0.02] px-2.5 py-1.5 font-mono text-xs text-muted transition-colors hover:border-[var(--border-strong)] hover:text-foreground"
                >
                  {skill}
                </motion.li>
              ))}
            </ul>
          </motion.div>
        ))}
      </div>
    </Section>
  );
}
