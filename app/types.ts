// Shared types used across page components

export interface Message {
  id: string;
  sender: "coach" | "user";
  text: string;
  timestamp: Date;
}

export interface Challenge {
  id: string;
  title: string;
  participants: number;
  timeLeft: string;
  image: string;
  category: string;
}

export interface RecentActivity {
  id: string;
  type: "challenge_made" | "challenge_taken" | "challenge_won";
  user: string;
  target: string;
  detail: string;
  time: string;
  avatar: string;
}

export interface Ranking {
  rank: number;
  name: string;
  score: number;
  isCrown?: boolean;
  isYou?: boolean;
  avatar: string;
}

export interface RankingEntry {
  rank: number;
  name: string;
  score: number;
  isCrown?: boolean;
  isYou?: boolean;
  avatar: string;
}

export interface CoachSuggestion {
  text: string;
  keyword: string;
}

export type ToastType = "success" | "error" | "info";

export interface SavedPlan {
  id: string;
  category: string;
  title: string;
  content: string;
  date: string;
}

export const TABS = {
  HOME:     "Accueil",
  DEFIS:    "Défis",
  ACTIVITY: "Activité",
  FRIENDS:  "Amis",
  RANKINGS: "Classements",
  BADGES:   "Badges",
  COACH:    "Coach IA",
  PROFIL:   "Profil",
} as const;
