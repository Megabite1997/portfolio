import { ImageResponse } from "next/og";
import { profile } from "@/lib/data";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = `${profile.name} — ${profile.role}`;

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px",
          background: "#07070b",
          backgroundImage:
            "radial-gradient(600px 600px at 85% 0%, rgba(167,139,250,0.25), transparent), radial-gradient(600px 600px at 0% 100%, rgba(34,211,238,0.22), transparent)",
          color: "#e8e8f0",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            fontSize: 26,
            letterSpacing: 8,
            textTransform: "uppercase",
            color: "#22d3ee",
            marginBottom: 24,
          }}
        >
          {profile.role}
        </div>
        <div
          style={{
            display: "flex",
            fontSize: 96,
            fontWeight: 700,
            lineHeight: 1.05,
          }}
        >
          {profile.name}
        </div>
        <div
          style={{
            display: "flex",
            fontSize: 34,
            color: "#9a9ab0",
            marginTop: 28,
            maxWidth: 900,
          }}
        >
          React / Next.js · Go · AWS — real-time, secure web products.
        </div>
        <div
          style={{
            display: "flex",
            fontSize: 26,
            color: "#62627a",
            marginTop: "auto",
          }}
        >
          tadachaipanya.com
        </div>
      </div>
    ),
    { ...size }
  );
}
