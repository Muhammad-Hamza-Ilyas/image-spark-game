import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from "react";

import avatar1 from "@/assets/avatar-1.png";
import avatar2 from "@/assets/avatar-2.png";
import avatar3 from "@/assets/avatar-3.png";
import avatar4 from "@/assets/avatar-4.png";
import { MODULES, levelFor } from "./game-data";

export const AVATARS = [
  { id: "a1", src: avatar1, label: "Explorer" },
  { id: "a2", src: avatar2, label: "Innovator" },
  { id: "a3", src: avatar3, label: "Designer" },
  { id: "a4", src: avatar4, label: "Strategist" },
];

export type Player = {
  employeeNumber: string;
  name: string;
  position: string;
  gender: "male" | "female" | "";
  avatar: string;
  xp: number;
  completed: string[];
  badges: string[];
};

const EMPTY: Player = {
  employeeNumber: "",
  name: "",
  position: "",
  gender: "",
  avatar: "a1",
  xp: 0,
  completed: [],
  badges: [],
};

const KEY = "ytm-quest-player";

type Ctx = {
  player: Player;
  ready: boolean;
  signIn: (employeeNumber: string) => void;
  signOut: () => void;
  saveProfile: (p: Partial<Player>) => void;
  completeModule: (id: string) => void;
  isUnlocked: (id: string) => boolean;
  avatarSrc: string;
  level: { level: number; title: string; min: number };
};

const GameContext = createContext<Ctx | null>(null);

export function GameProvider({ children }: { children: ReactNode }) {
  const [player, setPlayer] = useState<Player>(EMPTY);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(KEY);
      if (raw) setPlayer({ ...EMPTY, ...JSON.parse(raw) });
    } catch {
      /* ignore */
    }
    setReady(true);
  }, []);

  const persist = useCallback((next: Player) => {
    setPlayer(next);
    try {
      localStorage.setItem(KEY, JSON.stringify(next));
    } catch {
      /* ignore */
    }
  }, []);

  const value = useMemo<Ctx>(() => {
    const isUnlocked = (id: string) => {
      const i = MODULES.findIndex((m) => m.id === id);
      if (i <= 0) return true;
      return player.completed.includes(MODULES[i - 1].id);
    };
    return {
      player,
      ready,
      isUnlocked,
      level: levelFor(player.xp),
      avatarSrc: (AVATARS.find((a) => a.id === player.avatar) ?? AVATARS[0]).src,
      signIn: (employeeNumber) => persist({ ...player, employeeNumber }),
      signOut: () => persist(EMPTY),
      saveProfile: (p) => persist({ ...player, ...p }),
      completeModule: (id) => {
        if (player.completed.includes(id)) return;
        const mod = MODULES.find((m) => m.id === id);
        if (!mod) return;
        persist({
          ...player,
          xp: player.xp + mod.xp,
          completed: [...player.completed, id],
          badges: [...player.badges, mod.badge],
        });
      },
    };
  }, [player, ready, persist]);

  return <GameContext.Provider value={value}>{children}</GameContext.Provider>;
}

export function useGame() {
  const ctx = useContext(GameContext);
  if (!ctx) throw new Error("useGame must be used inside GameProvider");
  return ctx;
}
