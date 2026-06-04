"use client";

import React, { useState } from "react";
import { Activity, Dumbbell, Flame, Check } from "lucide-react";
import { motion } from "motion/react";
import { useTranslations } from "next-intl";
import { Separator } from "@/app/components/ui/separator";
import { Button } from "@/app/components/ui/button";
import { Card } from "@/app/components/ui/card";
import { Avatar } from "@/app/components/ui/avatar";
import { cn } from "@/lib/utils";

interface RecentActivity {
  id: string;
  type: "challenge_made" | "challenge_taken" | "challenge_won";
  user: string;
  target: string;
  detail: string;
  time: string;
  avatar: string;
}

interface ActivitePageProps {
  recentActivities: RecentActivity[];
  setRecentActivities: React.Dispatch<React.SetStateAction<RecentActivity[]>>;
  gainXp: (amount: number, reason: string) => void;
  addToast: (msg: string, type?: "success" | "info" | "xp") => void;
}

const MY_AVATAR = "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?auto=format&fit=crop&q=80&w=120";

const EXERCISE_TYPES = [
  { key: "Pompes", labelKey: "typePompes", defaultValue: 40, unit: "reps" },
  { key: "Squats", labelKey: "typeSquats", defaultValue: 40, unit: "reps" },
  { key: "Course", labelKey: "typeCourse", defaultValue: 30, unit: "min" },
  { key: "Gainage", labelKey: "typeGainage", defaultValue: 5, unit: "min" },
] as const;

