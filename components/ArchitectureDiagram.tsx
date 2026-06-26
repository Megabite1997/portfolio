"use client";

import { useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "motion/react";
import { Section } from "@/components/ui/Section";
import { archNodes, type ArchNode } from "@/lib/data";

const groupColor: Record<ArchNode["group"], string> = {
  edge: "var(--accent)",
  security: "#f87171",
  compute: "var(--accent-2)",
  data: "var(--accent-3)",
};

// Visual flow order, with simple connector semantics.
const flow: { id: string; note?: string }[] = [
  { id: "client", note: "HTTPS" },
  { id: "cloudfront", note: "reverse proxy" },
  { id: "waf", note: "allow / deny" },
  { id: "ws", note: "wss · token" },
  { id: "ecr", note: "deploy" },
  { id: "secrets" },
];

export function ArchitectureDiagram() {
  const reduce = useReducedMotion();
  const [active, setActive] = useState<string>("cloudfront");
  const activeNode = archNodes.find((n) => n.id === active) ?? archNodes[1];

  return (
    <Section
      id="architecture"
      eyebrow="Architecture"
      title="The security architecture behind Smart FrontDesk"
      intro="Built onsite for Minor Hotels — a real-time platform scaled across hotels globally, with backend services never exposed to the public internet. Tap any node to see the decision behind it."
    >
      <div className="grid gap-6 lg:grid-cols-[1.3fr_1fr]">
        {/* the flow */}
        <div className="rounded-2xl glass p-5 sm:p-7">
          <ol className="relative space-y-3">
            {flow.map((step, i) => {
              const node = archNodes.find((n) => n.id === step.id)!;
              const color = groupColor[node.group];
              const isActive = active === node.id;
              return (
                <li key={node.id}>
                  <motion.button
                    type="button"
                    onClick={() => setActive(node.id)}
                    initial={reduce ? false : { opacity: 0, x: -16 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: i * 0.07 }}
                    aria-pressed={isActive}
                    className={`flex w-full items-center gap-4 rounded-xl border p-3.5 text-left transition-all ${
                      isActive
                        ? "border-[var(--border-strong)] bg-white/[0.05]"
                        : "border-[var(--border)] bg-white/[0.01] hover:bg-white/[0.03]"
                    }`}
                  >
                    <span
                      className="grid h-10 w-10 shrink-0 place-items-center rounded-lg font-mono text-xs font-bold"
                      style={{
                        background: `color-mix(in srgb, ${color} 18%, transparent)`,
                        color,
                        boxShadow: isActive ? `0 0 0 1px ${color}` : "none",
                      }}
                    >
                      {i + 1}
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block truncate text-sm font-semibold">
                        {node.label}
                      </span>
                      <span className="block truncate text-xs text-muted">
                        {node.sub}
                      </span>
                    </span>
                    {step.note && (
                      <span
                        className="hidden shrink-0 rounded-md px-2 py-1 font-mono text-[10px] sm:block"
                        style={{
                          color,
                          background: `color-mix(in srgb, ${color} 12%, transparent)`,
                        }}
                      >
                        {step.note}
                      </span>
                    )}
                  </motion.button>
                  {i < flow.length - 1 && (
                    <div className="ml-[31px] flex h-3 items-center">
                      <span className="h-3 w-px bg-[var(--border-strong)]" />
                    </div>
                  )}
                </li>
              );
            })}
          </ol>
        </div>

        {/* detail panel */}
        <div className="lg:sticky lg:top-24 lg:self-start">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeNode.id}
              initial={reduce ? false : { opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={reduce ? undefined : { opacity: 0, y: -12 }}
              transition={{ duration: 0.3 }}
              className="rounded-2xl glass p-6"
            >
              <span
                className="inline-block rounded-full px-3 py-1 font-mono text-[11px] uppercase tracking-wider"
                style={{
                  color: groupColor[activeNode.group],
                  background: `color-mix(in srgb, ${groupColor[activeNode.group]} 14%, transparent)`,
                }}
              >
                {activeNode.group}
              </span>
              <h3 className="mt-4 text-xl font-semibold">{activeNode.label}</h3>
              <p className="mt-1 font-mono text-sm text-muted">{activeNode.sub}</p>
              <p className="mt-4 text-sm leading-relaxed text-muted">
                {activeNode.detail}
              </p>
            </motion.div>
          </AnimatePresence>

          <div className="mt-4 flex flex-wrap gap-2 text-xs text-faint">
            {(["edge", "security", "compute", "data"] as const).map((g) => (
              <span key={g} className="inline-flex items-center gap-1.5">
                <span
                  className="h-2 w-2 rounded-full"
                  style={{ background: groupColor[g] }}
                />
                {g}
              </span>
            ))}
          </div>
        </div>
      </div>
    </Section>
  );
}
