import { useEffect, useMemo, useState } from "react";
import Section from "../components/Section.jsx";
import ProjectCard from "../components/ProjectCard.jsx";
import Card from "../components/Card.jsx";
import { fetchPortfolio, sendContact } from "../api/portfolio.js";

export default function Home() {
  const [data, setData] = useState(null);
  const [tag, setTag] = useState("Todos");
  const [loading, setLoading] = useState(true);

  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [sending, setSending] = useState(false);
  const [sentOk, setSentOk] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        const d = await fetchPortfolio();
        setData(d);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const tags = useMemo(() => {
    if (!data?.projects) return ["Todos"];
    const uniq = Array.from(new Set(data.projects.map((p) => p.tag)));
    return ["Todos", ...uniq];
  }, [data]);

  const filteredProjects = useMemo(() => {
    if (!data?.projects) return [];
    if (tag === "Todos") return data.projects;
    return data.projects.filter((p) => p.tag === tag);
  }, [data, tag]);

  async function onSubmit(e) {
    e.preventDefault();
    setSending(true);
    setSentOk(false);
    try {
      await sendContact(form);
      setSentOk(true);
      setForm({ name: "", email: "", message: "" });
    } catch (err) {
      console.error(err);
      alert("No se pudo enviar. Revisa que el backend esté corriendo.");
    } finally {
      setSending(false);
    }
  }

  if (loading) return <div className="min-h-screen bg-slate-950 p-8 text-slate-200">Cargando…</div>;

  if (!data) {
    return (
      <div className="min-h-screen bg-slate-950 p-8 text-slate-200">
        No se pudo cargar el portfolio. Revisa consola (F12).
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      {/* Decorative gradients */}
      <div className="pointer-events-none fixed inset-0">
        <div className="absolute left-1/2 top-[-120px] h-[380px] w-[380px] -translate-x-1/2 rounded-full bg-violet-500/15 blur-3xl" />
        <div className="absolute right-[-140px] top-[200px] h-[360px] w-[360px] rounded-full bg-cyan-400/10 blur-3xl" />
      </div>

      <header className="sticky top-0 z-20 border-b border-white/10 bg-slate-950/70 backdrop-blur">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-5 py-4">
          <div className="flex items-center gap-3">
            <img
  src="/avatar.png"
  alt="Foto de perfil"
  className="h-9 w-9 rounded-xl border border-white/10 object-cover"
/>
            <div>
              <div className="text-sm font-semibold tracking-tight">{data.about?.name}</div>
              <div className="text-xs text-slate-300/70">{data.about?.role}</div>
            </div>
          </div>

          <nav className="hidden gap-5 text-sm text-slate-300/80 md:flex">
            <a className="hover:text-slate-100" href="#inicio">Inicio</a>
            <a className="hover:text-slate-100" href="#experiencia">Experiencia</a>
            <a className="hover:text-slate-100" href="#proyectos">Proyectos</a>
            <a className="hover:text-slate-100" href="#habilidades">Habilidades</a>
            <a className="hover:text-slate-100" href="#contacto">Contacto</a>
          </nav>
        </div>
      </header>

      <Section
        id="inicio"
        title="Inicio"
        subtitle="Perfil orientado a desarrollo full-stack, automatización y construcción de productos de datos con enfoque profesional."
      >
        <Card className="relative overflow-hidden">
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-violet-500/10 via-transparent to-cyan-400/10" />
          <div className="relative">
            <p className="text-sm text-slate-300/80">
              {data.about?.location}
            </p>

            <h1 className="mt-3 text-4xl font-semibold tracking-tight">
              {data.about?.name}
            </h1>

            <p className="mt-2 text-base text-slate-200/85">
              {data.about?.role}
            </p>

            <p className="mt-5 max-w-3xl text-sm leading-relaxed text-slate-300/90">
              {data.about?.summary}
            </p>

            {data.about?.highlights?.length ? (
              <div className="mt-6 grid gap-3 md:grid-cols-3">
                {data.about.highlights.slice(0, 3).map((h, i) => (
                  <div key={i} className="rounded-2xl border border-white/10 bg-white/5 p-4">
                    <div className="text-xs text-slate-300/70">Fortaleza</div>
                    <div className="mt-1 text-sm font-semibold text-slate-100">{h}</div>
                  </div>
                ))}
              </div>
            ) : null}

            <div className="mt-6 flex flex-wrap gap-3">
              {data.about?.links?.map((l) => (
                <a
                  key={l.label}
                  href={l.url}
                  target={l.url?.startsWith("http") ? "_blank" : "_self"}
                  rel="noreferrer"
                  className="rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm hover:bg-white/10"
                >
                  {l.label}
                </a>
              ))}
              <a
                href="#contacto"
                className="rounded-xl border border-violet-400/30 bg-violet-500/15 px-4 py-2 text-sm text-violet-100 hover:bg-violet-500/20"
              >
                Contactar
              </a>
            </div>
          </div>
        </Card>
      </Section>

      <Section
        id="experiencia"
        title="Experiencia"
        subtitle="Enfoque en impacto: automatización, entrega consistente, y construcción de features que se usan en producto."
      >
        <div className="grid gap-4">
          {data.experience?.map((xp) => (
            <Card key={xp.company}>
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <div className="text-lg font-semibold">{xp.title}</div>
                  <div className="mt-1 text-sm text-slate-300/80">
                    {xp.company} · {xp.location}
                  </div>
                </div>
                <div className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-slate-200/80">
                  {xp.period}
                </div>
              </div>

              <p className="mt-4 text-sm leading-relaxed text-slate-300/90">
                {xp.summary}
              </p>

              <ul className="mt-4 space-y-2 text-sm text-slate-300/90">
                {xp.bullets?.map((b, i) => (
                  <li key={i} className="flex gap-2">
                    <span className="mt-2 h-1.5 w-1.5 rounded-full bg-violet-300/70" />
                    <span>{b}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-5 flex flex-wrap gap-2">
                {xp.tech?.map((t) => (
                  <span
                    key={t}
                    className="rounded-full bg-white/5 px-3 py-1 text-xs text-slate-200/80"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </Card>
          ))}
        </div>
      </Section>

      <Section
        id="proyectos"
        title="Proyectos"
        subtitle="Selección de trabajos recientes: automatización de reportes, plataformas web, y participación en retos técnicos."
      >
        <div className="mb-6 flex flex-wrap gap-2">
          {tags.map((t) => (
            <button
              key={t}
              onClick={() => setTag(t)}
              className={[
                "rounded-full border px-4 py-2 text-sm transition",
                "border-white/10",
                tag === t
                  ? "bg-violet-500/15 text-violet-100"
                  : "bg-white/5 text-slate-200/80 hover:bg-white/10"
              ].join(" ")}
            >
              {t}
            </button>
          ))}
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          {filteredProjects.map((p) => (
            <ProjectCard key={p.title} p={p} />
          ))}
        </div>
      </Section>

      <Section
        id="habilidades"
        title="Habilidades"
        subtitle="Stack principal y capacidades que aplico en proyectos reales: frontend, backend y automatización."
      >
        <div className="grid gap-4 md:grid-cols-2">
          {Object.entries(data.skills || {}).map(([k, arr]) => (
            <Card key={k}>
              <div className="text-sm font-semibold capitalize">
                {k.replaceAll("_", " ")}
              </div>
              <div className="mt-4 flex flex-wrap gap-2">
                {arr.map((s) => (
                  <span key={s} className="rounded-full bg-white/5 px-3 py-1 text-xs text-slate-200/80">
                    {s}
                  </span>
                ))}
              </div>
            </Card>
          ))}
        </div>
      </Section>

      <Section
        id="contacto"
        title="Contacto"
        subtitle="Si te interesa mi perfil para prácticas, trainee o proyecto, aquí podemos conectar."
      >
        <div className="grid gap-4 md:grid-cols-2">
          <Card>
            <div className="text-sm font-semibold">Datos</div>
            <div className="mt-3 space-y-2 text-sm text-slate-300/90">
              <div><span className="text-slate-300/70">Correo:</span> {data.contact?.email}</div>
              <div><span className="text-slate-300/70">Tel:</span> {data.contact?.phone}</div>
              <div><span className="text-slate-300/70">Ubicación:</span> {data.contact?.location}</div>
            </div>
            <p className="mt-4 text-sm text-slate-300/85">
              {data.contact?.cta}
            </p>
          </Card>

          <Card>
            <div className="text-sm font-semibold">Envíame un mensaje</div>

            <form onSubmit={onSubmit} className="mt-4 space-y-3">
              <input
                className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm text-slate-100 placeholder:text-slate-400/70 outline-none focus:border-violet-400/40"
                placeholder="Tu nombre"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                required
              />
              <input
                className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm text-slate-100 placeholder:text-slate-400/70 outline-none focus:border-violet-400/40"
                placeholder="Tu correo"
                type="email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                required
              />
              <textarea
                className="w-full min-h-[130px] rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm text-slate-100 placeholder:text-slate-400/70 outline-none focus:border-violet-400/40"
                placeholder="Tu mensaje"
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                required
              />

              <button
                disabled={sending}
                className="rounded-xl border border-violet-400/30 bg-violet-500/15 px-4 py-2 text-sm text-violet-100 hover:bg-violet-500/20 disabled:opacity-60"
              >
                {sending ? "Enviando…" : "Enviar"}
              </button>

              {sentOk ? (
                <div className="text-xs text-slate-300/80">
                  ✅ Mensaje enviado (si tu backend lo procesa).  
                </div>
              ) : null}
            </form>
          </Card>
        </div>
      </Section>

      <footer className="border-t border-white/10 py-10 text-center text-xs text-slate-300/60">
        © {new Date().getFullYear()} {data.about?.name} · Portafolio profesional
      </footer>
    </div>
  );
}
