export default function GlassPanel({
  children,
  className = "",
}) {
  return (
    <div
      className={`
        rounded-3xl
        border border-white/10
        bg-white/4
        backdrop-blur-xl
        shadow-[0_8px_32px_rgba(0,0,0,0.35)]
        ${className}
      `}
    >
      {children}
    </div>
  );
}