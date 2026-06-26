"use client";

import { useState } from "react";
import { Section } from "@/components/ui/Section";
import { profile, socials } from "@/lib/data";
import {
  ArrowIcon,
  CheckIcon,
  CopyIcon,
  DownloadIcon,
  SocialIcon,
} from "@/components/ui/icons";

type Status = "idle" | "sending" | "sent" | "error";

export function Contact() {
  const [status, setStatus] = useState<Status>("idle");
  const [copied, setCopied] = useState(false);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form));
    setStatus("sending");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error || "failed");
      // If the server has no email provider configured, it returns a mailto fallback.
      if (json.fallback) {
        window.location.href = json.fallback;
      }
      setStatus("sent");
      form.reset();
    } catch {
      setStatus("error");
    }
  }

  async function copyEmail() {
    try {
      await navigator.clipboard.writeText(profile.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      /* clipboard blocked */
    }
  }

  return (
    <Section
      id="contact"
      eyebrow="Contact"
      title="Let's build something worth shipping"
      intro="I'm open to full-stack roles and interesting projects. Drop a message — I reply fast."
    >
      <div className="grid gap-6 lg:grid-cols-[1fr_1.2fr]">
        {/* left: direct links */}
        <div className="space-y-3">
          <button
            type="button"
            onClick={copyEmail}
            className="flex w-full items-center justify-between gap-3 rounded-2xl glass p-5 text-left transition-colors hover:bg-white/[0.04]"
          >
            <span className="min-w-0">
              <span className="block font-mono text-xs uppercase tracking-[0.2em] text-faint">
                Email
              </span>
              <span className="block truncate text-sm font-medium">
                {profile.email}
              </span>
            </span>
            <span className="shrink-0 text-muted">
              {copied ? (
                <CheckIcon className="h-5 w-5 text-accent-3" />
              ) : (
                <CopyIcon className="h-5 w-5" />
              )}
            </span>
          </button>

          <a
            href="/resume.pdf"
            target="_blank"
            rel="noopener"
            className="flex w-full items-center justify-between gap-3 rounded-2xl glass p-5 transition-colors hover:bg-white/[0.04]"
          >
            <span>
              <span className="block font-mono text-xs uppercase tracking-[0.2em] text-faint">
                Résumé
              </span>
              <span className="block text-sm font-medium">Download PDF</span>
            </span>
            <DownloadIcon className="h-5 w-5 text-muted" />
          </a>

          <div className="flex gap-2">
            {socials.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target={s.href.startsWith("http") ? "_blank" : undefined}
                rel="noopener"
                aria-label={s.label}
                className="grid h-12 flex-1 place-items-center rounded-2xl glass text-muted transition-colors hover:text-foreground"
              >
                <SocialIcon name={s.icon} />
              </a>
            ))}
          </div>
        </div>

        {/* right: form */}
        <form onSubmit={onSubmit} className="rounded-2xl glass p-6">
          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="Name" name="name" required placeholder="Your name" />
            <Field
              label="Email"
              name="email"
              type="email"
              required
              placeholder="you@company.com"
            />
          </div>
          <div className="mt-4">
            <Field label="Company" name="company" placeholder="(optional)" />
          </div>
          <div className="mt-4">
            <label className="mb-1.5 block font-mono text-xs uppercase tracking-[0.15em] text-faint">
              Message
            </label>
            <textarea
              name="message"
              required
              rows={4}
              placeholder="What are you building?"
              className="w-full resize-none rounded-xl border border-[var(--border)] bg-white/[0.02] px-3.5 py-2.5 text-sm outline-none transition-colors placeholder:text-faint focus:border-accent"
            />
          </div>

          <div className="mt-5 flex items-center gap-4">
            <button
              type="submit"
              disabled={status === "sending" || status === "sent"}
              className="group inline-flex items-center gap-2 rounded-full bg-grad px-6 py-3 text-sm font-semibold text-black transition-transform hover:scale-[1.03] disabled:opacity-60"
            >
              {status === "sending"
                ? "Sending…"
                : status === "sent"
                  ? "Sent ✓"
                  : "Send message"}
              {status === "idle" && (
                <ArrowIcon className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              )}
            </button>
            {status === "error" && (
              <p className="text-sm text-red-400">
                Something went wrong — email me directly.
              </p>
            )}
            {status === "sent" && (
              <p className="text-sm text-accent-3">Thanks — I&apos;ll be in touch.</p>
            )}
          </div>
        </form>
      </div>
    </Section>
  );
}

function Field({
  label,
  name,
  type = "text",
  required,
  placeholder,
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
  placeholder?: string;
}) {
  return (
    <div>
      <label className="mb-1.5 block font-mono text-xs uppercase tracking-[0.15em] text-faint">
        {label}
        {required && <span className="text-accent"> *</span>}
      </label>
      <input
        name={name}
        type={type}
        required={required}
        placeholder={placeholder}
        className="w-full rounded-xl border border-[var(--border)] bg-white/[0.02] px-3.5 py-2.5 text-sm outline-none transition-colors placeholder:text-faint focus:border-accent"
      />
    </div>
  );
}
