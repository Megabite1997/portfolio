"use client";

import { createContext, useContext, type ReactNode } from "react";
import { useRealtime } from "@/lib/useWebSocket";

type RealtimeValue = ReturnType<typeof useRealtime>;

const RealtimeContext = createContext<RealtimeValue | null>(null);

/** Single shared WebSocket connection for the whole page. */
export function RealtimeProvider({ children }: { children: ReactNode }) {
  const value = useRealtime();
  return (
    <RealtimeContext.Provider value={value}>{children}</RealtimeContext.Provider>
  );
}

export function useRealtimeContext() {
  const ctx = useContext(RealtimeContext);
  if (!ctx) {
    throw new Error("useRealtimeContext must be used within <RealtimeProvider>");
  }
  return ctx;
}
