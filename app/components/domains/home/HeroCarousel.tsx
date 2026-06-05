"use client";

import Image from "next/image";
import { motion, AnimatePresence } from "motion/react";
import { Trophy } from "lucide-react";
import { useTranslations } from "next-intl";
import { Card } from "@/app/components/ui/card";
import { Button } from "@/app/components/ui/button";

const HERO_SLIDE_COLORS = [
  "text-brand-cyan",
  "text-amber-400",
  "text-emerald-400",
] as const;

interface HeroCarouselProps {
  heroSlideIndex: number;
  setHeroSlideIndex: (idx: number) => void;
}

export function HeroCarousel({ heroSlideIndex, setHeroSlideIndex }: HeroCarouselProps) {
  const t = useTranslations("home");

  return (
    <div className="relative min-h-[240px] sm:h-[220px] flex flex-col justify-end">
      <div className="absolute inset-0 rounded-2xl overflow-hidden border border-border-card">
        <AnimatePresence mode="popLayout">
          <motion.div
            key={heroSlideIndex}
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6 }}
            className="absolute inset-0 w-full h-full"
          >
            <Image
              src={
                heroSlideIndex === 1
                  ? "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?auto=format&fit=crop&q=80&w=800"
                  : heroSlideIndex === 2
                    ? "https://images.unsplash.com/photo-1476480862126-209bfaa8edc8?auto=format&fit=crop&q=80&w=800"
                    : "https://images.unsplash.com/photo-1541534741688-6078c6bfb5c5?auto=format&fit=crop&q=80&w=800"
              }
              alt="Fitness motivation illustration"
              fill
              sizes="(max-width: 768px) 100vw, 550px"
              className="object-cover"
              priority
              referrerPolicy="no-referrer"
            />
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="absolute inset-0 rounded-2xl bg-gradient-to-t from-bg-dark via-bg-dark/75 to-transparent z-[1]" />
      <div className="absolute inset-0 rounded-2xl bg-brand-blue/5 mix-blend-overlay z-[1]" />

      <div className="p-6 relative z-10 space-y-2.5">
        <div className="flex gap-4">
          {(["defie", "motive", "progresse"] as const).map((key, idx) => (
            <button
              key={key}
              onClick={() => setHeroSlideIndex(idx)}
              className={`font-display font-extrabold text-xl sm:text-2xl tracking-wider select-none text-left transition-all duration-300 cursor-pointer ${
                heroSlideIndex === idx
                  ? `${HERO_SLIDE_COLORS[idx]} scale-105`
                  : "text-white/40 hover:text-white/60"
              }`}
            >
              {t(key)}
            </button>
          ))}
        </div>

        <div className="h-[48px] overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.p
              key={heroSlideIndex}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="text-xs text-slate-200 font-medium max-w-xl leading-relaxed line-clamp-2 select-none"
            >
              {heroSlideIndex === 0 && t("heroSlide0")}
              {heroSlideIndex === 1 && t("heroSlide1")}
              {heroSlideIndex === 2 && t("heroSlide2")}
            </motion.p>
          </AnimatePresence>
        </div>

        <div className="flex gap-1.5 pt-1">
          {[0, 1, 2].map((idx) => (
            <button
              key={idx}
              onClick={() => setHeroSlideIndex(idx)}
              className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer ${
                heroSlideIndex === idx
                  ? idx === 0
                    ? "w-5 bg-brand-cyan"
                    : idx === 1
                      ? "w-5 bg-amber-400"
                      : "w-5 bg-emerald-400"
                    : "w-1.5 bg-slate-600/80 hover:bg-slate-500"
              }`}
              aria-label={`Slide ${idx + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

interface QuickStatsCardProps {
  userXp: number;
  levelPercentage: number;
}

const MAX_XP = 2500;

export function QuickStatsCard({ userXp, levelPercentage }: QuickStatsCardProps) {
  const t = useTranslations("home");

  const levelLabel =
    userXp >= 2000 ? "III" : userXp >= 1000 ? "II" : "I";

  return (
    <Card padding="lg" className="flex flex-col justify-between min-h-[240px] sm:h-[220px]">
      <div className="flex items-center gap-3">
        <div className="h-12 w-12 rounded-full bg-gradient-to-tr from-brand-blue to-brand-cyan p-[2px] flex items-center justify-center shadow-brand shrink-0">
          <div className="h-full w-full rounded-full bg-bg-card flex items-center justify-center">
            <Trophy className="h-5 w-5 text-brand-cyan" />
          </div>
        </div>
        <div>
          <p className="text-xs sm:text-[11px] font-bold uppercase tracking-[0.18em] text-slate-500">{t("yourLevel")}</p>
          <h3 className="text-lg sm:text-base font-display font-extrabold text-white tracking-tight">
            {t("currentXp")} {levelLabel}
          </h3>
        </div>
      </div>

      <div className="space-y-1.5">
        <div className="flex justify-between text-xs font-mono">
          <span className="text-slate-400">{t("currentXp")}</span>
          <span className="text-brand-cyan font-bold">{userXp} / {MAX_XP} XP</span>
        </div>
        <div className="w-full bg-hover-bg rounded-full h-2 overflow-hidden border border-border-card">
          <div
            className="bg-gradient-to-r from-brand-blue to-brand-cyan h-2 rounded-full transition-all duration-1000"
            style={{ width: `${levelPercentage}%` }}
          />
        </div>
        <p className="text-xs sm:text-[11px] text-slate-500 font-medium text-right">{t("nextLevel")}</p>
      </div>

      <div className="border-t border-border-card/80 pt-3 grid grid-cols-3 gap-2 text-center">
        <div>
          <span className="block text-sm font-bold text-white font-mono leading-none">12</span>
          <span className="text-xs text-slate-500 font-medium">{t("challengesWon")}</span>
        </div>
        <div className="border-x border-border-card/60">
          <span className="block text-sm font-bold text-white font-mono leading-none">24</span>
          <span className="text-xs text-slate-500 font-medium">{t("challengesLaunched")}</span>
        </div>
        <div>
          <span className="block text-sm font-bold text-white font-mono leading-none">15</span>
          <span className="text-xs text-slate-500 font-medium">{t("activeFriends")}</span>
        </div>
      </div>
    </Card>
  );
}
