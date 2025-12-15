export default function ProjectCard({ p }) {
  return (
    <div className="group rounded-2xl border border-white/10 bg-white/5 p-6 transition hover:-translate-y-0.5 hover:bg-white/10">
      <div className="flex items-start justify-between gap-3">
        <div>
          <div className="inline-flex items-center gap-2">
            <span className="text-sm font-semibold text-slate-100">{p.title}</span>
            {p.featured ? (
              <span className="rounded-full border border-violet-400/30 bg-violet-500/15 px-2 py-0.5 text-[11px] text-violet-200">
                Destacado
              </span>
            ) : null}
          </div>

          <div className="mt-1 text-xs text-slate-300/70">{p.tag}</div>
        </div>

        <div className="h-10 w-10 shrink-0 rounded-xl border border-white/10 bg-gradient-to-br from-violet-500/20 to-cyan-400/10" />
      </div>

      <p className="mt-4 text-sm leading-relaxed text-slate-300/90">
        {p.description}
      </p>

      {p.impact?.length ? (
        <ul className="mt-4 space-y-2 text-sm text-slate-300/85">
          {p.impact.slice(0, 3).map((x, i) => (
            <li key={i} className="flex gap-2">
              <span className="mt-2 h-1.5 w-1.5 rounded-full bg-violet-300/70" />
              <span>{x}</span>
            </li>
          ))}
        </ul>
      ) : null}

      {p.stack?.length ? (
        <div className="mt-4 flex flex-wrap gap-2">
          {p.stack.slice(0, 8).map((t) => (
            <span
              key={t}
              className="rounded-full bg-white/5 px-3 py-1 text-xs text-slate-200/80"
            >
              {t}
            </span>
          ))}
        </div>
      ) : null}

      {p.links?.length ? (
        <div className="mt-5 flex flex-wrap gap-3">
          {p.links.map((l) => (
            <a
              key={l.label}
              href={l.url}
              target={l.url?.startsWith("http") ? "_blank" : "_self"}
              rel="noreferrer"
              className="rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-xs text-slate-200/90 hover:bg-white/10"
            >
              {l.label}
            </a>
          ))}
        </div>
      ) : null}
    </div>
  );
}
