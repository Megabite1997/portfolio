import { profile, socials } from "@/lib/data";
import { SocialIcon } from "@/components/ui/icons";

export function Footer() {
  return (
    <footer className="border-t border-[var(--border)] py-10">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-5 sm:flex-row sm:px-8">
        <div className="text-center sm:text-left">
          <p className="font-mono text-sm font-semibold">{profile.name}</p>
          <p className="text-xs text-faint">
            {profile.role} · {profile.location}
          </p>
        </div>

        <div className="flex items-center gap-2">
          {socials.map((s) => (
            <a
              key={s.label}
              href={s.href}
              target={s.href.startsWith("http") ? "_blank" : undefined}
              rel="noopener"
              aria-label={s.label}
              className="grid h-9 w-9 place-items-center rounded-full glass text-muted transition-colors hover:text-foreground"
            >
              <SocialIcon name={s.icon} className="h-4 w-4" />
            </a>
          ))}
        </div>

        <p className="font-mono text-xs text-faint">
          Built with Next.js, Go & a bit of obsession.
        </p>
      </div>
    </footer>
  );
}
