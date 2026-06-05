"use client";

import { useTranslations } from "next-intl";
import { motion, AnimatePresence } from "motion/react";
import {
  Swords,
  Home,
  Swords as SwordsIcon,
  Activity,
  Users,
  BarChart2,
  Award,
  MessageSquare,
  User,
  Check,
  X,
  ExternalLink,
} from "lucide-react";
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

interface MobileDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  activeTab: string;
  setActiveTab: (tab: string) => void;
  userXp: number;
  levelPercentage: number;
  streakDays: StreakDay[];
  toggleStreakDay: (index: number) => void;
}

export default function MobileDrawer({
  isOpen,
  onClose,
  activeTab,
  setActiveTab,
  userXp,
  levelPercentage,
  streakDays,
  toggleStreakDay,
}: MobileDrawerProps) {
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

  const levelLabel = userXp >= 2000 ? "III" : userXp >= 1000 ? "II" : "I";

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.7 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
            className="fixed inset-0 bg-bg-dark/70 z-[var(--z-overlay-backdrop)] lg:hidden"
          />

          <motion.aside
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed top-0 bottom-0 left-0 w-72 bg-sidebar-bg border-r border-border-card p-5 flex flex-col justify-between z-[var(--z-drawer)] lg:hidden overflow-y-auto"
          >
            <div className="space-y-6">
              {/* Header */}
              <div className="flex items-center justify-between pb-2 border-b border-border-card/40">
                <div
                  className="flex items-center gap-3 cursor-pointer"
                  onClick={() => { setActiveTab(TABS.HOME); onClose(); }}
                >
                  <div className="p-2 bg-brand-blue rounded-xl shadow-brand flex items-center justify-center">
                    <Swords className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <span className="font-display font-extrabold text-base tracking-tight text-white uppercase">{t("brand")}</span>
                  </div>
                </div>
                <Button
                  variant="iconSmall"
                  size="icon-sm"
                  onClick={onClose}
                  aria-label={t("closeMenu")}
                >
                  <Icon icon={X} size="md" />
                </Button>
              </div>

              {/* Nav */}
              <nav className="space-y-1">
                {navItems.map((item) => {
                  const IconComp = item.icon;
                  const isActive = activeTab === item.key;
                  return (
                    <button
                      key={item.key}
                      id={`mobile-sidebar-tab-${item.key.toLowerCase()}`}
                      onClick={() => { setActiveTab(item.key); onClose(); }}
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
                  );
                })}
              </nav>
            </div>

            {/* Bottom widgets */}
            <div className="space-y-4 pt-4 border-t border-border-card/60 mt-6">
              {/* XP bar */}
              <Card variant="overlay" padding="md" className="space-y-2.5">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-xs font-medium uppercase tracking-wider text-slate-500">{t("streakLabel")}</p>
                    <h4 className="font-display font-bold text-sm text-slate-200 tracking-tight mt-0.5">Niveau {levelLabel}</h4>
                  </div>
                  <PillBadge variant="pill-xp" size="sm">
                    {userXp} XP
                  </PillBadge>
                </div>
                <div className="w-full bg-slate-800/80 rounded-full h-1 overflow-hidden">
                  <div className="bg-brand-blue h-1 rounded-full transition-all duration-1000" style={{ width: `${levelPercentage}%` }} />
                </div>
                <div className="flex justify-between items-center text-xs text-slate-500 pt-0.5">
                  <span>{t("streakDone")} : <strong className="text-slate-400">LÉGENDE</strong></span>
                  <span>2500 XP</span>
                </div>
              </Card>

              {/* Streak */}
              <Card variant="overlay" padding="md" className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1">
                    <span className="text-xs font-semibold text-slate-300">{t("streakLabel")}</span>
                    <span>🔥</span>
                  </div>
                  <span className="text-xs font-bold text-slate-200">{t("streakWeek")}</span>
                </div>
                <div className="grid grid-cols-7 gap-1">
                  {streakDays.map((sd, i) => (
                    <Button
                      key={sd.day}
                      variant="streak"
                      size="icon-sm"
                      onClick={() => toggleStreakDay(i)}
                      className="flex flex-col items-center gap-1 group"
                      title={`${sd.day} : ${sd.checked ? t("streakDone") : t("streakTodo")}`}
                    >
                      <span className="text-[11px] font-mono text-slate-500 uppercase">{sd.day}</span>
                      <div
                        className={cn(
                          "h-4.5 w-4.5 rounded-full flex items-center justify-center transition-all",
                          sd.checked
                            ? "bg-brand-blue text-bg-dark"
                            : "bg-hover-bg text-transparent hover:bg-hover-active border border-border-card"
                        )}
                      >
                        {sd.checked ? (
                          <Icon icon={Check} size="sm" strokeWidth={3} />
                        ) : (
                          <div className="h-0.5 w-0.5 bg-slate-600 rounded-full" />
                        )}
                      </div>
                    </Button>
                  ))}
                </div>
              </Card>

              {/* Link */}
              <a
                href="https://fitnessduel.app"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 text-xs font-mono text-slate-500 hover:text-brand-blue transition-colors py-1 group"
              >
                <ExternalLink className="h-3 w-3 transition-transform group-hover:translate-x-0.5" />
                <span>fitnessduel.app</span>
              </a>
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
