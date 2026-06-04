"use client";

import { useTranslations } from "next-intl";
import { Swords, Swords as SwordsIcon, Home, Activity, Users, BarChart2, Award, MessageSquare, User, Check, ExternalLink } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/app/components/ui/tooltip";
import { Button } from "@/app/components/ui/button";
import { Card } from "@/app/components/ui/card";
import { PillBadge } from "@/app/components/ui/badge";
import { Icon } from "@/components/ui/icon";
import { cn } from "@/lib/utils";
import { TABS } from "@/app/types";

interface StreakDay {
  day: string;
  checked: boolean;
}

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  streakDays: StreakDay[];
  toggleStreakDay: (index: number) => void;
}

export default function Sidebar({
  activeTab,
  setActiveTab,
  streakDays,
  toggleStreakDay,
}: SidebarProps) {
  const t = useTranslations("sidebar");

  const navItems = [
    { key: TABS.HOME,     label: t("navAccueil"),     icon: Home },
    { key: TABS.DEFIS,    label: t("navDefis"),        icon: SwordsIcon },
    { key: TABS.ACTIVITY, label: t("navActivite"),     icon: Activity },
    { key: TABS.FRIENDS,  label: t("navAmis"),         icon: Users },
    { key: TABS.RANKINGS, label: t("navClassements"),  icon: BarChart2 },
    { key: TABS.BADGES,   label: t("navBadges"),        icon: Award },
    { key: TABS.COACH,    label: t("navCoachIA"),       icon: MessageSquare, isNew: true },
    { key: TABS.PROFIL,   label: t("navProfil"),        icon: User },
  ];

  return (
    <aside className="w-64 border-r border-border-card bg-sidebar-bg hidden lg:flex flex-col justify-between shrink-0 h-[100dvh] overflow-hidden">
      {/* Scrollable top zone: logo + nav */}
      <div className="flex-1 min-h-0 overflow-y-auto custom-scrollbar p-5 flex flex-col gap-6">

        {/* Logo */}
        <div className="flex items-center gap-3 py-2 cursor-pointer shrink-0" onClick={() => setActiveTab(TABS.HOME)}>
          <div className="p-2.5 bg-gradient-to-br from-brand-blue to-brand-blue rounded-xl shadow-brand flex items-center justify-center">
            <Swords className="h-5 w-5 text-white" />
          </div>
          <div>
            <span className="font-display font-extrabold text-lg tracking-tight text-white uppercase">{t("brand")}</span>
          </div>
        </div>

        {/* Navigation */}
        <TooltipProvider>
          <nav className="space-y-1.5 shrink-0">
            {navItems.map((item) => {
              const IconComp = item.icon;
              const isActive = activeTab === item.key;
              return (
                <Tooltip key={item.key} disableHoverableContent>
                  <TooltipTrigger asChild>
                    <button
                      id={`sidebar-tab-${item.key.toLowerCase()}`}
                      onClick={() => setActiveTab(item.key)}
                      className={cn(
                        "w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 group relative",
                        isActive
                          ? "bg-brand-blue/15 text-brand-blue font-semibold border-l-4 border-brand-blue rounded-l-none pl-2"
                          : "text-slate-400 hover:bg-hover-bg/50 hover:text-slate-200"
                      )}
                    >
                      <div className="flex items-center gap-3">
                        <IconComp
                          className={cn(
                            "h-[18px] w-[18px] transition-transform group-hover:scale-105",
                            isActive ? "text-brand-blue" : "text-slate-400 group-hover:text-slate-200"
                          )}
                        />
                        <span>{item.label}</span>
                      </div>
                      {item.isNew && (
                        <PillBadge variant="pill-new" size="sm">{t("nouveau")}</PillBadge>
                      )}
                    </button>
                  </TooltipTrigger>
                  <TooltipContent side="right">{item.label}</TooltipContent>
                </Tooltip>
              );
            })}
          </nav>
        </TooltipProvider>
      </div>

      {/* Sticky bottom zone: XP + Streak widgets */}
      <div className="mt-auto p-5 space-y-5 border-t border-border-card/60 shrink-0">
        {/* Streak tracker */}
        <Card variant="overlay" padding="md" className="space-y-2">
          <div className="flex items-center gap-1.5">
            <span className="text-[10px] font-semibold text-slate-300">{t("streakLabel")}</span>
            <span className="text-[10px]">🔥</span>
            <span className="ml-auto text-[10px] font-bold text-slate-200">{t("streakWeek")}</span>
          </div>
          <div className="flex gap-0.5 justify-between">
            {streakDays.map((sd, i) => (
              <Button
                key={sd.day}
                variant="streak"
                size="icon-sm"
                onClick={() => toggleStreakDay(i)}
                className="flex flex-col items-center gap-0.5 group cursor-pointer"
                title={`${sd.day} : ${sd.checked ? t("streakDone") : t("streakTodo")}`}
              >
                <span className="text-[8px] font-mono text-slate-500 group-hover:text-slate-300 transition-colors uppercase">
                  {sd.day}
                </span>
                <div
                  className={cn(
                    "h-3.5 w-3.5 rounded-full flex items-center justify-center transition-all",
                    sd.checked
                      ? "bg-brand-blue text-bg-dark"
                      : "bg-hover-bg text-transparent hover:bg-hover-active border border-border-card"
                  )}
                >
                  {sd.checked && (
                    <Icon icon={Check} size="sm" strokeWidth={3} />
                  )}
                </div>
              </Button>
            ))}
          </div>
        </Card>

        {/* External link */}
        <a
          href="https://fitnessduel.app"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-2 text-xs font-mono text-slate-500 hover:text-brand-blue transition-colors py-1 group"
        >
          <Icon icon={ExternalLink} size="sm" className="transition-transform group-hover:translate-x-0.5" />
          <span>fitnessduel.app</span>
        </a>
      </div>
    </aside>
  );
}
