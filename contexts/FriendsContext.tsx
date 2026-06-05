"use client";

import React, { createContext, useContext, useCallback, ReactNode } from "react";
import { useLocalStorage } from "@/app/hooks/useLocalStorage";

export interface Friend {
  name: string;
  status: string;
  score: number;
  level: string;
  avatar: string;
}

interface FriendsContextValue {
  friendsList: Friend[];
  setFriendsList: React.Dispatch<React.SetStateAction<Friend[]>>;
  addFriend: (name: string) => void;
  removeFriend: (name: string) => void;
}

const FriendsContext = createContext<FriendsContextValue | undefined>(undefined);

const DEFAULT_FRIENDS: Friend[] = [
  {
    name: "Thomas",
    status: "En entraînement 🏃‍♂️",
    score: 580,
    level: "Maître",
    avatar:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=120",
  },
  {
    name: "Camille",
    status: "En ligne 🟢",
    score: 380,
    level: "Guerrier",
    avatar:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=120",
  },
  {
    name: "Lucas",
    status: "Inactif 🔴",
    score: 350,
    level: "Recrue",
    avatar:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=120",
  },
  {
    name: "Chloé",
    status: "En ligne 🟢",
    score: 300,
    level: "Recrue",
    avatar:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=120",
  },
];

const RANDOM_AVATARS = [
  "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=120",
  "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?auto=format&fit=crop&q=80&w=120",
  "https://images.unsplash.com/photo-1527980965255-d3b416303d12?auto=format&fit=crop&q=80&w=120",
] as const;

export function FriendsProvider({ children }: { children: ReactNode }) {
  const [friendsList, setFriendsList] = useLocalStorage(
    "fitness_duel_friends",
    DEFAULT_FRIENDS
  );

  const addFriend = useCallback(
    (name: string) => {
      setFriendsList((prev) => {
        if (prev.some((f) => f.name.toLowerCase() === name.toLowerCase())) return prev;
        const avatar = RANDOM_AVATARS[Math.floor(Math.random() * RANDOM_AVATARS.length)]!;
        return [
          ...prev,
          {
            name,
            status: "En ligne 🟢",
            score: 180,
            level: "Recrue",
            avatar,
          },
        ];
      });
    },
    [setFriendsList]
  );

  const removeFriend = useCallback(
    (name: string) => {
      setFriendsList((prev) => prev.filter((f) => f.name !== name));
    },
    [setFriendsList]
  );

  return (
    <FriendsContext.Provider value={{ friendsList, setFriendsList, addFriend, removeFriend }}>
      {children}
    </FriendsContext.Provider>
  );
}

export function useFriends() {
  const ctx = useContext(FriendsContext);
  if (!ctx) throw new Error("useFriends must be used within FriendsProvider");
  return ctx;
}