export default function ActivitePage({
  recentActivities,
  setRecentActivities,
  gainXp,
  addToast,
}: ActivitePageProps) {
  const t = useTranslations("activity");
  const [activityFilter, setActivityFilter] = useState<"all" | "mine" | "friends">("all");
  const [logExerciseType, setLogExerciseType] = useState("Pompes");
  const [logValue, setLogValue] = useState(30);
  const [logIntensity, setLogIntensity] = useState("Medium");

  const currentExercise = EXERCISE_TYPES.find(e => e.key === logExerciseType) ?? EXERCISE_TYPES[0];
  const intensityXpMultiplier = logIntensity === "Beast" ? 2 : 1.2;
  const intensityCalMultiplier = logIntensity === "Beast" ? 10 : 7;
  const estimatedXp = Math.round(logValue * intensityXpMultiplier);
  const estimatedCal = logValue * intensityCalMultiplier;

  const handleLogWorkout = (e: React.FormEvent) => {
    e.preventDefault();
    const nextActId = Date.now();
    const activityItem: RecentActivity = {
      id: `act_${nextActId}`,
      type: "challenge_taken",
      user: "Toi",
      target: "ton",
      detail: `Séance de ${t(currentExercise.labelKey)} (${logValue} ${currentExercise.unit}) - Mode ${logIntensity}`,
      time: t("justNow"),
      avatar: MY_AVATAR
    };
    setRecentActivities((prev) => [activityItem, ...prev]);
    gainXp(estimatedXp, t("exerciseValid", { exercise: t(currentExercise.labelKey), calories: estimatedCal }));
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -15 }}
      className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start text-left"
    >
      {/* Left Side Workout Logging form */}
      <div className="lg:col-span-5">
      <Card padding="lg" className="space-y-5">
        <div className="pb-2">
          <div className="flex items-center gap-2.5 mb-3">
            <div className="p-2 bg-brand-blue/15 text-brand-blue rounded-lg">
              <Dumbbell className="h-5 w-5" />
            </div>
            <div>
              <h3 className="font-display font-bold text-white text-sm uppercase tracking-wider">{t("title")}</h3>
              <p className="text-xs text-slate-400">{t("subtitle")}</p>
            </div>
          </div>
          <Separator />
        </div>

        <form onSubmit={handleLogWorkout} className="space-y-4">
          <div className="space-y-1.5">
            <label className="text-xs font-semibold uppercase tracking-wider text-slate-400 block">{t("exerciseType")}</label>
            <div className="grid grid-cols-2 gap-2">
              {EXERCISE_TYPES.map((ex) => (
                <Button
                  key={ex.key}
                  variant="secondary"
                  size="sm"
                  onClick={() => {
                    setLogExerciseType(ex.key);
                    setLogValue(ex.defaultValue);
                  }}
                  className={cn(
                    "p-3 text-xs justify-center",
                    logExerciseType === ex.key
                      ? "bg-brand-blue border-brand-blue text-bg-dark shadow-brand"
                      : "bg-surface-input border-border-card text-slate-400"
                  )}
                >
                  <span>{t(ex.labelKey)}</span>
                </Button>
              ))}
            </div>
          </div>

          <div className="space-y-1.5">
            <div className="flex justify-between items-center">
              <label className="text-xs font-semibold uppercase tracking-wider text-slate-400 block">
                {currentExercise.unit === "reps" ? t("repetitions") : t("duration")}
              </label>
              <span className="text-xs font-mono font-bold text-brand-cyan">{logValue}</span>
            </div>

            <div className="flex bg-surface-input border border-border-card rounded-xl p-1 items-center justify-between">
              <Button variant="icon" size="icon-sm" onClick={() => setLogValue(prev => Math.max(1, prev - 5))} className="h-10 w-10 text-white text-base font-extrabold shrink-0">-</Button>
              <span className="text-sm font-bold text-white font-mono">{logValue}</span>
              <Button variant="icon" size="icon-sm" onClick={() => setLogValue(prev => prev + 5)} className="h-10 w-10 text-white text-base font-extrabold shrink-0">+</Button>
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-semibold uppercase tracking-wider text-slate-400 block">{t("intensity")}</label>
            <div className="grid grid-cols-3 gap-2">
              {[
                { id: "Low", labelKey: "intensityCool" },
                { id: "Medium", labelKey: "intensityMedium" },
                { id: "Beast", labelKey: "intensityBeast" }
              ].map((rate) => (
                <Button
                  key={rate.id}
                  variant="secondary"
                  size="sm"
                  onClick={() => setLogIntensity(rate.id)}
                  className={cn(
                    "p-2.5 text-xs justify-center",
                    logIntensity === rate.id
                      ? "bg-brand-blue border-brand-blue text-bg-dark shadow-brand"
                      : "bg-surface-input border-border-card text-slate-400"
                  )}
                >
                  {t(rate.labelKey)}
                </Button>
              ))}
            </div>
          </div>

          <div className="bg-surface-input border border-border-card rounded-xl p-3.5 space-y-2 text-xs font-mono">
            <div className="flex justify-between text-slate-400">
              <span>{t("estimatedXp")}</span>
              <span className="text-brand-cyan font-bold">+{estimatedXp} XP</span>
            </div>
            <div className="flex justify-between text-slate-400">
              <span>{t("caloriesBurned")}</span>
              <span className="text-orange-400 font-bold">~ {estimatedCal} kcal</span>
            </div>
          </div>

          <Button
            type="submit"
            variant="primary"
            size="md"
            className="w-full"
          >
            <span>{t("submit")}</span>
            <Check className="h-4 w-4" />
          </Button>
        </form>
      </Card>
      </div>

      <div className="lg:col-span-7">
      <Card padding="lg" className="space-y-5">
        <div className="pb-2">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-3">
            <h3 className="font-display font-bold text-white text-sm uppercase tracking-wider">{t("feedTitle")}</h3>

            <div className="flex bg-surface-input p-1 rounded-lg border border-border-card shrink-0">
              {[
                { id: "all", labelKey: "filterAll" },
                { id: "mine", labelKey: "filterMine" },
                { id: "friends", labelKey: "filterFriends" },
              ].map((tf) => (
                <Button
                  key={tf.id}
                  variant="secondary"
                  size="sm"
                  onClick={() => setActivityFilter(tf.id as "all" | "mine" | "friends")}
                  className={cn(
                    "px-3 py-1 text-[10px]",
                    activityFilter === tf.id
                      ? "bg-hover-bg text-brand-blue border border-border-card"
                      : "text-slate-400 hover:text-slate-200 bg-transparent"
                  )}
                >
                  {t(tf.labelKey)}
                </Button>
              ))}
            </div>
          </div>
          <Separator />
        </div>

        <div className="space-y-4">
          {recentActivities
            .filter(act => {
              if (activityFilter === "mine") return act.user === "Toi";
              if (activityFilter === "friends") return act.user !== "Toi";
              return true;
            })
            .map((act) => (
              <Card key={act.id} padding="md" className="space-y-3 hover:border-brand-blue/20">
                <div className="flex justify-between items-start gap-2">
                  <div className="flex gap-3">
                    <Avatar
                      src={act.avatar}
                      alt={act.user}
                      size="md"
                      fallback={act.user.slice(0, 2)}
                    />
                    <div>
                      <p className="text-xs text-slate-300">
                        <strong className="text-white font-extrabold">{act.user === "Toi" ? t("filterMine") : act.user}</strong>{" "}
                        {act.type === "challenge_made" && t("actionLaunched")}
                        {act.type === "challenge_taken" && t("actionCompleted")}
                        {act.type === "challenge_won" && t("actionWon")}
                      </p>
                      <span className="block text-xs font-extrabold text-brand-blue mt-1">{act.detail}</span>
                    </div>
                  </div>
                  <span className="text-[10px] text-slate-500 font-mono shrink-0">{act.time}</span>
                </div>

                <Separator />
                <div className="flex justify-between items-center text-[10px] text-slate-500 font-semibold font-mono">
                  <button
                    onClick={() => {
                      gainXp(5, t("encouragement", { user: act.user }));
                      addToast(t("encouragement", { user: act.user }), "success");
                    }}
                    className="hover:text-brand-cyan flex items-center gap-1.5 transition-colors group cursor-pointer"
                  >
                    <span>{t("encourage")}</span>
                    <span className="group-hover:underline">{t("encourageXp")}</span>
                  </button>
                  <span className="text-slate-500 flex items-center gap-1">
                    <Flame className="h-3 w-3 text-orange-500 animate-pulse" /> {t("liveFeed")}
                  </span>
                </div>
              </Card>
            ))}

          {recentActivities.filter(act => {
            if (activityFilter === "mine") return act.user === "Toi";
            if (activityFilter === "friends") return act.user !== "Toi";
            return true;
          }).length === 0 && (
            <div className="py-12 text-center text-slate-500">
              <Activity className="h-8 w-8 text-slate-700 mx-auto mb-2 animate-pulse" />
              <p className="text-xs">{t("noActivity")}</p>
            </div>
          )}
        </div>
      </Card>
      </div>
    </motion.div>
  );
}
