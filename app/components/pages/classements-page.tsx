"use client";

import React from "react";
import Image from "next/image";
import { motion } from "motion/react";
import { useTranslations } from "next-intl";

import { Button } from "@/app/components/ui/button";
import { Card } from "@/app/components/ui/card";
import { Avatar } from "@/app/components/ui/avatar";
import { PillBadge } from "@/app/components/ui/badge";

interface RankingEntry {
  rank: number;
  name: string;
  score: number;
  isCrown?: boolean;
  isYou?: boolean;
  avatar: string;
}

interface LeaderPageProps {
  rankingTab: "Semaine" | "Mois" | "Tout le temps";
  setRankingTab: (tab: "Semaine" | "Mois" | "Tout le temps") => void;
  selectedLeaderboardDiscipline: string;
  setSelectedLeaderboardDiscipline: (disc: string) => void;
  getDynamicRankingsList: () => RankingEntry[];
}

const DISCIPLINES = [
  { key: "Pompes", labelKey: "disciplinePompes", emoji: "💪" },
  { key: "Gainage", labelKey: "disciplineGainage", emoji: "🧘‍♂️" },
  { key: "Course", labelKey: "disciplineCourse", emoji: "🏃‍♂️" },
  { key: "Squats", labelKey: "disciplineSquats", emoji: "🍑" },
] as const;

const PERIOD_TABS = [
  { key: "Semaine", labelKey: "periodWeek" },
  { key: "Mois", labelKey: "periodMonth" },
  { key: "Tout le temps", labelKey: "periodAllTime" },
] as const;

