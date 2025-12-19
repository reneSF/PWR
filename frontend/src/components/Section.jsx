export default function Section({ id, title, subtitle, children }) {
  return (
    <section id={id} className="relative mx-auto w-full max-w-5xl px-5 py-12">
      <div className="mb-6">
        <h2 className="flex items-center gap-3 text-2xl font-semibold tracking-tight text-slate-900 dark:text-slate-100">
          <span className="h-6 w-1.5 rounded-full bg-indigo-500/70 dark:bg-indigo-400/60
" />
          {title}
        </h2>

        {subtitle ? (
          <p className="mt-2 max-w-3xl text-sm leading-relaxed text-slate-700 dark:text-slate-300/85">
            {subtitle}
          </p>
        ) : null}
      </div>

      {children}
    </section>
  );
}
