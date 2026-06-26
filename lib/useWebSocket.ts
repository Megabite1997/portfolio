"use client";

import { useCallback, useEffect, useRef, useState } from "react";

/**
 * Message protocol shared with the Go realtime service (see realtime/).
 *  - presence: { type: "presence", count }
 *  - reaction: { type: "reaction", emoji, id }
 *  - hello:    { type: "hello", count }            (sent on connect)
 */
export type WsMessage =
  | { type: "presence"; count: number }
  | { type: "reaction"; emoji: string; id: string }
  | { type: "hello"; count: number };

export type ConnectionState = "connecting" | "live" | "simulated";

const REACTIONS = ["🔥", "👏", "🚀", "💜", "👀", "⭐"];

/**
 * Connects to the Go WebSocket service for live presence + reactions.
 * If the server can't be reached, it transparently falls back to a
 * believable *simulated* mode so the live demo never looks broken.
 */
export function useRealtime() {
  const [state, setState] = useState<ConnectionState>("connecting");
  const [count, setCount] = useState(1);
  const [reactions, setReactions] = useState<{ id: string; emoji: string }[]>([]);
  const wsRef = useRef<WebSocket | null>(null);
  const retryRef = useRef(0);
  const simTimer = useRef<ReturnType<typeof setInterval> | null>(null);
  const mounted = useRef(true);
  const connectRef = useRef<() => void>(() => {});

  const pushReaction = useCallback((emoji: string) => {
    const id = Math.random().toString(36).slice(2);
    setReactions((r) => [...r, { id, emoji }].slice(-30));
    // auto-clear after the float animation completes
    setTimeout(() => {
      setReactions((r) => r.filter((x) => x.id !== id));
    }, 1500);
  }, []);

  // ---- Simulated fallback: fake presence + ambient reactions ----
  const startSimulation = useCallback(() => {
    if (simTimer.current) return;
    setState("simulated");
    setCount(Math.floor(Math.random() * 4) + 2);
    simTimer.current = setInterval(() => {
      setCount((c) => Math.min(9, Math.max(1, c + (Math.random() > 0.5 ? 1 : -1))));
      if (Math.random() > 0.55) {
        pushReaction(REACTIONS[Math.floor(Math.random() * REACTIONS.length)]);
      }
    }, 2600);
  }, [pushReaction]);

  const connect = useCallback(() => {
    const url = process.env.NEXT_PUBLIC_WS_URL;
    if (!url) {
      startSimulation();
      return;
    }
    try {
      const ws = new WebSocket(url);
      wsRef.current = ws;

      ws.onopen = () => {
        retryRef.current = 0;
        setState("live");
      };
      ws.onmessage = (ev) => {
        try {
          const msg = JSON.parse(ev.data) as WsMessage;
          if (msg.type === "presence" || msg.type === "hello") setCount(msg.count);
          if (msg.type === "reaction") pushReaction(msg.emoji);
        } catch {
          /* ignore malformed frames */
        }
      };
      ws.onclose = () => {
        if (!mounted.current) return;
        // a couple of reconnect attempts, then gracefully simulate
        if (retryRef.current < 2) {
          retryRef.current += 1;
          setTimeout(() => connectRef.current(), 1200 * retryRef.current);
        } else {
          startSimulation();
        }
      };
      ws.onerror = () => ws.close();
    } catch {
      startSimulation();
    }
  }, [pushReaction, startSimulation]);

  // keep a ref to the latest connect() so reconnect timers don't capture a stale one
  useEffect(() => {
    connectRef.current = connect;
  }, [connect]);

  useEffect(() => {
    mounted.current = true;
    connect();
    return () => {
      mounted.current = false;
      wsRef.current?.close();
      if (simTimer.current) clearInterval(simTimer.current);
    };
  }, [connect]);

  /** Send a reaction (or simulate it locally when offline). */
  const sendReaction = useCallback(
    (emoji: string) => {
      const ws = wsRef.current;
      if (state === "live" && ws && ws.readyState === WebSocket.OPEN) {
        ws.send(JSON.stringify({ type: "reaction", emoji }));
      } else {
        pushReaction(emoji);
      }
    },
    [state, pushReaction]
  );

  return { state, count, reactions, sendReaction, availableReactions: REACTIONS };
}
