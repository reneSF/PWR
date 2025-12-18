export default function Card({ children, className = "" }) {
  return (
    <div
      className={[
        "rounded-2xl border p-6 backdrop-blur",
        "border-black/10 bg-white shadow-[0_20px_70px_-25px_rgba(0,0,0,0.15)]",
        "dark:border-white/10 dark:bg-white/5 dark:shadow-[0_20px_70px_-25px_rgba(0,0,0,0.8)]",
        className,
      ].join(" ")}
    >
      {children}
    </div>
  );
}
