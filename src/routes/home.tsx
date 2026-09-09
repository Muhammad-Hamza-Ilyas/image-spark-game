import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { useEffect } from "react";

import { Scene } from "@/components/game/Scene";
import { Hud } from "@/components/game/Hud";
import { useGame } from "@/lib/game-store";
import badgeArt from "@/assets/badge-core.png";

export const Route = createFileRoute("/home")({
  head: () => ({
    meta: [
      { title: "Home base — YTM Quest" },
      {
        name: "description",
        content: "Your YTM Quest home base: track XP, badges and start the next onboarding mission.",
      },
      { property: "og:title", content: "Home base — YTM Quest" },
      { property: "og:description", content: "Discover. Decide. Lead. Track your XP and badges." },
    ],
  }),
  component: Home,
});

const PILLARS = [
  { icon: "🧭", title: "EXPLORE", text: "Discover our heritage, business, and values.", xp: 25 },
  { icon: "📘", title: "LEARN", text: "Understand processes, policies, and standards.", xp: 50 },
  { icon: "🎯", title: "DECIDE", text: "Make smart decisions in real scenarios.", xp: 75 },
  { icon: "🏆", title: "LEAD", text: "Earn badges, build your DNA and lead.", xp: 100 },
];

function Home() {
  const { player, ready, avatarSrc, level } = useGame();
  const navigate = useNavigate();

  useEffect(() => {
    if (ready && !player.name) navigate({ to: "/profile" });
  }, [ready, player.name, navigate]);

  return (
    <Scene>
      <Hud step={2} />
      <main className="mx-auto max-w-6xl px-5 pb-16">
        <div className="grid items-center gap-8 lg:grid-cols-[280px_1fr_260px]">
          <div className="panel p-4 text-center">
            <img
              src={avatarSrc}
              alt="Your avatar"
              width={512}
              height={512}
              className="mx-auto size-48 animate-float object-contain drop-shadow-[0_0_25px_var(--primary)]"
            />
            <p className="mt-2 font-display text-xl">{player.name || "Recruit"}</p>
            <p className="text-xs text-primary">★ {level.title}</p>
            <p className="mt-3 rounded-lg border border-border bg-secondary p-3 text-left text-[11px] text-muted-foreground">
              <span className="text-primary">Explorer Tip </span>
              Complete missions in order to unlock new challenges and earn rewards.
            </p>
          </div>

          <div>
            <div className="panel flex items-center gap-3 p-4">
              <img src={avatarSrc} alt="" width={512} height={512} className="size-10 object-contain" />
              <div>
                <p className="text-[11px] text-muted-foreground">Welcome back,</p>
                <p className="font-display text-lg">{player.name || "Recruit"}</p>
              </div>
            </div>

            <p className="mt-6 text-[11px] tracking-[0.3em] text-muted-foreground">WELCOME TO</p>
            <h1 className="font-display text-5xl">
              YTM <span className="text-primary">QUEST</span>
            </h1>
            <p className="mt-1 text-xs tracking-[0.25em] text-muted-foreground">
              DISCOVER. DECIDE. LEAD.
            </p>

            <div className="panel mt-5 border-l-4 border-l-primary p-4">
              <p className="font-display text-sm text-primary">Hi {player.name || "there"}!</p>
              <p className="mt-1 text-sm text-muted-foreground">
                You are about to begin an exciting journey across YTM. Complete challenges, earn XP,
                unlock badges and become a{" "}
                <span className="text-primary">YTM Certified Leader!</span>
              </p>
            </div>

            <Link to="/journey" className="btn-quest mt-6">
              START JOURNEY →
            </Link>
          </div>

          <div className="hidden lg:block">
            <img
              src={badgeArt}
              alt="Trophy badge"
              loading="lazy"
              width={768}
              height={768}
              className="animate-float object-contain drop-shadow-[0_0_35px_var(--primary)]"
            />
          </div>
        </div>

        <p className="mt-12 text-center text-xs tracking-[0.3em] text-muted-foreground">
          · YOUR ADVENTURE AWAITS ·
        </p>
        <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {PILLARS.map((p) => (
            <div key={p.title} className="panel p-5 transition-colors hover:border-primary">
              <span className="text-2xl" aria-hidden>
                {p.icon}
              </span>
              <h2 className="mt-3 font-display text-lg">{p.title}</h2>
              <p className="mt-1 text-xs text-muted-foreground">{p.text}</p>
              <p className="mt-3 font-display text-sm text-primary">{p.xp} XP →</p>
            </div>
          ))}
        </div>
      </main>
    </Scene>
  );
}
