export default function Card({ className = "", children }) {
  return (
    <div
      className={[
        "rounded-3xl border border-black/10 bg-white/90 p-6 shadow-sm backdrop-blur",
        "dark:border-white/10 dark:bg-white/5",
        className,
      ].join(" ")}
    >
      {children}
    </div>
  );
}
