"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { Search, Swords, Sparkles, TrendingUp, Zap, Dumbbell } from "lucide-react";
import { motion } from "motion/react";
import {
  CommandDialog,
  CommandInput,
  CommandList,
  CommandEmpty,
  CommandGroup,
  CommandItem,
} from "@/app/components/ui/command";
import { Button } from "@/app/components/ui/button";
import { Card } from "@/app/components/ui/card";
import { PillBadge } from "@/app/components/ui/badge";
import { Icon as LucideIconWrapper } from "@/components/ui/icon";

interface Challenge {
  id: string;
  title: string;
  participants: number;
  timeLeft: string;
  image: string;
  category: string;
}

interface DefisPageProps {
  challenges: Challenge[];
  setChallenges: React.Dispatch<React.SetStateAction<Challenge[]>>;
  setSelectedChallengeToTake: (chal: Challenge | null) => void;
  setIsCreateChallengeOpen: (open: boolean) => void;
  addToast: (msg: string, type?: "success" | "info" | "xp") => void;
  gainXp: (amount: number, reason: string) => void;
}

const SUGGESTIONS = [
  { title: "Plank Masters (Gainage 4 min)", cat: "Gainage", part: 14, time: "4j 12h", icon: Dumbbell },
  { title: "Course des Etoiles (10 km)", cat: "Endurance", part: 22, time: "6j 08h", icon: TrendingUp },
  { title: "150 Squats Brutaux", cat: "Squats", part: 18, time: "1j 23h", icon: Zap },
] as const;

const CATEGORY_FILTERS = [
  { key: "Tous", labelKey: "filterAll" },
  { key: "Musculation", labelKey: "filterMusculation" },
  { key: "Endurance", labelKey: "filterEndurance" },
  { key: "Gainage", labelKey: "filterGainage" },
  { key: "Squats", labelKey: "filterSquats" },
] as const;

