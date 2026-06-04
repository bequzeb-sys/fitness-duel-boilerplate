"use client";

import React, { createContext, useContext, useCallback, ReactNode } from "react";
import { useLocalStorage } from "@/app/hooks/useLocalStorage";
import { toast } from "sonner";
import { Zap, AlertCircle, CheckCircle2 } from "lucide-react";

interface StreakDay {
  day: string;
  checked: boolean;
}

interface UserContextValue {
  userXp: number;
  setUserXp: React.Dispatch<React.SetStateAction<number>>;
  streakDays: StreakDay[];
  setStreakDays: React.Dispatch<React.SetStateAction<StreakDay[]>>;
  recentActivities: Array<{
    id: string;
    type: "challenge_made" | "challenge_taken" | "challenge_won";
    user: string;
    target: string;
    detail: string;
    time: string;
    avatar: string;
  }>;
  setRecentActivities: React.Dispatch<
    React.SetStateAction<
      Array<{
        id: string;
        type: "challenge_made" | "challenge_taken" | "challenge_won";
        user: string;
        target: string;
        detail: string;
        time: string;
        avatar: string;
      }>
    >
  >;
  gainXp: (amount: number, reason: string) => void;
  toggleStreakDay: (index: number) => void;
}

const UserContext = createContext<UserContextValue | undefined>(undefined);

const DEFAULT_STREAK: StreakDay[] = [
  { day: "Lun", checked: true },
  { day: "Mar", checked: true },
  { day: "Mer", checked: true },
  { day: "Jeu", checked: true },
  { day: "Ven", checked: true },
  { day: "Sam", checked: true },
  { day: "Dim", checked: false },
];

const DEFAULT_ACTIVITIES = [
  {
    id: "act1",
    type: "challenge_made" as const,
    user: "Thomas",
    target: "toi",
    detail: "Pompes en 2 minutes",
    time: "Il y a 2h",
    avatar:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=120",
  },
  {
    id: "act2",
    type: "challenge_taken" as const,
    user: "Camille",
    target: "ton",
    detail: "Gainage max",
    time: "Il y a 4h",
    avatar:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=120",
  },
  {
    id: "act3",
    type: "challenge_won" as const,
    user: "Lucas",
    target: "le",
    detail: "Squats en 3 min",
    time: "Il y a 6h",
    avatar:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=120",
  },
];

const MAX_XP = 2500;

const RANKING_AVATARS = [
  "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=120",
  "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=120",
  "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?auto=format&fit=crop&q=80&w=120",
  "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=120",
  "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=120",
] as const;

export function UserProvider({ children }: { children: ReactNode }) {
  const [userXp, setUserXp] = useLocalStorage("fitness_duel_xp", 2150);
  const [streakDays, setStreakDays] = useLocalStorage("fitness_duel_streak", DEFAULT_STREAK);
  const [recentActivities, setRecentActivities] = useLocalStorage(
    "fitness_duel_activities",
    DEFAULT_ACTIVITIES
  );

  const gainXp = useCallback(
    (amount: number, reason: string) => {
      setUserXp((prev) => {
        const next = prev + amount;
        if (next >= MAX_XP) {
          toast.success(`Félicitations ! Tu passes au niveau LÉGENDE ! 👑 +${amount} XP`, {
            icon: <Zap className="h-4 w-4 fill-cyan-400 text-cyan-400" />,
          });
          return next - MAX_XP;
        }
        toast.success(`+${amount} XP : ${reason}`, {
          icon: <Zap className="h-4 w-4 fill-cyan-400 text-cyan-400" />,
        });
        return next;
      });
    },
    [setUserXp]
  );

  const toggleStreakDay = useCallback(
    (index: number) => {
      setStreakDays((prev) => {
        const updated = [...prev];
        if (!updated[index]) return prev;
        updated[index] = { ...updated[index]!, checked: !updated[index]!.checked };
        return updated;
      });
      const entry = streakDays[index];
      if (entry?.checked) gainXp(10, "Série quotidienne mise à jour ! 🔥");
    },
    [setStreakDays, streakDays, gainXp]
  );

  const addActivity = useCallback(
    (
      type: "challenge_made" | "challenge_taken" | "challenge_won",
      user: string,
      target: string,
      detail: string
    ) => {
      setRecentActivities((prev) => [
        {
          id: `act_${Date.now()}`,
          type,
          user,
          target,
          detail,
          time: "À l'instant",
          avatar: RANKING_AVATARS[2]!,
        },
        ...prev,
      ]);
    },
    [setRecentActivities]
  );

  return (
    <UserContext.Provider
      value={{
        userXp,
        setUserXp,
        streakDays,
        setStreakDays,
        recentActivities,
        setRecentActivities,
        gainXp,
        toggleStreakDay,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  const ctx = useContext(UserContext);
  if (!ctx) throw new Error("useUser must be used within UserProvider");
  return ctx;
}
