export default function Card({ children, className = "" }) {
  return (
    <div
      className={[
        "rounded-2xl border border-white/10 bg-white/5 p-6",
        "shadow-[0_20px_70px_-25px_rgba(0,0,0,0.8)]",
        "backdrop-blur",
        className
      ].join(" ")}
    >
      {children}
    </div>
  );
}
