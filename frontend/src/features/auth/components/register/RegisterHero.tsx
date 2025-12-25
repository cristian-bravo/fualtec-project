import registerImg from "../../../../assets/images/register/register.webp";


export const RegisterHero = () => (
  <div className="relative rounded-2xl overflow-hidden border border-white/10 lg:col-span-7">
    <img
      src={registerImg }
      alt="Inspección petrolera y ensayos no destructivos"
      className="h-full w-full object-cover"
    />
    <div className="absolute inset-0 bg-gradient-to-tr from-[#0A1F44]/85 via-[#0A1F44]/55 to-transparent" />
    <div className="absolute inset-0 flex items-end justify-start p-8 md:p-10">
      <div className="max-w-2xl rounded-xl bg-gradient-to-t from-[#0A1F44]/95 via-[#0A1F44]/100 to-transparent p-6">
        <p className="text-xs font-semibold uppercase tracking-[0.25em] text-blue-200 text-center">Portal seguro</p>
        <h1 className="mt-2 mb-4 text-4xl font-extrabold text-white text-center">Registro</h1>
        <p className="mt-2 text-slate-100">
          Crea tu cuenta corporativa. Un administrador validara tu informacion para habilitar el acceso.
        </p>
        <ul className="mt-5 grid grid-cols-1 sm:grid-cols-2 gap-2 text-slate-200/90 text-sm">
          <li className="flex items-center gap-2">
            <span className="inline-block h-1.5 w-1.5 rounded-full bg-blue-400" />
            Descargas tecnicas privadas
          </li>
          <li className="flex items-center gap-2">
            <span className="inline-block h-1.5 w-1.5 rounded-full bg-blue-400" />
            Auditorias y reportes
          </li>
          <li className="flex items-center gap-2">
            <span className="inline-block h-1.5 w-1.5 rounded-full bg-blue-400" />
            Comunicacion con inspeccion
          </li>
          <li className="flex items-center gap-2">
            <span className="inline-block h-1.5 w-1.5 rounded-full bg-blue-400" />
            Seguridad y cumplimiento
          </li>
        </ul>
      </div>
    </div>
  </div>
);
