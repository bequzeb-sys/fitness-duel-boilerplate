"use client";

import { useState, useCallback } from "react";
import { toast } from "sonner";
import { useLocalStorage } from "./useLocalStorage";
import {
  Zap,
  AlertCircle,
  CheckCircle2,
} from "lucide-react";

export function useUserProfile() {
  // User identity — persisted
  const [userName, setUserName] = useLocalStorage("fitness_duel_user_name", "Alex GUERRIER");
  const [userEmail, setUserEmail] = useLocalStorage("fitness_duel_user_email", "utilisateur@example.com");

  // Body stats — persisted
  const [userWeight, setUserWeight] = useLocalStorage("fitness_duel_user_weight", 78);
  const [userHeight, setUserHeight] = useLocalStorage("fitness_duel_user_height", 180);
  const [userBio, setUserBio] = useLocalStorage(
    "fitness_duel_user_bio",
    "Guerrier en constante évolution. Objectif : Top 1 du classement mondial de Fitness Duel ! ⭐"
  );
  const [userStatus, setUserStatus] = useLocalStorage("fitness_duel_user_status", "À fond sur la musculation");
  const [dailyXpGoal, setDailyXpGoal] = useLocalStorage("fitness_duel_daily_xp_goal", 150);

  // BMI (derived)
  const heightInMeters = userHeight / 100;
  const bmiScore =
    heightInMeters > 0
      ? (userWeight / (heightInMeters * heightInMeters)).toFixed(1)
      : "0";

  // Returns i18n keys — translate at render time via useTranslations("profil")
  const getBmiCategory = (scoreNum: number): { key: string; color: string } => {
    if (scoreNum < 18.5) return { key: "imcLow", color: "text-amber-400" };
    if (scoreNum < 25) return { key: "imcNormal", color: "text-emerald-400" };
    if (scoreNum < 30) return { key: "imcOver", color: "text-orange-400" };
    return { key: "imcObese", color: "text-red-400" };
  };

  // Toast notifications (Sonner)
  const addToast = useCallback(
    (msg: string, type: "success" | "error" | "info" | "xp" = "success") => {
      if (type === "xp") {
        toast.success(msg, {
          icon: <Zap className="h-4 w-4 fill-cyan-400 text-cyan-400" />,
        });
      } else if (type === "info") {
        toast.info(msg, {
          icon: <AlertCircle className="h-4 w-4 text-brand-blue" />,
        });
      } else if (type === "error") {
        toast.error(msg, {
          icon: <AlertCircle className="h-4 w-4 text-rose-400" />,
        });
      } else {
        toast.success(msg, {
          icon: <CheckCircle2 className="h-4 w-4" />,
        });
      }
    },
    []
  );

  return {
    userName,
    setUserName,
    userEmail,
    setUserEmail,
    userWeight,
    setUserWeight,
    userHeight,
    setUserHeight,
    userBio,
    setUserBio,
    userStatus,
    setUserStatus,
    dailyXpGoal,
    setDailyXpGoal,
    bmiScore,
    getBmiCategory,
    addToast,
  };
}
