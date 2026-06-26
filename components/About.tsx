import { Section } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { profile, education, languages } from "@/lib/data";
import { MapPinIcon } from "@/components/ui/icons";

const orgs = ["Minor Hotels", "MBK Group", "Muang Thai Life", "3i Infotech"];

export function About() {
  return (
    <Section id="about" eyebrow="About" title="Engineer across the whole stack">
      <div className="grid gap-10 lg:grid-cols-[1.4fr_1fr]">
        <Reveal>
          <div className="space-y-5 text-lg leading-relaxed text-muted">
            <p>{profile.summary}</p>
            <p>
              My sweet spot is the seam between a great front end and the systems behind
              it: I&apos;ve built{" "}
              <span className="text-foreground">real-time Go services</span>, shipped
              <span className="text-foreground"> Next.js apps that scale globally</span>,
              and designed{" "}
              <span className="text-foreground">
                AWS security architecture
              </span>{" "}
              with CloudFront, WAF and IP allowlists to keep backends locked down.
            </p>
            <p>
              I&apos;ve worked onsite for brands like Minor Hotels and MBK Group, migrated
              legacy low-code systems to fully-owned stacks, and mentored other
              developers along the way.
            </p>
          </div>

          <div className="mt-8">
            <p className="mb-3 font-mono text-xs uppercase tracking-[0.2em] text-faint">
              Trusted by teams at
            </p>
            <div className="flex flex-wrap gap-2">
              {orgs.map((o) => (
                <span
                  key={o}
                  className="rounded-full glass px-4 py-1.5 text-sm text-muted"
                >
                  {o}
                </span>
              ))}
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="grid gap-4">
            <div className="rounded-2xl glass p-5">
              <p className="mb-1 flex items-center gap-2 text-sm text-muted">
                <MapPinIcon className="h-4 w-4 text-accent" />
                Based in
              </p>
              <p className="text-lg font-medium">{profile.location}</p>
            </div>

            <div className="rounded-2xl glass p-5">
              <p className="mb-2 font-mono text-xs uppercase tracking-[0.2em] text-faint">
                Education
              </p>
              <p className="font-medium">{education.degree}</p>
              <p className="text-sm text-muted">{education.school}</p>
              <p className="text-sm text-muted">{education.campus}</p>
              <p className="mt-1 font-mono text-xs text-faint">{education.period}</p>
            </div>

            <div className="rounded-2xl glass p-5">
              <p className="mb-3 font-mono text-xs uppercase tracking-[0.2em] text-faint">
                Languages
              </p>
              <div className="grid gap-2">
                {languages.map((l) => (
                  <div key={l.name} className="flex items-center justify-between">
                    <span className="text-sm">{l.name}</span>
                    <span className="font-mono text-xs text-accent">{l.level}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </Section>
  );
}
