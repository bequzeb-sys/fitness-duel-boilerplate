"use client";

import { useTranslations } from "next-intl";
import Image from "next/image";
import { AnimatePresence } from "motion/react";
import { ChevronRight } from "lucide-react";
import { Card } from "@/app/components/ui/card";
import { Avatar } from "@/app/components/ui/avatar";

interface RecentActivity {
  id: string;
  type: "challenge_made" | "challenge_taken" | "challenge_won";
  user: string;
  target: string;
  detail: string;
  time: string;
  avatar: string;
}

interface ActivityFeedProps {
  recentActivities: RecentActivity[];
  onViewAll: () => void;
}

export function ActivityFeed({ recentActivities, onViewAll }: ActivityFeedProps) {
  const t = useTranslations("home");

  return (
    <Card padding="lg" className="space-y-4">
      <div className="flex justify-between items-center pb-2 border-b border-border-card/60">
        <h3 className="font-display font-bold text-sm text-slate-200 uppercase tracking-wider">
          {t("recentActivity")}
        </h3>
        <button
          onClick={onViewAll}
          className="text-brand-blue hover:text-brand-cyan text-xs font-medium transition-colors hover:underline bg-transparent border-none cursor-pointer"
        >
          {t("viewAll")}
        </button>
      </div>

      <div className="space-y-3.5">
        {recentActivities.map((act) => (
          <div key={act.id} className="flex gap-3 items-start group">
            <Avatar
              src={act.avatar}
              alt={act.user}
              size="sm"
              fallback={act.user.slice(0, 2)}
            />
            <div className="flex-1 min-w-0">
              <p className="text-xs text-slate-300 leading-normal">
                <strong className="text-white font-bold group-hover:text-brand-blue transition-colors">
                  {act.user}
                </strong>{" "}
                {act.type === "challenge_made" && t("actionLaunched")}
                {act.type === "challenge_taken" && t("actionCompleted")}
                {act.type === "challenge_won" && t("actionWon")}
                <span className="block text-xs font-semibold text-brand-blue mt-0.5">{act.detail}</span>
              </p>
            </div>
            <span className="text-xs text-slate-500 font-mono shrink-0 pt-0.5">{act.time}</span>
          </div>
        ))}
      </div>
    </Card>
  );
}

interface ChallengeHighlight {
  id: string;
  title: string;
  participants: number;
  timeLeft: string;
  image: string;
  category: string;
}

interface ChallengeHighlightListProps {
  challenges: ChallengeHighlight[];
  onViewAll: () => void;
  onChallengeClick: (title: string) => void;
}

export function ChallengeHighlightList({
  challenges,
  onViewAll,
  onChallengeClick,
}: ChallengeHighlightListProps) {
  const t = useTranslations("home");

  return (
    <Card padding="lg" className="space-y-4">
      <div className="flex justify-between items-center pb-2 border-b border-border-card/60">
        <h3 className="font-display font-bold text-sm text-slate-200 uppercase tracking-wider">
          {t("currentChallenges")}
        </h3>
        <button
          onClick={onViewAll}
          className="text-brand-blue hover:text-brand-cyan text-xs font-medium transition-colors hover:underline bg-transparent border-none cursor-pointer"
        >
          {t("viewAll")}
        </button>
      </div>

      <div className="space-y-3">
        <AnimatePresence initial={false}>
          {challenges.map((chal) => (
            <Card
              key={chal.id}
              variant="interactive"
              padding="none"
              className="flex min-h-[5.5rem] sm:h-20"
              onClick={() => onChallengeClick(chal.title)}
            >
              <div className="w-24 relative overflow-hidden shrink-0">
                <Image
                  src={chal.image}
                  alt={chal.title}
                  fill
                  sizes="96px"
                  className="object-cover transition-transform group-hover:scale-110"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-brand-blue/10 mix-blend-overlay" />
              </div>
              <div className="flex-1 p-3 flex flex-col justify-between min-w-0">
                <div>
                  <h4 className="text-xs font-bold text-white truncate group-hover:text-brand-blue transition-colors">
                    {chal.title}
                  </h4>
                  <p className="text-xs text-slate-500 font-medium mt-0.5">{chal.category}</p>
                </div>
                <div className="flex items-center justify-between text-xs text-slate-400 font-mono">
                  <span>
                    {t("partLabel")}{" "}
                    <strong className="text-white font-bold">{chal.participants}</strong>
                  </span>
                  <span className="text-brand-blue">
                    {t("endLabel")} {chal.timeLeft}
                  </span>
                </div>
              </div>
              <div className="px-2 flex items-center justify-center bg-surface-overlay border-l border-border-card text-slate-500 group-hover:text-brand-blue transition-colors shrink-0">
                <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </div>
            </Card>
          ))}
        </AnimatePresence>
      </div>
    </Card>
  );
}
