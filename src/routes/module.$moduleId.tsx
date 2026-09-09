import { createFileRoute, useNavigate, useParams } from "@tanstack/react-router";
import { useEffect, useState } from "react";

import { Scene } from "@/components/game/Scene";
import { Hud } from "@/components/game/Hud";
import { BadgeModal } from "@/components/game/BadgeModal";
import { getModule } from "@/lib/game-data";
import { useGame } from "@/lib/game-store";

export const Route = createFileRoute("/module/$moduleId")({
  head: () => ({
    meta: [
      { title: "Mission — YTM Quest" },
      {
        name: "description",
        content: "Play a YTM Quest mission: study the briefing, answer the quiz and unlock your badge.",
      },
      { property: "og:title", content: "Mission — YTM Quest" },
      { property: "og:description", content: "Study the briefing, pass the quiz, unlock your badge." },
    ],
  }),
  component: ModulePage,
});

type Stage = "brief" | "study" | "quiz" | "done";

function ModulePage() {
  const { moduleId } = useParams({ from: "/module/$moduleId" });
  const mod = getModule(moduleId);
  const navigate = useNavigate();
  const { player, ready, completeModule, isUnlocked } = useGame();

  const [stage, setStage] = useState<Stage>("brief");
  const [qIndex, setQIndex] = useState(0);
  const [picked, setPicked] = useState<number | null>(null);
  const [wrong, setWrong] = useState(false);

  useEffect(() => {
    if (!ready) return;
    if (!player.name) navigate({ to: "/profile" });
    else if (mod && !isUnlocked(mod.id)) navigate({ to: "/journey" });
  }, [ready, player.name, mod, isUnlocked, navigate]);

  if (!mod) {
    return (
      <Scene>
        <main className="grid min-h-screen place-items-center px-5 text-center">
          <div>
            <h1 className="font-display text-2xl">Mission not found</h1>
            <button className="btn-quest mt-4" onClick={() => navigate({ to: "/journey" })}>
              Back to journey
            </button>
          </div>
        </main>
      </Scene>
    );
  }

  const question = mod.quiz[qIndex];

  const submitAnswer = () => {
    if (picked === null) return;
    if (picked !== question.answer) {
      setWrong(true);
      return;
    }
    setWrong(false);
    setPicked(null);
    if (qIndex + 1 < mod.quiz.length) {
      setQIndex(qIndex + 1);
    } else {
      completeModule(mod.id);
      setStage("done");
    }
  };

  return (
    <Scene>
      <Hud step={2} />
      <main className="mx-auto max-w-4xl px-5 pb-20">
        {stage === "brief" && (
          <section className="panel p-8 text-center">
            <span className="text-5xl" aria-hidden>
              {mod.icon}
            </span>
            <h1 className="mt-4 font-display text-4xl">
              Mission {mod.index}: <span className="text-primary">{mod.name}</span>
            </h1>
            <p className="mt-3 text-sm text-muted-foreground">{mod.brief}</p>
            <p className="mt-3 font-display text-primary">Reward: {mod.xp} XP + badge</p>
            <button className="btn-quest mt-6" onClick={() => setStage("study")}>
              START MISSION →
            </button>
          </section>
        )}

        {stage === "study" && (
          <section>
            <h1 className="text-center font-display text-4xl">
              Explore: <span className="text-primary">{mod.studyTitle}</span>
            </h1>
            <p className="mt-2 text-center text-sm text-muted-foreground">
              Take a good look through the details below before the quiz begins.
            </p>
            <div className="panel mt-6 grid gap-3 p-5 sm:grid-cols-2 lg:grid-cols-3">
              {mod.study.map((c) => (
                <article
                  key={c.title}
                  className="rounded-xl border border-border bg-secondary p-4 transition-colors hover:border-primary"
                >
                  {c.year && <p className="font-display text-sm text-primary">{c.year}</p>}
                  <h2 className="mt-1 font-display text-sm">{c.title}</h2>
                  <p className="mt-1 text-xs text-muted-foreground">{c.text}</p>
                </article>
              ))}
            </div>
            <p className="mx-auto mt-6 w-fit rounded-lg border border-primary/50 bg-card px-4 py-2 text-xs text-muted-foreground">
              ⓘ Study the details above — the next screen will test what you remember.
            </p>
            <div className="mt-6 flex justify-center">
              <button className="btn-quest" onClick={() => setStage("quiz")}>
                I'M READY — TAKE THE QUIZ →
              </button>
            </div>
          </section>
        )}

        {stage === "quiz" && (
          <section>
            <h1 className="text-center font-display text-4xl">
              Explore <span className="text-primary">Quiz</span>
            </h1>
            <p className="mt-2 text-center text-sm text-muted-foreground">
              Answer all questions correctly to complete this module.
            </p>
            <div className="mt-4 flex justify-center gap-2">
              {mod.quiz.map((_, i) => (
                <span
                  key={i}
                  className={`size-2 rounded-full ${i <= qIndex ? "bg-primary" : "bg-secondary"}`}
                />
              ))}
            </div>

            <div className="panel mt-6 p-7">
              <p className="font-display text-[11px] tracking-[0.2em] text-primary">
                QUESTION {qIndex + 1} OF {mod.quiz.length}
              </p>
              <h2 className="mt-3 font-display text-xl">{question.q}</h2>
              <div className="mt-5 grid gap-3">
                {question.options.map((opt, i) => (
                  <button
                    key={opt}
                    onClick={() => {
                      setPicked(i);
                      setWrong(false);
                    }}
                    className={`flex items-center gap-3 rounded-xl border px-4 py-3 text-left transition-colors ${
                      picked === i
                        ? "border-primary bg-primary/10"
                        : "border-border bg-secondary hover:border-primary/50"
                    }`}
                  >
                    <span className="grid size-6 place-items-center rounded-md bg-card font-display text-[11px] text-muted-foreground">
                      {String.fromCharCode(65 + i)}
                    </span>
                    <span className="text-sm">{opt}</span>
                  </button>
                ))}
              </div>
              {wrong && (
                <p className="mt-4 text-sm text-destructive-foreground">
                  Not quite — think back to the briefing and try again.
                </p>
              )}
              <button className="btn-quest mt-6 w-full" disabled={picked === null} onClick={submitAnswer}>
                SUBMIT ANSWER
              </button>
            </div>
          </section>
        )}

        {stage === "done" && (
          <BadgeModal
            badge={mod.badge}
            xp={mod.xp}
            moduleName={mod.name}
            onContinue={() => navigate({ to: "/journey" })}
          />
        )}
      </main>
    </Scene>
  );
}
