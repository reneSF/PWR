export default function ProjectCard({ p }) {
  return (
    <div className="rounded-2xl border border-black/10 bg-white p-5 shadow-sm dark:border-white/10 dark:bg-white/5">
      <div className="flex items-start justify-between gap-3">
        <h3 className="text-base font-semibold text-slate-900 dark:text-slate-100">
          {p.title}
        </h3>

        {p.tag ? (
          <span className="shrink-0 rounded-full border border-black/10 bg-slate-50 px-3 py-1 text-xs text-slate-700 dark:border-white/10 dark:bg-white/5 dark:text-slate-200/80">
            {p.tag}
          </span>
        ) : null}
      </div>

      {p.description ? (
        <p className="mt-2 text-sm leading-relaxed text-slate-700 dark:text-slate-300/90">
          {p.description}
        </p>
      ) : null}

      {p.tech?.length ? (
        <div className="mt-4 flex flex-wrap gap-2">
          {p.tech.map((t) => (
            <span
              key={t}
              className="rounded-full border border-black/10 bg-white px-3 py-1 text-xs text-slate-700 dark:border-white/10 dark:bg-white/5 dark:text-slate-200/80"
            >
              {t}
            </span>
          ))}
        </div>
      ) : null}

      {p.links?.length ? (
        <div className="mt-4 flex flex-wrap gap-2">
          {p.links.map((l) => (
            <a
              key={l.label}
              href={l.url}
              target={l.url?.startsWith("http") ? "_blank" : "_self"}
              rel="noreferrer"
              className="rounded-xl border border-black/10 bg-white px-3 py-2 text-sm text-slate-900 hover:bg-slate-50 dark:border-white/10 dark:bg-white/5 dark:text-slate-100 dark:hover:bg-white/10"
            >
              {l.label}
            </a>
          ))}
        </div>
      ) : null}
    </div>
  );
}
