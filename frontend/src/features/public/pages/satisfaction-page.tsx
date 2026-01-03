import { SatisfactionAside } from '../components/satisfaction-aside';
import { SatisfactionFormSection } from '../components/satisfaction-form-section';
import { SatisfactionHero } from '../components/satisfaction-hero';
import { useSatisfactionForm } from '../hooks/use-satisfaction-form';

export const SatisfactionPage = () => {
  const { formikConfig, submitted, submitError, loading } = useSatisfactionForm();

  return (
    <section className="relative min-h-screen bg-[#0A1F44]">
      <div className="pointer-events-none absolute inset-0 opacity-20 [background-image:radial-gradient(80rem_40rem_at_-10%_-10%,rgba(59,130,246,0.18),transparent),radial-gradient(60rem_30rem_at_110%_-10%,rgba(16,185,129,0.12),transparent)]" />

      <SatisfactionHero />

      <div className="relative bg-white">
        <div className="h-[3px] w-full bg-gradient-to-r from-[#8B0000] via-[#0A1F44] to-blue-400 opacity-70" />
        <div className="mx-auto w-full max-w-[90rem] px-8 py-14">
          <div className="grid gap-8 lg:grid-cols-3">
            <SatisfactionFormSection
              formikConfig={formikConfig}
              submitted={submitted}
              submitError={submitError}
              loading={loading}
            />

            <SatisfactionAside />
          </div>
        </div>
      </div>
    </section>
  );
};
