export function SectionHeading({
  overline,
  title,
  children,
  tone = "light",
}: {
  overline?: string;
  title: string;
  children?: React.ReactNode;
  tone?: "light" | "dark";
}) {
  const dark = tone === "dark";
  return (
    <div className="max-w-3xl">
      {overline && (
        <p className={`font-mono text-xs tracking-widest ${dark ? "text-cyan" : "text-electric"}`}>{overline}</p>
      )}
      <h2 className={`mt-3 text-3xl font-semibold md:text-5xl ${dark ? "!text-white" : ""}`}>{title}</h2>
      {children && <p className={`mt-5 text-lg ${dark ? "text-slate-300" : "text-slate"}`}>{children}</p>}
    </div>
  );
}
