type PageHeroProps = {
  src: string;
  alt: string;
  eyebrow?: string;
  title: string;
  subtitle?: string;
};

export const PageHero = ({ src, alt, eyebrow, title, subtitle }: PageHeroProps) => (
  <div className="relative h-[320px] w-full overflow-hidden md:h-[420px]">
    <img
      src={src}
      alt={alt}
      className="h-full w-full object-cover object-[center_30%]"
      loading="lazy"
    />
    <div className="absolute inset-0 bg-gradient-to-b from-[#0A1F44]/65 to-[#0A1F44]/90" />
    <div className="absolute inset-0">
      <div className="mx-auto flex h-full w-full max-w-2xl items-center px-8">
        <div className="w-full max-w-4xl rounded-[14px] bg-[#0A1F44]/55 p-5 text-center text-white backdrop-blur-[6px] md:p-8">
          {eyebrow && (
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-blue-100">
              {eyebrow}
            </p>
          )}
          <h1 className="mt-3 text-2xl font-semibold sm:text-3xl md:text-4xl">{title}</h1>
          {subtitle && (
            <p className="mt-3 text-sm text-white/85 sm:text-base">{subtitle}</p>
          )}
        </div>
      </div>
    </div>
  </div>
);
