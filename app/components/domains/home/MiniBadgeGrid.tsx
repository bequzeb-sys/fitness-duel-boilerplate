"use client";

import { Award } from "lucide-react";
import { Card } from "@/app/components/ui/card";
import { TierBadge } from "@/app/components/ui/badge";
import { useTranslations } from "next-intl";

const MINI_BADGES = [
  { nameKey: "badgeGuerrier", descKey: "badgeGuerrierDesc", tier: "tier-rare-amber" as const, subKey: "obtained" },
  { nameKey: "badgePerseverant", descKey: "badgePerseverantDesc", tier: "tier-standard" as const, subKey: "obtained" },
  { nameKey: "badgeRegulier", descKey: "badgeRegulierDesc", tier: "tier-standard" as const, subKey: "obtained" },
  { nameKey: "badgeGagnant", descKey: "badgeGagnantDesc", tier: "tier-mythical" as const, subKey: "obtained" },
] as const;

interface MiniBadgeGridProps {
  onBadgeClick: (name: string, desc: string) => void;
  onViewAll: () => void;
}

export function MiniBadgeGrid({ onBadgeClick, onViewAll }: MiniBadgeGridProps) {
  const t = useTranslations("home");

  return (
    <Card padding="lg" className="space-y-4">
      <div className="flex justify-between items-center pb-1">
        <h3 className="font-display font-bold text-sm text-slate-200 uppercase tracking-wider">
          {t("badges")}
        </h3>
        <button
          onClick={onViewAll}
          className="text-brand-blue hover:text-brand-cyan text-xs font-medium transition-colors hover:underline bg-transparent border-none cursor-pointer"
        >
          {t("viewAll")}
        </button>
      </div>

      <div className="grid grid-cols-4 gap-2 text-center">
        {MINI_BADGES.map((bd) => (
          <TierBadge
            key={bd.nameKey}
            variant={bd.tier}
            size="sm"
            onClick={() => onBadgeClick(t(bd.nameKey), t(bd.descKey))}
            className="min-h-[110px] hover:scale-105 transition-transform duration-200 cursor-pointer"
          >
            <div className="flex flex-col items-center justify-between h-full w-full gap-1">
              <div className="p-1.5 bg-surface-raised rounded-lg border border-border-card">
                <Award className="h-4 w-4 text-slate-200" />
              </div>
              <div>
                <p className="text-xs font-bold truncate max-w-full text-slate-200">{t(bd.nameKey)}</p>
                <p className="text-[11px] text-slate-500 font-medium mt-0.5 whitespace-nowrap truncate max-w-full">
                  {t(bd.descKey)}
                </p>
              </div>
              <span className="text-[11px] font-bold px-2 py-0.5 bg-bg-dark/50 rounded-full">
                {t(bd.subKey)}
              </span>
            </div>
          </TierBadge>
        ))}
      </div>
    </Card>
  );
}
