import { Link, useNavigate } from "@tanstack/react-router";
import { Brand } from "./Brand";
import { useGame } from "@/lib/game-store";
import { MODULES, TOTAL_XP } from "@/lib/game-data";

export function Hud({ step = 2 }: { step?: number }) {
  const { player, signOut } = useGame();
  const navigate = useNavigate();

  return (
    <header className="flex items-center justify-between gap-4 px-6 py-5">
      <Link to="/home">
        <Brand />
      </Link>

      <ol className="hidden items-center gap-2 md:flex" aria-label="Progress">
        {[1, 2, 3].map((n) => (
          <li key={n} className="flex items-center gap-2">
            <span
              className={`grid size-7 place-items-center rounded-full border font-display text-xs ${
                n < step
                  ? "border-primary bg-primary/20 text-primary"
                  : n === step
                    ? "border-primary bg-primary text-primary-foreground shadow-glow"
                    : "border-border bg-card text-muted-foreground"
              }`}
            >
              {n < step ? "✓" : n}
            </span>
            {n < 3 && <span className="h-px w-8 bg-border" />}
          </li>
        ))}
      </ol>

      <div className="flex items-center gap-3">
        <div className="rounded-xl border border-primary/40 bg-card/80 px-4 py-2 text-right">
          <div className="font-display text-lg leading-none text-primary">{player.xp}</div>
          <div className="text-[9px] tracking-[0.2em] text-muted-foreground">TOTAL XP</div>
        </div>
        <div className="hidden rounded-xl border border-border bg-card/80 px-4 py-2 text-right sm:block">
          <div className="font-display text-lg leading-none text-foreground">
            {player.completed.length}/{MODULES.length}
          </div>
          <div className="text-[9px] tracking-[0.2em] text-muted-foreground">COMPLETED</div>
        </div>
        <button
          onClick={() => {
            signOut();
            navigate({ to: "/" });
          }}
          className="rounded-xl border border-destructive/50 bg-destructive/15 px-3 py-2 text-xs font-semibold text-destructive-foreground transition-colors hover:bg-destructive/30"
        >
          LOG OUT
        </button>
      </div>
    </header>
  );
}

export function XpBar() {
  const { player } = useGame();
  const pct = Math.round((player.xp / TOTAL_XP) * 100);
  return (
    <div className="h-2 w-full overflow-hidden rounded-full bg-secondary">
      <div className="h-full rounded-full bg-gradient-quest transition-all" style={{ width: `${pct}%` }} />
    </div>
  );
}