export default function ClassementsPage({
  rankingTab,
  setRankingTab,
  selectedLeaderboardDiscipline,
  setSelectedLeaderboardDiscipline,
  getDynamicRankingsList
}: LeaderPageProps) {
  const t = useTranslations("rankings");

  const unitLabel = selectedLeaderboardDiscipline === "Gainage" ? t("minutes") : t("units");
  const rankings = getDynamicRankingsList();
  const top3 = rankings.slice(0, 3);
  const podium1 = rankings.find(x => x.rank === 1) ?? top3[0];
  const podium2 = rankings.find(x => x.rank === 2) ?? top3[1];
  const podium3 = rankings.find(x => x.rank === 3) ?? top3[2];

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -15 }}
      className="space-y-6 text-left"
    >
      {/* Discipline toggle headers & Period selectors */}
      <Card padding="md" className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div className="flex gap-2 overflow-x-auto pb-1 max-w-full custom-scrollbar">
          {DISCIPLINES.map((disc) => (
            <Button
              key={disc.key}
              variant={selectedLeaderboardDiscipline === disc.key ? "primary" : "secondary"}
              size="sm"
              onClick={() => setSelectedLeaderboardDiscipline(disc.key)}
            >
              {disc.emoji} {t(disc.labelKey)}
            </Button>
          ))}
        </div>

        <div className="flex bg-surface-input p-1 rounded-xl border border-border-card self-start lg:self-auto">
          {PERIOD_TABS.map((tab) => (
            <Button
              key={tab.key}
              variant={rankingTab === tab.key ? "primary" : "ghostText"}
              size="sm"
              onClick={() => setRankingTab(tab.key as "Semaine" | "Mois" | "Tout le temps")}
            >
              {t(tab.labelKey)}
            </Button>
          ))}
        </div>
      </Card>

      {/* PODIUM HIGHLIGHT FOR TOP 3 STANDINGS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-end">

        {/* Rank 2 */}
        <div className="bg-bg-card border border-border-card/80 rounded-2xl p-5 flex flex-col items-center justify-between text-center min-h-[220px] md:order-1 order-2">
          <div className="space-y-2">
            <PillBadge variant="pill-rank" size="sm">{t("rank2")}</PillBadge>
            <Avatar
              src={podium2?.avatar ?? "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=120"}
              alt={podium2?.name ?? "Camille"}
              size="2xl"
              borderColor="border-slate-400"
              borderWidth="border-2"
              shadow="shadow-xl"
              fallback={podium2?.name?.slice(0, 2) ?? "CA"}
            />
            <h4 className="font-display font-extrabold text-white text-sm">{podium2?.name ?? podium1?.name ?? "—"}</h4>
          </div>
          <p className="text-base font-mono font-extrabold text-brand-cyan mt-4">
            {podium2?.score ?? 0} <span className="text-xs text-slate-500 font-medium font-sans">{unitLabel}</span>
          </p>
        </div>

        {/* Rank 1 Crown winner */}
        <div className="bg-gradient-to-b from-amber-950/20 to-bg-card border border-amber-500/30 rounded-3xl p-6 flex flex-col items-center justify-between text-center min-h-[250px] shadow-[0_8px_32px_rgba(251,191,36,0.1)] md:order-2 order-1 ring-2 ring-amber-500/20 relative">
          <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-amber-500 text-slate-950 font-black text-[10px] px-3 py-1 rounded-full uppercase tracking-wider shadow-lg">
            {t("pomodoroChamp")} &#x1F451;
          </div>

          <div className="space-y-2 pt-1">
            <span className="text-xs font-mono font-bold text-amber-400 bg-amber-950/50 px-2.5 py-0.5 rounded-full border border-amber-500/40">{t("rank1")}</span>
            <Avatar
              src={podium1?.avatar ?? "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=120"}
              alt={podium1?.name ?? "Thomas"}
              size="2xl"
              borderColor="border-amber-500"
              borderWidth="border-4"
              shadow="shadow-2xl"
              fallback={podium1?.name?.slice(0, 2) ?? "TH"}
            />
            <h4 className="font-display font-black text-white text-base tracking-tight">{podium1?.name ?? "—"}</h4>
          </div>
          <p className="text-xl font-mono font-black text-amber-400 mt-4 leading-none">
            {podium1?.score ?? 0} <span className="text-xs text-slate-500 font-semibold uppercase font-sans">{unitLabel}</span>
          </p>
        </div>

        {/* Rank 3 (You) */}
        <div className="bg-bg-card/80 border border-brand-blue/20 rounded-2xl p-5 flex flex-col items-center justify-between text-center min-h-[200px] md:order-3 order-3">
          <div className="space-y-2">
            <PillBadge variant="pill-rank" size="sm">{t("rank3")}</PillBadge>
            <Avatar
              src={podium3?.avatar ?? "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?auto=format&fit=crop&q=80&w=120"}
              alt={podium3?.name ?? "Alex"}
              size="2xl"
              borderColor="border-brand-blue"
              borderWidth="border-2"
              shadow="shadow-xl"
              fallback={podium3?.name?.slice(0, 2) ?? "AL"}
            />
            <h4 className="font-display font-extrabold text-white text-sm">{t("rankingsMe")}</h4>
          </div>
          <p className="text-base font-mono font-extrabold text-brand-blue mt-4">
            {podium3?.score ?? 0} <span className="text-xs text-slate-500 font-medium font-sans">{unitLabel}</span>
          </p>
        </div>
      </div>

      {/* COMPLETE LEADERS SHEET TABLE */}
      <Card padding="lg" className="space-y-3">
        <div className="flex justify-between items-center pb-2 border-b border-border-card/80">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider font-sans">{t("members")}</span>
          <span className="text-xs text-slate-500 font-mono">{t("standings")}</span>
        </div>

        <div className="space-y-2">
          {rankings.map((item) => (
            <div
              key={item.name}
              className={`flex items-center justify-between p-3 rounded-xl border transition-all ${
                item.isYou
                  ? "bg-brand-blue/15 border-brand-blue/60 shadow-brand"
                  : "bg-surface-raised border-border-card/60 hover:border-slate-600/50"
              }`}
            >
              <div className="flex items-center gap-3">
                <span className={`text-xs font-mono font-black w-5 text-center ${
                  item.rank === 1 ? "text-amber-400" : item.rank === 2 ? "text-slate-300" : item.rank === 3 ? "text-amber-600" : "text-slate-500"
                }`}>
                  #{item.rank}
                </span>

                <Avatar
                  src={item.avatar}
                  alt={item.name}
                  size="xs"
                  shape="square"
                  fallback={item.name.slice(0, 2)}
                />

                <div className="flex items-center gap-1.5">
                  <span className={`text-xs font-bold ${item.isYou ? "text-brand-blue font-extrabold" : "text-slate-200"}`}>
                    {item.name}
                  </span>
                  {item.isCrown && <span>&#x1F451;</span>}
                  {item.isYou && <span className="text-[8px] font-bold px-1.5 bg-brand-blue text-bg-dark rounded uppercase tracking-widest font-sans">{t("rankings")}</span>}
                </div>
              </div>

              <span className="text-xs font-mono font-bold text-slate-200">
                <strong className="text-white font-extrabold">{item.score}</strong> {unitLabel}
              </span>
            </div>
          ))}
        </div>
      </Card>
    </motion.div>
  );
}
