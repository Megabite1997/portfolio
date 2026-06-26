import type { ReactNode } from "react";

type SectionProps = {
  id?: string;
  eyebrow?: string;
  title?: ReactNode;
  intro?: ReactNode;
  children: ReactNode;
  className?: string;
};

/** Standard padded section with an optional eyebrow + heading block. */
export function Section({
  id,
  eyebrow,
  title,
  intro,
  children,
  className = "",
}: SectionProps) {
  return (
    <section
      id={id}
      className={`relative mx-auto w-full max-w-6xl scroll-mt-24 px-5 py-20 sm:px-8 sm:py-28 ${className}`}
    >
      {(eyebrow || title) && (
        <div className="mb-12 max-w-2xl">
          {eyebrow && (
            <p className="mb-3 font-mono text-xs uppercase tracking-[0.25em] text-accent">
              {eyebrow}
            </p>
          )}
          {title && (
            <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
              {title}
            </h2>
          )}
          {intro && <p className="mt-4 text-base leading-relaxed text-muted">{intro}</p>}
        </div>
      )}
      {children}
    </section>
  );
}
