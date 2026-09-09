import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";

import { Scene } from "@/components/game/Scene";
import { Brand } from "@/components/game/Brand";
import { useGame } from "@/lib/game-store";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Sign in — YTM Quest Onboarding Game" },
      {
        name: "description",
        content: "Sign in with your employee number to begin or continue your YTM Quest onboarding adventure.",
      },
      { property: "og:title", content: "Sign in — YTM Quest" },
      { property: "og:description", content: "Begin or continue your YTM onboarding adventure." },
    ],
  }),
  component: Login,
});

function Login() {
  const { signIn, player } = useGame();
  const navigate = useNavigate();
  const [role, setRole] = useState<"player" | "admin">("player");
  const [emp, setEmp] = useState("");
  const [pass, setPass] = useState("");
  const [error, setError] = useState("");

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (emp.trim().length < 3 || pass.length < 3) {
      setError("Enter your employee number and password to continue.");
      return;
    }
    signIn(emp.trim());
    navigate({ to: player.name ? "/home" : "/profile" });
  };

  return (
    <Scene>
      <main className="mx-auto flex min-h-screen max-w-lg flex-col items-center justify-center px-5 py-12">
        <Brand size="lg" />
        <h1 className="mt-6 font-display text-4xl">
          YTM <span className="text-primary">Quest</span>
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Sign in to begin or continue your onboarding adventure.
        </p>

        <form onSubmit={submit} className="panel mt-8 w-full p-6 shadow-glow">
          <div className="grid grid-cols-2 gap-3">
            {(["player", "admin"] as const).map((r) => (
              <button
                key={r}
                type="button"
                onClick={() => setRole(r)}
                className={`rounded-lg border px-4 py-2 font-display text-sm capitalize transition-colors ${
                  role === r
                    ? "border-primary bg-gradient-quest text-primary-foreground"
                    : "border-border bg-secondary text-muted-foreground hover:text-foreground"
                }`}
              >
                {r}
              </button>
            ))}
          </div>

          <label className="mt-6 block text-xs font-semibold tracking-wide text-muted-foreground">
            {role === "admin" ? "Admin ID" : "Employee Number"}
          </label>
          <input
            value={emp}
            onChange={(e) => setEmp(e.target.value)}
            placeholder="e.g. 45210"
            className="mt-2 w-full rounded-lg border border-border bg-input px-4 py-3 text-foreground outline-none placeholder:text-muted-foreground focus:border-primary"
          />

          <label className="mt-4 block text-xs font-semibold tracking-wide text-muted-foreground">
            Password
          </label>
          <input
            type="password"
            value={pass}
            onChange={(e) => setPass(e.target.value)}
            placeholder="Enter your password"
            className="mt-2 w-full rounded-lg border border-border bg-input px-4 py-3 text-foreground outline-none placeholder:text-muted-foreground focus:border-primary"
          />

          {error && <p className="mt-3 text-xs text-destructive-foreground">{error}</p>}

          <button type="submit" className="btn-quest mt-6 w-full">
            Enter the Quest →
          </button>
        </form>

        <p className="mt-8 text-[11px] tracking-wide text-muted-foreground">
          Yunus Brothers Group · YTM Quest Onboarding
        </p>
      </main>
    </Scene>
  );
}
