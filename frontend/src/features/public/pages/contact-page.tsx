import { ContactFormSection } from '../components/contact-form-section';
import { ContactInfoCard } from '../components/contact-info-card';
import { ContactMapCard } from '../components/contact-map-card';
import { useContactForm } from '../hooks/use-contact-form';

export const ContactPage = () => {
  const { form, submitted, loading, error, handleFormSubmit } = useContactForm();

  return (
    <section className="relative min-h-screen bg-[#0A1F44]">
      <div className="pointer-events-none absolute inset-0 opacity-20 [background-image:radial-gradient(80rem_40rem_at_-10%_-10%,rgba(59,130,246,0.18),transparent),radial-gradient(60rem_30rem_at_110%_-10%,rgba(16,185,129,0.12),transparent)]" />

      <div className="relative mx-auto w-full max-w-[90rem] px-8 py-20">
        <header className="max-w-3xl text-center mx-auto">
          <p className="text-sm font-semibold uppercase tracking-[0.15em] text-blue-200 mb-4">
            Contacto directo
          </p>
          <h1 className="relative inline-block text-4xl md:text-5xl font-bold text-white leading-tight">
            Coordinemos su proximo proyecto
            <span className="absolute bottom-0 left-1/2 -translate-x-1/2 h-[3px] w-28 rounded-full bg-gradient-to-r from-[#8B0000] to-blue-400 mt-2 animate-pulse" />
          </h1>
          <p className="mt-8 text-base md:text-lg text-slate-200 leading-relaxed">
            Nuestro equipo puede agendar una reunion presencial o virtual para analizar
            sus necesidades en operaciones petroleras.
          </p>
        </header>

        <div className="mt-16 grid gap-8 lg:grid-cols-2 items-start">
          <ContactInfoCard />
          <ContactMapCard />
        </div>
      </div>

      <ContactFormSection
        form={form}
        submitted={submitted}
        loading={loading}
        error={error}
        onSubmit={handleFormSubmit}
      />
    </section>
  );
};

export default ContactPage;

