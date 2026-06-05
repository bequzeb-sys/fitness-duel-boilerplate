"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import { Card } from "@/app/components/ui/card";

const RANKING_TABS = ["Semaine", "Mois", "Tout le temps"] as const;

interface Ranking {
  rank: number;
  name: string;
  score: number;
  isCrown?: boolean;
  isYou?: boolean;
  avatar: string;
}

interface LeaderboardWidgetProps {
  rankingTab: "Semaine" | "Mois" | "Tout le temps";
  setRankingTab: (tab: "Semaine" | "Mois" | "Tout le temps") => void;
  currentRankings: Ranking[];
  onViewDetails: () => void;
}

export function LeaderboardWidget({
  rankingTab,
  setRankingTab,
  currentRankings,
  onViewDetails,
}: LeaderboardWidgetProps) {
  const t = useTranslations("home");

  return (
    <Card padding="lg" className="space-y-4">
      <div className="flex justify-between items-center pb-1">
        <h3 className="font-display font-bold text-sm text-slate-200 uppercase tracking-wider">
          {t("pumpsRanking")}
        </h3>
        <button
          onClick={onViewDetails}
          className="text-brand-blue hover:text-brand-cyan text-xs font-medium transition-colors hover:underline bg-transparent border-none cursor-pointer"
        >
          {t("viewDetails")}
        </button>
      </div>

      <div className="flex bg-surface-input p-1 rounded-xl border border-border-card">
        {RANKING_TABS.map((tab) => (
          <button
            key={tab}
            onClick={() => setRankingTab(tab as "Semaine" | "Mois" | "Tout le temps")}
            className={`flex-1 text-xs font-medium transition-colors py-1.5 rounded-lg ${
              rankingTab === tab
                ? "bg-brand-blue text-bg-dark font-bold"
                : "text-slate-400 hover:text-slate-200 bg-transparent border-none cursor-pointer"
            }`}
          >
            {tab === "Semaine"
              ? t("weekTab")
              : tab === "Mois"
                ? t("monthTab")
                : t("allTimeTab")}
          </button>
        ))}
      </div>

      <div className="space-y-2 pt-1">
        {currentRankings.map((leader) => (
          <div
            key={leader.name}
            className={`flex items-center justify-between p-2.5 rounded-xl border transition-all ${
              leader.isYou
                ? "bg-brand-blue/15 border-brand-blue/40 shadow-[0_0_12px_rgba(18,217,255,0.15)]"
                : "bg-surface-raised border-border-card/80 hover:border-hover-deep"
            }`}
          >
            <div className="flex items-center gap-3">
              <span
                className={`text-xs font-mono font-bold w-4 text-center ${
                  leader.rank === 1
                    ? "text-yellow-500"
                    : leader.rank === 2
                      ? "text-brand-cyan"
                      : "text-slate-500"
                }`}
              >
                {leader.rank}
              </span>

              <div className="h-7 w-7 rounded overflow-hidden shrink-0 relative">
                <Image
                  src={leader.avatar}
                  alt={leader.name}
                  fill
                  sizes="28px"
                  className="object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>

              <div className="flex items-center gap-1">
                <span
                  className={`text-xs font-bold ${
                    leader.isYou ? "text-brand-blue font-extrabold" : "text-slate-200"
                  }`}
                >
                  {leader.name}
                </span>
                {leader.isCrown && <span className="text-xs">👑</span>}
                {leader.isYou && (
                  <span className="text-[11px] font-bold text-brand-blue bg-brand-blue/10 px-2 py-0.5 rounded uppercase tracking-wider">
                    {t("me")}
                  </span>
                )}
              </div>
            </div>

            <span className="text-xs font-mono font-bold text-slate-300">
              <strong className="text-white font-extrabold">{leader.score}</strong>{" "}
              {t("pumpsUnit")}
            </span>
          </div>
        ))}
      </div>
    </Card>
  );
}