export default function DefisPage({
  challenges,
  setChallenges,
  setSelectedChallengeToTake,
  setIsCreateChallengeOpen,
  addToast,
  gainXp,
}: DefisPageProps) {
  const t = useTranslations("defis");
  const [defisCategory, setDefisCategory] = useState("Tous");
  const [defisSearchQuery, setDefisSearchQuery] = useState("");
  const [commandOpen, setCommandOpen] = useState(false);

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setCommandOpen((open) => !open);
      }
    };
    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  const filteredChallenges = challenges
    .filter(c => defisCategory === "Tous" || c.category === defisCategory)
    .filter(c => c.title.toLowerCase().includes(defisSearchQuery.toLowerCase()));

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -15 }}
      className="space-y-6 text-left"
    >
      {/* Search & Category Selection Row */}
      <Card padding="md" className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        {/* Command palette trigger button */}
        <Button
          variant="secondary"
          onClick={() => setCommandOpen(true)}
          className="flex-grow max-w-md justify-start gap-2 text-slate-500 hover:text-slate-300"
        >
          <Search className="h-4 w-4" />
          <span className="text-sm">{t("searchPlaceholder")}</span>
          <span className="ml-auto text-xs text-slate-600 font-mono">Ctrl+K</span>
        </Button>

        <CommandDialog open={commandOpen} onOpenChange={setCommandOpen}>
          <CommandInput
            placeholder={t("searchPlaceholder")}
            value={defisSearchQuery}
            onValueChange={setDefisSearchQuery}
          />
          <CommandList>
            <CommandEmpty>{t("searchEmpty")}</CommandEmpty>
            <CommandGroup heading={t("groupLabel")}>
              {challenges
                .filter(c => defisCategory === "Tous" || c.category === defisCategory)
                .map((chal) => (
                  <CommandItem
                    key={chal.id}
                    value={chal.title}
                    onSelect={() => {
                      setDefisSearchQuery(chal.title);
                      setCommandOpen(false);
                    }}
                  >
                    <Swords className="mr-2 h-4 w-4" />
                    {chal.title}
                  </CommandItem>
                ))}
            </CommandGroup>
          </CommandList>
        </CommandDialog>

        <div className="flex gap-2 overflow-x-auto pb-1 max-w-full">
          {CATEGORY_FILTERS.map((cat) => (
            <Button
              key={cat.key}
              variant={defisCategory === cat.key ? "primary" : "secondary"}
              size="sm"
              onClick={() => setDefisCategory(cat.key)}
            >
              {t(cat.labelKey)}
            </Button>
          ))}
        </div>
      </Card>

      {/* Main challenges collection split */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredChallenges.map((chal) => (
          <Card key={chal.id} variant="interactive" padding="none" className="flex flex-col h-full">
            <div className="relative h-44 w-full">
              <Image
                src={chal.image}
                alt={chal.title}
                fill
                sizes="300px"
                className="object-cover transition-transform duration-500 group-hover:scale-105"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-bg-card to-transparent" />
              <span className="absolute top-3 left-3 bg-brand-blue text-bg-dark text-xs font-bold px-2.5 py-1 rounded-full uppercase tracking-wider">
                {chal.category}
              </span>
            </div>

            <div className="p-5 flex-grow space-y-3">
                <h4 className="font-display font-extrabold text-white text-base leading-tight group-hover:text-brand-blue transition-colors">
                {chal.title}
              </h4>
              <p className="text-xs text-slate-400 line-clamp-2">{t("description")}</p>

              <div className="grid grid-cols-2 gap-2 pt-2 border-t border-border-card/60 text-xs font-mono">
                <div>
                  <span className="text-slate-500 block text-[11px] uppercase font-bold">{t("participants")}</span>
                  <span className="text-slate-200 font-bold">{chal.participants} {t("active")}</span>
                </div>
                <div className="text-right">
                  <span className="text-slate-500 block text-[11px] uppercase font-bold">{t("timeLeft")}</span>
                  <span className="text-brand-blue font-bold">{chal.timeLeft}</span>
                </div>
              </div>
            </div>

            <div className="p-4 bg-surface-raised border-t border-border-card/80 flex gap-2">
              <Button
                variant="primary"
                size="sm"
                onClick={() => setSelectedChallengeToTake(chal)}
                className="w-full"
              >
                {t("takeChallenge")}
              </Button>
            </div>
          </Card>
        ))}

        {/* Empty state when query matched nothing */}
        {filteredChallenges.length === 0 && (
            <Card padding="lg" className="col-span-full py-12 text-center space-y-3">
              <LucideIconWrapper icon={Swords} size="xl" className="text-slate-600 mx-auto animate-bounce" />
              <div>
                <p className="text-sm font-bold text-slate-300">{t("emptyTitle")}</p>
                <p className="text-xs text-slate-500 mt-1">{t("emptySubtitle")}</p>
              </div>
              <Button variant="secondary" size="sm" onClick={() => setIsCreateChallengeOpen(true)}>
                {t("createBtn")}
              </Button>
            </Card>
        )}
      </div>

      {/* Suggestion block of default physical workouts */}
      <Card variant="overlay" padding="xl" className="space-y-4">
        <div className="flex justify-between items-center">
          <div>
            <h4 className="font-display font-extrabold text-white text-base">{t("recommendations")}</h4>
            <p className="text-xs text-slate-400">{t("recommendationsSub")}</p>
          </div>
          <Sparkles className="h-5 w-5 text-brand-blue fill-brand-blue/20" />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {SUGGESTIONS.map((s, idx) => {
            const IconComp = s.icon;
            return (
              <Card key={idx} padding="md" className="flex flex-col justify-between hover:border-slate-600">
                <div className="flex justify-between items-start gap-2">
                  <div>
                    <span className="text-[11px] font-mono font-bold text-brand-cyan bg-brand-cyan/10 px-2 py-0.5 rounded uppercase tracking-wider">
                      {s.cat}
                    </span>
                    <h5 className="text-xs font-bold text-slate-200 mt-1.5 leading-snug">{s.title}</h5>
                  </div>
                  <div className="p-1.5 bg-slate-900 border border-slate-700/50 rounded-lg text-slate-400 flex items-center justify-center">
                    <IconComp className="h-3.5 w-3.5" />
                  </div>
                </div>

                <div className="flex justify-between items-center text-xs text-slate-500 font-mono mt-4 pt-2.5 border-t border-border-card/60">
                  <span>{s.part} {t("warriors")}</span>
                  <Button variant="ghostText" size="sm"
                    onClick={() => {
                      const alreadyHas = challenges.some(c => c.title === s.title);
                      if (alreadyHas) {
                        addToast(t("alreadyActive"), "info");
                        return;
                      }
                      setChallenges(prev => [...prev, {
                        id: `chal_rec_${idx}_${Date.now()}`,
                        title: s.title,
                        participants: s.part,
                        timeLeft: s.time,
                        image: "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&q=80&w=600",
                        category: s.cat
                      }]);
                      addToast(t("addedSuccess", { title: s.title }), "success");
                      gainXp(15, t("recommendationTaken"));
                    }}
                  >
                    + {t("add")}
                  </Button>
                </div>
              </Card>
            );
          })}
        </div>
      </Card>
    </motion.div>
  );
}
