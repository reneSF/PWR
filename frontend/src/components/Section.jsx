export default function Section({ id, title, subtitle, children }) {
  return (
    <section id={id} className="py-14">
      <div className="mx-auto max-w-5xl px-5">
        <div className="mb-6">
          <h2 className="text-2xl font-semibold tracking-tight text-slate-100">
            {title}
          </h2>
          {subtitle ? (
            <p className="mt-2 max-w-3xl text-sm leading-relaxed text-slate-300/80">
              {subtitle}
            </p>
          ) : null}
        </div>
        {children}
      </div>
    </section>
  );
}
