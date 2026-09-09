import badgeArt from "@/assets/badge-core.png";

export function BadgeModal({
  badge,
  xp,
  moduleName,
  onContinue,
}: {
  badge: string;
  xp: number;
  moduleName: string;
  onContinue: () => void;
}) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 px-4 backdrop-blur-sm">
      <div className="w-full max-w-md rounded-3xl border border-primary bg-card p-8 text-center shadow-glow animate-pop">
        <p className="font-display text-[10px] tracking-[0.3em] text-primary">
          LEVEL COMPLETE, BADGE UNLOCKED
        </p>
        <img
          src={badgeArt}
          alt={`${badge} badge`}
          width={768}
          height={768}
          className="mx-auto mt-4 size-40 animate-float object-contain drop-shadow-[0_0_28px_var(--primary)]"
        />
        <h2 className="mt-4 font-display text-3xl text-foreground">{badge}</h2>
        <p className="mt-2 text-sm text-muted-foreground">{moduleName} completed successfully.</p>
        <p className="mt-2 font-display text-lg text-primary">+{xp} XP</p>
        <button onClick={onContinue} className="btn-quest mt-6 w-full">
          CONTINUE JOURNEY
        </button>
      </div>
    </div>
  );
}
