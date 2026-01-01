type ContentSection = {
  title: string;
  body: string[];
};

type ContentPageLayoutProps = {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  sections: ContentSection[];
  hideHeader?: boolean;
};

export const ContentPageLayout = ({
  eyebrow,
  title,
  subtitle,
  sections,
  hideHeader,
}: ContentPageLayoutProps) => (
  <section className="relative bg-[#0A1F44]">
    <div className="pointer-events-none absolute inset-0 opacity-20 [background-image:radial-gradient(80rem_40rem_at_-10%_-10%,rgba(59,130,246,0.18),transparent),radial-gradient(60rem_30rem_at_110%_-10%,rgba(16,185,129,0.12),transparent)]" />

    <div className="relative mx-auto w-full max-w-5xl px-8 py-16">
      {!hideHeader && (
        <header className="text-center">
          {eyebrow && (
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-blue-200">
              {eyebrow}
            </p>
          )}
          <h1 className="mt-3 text-3xl font-bold text-white sm:text-4xl">{title}</h1>
          {subtitle && (
            <p className="mx-auto mt-4 max-w-2xl text-sm text-slate-200 sm:text-base">
              {subtitle}
            </p>
          )}
        </header>
      )}

      <div
        className={[
          'space-y-6 rounded-2xl border border-white/10 bg-white/5 p-6 shadow-2xl backdrop-blur',
          hideHeader ? 'mt-0' : 'mt-10',
        ].join(' ')}
      >
        {sections.map((section) => (
          <div key={section.title} className="space-y-3">
            <h2 className="text-lg font-semibold text-white">{section.title}</h2>
            <div className="space-y-3 text-sm text-slate-200">
              {section.body.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);
