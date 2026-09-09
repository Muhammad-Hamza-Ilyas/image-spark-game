import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";

import { Scene } from "@/components/game/Scene";
import { AVATARS, useGame } from "@/lib/game-store";

export const Route = createFileRoute("/profile")({
  head: () => ({
    meta: [
      { title: "Create your player — YTM Quest" },
      {
        name: "description",
        content: "Pick your name, role and avatar before your YTM Quest onboarding adventure begins.",
      },
      { property: "og:title", content: "Create your player — YTM Quest" },
      { property: "og:description", content: "Pick your name, role and avatar to start the quest." },
    ],
  }),
  component: Profile,
});

function Profile() {
  const { player, saveProfile } = useGame();
  const navigate = useNavigate();
  const [name, setName] = useState(player.name);
  const [position, setPosition] = useState(player.position);
  const [gender, setGender] = useState<"male" | "female" | "">(player.gender);
  const [avatar, setAvatar] = useState(player.avatar);

  const canContinue = name.trim().length > 1 && position.trim().length > 1 && gender !== "";

  return (
    <Scene>
      <main className="mx-auto max-w-3xl px-5 py-10">
        <ol className="mx-auto flex w-fit items-center gap-3" aria-label="Progress">
          {["Your Profile", "Your Journey", "Let's Begin"].map((label, i) => (
            <li key={label} className="flex items-center gap-3">
              <div className="text-center">
                <span
                  className={`mx-auto grid size-8 place-items-center rounded-full border font-display text-sm ${
                    i === 0
                      ? "border-primary bg-gradient-quest text-primary-foreground shadow-glow"
                      : "border-border bg-card text-muted-foreground"
                  }`}
                >
                  {i + 1}
                </span>
                <span className="mt-1 block text-[10px] text-muted-foreground">{label}</span>
              </div>
              {i < 2 && <span className="h-px w-10 bg-border" />}
            </li>
          ))}
        </ol>

        <h1 className="mt-6 text-center font-display text-4xl">
          Welcome to YTM <span className="text-primary">Quest!</span>
        </h1>
        <p className="mt-2 text-center text-sm text-muted-foreground">
          Let's get to know you before your adventure begins.
        </p>

        <section className="panel mt-8 p-6">
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="text-xs tracking-wide text-muted-foreground">Full Name</label>
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter your full name"
                className="mt-2 w-full rounded-lg border border-border bg-input px-4 py-3 outline-none placeholder:text-muted-foreground focus:border-primary"
              />
            </div>
            <div>
              <label className="text-xs tracking-wide text-muted-foreground">
                Position / Designation
              </label>
              <input
                value={position}
                onChange={(e) => setPosition(e.target.value)}
                placeholder="Enter your position or designation"
                className="mt-2 w-full rounded-lg border border-border bg-input px-4 py-3 outline-none placeholder:text-muted-foreground focus:border-primary"
              />
            </div>
          </div>

          <p className="mt-6 text-xs tracking-wide text-muted-foreground">Gender</p>
          <div className="mt-2 grid grid-cols-2 gap-3">
            {(["male", "female"] as const).map((g) => (
              <button
                key={g}
                onClick={() => setGender(g)}
                className={`rounded-lg border px-4 py-3 font-display capitalize transition-colors ${
                  gender === g
                    ? "border-primary bg-gradient-quest text-primary-foreground"
                    : "border-border bg-secondary text-muted-foreground hover:text-foreground"
                }`}
              >
                {g}
              </button>
            ))}
          </div>

          <p className="mt-6 text-xs tracking-wide text-muted-foreground">Choose Your Avatar</p>
          <div className="mt-3 grid grid-cols-2 gap-4 sm:grid-cols-4">
            {AVATARS.map((a) => (
              <button
                key={a.id}
                onClick={() => setAvatar(a.id)}
                className={`relative rounded-xl border p-2 transition-all ${
                  avatar === a.id
                    ? "border-primary bg-primary/10 shadow-glow"
                    : "border-border bg-secondary hover:border-primary/50"
                }`}
              >
                <img
                  src={a.src}
                  alt={a.label}
                  loading="lazy"
                  width={512}
                  height={512}
                  className="mx-auto size-24 object-contain"
                />
                <span className="mt-1 block text-center text-[11px] text-muted-foreground">
                  {a.label}
                </span>
                {avatar === a.id && (
                  <span className="absolute right-2 top-2 grid size-5 place-items-center rounded-full bg-primary text-[10px] text-primary-foreground">
                    ✓
                  </span>
                )}
              </button>
            ))}
          </div>

          <div className="mt-8 flex justify-center">
            <button
              disabled={!canContinue}
              onClick={() => {
                saveProfile({ name: name.trim(), position: position.trim(), gender, avatar });
                navigate({ to: "/home" });
              }}
              className="btn-quest w-full sm:w-64"
            >
              Continue →
            </button>
          </div>
        </section>
      </main>
    </Scene>
  );
}
