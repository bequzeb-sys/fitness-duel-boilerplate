"use client";

import React, { createContext, useContext, useCallback, ReactNode } from "react";
import { useLocalStorage } from "@/app/hooks/useLocalStorage";

export interface Challenge {
  id: string;
  title: string;
  participants: number;
  timeLeft: string;
  image: string;
  category: string;
}

interface ChallengeContextValue {
  challenges: Challenge[];
  setChallenges: React.Dispatch<React.SetStateAction<Challenge[]>>;
  selectedChallenge: Challenge | null;
  selectChallenge: (chal: Challenge | null) => void;
  addChallenge: (chal: Challenge) => void;
  removeChallenge: (id: string) => void;
  completeChallenge: (id: string) => void;
}

const ChallengeContext = createContext<ChallengeContextValue | undefined>(undefined);

const DEFAULT_CHALLENGES: Challenge[] = [
  {
    id: "def1",
    title: "Pompes en 2 minutes",
    participants: 5,
    timeLeft: "2j 14h 32m",
    image:
      "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?auto=format&fit=crop&q=80&w=600",
    category: "Musculation",
  },
  {
    id: "def2",
    title: "Course 5 km",
    participants: 8,
    timeLeft: "5j 09h 15m",
    image:
      "https://images.unsplash.com/photo-1476480862126-209bfaa8edc8?auto=format&fit=crop&q=80&w=600",
    category: "Endurance",
  },
];

const CHALLENGE_IMAGES: Record<string, string> = {
  Musculation:
    "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&q=80&w=600",
  Endurance:
    "https://images.unsplash.com/photo-1476480862126-209bfaa8edc8?auto=format&fit=crop&q=80&w=600",
  Gainage:
    "https://images.unsplash.com/photo-1541534741688-6078c6bfb5c5?auto=format&fit=crop&q=80&w=600",
  Squats:
    "https://images.unsplash.com/photo-1574680096145-d05b474e2155?auto=format&fit=crop&q=80&w=600",
};

export function ChallengeProvider({ children }: { children: ReactNode }) {
  const [challenges, setChallenges] = useLocalStorage(
    "fitness_duel_challenges",
    DEFAULT_CHALLENGES
  );
  const [selectedChallenge, selectChallenge] = React.useState<Challenge | null>(null);

  const addChallenge = useCallback(
    (chal: Challenge) => {
      setChallenges((prev) => [chal, ...prev]);
    },
    [setChallenges]
  );

  const removeChallenge = useCallback(
    (id: string) => {
      setChallenges((prev) => prev.filter((c) => c.id !== id));
    },
    [setChallenges]
  );

  const completeChallenge = useCallback(
    (id: string) => {
      setChallenges((prev) => prev.filter((c) => c.id !== id));
      selectChallenge(null);
    },
    [setChallenges]
  );

  return (
    <ChallengeContext.Provider
      value={{
        challenges,
        setChallenges,
        selectedChallenge,
        selectChallenge,
        addChallenge,
        removeChallenge,
        completeChallenge,
      }}
    >
      {children}
    </ChallengeContext.Provider>
  );
}

export function useChallenges() {
  const ctx = useContext(ChallengeContext);
  if (!ctx) throw new Error("useChallenges must be used within ChallengeProvider");
  return ctx;
}

export { CHALLENGE_IMAGES };
