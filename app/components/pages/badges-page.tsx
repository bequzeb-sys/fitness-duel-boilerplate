"use client";

import { useTranslations } from "next-intl";
import { Award, Lock } from "lucide-react";
import { motion } from "motion/react";
import { Progress } from "@/app/components/ui/progress";
import { Card } from "@/app/components/ui/card";
import { TierBadge } from "@/app/components/ui/badge";

interface BadgesPageProps {
  addToast: (msg: string, type?: "success" | "info" | "xp") => void;
  levelPercentage: number;
}

const BADGES = [
  { nameKey: "nameLeCommencant", descKey: "descFirstJoin", earned: true, tierKey: "rankStandard", sub: null, style: "from-blue-500/10 text-blue-400 border-blue-500/30" },
  { nameKey: "nameLaMenace", descKey: "descXpMilestone", earned: true, tierKey: "rankRare", sub: "Atteint", style: "from-amber-500/10 text-amber-400 border-amber-500/30" },
  { nameKey: "nameCardioBoss", descKey: "descStreakDays", earned: true, tierKey: "rankRare", sub: "7/7", style: "from-emerald-500/10 text-emerald-400 border-emerald-500/30" },
  { nameKey: "nameCercleConfiance", descKey: "descFirstChallenge", earned: false, tierKey: "rankStandard", sub: "2/3", style: "from-slate-800/5 text-slate-500 border-slate-700/30" },
  { nameKey: "nameLaLegende", descKey: "descXpMilestone", earned: false, tierKey: "rankMythique", sub: "2150 / 5000", style: "from-purple-500/5 text-purple-400 border-purple-900/40" },
] as const;

export default function BadgesPage({
  addToast,
  levelPercentage
}: BadgesPageProps) {
  const t = useTranslations("badges");

  const getTierLabel = (tierKey: string) => {
    if (tierKey === "rankMythique") return t("rankMythique");
    if (tierKey === "rankRare") return t("rankRare");
    return t("rankStandard");
  };

  const getTierStyle = (tierKey: string) => {
    if (tierKey === "rankMythique") return "bg-purple-500/20 text-purple-400";
    if (tierKey === "rankRare") return "bg-amber-500/10 text-amber-400";
    return "bg-slate-800 text-slate-400";
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -15 }}
      className="space-y-6 text-left"
    >
      {/* Ring Progress summary block */}
      <Card padding="xl" className="flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-4 text-center sm:text-left">
          <div className="h-14 w-14 rounded-full bg-gradient-to-tr from-blue-600 to-cyan-400 flex items-center justify-center p-[2px] shadow-[0_0_15px_rgba(0,102,255,0.3)] shrink-0">
            <div className="h-full w-full rounded-full bg-bg-card flex items-center justify-center font-display font-black text-sm text-brand-cyan">
              {levelPercentage}%
            </div>
          </div>
          <div>
            <h3 className="font-display font-extrabold text-white text-base">{t("title")}</h3>
            <p className="text-xs text-slate-400">{t("badgesUnlocked", { earned: 3, total: 5 })}</p>
          </div>
        </div>

        <Card variant="input" padding="md" className="space-y-1 font-semibold w-full sm:w-auto">
          <div className="flex justify-between gap-6 text-slate-400">
            <span>{t("nextTierXp")}</span>
            <span className="text-brand-cyan font-bold">2500 XP</span>
          </div>
          <div className="w-full sm:w-48 mt-1.5">
            <Progress value={levelPercentage} />
          </div>
        </Card>
      </Card>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {BADGES.map((bg, index) => {
          const tierVariant = bg.tierKey === "rankMythique"
            ? "tier-mythical"
            : bg.tierKey === "rankRare"
              ? bg.earned ? "tier-rare-emerald" : "tier-standard-locked"
              : bg.earned ? "tier-standard" : "tier-standard-locked";
          return (
            <TierBadge
              key={index}
              variant={tierVariant as any}
              size="lg"
              earned={bg.earned}
              onClick={() => {
                const desc = bg.descKey === "descXpMilestone"
                  ? t("descXpMilestone", { xp: bg.nameKey === "nameLaLegende" ? 5000 : 1500 })
                  : bg.descKey === "descStreakDays"
                  ? t("descStreakDays", { n: 7 })
                  : t(bg.descKey);
                addToast(t("badgeEarned", { name: t(bg.nameKey), desc }), "info");
              }}
              className="hover:scale-[1.02] transition-transform duration-200 cursor-pointer"
            >
              <div className="flex flex-col justify-between h-full px-1">
                <div className="flex justify-between items-start gap-4">
                  <div className="p-3 bg-slate-900/80 rounded-xl border border-slate-700/60 relative">
                    {bg.earned ? (
                      <Award className="h-6 w-6 text-emerald-400" />
                    ) : (
                      <Lock className="h-6 w-6 text-slate-600" />
                    )}
                  </div>
                  <span className={`text-[9px] font-mono font-black px-2 py-0.5 rounded-full uppercase tracking-widest ${getTierStyle(bg.tierKey)}`}>
                    {getTierLabel(bg.tierKey)}
                  </span>
                </div>

                <div className="space-y-1.5 pt-4">
                  <h4 className="font-display font-extrabold text-white text-base leading-tight flex items-center gap-1.5">
                    {t(bg.nameKey)}
                    {bg.earned && <span className="text-emerald-400">&#10003;</span>}
                  </h4>
                  <p className="text-xs text-slate-400 font-medium leading-normal">
                    {bg.descKey === "descXpMilestone"
                      ? t("descXpMilestone", { xp: bg.nameKey === "nameLaLegende" ? 5000 : 1500 })
                      : bg.descKey === "descStreakDays"
                      ? t("descStreakDays", { n: 7 })
                      : t(bg.descKey)}
                  </p>
                </div>

                <div className="mt-4 pt-3.5 border-t border-border-card/80 flex justify-between items-center text-[10px] text-slate-500 font-mono font-semibold">
                  <span>{t("progression")}</span>
                  <span className="text-slate-300 font-bold">{bg.sub ?? t("obtained")}</span>
                </div>
              </div>
            </TierBadge>
          );
        })}
      </div>
    </motion.div>
  );
}
