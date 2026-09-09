import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";

import { Scene } from "@/components/game/Scene";
import { Hud } from "@/components/game/Hud";
import { MODULES, TOTAL_XP } from "@/lib/game-data";
import { useGame } from "@/lib/game-store";

export const Route = createFileRoute("/journey")({
  head: () => ({
    meta: [
      { title: "Choose your journey — YTM Quest" },
      {
        name: "description",
        content: "Pick your next YTM Quest mission: eight modules of challenges, XP and badges.",
      },
      { property: "og:title", content: "Choose your journey — YTM Quest" },
      { property: "og:description", content: "Eight missions. Complete each module to unlock the next." },
    ],
  }),
  component: Journey,
});

function Journey() {
  const { player, ready, avatarSrc, level, isUnlocked } = useGame();
  const navigate = useNavigate();
  const [toast, setToast] = useState<string | null>(null);

  useEffect(() => {
    if (ready && !player.name) navigate({ to: "/profile" });
  }, [ready, player.name, navigate]);

  useEffect(() => {
    if (!toast) return;
    const t = setTimeout(() => setToast(null), 2600);
    return () => clearTimeout(t);
  }, [toast]);

  const progress = Math.round((player.completed.length / MODULES.length) * 100);
  const nextModule = MODULES.find((m) => !player.completed.includes(m.id));

  return (
    <Scene>
      <Hud step={2} />

      {toast && (
        <div className="fixed right-5 top-5 z-50 rounded-lg border border-destructive/60 bg-destructive/25 px-4 py-3 text-sm">
          {toast}
        </div>
      )}

      <main className="mx-auto max-w-6xl px-5 pb-16">
        <h1 className="text-center font-display text-4xl">
          Choose Your <span className="text-primary">Journey</span>
        </h1>
        <p className="mt-2 text-center text-sm text-muted-foreground">
          Embark on a series of challenges and missions. Complete each module to unlock the next.
        </p>

        <div className="mt-8 grid gap-4 md:grid-cols-3 lg:grid-cols-5">
          <div className="panel row-span-2 p-4 text-center">
            <img
              src={avatarSrc}
              alt="Your avatar"
              width={512}
              height={512}
              className="mx-auto size-24 rounded-full border-2 border-primary object-contain"
            />
            <p className="mt-2 font-display text-lg">{player.name}</p>
            <p className="mx-auto mt-1 w-fit rounded-full bg-primary/15 px-3 py-1 text-[11px] text-primary">
              ★ {level.title}
            </p>
            <div className="mt-4 flex justify-between text-[11px] text-muted-foreground">
              <span>LEVEL {level.level}</span>
              <span>
                {player.xp} / {TOTAL_XP} XP
              </span>
            </div>
            <div className="mt-1 h-1.5 w-full overflow-hidden rounded-full bg-secondary">
              <div
                className="h-full bg-gradient-quest"
                style={{ width: `${Math.round((player.xp / TOTAL_XP) * 100)}%` }}
              />
            </div>
          </div>

          {MODULES.map((m) => {
            const done = player.completed.includes(m.id);
            const unlocked = isUnlocked(m.id);
            return (
              <button
                key={m.id}
                onClick={() =>
                  unlocked
                    ? navigate({ to: "/module/$moduleId", params: { moduleId: m.id } })
                    : setToast(`Complete "${MODULES[m.index - 2]?.name}" to unlock this mission.`)
                }
                className={`panel relative p-4 text-center transition-all ${
                  done
                    ? "border-primary/70"
                    : unlocked
                      ? "border-primary shadow-glow hover:-translate-y-1"
                      : "opacity-55 hover:opacity-80"
                }`}
              >
                <span
                  className={`absolute left-3 top-3 grid size-5 place-items-center rounded-full text-[10px] ${
                    done
                      ? "bg-primary text-primary-foreground"
                      : "bg-secondary text-muted-foreground"
                  }`}
                >
                  {done ? "✓" : m.index}
                </span>
                {!unlocked && <span className="absolute right-3 top-3 text-xs">🔒</span>}
                <span className={`text-4xl ${unlocked ? "" : "grayscale"}`} aria-hidden>
                  {m.icon}
                </span>
                <p className="mt-3 font-display text-sm">{m.name}</p>
                <p className="mt-1 text-[11px] text-muted-foreground">{m.tagline}</p>
                <p className="mt-2 font-display text-sm text-primary">{m.xp} XP</p>
              </button>
            );
          })}
        </div>

        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <Stat icon="🎖" value={String(player.badges.length)} label="BADGES EARNED" />
          <Stat icon="📈" value={`${progress}%`} label="JOURNEY PROGRESS" />
          <Stat
            icon="🧬"
            value={progress === 100 ? "COMPLETE" : "PENDING"}
            label="DNA PROFILE"
          />
          <Stat icon="🏆" value={`${TOTAL_XP} XP`} label="MAX ACHIEVABLE" />
        </div>

        <div className="mt-8 flex justify-center">
          <button
            className="btn-quest"
            onClick={() =>
              nextModule
                ? navigate({ to: "/module/$moduleId", params: { moduleId: nextModule.id } })
                : navigate({ to: "/home" })
            }
          >
            {nextModule ? "CONTINUE →" : "QUEST COMPLETE 🏆"}
          </button>
        </div>
      </main>
    </Scene>
  );
}

function Stat({ icon, value, label }: { icon: string; value: string; label: string }) {
  return (
    <div className="panel flex items-center gap-3 p-4">
      <span className="text-xl" aria-hidden>
        {icon}
      </span>
      <div>
        <p className="font-display text-lg leading-none">{value}</p>
        <p className="mt-1 text-[10px] tracking-[0.2em] text-muted-foreground">{label}</p>
      </div>
    </div>
  );
}
