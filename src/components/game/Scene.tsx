import type { ReactNode } from "react";
import millBg from "@/assets/mill-bg.jpg";

export function Scene({ children }: { children: ReactNode }) {
  return (
    <div className="relative min-h-screen overflow-hidden bg-background">
      <div
        className="pointer-events-none absolute inset-0 bg-cover bg-center opacity-30"
        style={{ backgroundImage: `url(${millBg})` }}
        aria-hidden
      />
      <div className="pointer-events-none absolute inset-0 bg-scene-veil" aria-hidden />
      <Sparks />
      <div className="relative z-10">{children}</div>
    </div>
  );
}

function Sparks() {
  const dots = Array.from({ length: 26 }, (_, i) => i);
  return (
    <div className="pointer-events-none absolute inset-0" aria-hidden>
      {dots.map((i) => (
        <span
          key={i}
          className="absolute size-1 rounded-full bg-primary/70 animate-spark"
          style={{
            left: `${(i * 37) % 100}%`,
            top: `${(i * 61) % 100}%`,
            animationDelay: `${(i % 9) * 0.8}s`,
            animationDuration: `${6 + (i % 5)}s`,
          }}
        />
      ))}
    </div>
  );
}
