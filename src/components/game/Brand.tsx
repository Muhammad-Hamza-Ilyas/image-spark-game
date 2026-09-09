export function Brand({ size = "sm" }: { size?: "sm" | "lg" }) {
  const lg = size === "lg";
  return (
    <div className="flex items-center gap-3">
      <span className={lg ? "text-6xl" : "text-3xl"} aria-hidden>
        🌿
      </span>
      <div className="leading-none">
        <div
          className={`font-display tracking-[0.35em] text-foreground ${lg ? "text-4xl" : "text-lg"}`}
        >
          YUNUS
        </div>
        <div className={`mt-1 text-muted-foreground ${lg ? "text-sm" : "text-[9px]"}`}>
          Textiles for a <span className="text-primary">BETTER</span> life
        </div>
      </div>
    </div>
  );
}
