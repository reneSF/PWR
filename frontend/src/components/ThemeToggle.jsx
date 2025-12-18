export default function ThemeToggle({ theme, toggle }) {
  const isDark = theme === "dark";

  return (
    <button
      onClick={toggle}
      className="inline-flex items-center gap-2 rounded-xl border border-black/10 bg-white/70 px-3 py-2 text-xs text-slate-800 hover:bg-white
                 dark:border-white/10 dark:bg-white/5 dark:text-slate-100 dark:hover:bg-white/10"
      aria-label="Cambiar tema"
      type="button"
    >
      <span className="text-sm">{isDark ? "🌙" : "☀️"}</span>
      <span className="hidden sm:inline">{isDark ? "Oscuro" : "Claro"}</span>

      {/* Switch visual */}
      <span
        className="relative ml-1 h-5 w-9 rounded-full bg-slate-300/70 dark:bg-slate-700/70"
        aria-hidden="true"
      >
        <span
          className={[
            "absolute top-0.5 h-4 w-4 rounded-full bg-white shadow transition",
            isDark ? "left-4" : "left-0.5",
          ].join(" ")}
        />
      </span>
    </button>
  );
}
