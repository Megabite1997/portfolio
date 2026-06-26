# Tada Chaipanya — Portfolio

A dark, technical portfolio for a full-stack developer (React/Next.js · Go · AWS).
Built to double as a code sample: the site itself is the proof of skill.

**Highlights**

- **Live Go/WebSocket demo** — real presence + reactions, with graceful fallback to a
  local simulation when the realtime service is offline (the demo never looks broken).
- **Interactive AWS architecture diagram** — the CloudFront + WAF + Go security setup
  built for Minor Hotels' Smart FrontDesk.
- **Scroll-driven career timeline** — five roles as Problem → Built → Impact case studies.
- Next.js 16 (App Router) · TypeScript · Tailwind CSS v4 · Motion · 100-Lighthouse target.

## Stack

| Layer       | Tech                                              |
| ----------- | ------------------------------------------------- |
| Frontend    | Next.js 16, React 19, TypeScript, Tailwind v4     |
| Animation   | Motion (`motion/react`)                           |
| Realtime    | Go + `gorilla/websocket` (`realtime/`)            |
| Contact     | Resend (optional) → `mailto:` fallback            |
| Deploy      | Vercel (web) + Fly.io / Lightsail (Go service)    |

## Local development

```bash
npm install
npm run dev            # http://localhost:3000

# in another terminal, the live-demo backend (optional):
cd realtime && go run .   # ws://localhost:8080/ws
```

Copy `.env.example` → `.env.local` and set `NEXT_PUBLIC_WS_URL=ws://localhost:8080/ws`
to connect the live demo to the local Go service. Without it, the demo runs in
simulated mode.

## Editing content

All copy lives in [`lib/data.ts`](lib/data.ts) — profile, skills, experience
case studies, and the architecture-diagram nodes. No need to touch components.

Replace [`public/resume.pdf`](public/resume.pdf) to update the downloadable résumé.

## Deployment

### 1. Web app → Vercel

```bash
npm i -g vercel
vercel            # preview
vercel --prod     # production
```

Then in the Vercel dashboard (Project → Settings → Environment Variables), optionally set:

- `NEXT_PUBLIC_WS_URL` = `wss://<your-realtime-host>/ws` (enables the live demo in prod)
- `RESEND_API_KEY` = your Resend key (enables real contact emails; otherwise mailto)
- `CONTACT_FROM` = a verified Resend sender

Attach the domain **tadachaipanya.com** under Project → Settings → Domains and point the
DNS records Vercel shows (A / CNAME) at your registrar.

### 2. Realtime Go service → Fly.io

```bash
cd realtime
fly launch --no-deploy      # first time: confirm app name in fly.toml
fly deploy
# set the production origin allowlist:
fly secrets set ALLOWED_ORIGINS="https://tadachaipanya.com,https://www.tadachaipanya.com"
```

This gives you `wss://<app>.fly.dev/ws` — put that in Vercel's `NEXT_PUBLIC_WS_URL`.

> Prefer AWS to mirror the résumé stack? The same `realtime/Dockerfile` deploys to
> Lightsail Containers or ECR; just expose port 8080 and set `ALLOWED_ORIGINS`.

## Project layout

```
app/            # routes, layout, metadata, OG image, contact API
components/      # Hero, About, Skills, Work, ArchitectureDiagram, LiveDemo, Contact, …
lib/            # data.ts (content) + useWebSocket.ts (realtime hook w/ fallback)
realtime/       # Go WebSocket service (hub, client, Dockerfile, fly.toml)
```
