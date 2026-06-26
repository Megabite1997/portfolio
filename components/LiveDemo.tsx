"use client";

import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { Section } from "@/components/ui/Section";
import { useRealtimeContext } from "@/components/RealtimeProvider";

export function LiveDemo() {
  const reduce = useReducedMotion();
  const { state, count, reactions, sendReaction, availableReactions } =
    useRealtimeContext();

  return (
    <Section
      id="demo"
      eyebrow="Live demo"
      title="A real-time Go service — running right now"
      intro="This isn't a screenshot. Presence and reactions below are powered by a Go WebSocket service (the same pattern I built for Minor Hotels). Open this page in another tab and watch them sync."
    >
      <div className="grid gap-5 lg:grid-cols-[1fr_1.1fr]">
        {/* status card */}
        <div className="flex flex-col justify-between rounded-2xl glass p-6">
          <div className="flex items-center justify-between">
            <span className="font-mono text-xs uppercase tracking-[0.2em] text-faint">
              Connection
            </span>
            <span
              className={`inline-flex items-center gap-2 rounded-full px-3 py-1 font-mono text-xs ${
                state === "live"
                  ? "bg-accent-3/10 text-accent-3"
                  : state === "connecting"
                    ? "bg-white/5 text-muted"
                    : "bg-accent/10 text-accent"
              }`}
            >
              <span className="relative flex h-2 w-2">
                {state !== "connecting" && (
                  <span
                    className={`absolute inline-flex h-full w-full rounded-full opacity-75 ${
                      reduce ? "" : "animate-ping"
                    } ${state === "live" ? "bg-accent-3" : "bg-accent"}`}
                  />
                )}
                <span
                  className={`relative inline-flex h-2 w-2 rounded-full ${
                    state === "live"
                      ? "bg-accent-3"
                      : state === "connecting"
                        ? "bg-faint"
                        : "bg-accent"
                  }`}
                />
              </span>
              {state === "live"
                ? "WebSocket · live"
                : state === "connecting"
                  ? "connecting…"
                  : "simulated"}
            </span>
          </div>

          <div className="my-8 text-center">
            <div className="font-mono text-6xl font-semibold gradient-text">
              {count}
            </div>
            <p className="mt-2 text-sm text-muted">
              {count === 1 ? "person" : "people"} connected
            </p>
          </div>

          <p className="font-mono text-xs leading-relaxed text-faint">
            {state === "simulated"
              ? "// Go service offline — falling back to a local simulation so the demo never breaks. Graceful degradation by design."
              : "// Connected to the Go WebSocket hub. Presence updates broadcast to every client."}
          </p>
        </div>

        {/* reaction stage */}
        <div className="relative flex min-h-[320px] flex-col overflow-hidden rounded-2xl glass p-6">
          <p className="mb-1 text-sm font-semibold">Send a live reaction</p>
          <p className="mb-4 text-xs text-muted">
            Broadcasts to everyone viewing in real time.
          </p>

          {/* floating reactions stage */}
          <div className="pointer-events-none absolute inset-0 overflow-hidden">
            <AnimatePresence>
              {reactions.map((r) => (
                <motion.span
                  key={r.id}
                  initial={{ opacity: 0, scale: 0.5, x: randX(r.id), y: 280 }}
                  animate={{ opacity: 1, scale: 1, y: 40 }}
                  exit={{ opacity: 0, scale: 0.8, y: 0 }}
                  transition={{ duration: 2.6, ease: "easeOut" }}
                  className="absolute bottom-0 text-3xl"
                  style={{ left: "50%" }}
                >
                  {r.emoji}
                </motion.span>
              ))}
            </AnimatePresence>
          </div>

          <div className="mt-auto grid grid-cols-6 gap-2">
            {availableReactions.map((emoji) => (
              <motion.button
                key={emoji}
                type="button"
                onClick={() => sendReaction(emoji)}
                whileTap={reduce ? undefined : { scale: 0.85 }}
                whileHover={reduce ? undefined : { scale: 1.1, y: -2 }}
                aria-label={`React with ${emoji}`}
                className="grid aspect-square place-items-center rounded-xl border border-[var(--border)] bg-white/[0.02] text-2xl transition-colors hover:border-[var(--border-strong)] hover:bg-white/[0.05]"
              >
                {emoji}
              </motion.button>
            ))}
          </div>
        </div>
      </div>
    </Section>
  );
}

// deterministic-ish horizontal jitter per reaction id
function randX(id: string) {
  let h = 0;
  for (let i = 0; i < id.length; i++) h = (h * 31 + id.charCodeAt(i)) % 200;
  return h - 100;
}
