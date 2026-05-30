"use client";

import React from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { motion, AnimatePresence } from "motion/react";
import {
  Trophy,
  ChevronRight,
  Check,
  Copy,
  Share2,
  Award,
  BarChart2,
  Send,
  ExternalLink,
} from "lucide-react";
import {
  CoachSuggestion,
  RecentActivity,
  Challenge,
  Ranking,
  ToastType,
} from "@/app/types";
import { TABS } from "@/app/types";
import { Button } from "@/app/components/ui/button";
import { Card } from "@/app/components/ui/card";
import { Avatar } from "@/app/components/ui/avatar";
import { TierBadge } from "@/app/components/ui/badge";
import { Icon } from "@/app/components/ui/icon";

interface AccueilTabProps {
  heroSlideIndex: number;
  setHeroSlideIndex: (idx: number) => void;
  userXp: number;
  levelPercentage: number;
  recentActivities: RecentActivity[];
  challenges: Challenge[];
  setIsCreateChallengeOpen: (open: boolean) => void;
  addToast: (message: string, type?: ToastType) => void;
  inviteUrl: string;
  inviteCopied: boolean;
  handleCopyLink: () => void;
  rankingTab: string;
  setRankingTab: (tab: "Semaine" | "Mois" | "Tout le temps") => void;
  currentRankings: Ranking[];
  messages: { id: string; sender: string; text: string }[];
  userName: string;
  coachTyping: boolean;
  chatBottomRef: React.RefObject<HTMLDivElement | null>;
  coachInput: string;
  setCoachInput: (val: string) => void;
  coachSuggestions: CoachSuggestion[];
  sendToCoach: (text: string) => void;
  setActiveTab: (tab: string) => void;
}

const RANKING_TABS = ["Semaine", "Mois", "Tout le temps"] as const;

const HERO_SLIDE_COLORS = [
  "text-[#00ddff]",
  "text-amber-400",
  "text-emerald-400",
] as const;

type SocialShare = {
  name: string;
  color: string;
  link?: string;
  action?: true;
};

const SOCIAL_SHARES: SocialShare[] = [
  { name: "WhatsApp", color: "bg-[#25D366]/10 text-[#25D366] hover:bg-[#25D366]/20 border-[#25D366]/30", link: "https://whatsapp.com" },
  { name: "Instagram", color: "bg-[#E1306C]/10 text-[#E1306C] hover:bg-[#E1306C]/20 border-[#E1306C]/30", link: "https://instagram.com" },
  { name: "Facebook", color: "bg-[#1877F2]/10 text-[#1877F2] hover:bg-[#1877F2]/20 border-[#1877F2]/30", link: "https://facebook.com" },
  { name: "Plus", color: "bg-blue-500/10 text-blue-400 hover:bg-blue-500/20 border-blue-500/30", action: true },
];

const MINI_BADGES = [
  { nameKey: "badgeGuerrier", descKey: "badgeGuerrierDesc", tier: "tier-rare-amber" as const, subKey: "obtained" },
  { nameKey: "badgePerseverant", descKey: "badgePerseverantDesc", tier: "tier-standard" as const, subKey: "obtained" },
  { nameKey: "badgeRegulier", descKey: "badgeRegulierDesc", tier: "tier-standard" as const, subKey: "obtained" },
  { nameKey: "badgeGagnant", descKey: "badgeGagnantDesc", tier: "tier-mythical" as const, subKey: "obtained" },
] as const;

export default function AccueilTab({
  heroSlideIndex,
  setHeroSlideIndex,
  userXp,
  levelPercentage,
  recentActivities,
  challenges,
  setIsCreateChallengeOpen,
  addToast,
  inviteUrl,
  inviteCopied,
  handleCopyLink,
  rankingTab,
  setRankingTab,
  currentRankings,
  messages,
  userName,
  coachTyping,
  chatBottomRef,
  coachInput,
  setCoachInput,
  coachSuggestions,
  sendToCoach,
  setActiveTab,
}: AccueilTabProps) {
  const t = useTranslations("home");

  return (
    <motion.div
      key="accueil"
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -15 }}
      className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start"
    >
      {/* LEFT STREAM AREA */}
      <div className="lg:col-span-8 space-y-6">

        {/* TOP HERO & LEVEL SPLIT BANNER GRID */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">

          {/* HERO PROMOTIONAL BANNER */}
          <div className="md:col-span-8 relative h-[220px] flex flex-col justify-end">
            {/* Background photo slide transitions */}
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

            {/* Dark gradient overlay */}
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-t from-[#050911] via-[#050911]/75 to-transparent z-[1]" />
            <div className="absolute inset-0 rounded-2xl bg-[#0066ff]/5 mix-blend-overlay z-[1]" />

            {/* Text content */}
            <div className="p-6 relative z-10 space-y-2.5">
              <div className="flex gap-4">
                {(["defie", "motive", "progresse"] as const).map((key, idx) => (
                  <button
                    key={key}
                    onClick={() => setHeroSlideIndex(idx)}
                    className={`font-display font-extrabold text-xl sm:text-2xl tracking-wider select-none text-left transition-all duration-300 cursor-pointer ${
                      heroSlideIndex === idx ? `${HERO_SLIDE_COLORS[idx]} scale-105` : "text-white/40 hover:text-white/60"
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

              {/* Carousel slide indicator circles */}
              <div className="flex gap-1.5 pt-1">
                {[0, 1, 2].map((idx) => (
                  <button
                    key={idx}
                    onClick={() => setHeroSlideIndex(idx)}
                    className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer ${
                      heroSlideIndex === idx
                        ? idx === 0 ? "w-5 bg-[#00ddff]" : idx === 1 ? "w-5 bg-amber-400" : "w-5 bg-emerald-400"
                        : "w-1.5 bg-slate-600/80 hover:bg-slate-500"
                    }`}
                    aria-label={`Slide ${idx + 1}`}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* INTERACTIVE LEVEL QUICKCARD */}
          <div className="md:col-span-4">
            <Card padding="lg" className="flex flex-col justify-between h-[220px]">
              <div className="flex items-center gap-3">
                <div className="h-12 w-12 rounded-full bg-gradient-to-tr from-blue-700 to-cyan-400 p-[2px] flex items-center justify-center shadow-[0_0_15px_rgba(0,102,255,0.3)] animate-pulse shrink-0">
                  <div className="h-full w-full rounded-full bg-bg-card flex items-center justify-center">
                    <Trophy className="h-5 w-5 text-blue-400" />
                  </div>
                </div>
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-widest text-slate-500">{t("yourLevel")}</p>
                  <h3 className="text-base font-display font-extrabold text-white tracking-tight">{t("currentXp")} {userXp >= 2000 ? "III" : userXp >= 1000 ? "II" : "I"}</h3>
                </div>
              </div>

              <div className="space-y-1.5">
                <div className="flex justify-between text-xs font-mono">
                  <span className="text-slate-400">{t("currentXp")}</span>
                  <span className="text-cyan-400 font-bold">{userXp} / 2500 XP</span>
                </div>
                <div className="w-full bg-hover-bg rounded-full h-2 overflow-hidden border border-border-card">
                  <div
                    className="bg-gradient-to-r from-blue-500 to-cyan-400 h-2 rounded-full transition-all duration-1000"
                    style={{ width: `${levelPercentage}%` }}
                  />
                </div>
                <p className="text-[10px] text-slate-500 font-medium text-right">{t("nextLevel")}</p>
              </div>

              {/* Horizontal small stats grid bar */}
              <div className="border-t border-border-card/80 pt-3 grid grid-cols-3 gap-2 text-center">
                <div>
                  <span className="block text-sm font-bold text-white font-mono leading-none">12</span>
                  <span className="text-[9px] text-slate-500 font-medium">{t("challengesWon")}</span>
                </div>
                <div className="border-x border-border-card/60">
                  <span className="block text-sm font-bold text-white font-mono leading-none">24</span>
                  <span className="text-[9px] text-slate-500 font-medium">{t("challengesLaunched")}</span>
                </div>
                <div>
                  <span className="block text-sm font-bold text-white font-mono leading-none">15</span>
                  <span className="text-[9px] text-slate-500 font-medium">{t("activeFriends")}</span>
                </div>
              </div>
            </Card>
          </div>
        </div>

        {/* DÉFIS ET ACTIVITÉ DU DÉCOR GRID CONTAINER */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

          {/* 1. ACTIVITÉ RÉCENTE LIST */}
          <Card padding="lg" className="space-y-4">
            <div className="flex justify-between items-center pb-2 border-b border-border-card/60">
              <h3 className="font-display font-bold text-sm text-slate-200 uppercase tracking-wider">{t("recentActivity")}</h3>
              <Button variant="ghostText" size="sm" onClick={() => addToast(t("activityFullLoaded"), "info")}>
                {t("viewAll")}
              </Button>
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
                      <strong className="text-white font-bold group-hover:text-blue-400 transition-colors">
                        {act.user}
                      </strong>{" "}
                      {act.type === "challenge_made" && t("actionLaunched")}
                      {act.type === "challenge_taken" && t("actionCompleted")}
                      {act.type === "challenge_won" && t("actionWon")}
                      <span className="block text-xs font-semibold text-blue-400 mt-0.5">{act.detail}</span>
                    </p>
                  </div>
                  <span className="text-[10px] text-slate-500 font-mono shrink-0 pt-0.5">{act.time}</span>
                </div>
              ))}
            </div>
          </Card>

          {/* 2. DÉFIS EN COURS */}
          <Card padding="lg" className="space-y-4">
            <div className="flex justify-between items-center pb-2 border-b border-border-card/60">
              <h3 className="font-display font-bold text-sm text-slate-200 uppercase tracking-wider">{t("currentChallenges")}</h3>
              <Button variant="ghostText" size="sm" onClick={() => addToast(t("allChallengesLoaded"), "info")}>
                {t("viewAll")}
              </Button>
            </div>

            <div className="space-y-3">
              <AnimatePresence initial={false}>
                {challenges.map((chal) => (
                  <Card key={chal.id} variant="interactive" padding="none" className="flex h-20" onClick={() => addToast(t("challengeSelected", { title: chal.title }), "info")}>
                    {/* Left picture cover */}
                    <div className="w-24 relative overflow-hidden shrink-0">
                      <Image
                        src={chal.image}
                        alt={chal.title}
                        fill
                        sizes="96px"
                        className="object-cover transition-transform group-hover:scale-110"
                        referrerPolicy="no-referrer"
                      />
                      <div className="absolute inset-0 bg-blue-600/10 mix-blend-overlay" />
                    </div>

                    {/* Right descriptions */}
                    <div className="flex-1 p-3 flex flex-col justify-between min-w-0">
                      <div>
                        <h4 className="text-xs font-bold text-white truncate group-hover:text-blue-400 transition-colors">{chal.title}</h4>
                        <p className="text-[10px] text-slate-500 font-medium mt-0.5">{chal.category}</p>
                      </div>
                      <div className="flex items-center justify-between text-[10px] text-slate-400 font-mono">
                        <span>{t("partLabel")} <strong className="text-white font-bold">{chal.participants}</strong></span>
                        <span className="text-blue-400">{t("endLabel")} {chal.timeLeft}</span>
                      </div>
                    </div>

                    {/* Hover action arrow */}
                    <div className="px-2 flex items-center justify-center bg-[#111a28] border-l border-border-card text-slate-500 group-hover:text-blue-400 transition-colors shrink-0">
                      <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                    </div>
                  </Card>
                ))}
              </AnimatePresence>
            </div>
          </Card>
        </div>

        {/* CENTRAL CALL TO ACTION BANNER */}
        <Card padding="xl" className="bg-gradient-to-r from-blue-700 to-blue-600 border-border-card/80 shadow-xl">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-4 text-center sm:text-left">
              <div className="p-3 bg-white/10 rounded-xl flex items-center justify-center shrink-0">
                <Trophy className="h-7 w-7 text-white" />
              </div>
              <div>
                <h3 className="font-display font-extrabold text-[#00ddff] text-base sm:text-lg tracking-tight">{t("ctaHeadline")}</h3>
                <p className="text-xs text-blue-100 font-medium">{t("ctaSubtitle")}</p>
              </div>
            </div>
            <Button variant="whiteCta" onClick={() => setIsCreateChallengeOpen(true)}>
              <span>+</span>
              <span>{t("createChallenge")}</span>
            </Button>
          </div>
        </Card>

        {/* BOTTOM DOUBLE BLOCK */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

          {/* INVITER DES AMIS */}
          <Card padding="lg" className="space-y-4">
            <div className="pb-1">
              <h3 className="font-display font-bold text-sm text-slate-200 uppercase tracking-wider">{t("inviteFriends")}</h3>
            </div>

            <div className="space-y-3">
              <p className="text-xs text-slate-300 leading-relaxed font-medium">
                {t("inviteDescFull")}
              </p>

              <div className="flex bg-surface-input border border-border-card rounded-xl p-1 items-center justify-between">
                <span className="text-xs font-mono text-slate-300 px-3 truncate">{inviteUrl}</span>
                <Button
                  variant={inviteCopied ? "primary" : "ghost"}
                  size="sm"
                  onClick={handleCopyLink}
                  className="shrink-0"
                >
                  {inviteCopied
                    ? <Icon icon={Check} size="sm" strokeWidth={3.5} />
                    : <Icon icon={Copy} size="sm" />
                  }
                </Button>
              </div>

              <div className="space-y-2 pt-2">
                <p className="text-[10px] text-slate-500 font-semibold uppercase tracking-wider">{t("shareOrCopy")}</p>

                {/* Share channels buttons grid */}
                <div className="grid grid-cols-4 gap-2.5">
                  {SOCIAL_SHARES.map((net) => (
                    <Button
                      key={net.name}
                      variant="social"
                      size="sm"
                      onClick={() => {
                        if (net.action) {
                          if (navigator.share) {
                            navigator.share({ title: "Fitness Duel", text: "Join me on Fitness Duel !", url: "" });
                          } else {
                            handleCopyLink();
                          }
                        } else {
                          addToast(t("launchInvite", { network: net.name }), "info");
                        }
                      }}
                      className={`p-2.5 border rounded-xl flex flex-col items-center justify-center gap-1.5 text-[10px] font-bold hover:scale-[1.03] active:scale-95 ${net.color}`}
                    >
                      <Share2 className="h-4 w-4" />
                      <span>{net.name}</span>
                    </Button>
                  ))}
                </div>
              </div>
            </div>
          </Card>

          {/* BADGES MINI GRID */}
          <Card padding="lg" className="space-y-4">
            <div className="flex justify-between items-center pb-1">
              <h3 className="font-display font-bold text-sm text-slate-200 uppercase tracking-wider">{t("badges")}</h3>
              <Button variant="ghostText" size="sm" onClick={() => setActiveTab(TABS.BADGES)}>
                {t("viewAll")}
              </Button>
            </div>

            <div className="grid grid-cols-4 gap-2 text-center">
              {MINI_BADGES.map((bd) => (
                <TierBadge
                  key={bd.nameKey}
                  variant={bd.tier}
                  size="sm"
                  onClick={() => addToast(`${t(bd.nameKey)} : ${t(bd.descKey)}`, "info")}
                  className="min-h-[110px] hover:scale-105 transition-transform duration-200 cursor-pointer"
                >
                  <div className="flex flex-col items-center justify-between h-full w-full gap-1">
                    <div className="p-1.5 bg-slate-900/80 rounded-lg border border-slate-700/60">
                      <Award className="h-4 w-4" />
                    </div>
                    <div>
                      <p className="text-[10px] font-bold truncate max-w-full text-slate-200">{t(bd.nameKey)}</p>
                      <p className="text-[8px] text-slate-500 font-medium mt-0.5 whitespace-nowrap truncate max-w-full">{t(bd.descKey)}</p>
                    </div>
                    <span className="text-[8px] font-bold px-1.5 py-0.5 bg-slate-950/50 rounded-full">
                      {t(bd.subKey)}
                    </span>
                  </div>
                </TierBadge>
              ))}
            </div>
          </Card>
        </div>
      </div>

      {/* RIGHT LEADERBOARD & AI COACH ROW */}
      <div className="lg:col-span-4 space-y-6">

        {/* PUSH-UPS RANKING */}
        <Card padding="lg" className="space-y-4">
          <div className="flex justify-between items-center pb-1">
            <h3 className="font-display font-bold text-sm text-slate-200 uppercase tracking-wider">{t("pumpsRanking")}</h3>
            <Button variant="ghostText" size="sm" onClick={() => addToast(t("allRankingsOpened"), "info")}>
              {t("viewDetails")}
            </Button>
          </div>

          {/* Sub-tab selection row */}
          <div className="flex bg-surface-input p-1 rounded-xl border border-border-card">
            {RANKING_TABS.map((tab) => (
              <Button
                key={tab}
                variant={rankingTab === tab ? "primary" : "ghostText"}
                size="sm"
                onClick={() => setRankingTab(tab as "Semaine" | "Mois" | "Tout le temps")}
                className="flex-1"
              >
                {tab === "Semaine" ? t("weekTab") : tab === "Mois" ? t("monthTab") : t("allTimeTab")}
              </Button>
            ))}
          </div>

          {/* Listing of competitors */}
          <div className="space-y-2 pt-1">
            {currentRankings.map((leader) => (
              <div
                key={leader.name}
                className={`flex items-center justify-between p-2.5 rounded-xl border transition-all ${
                  leader.isYou
                    ? "bg-blue-600/15 border-blue-500/40 shadow-[0_0_12px_rgba(0,102,255,0.15)]"
                    : "bg-surface-raised border-border-card/80 hover:border-[#2b3c55]"
                }`}
              >
                <div className="flex items-center gap-3">
                  <span className={`text-xs font-mono font-bold w-4 text-center ${
                    leader.rank === 1 ? "text-yellow-500" : leader.rank === 2 ? "text-blue-400" : "text-slate-500"
                  }`}>
                    {leader.rank}
                  </span>

                  <Avatar
                    src={leader.avatar}
                    alt={leader.name}
                    size="xs"
                    shape="square"
                    fallback={leader.name.slice(0, 2)}
                  />

                  <div className="flex items-center gap-1">
                    <span className={`text-xs font-bold ${leader.isYou ? "text-blue-400 font-extrabold" : "text-slate-200"}`}>
                      {leader.name}
                    </span>
                    {leader.isCrown && <span className="text-xs">&#x1F451;</span>}
                    {leader.isYou && <span className="text-[9px] font-bold text-blue-500 bg-blue-500/10 px-1.5 py-0.2 rounded uppercase tracking-wider">{t("me")}</span>}
                  </div>
                </div>

                <span className="text-xs font-mono font-bold text-slate-300">
                  <strong className="text-white font-extrabold">{leader.score}</strong> {t("pumpsUnit")}
                </span>
              </div>
            ))}
          </div>

          {/* Expand rankings */}
          <Button
            variant="secondary"
            size="sm"
            onClick={() => addToast(t("expandRankings", { count: 12 }), "info")}
            className="w-full gap-1.5"
          >
            <BarChart2 className="h-4 w-4" />
            <span>{t("viewFullRanking")}</span>
          </Button>
        </Card>

        {/* CHAT IA MINIFIED */}
        <Card padding="lg" className="flex flex-col justify-between h-[390px] min-h-[390px]">
          <div className="flex justify-between items-center pb-2 border-b border-border-card/60">
            <div className="flex items-center gap-2">
              <div className="h-2 w-2 bg-emerald-500 rounded-full animate-pulse" />
              <h3 className="font-display font-bold text-sm text-slate-200 uppercase tracking-wider">{t("coachIA")}</h3>
              <span className="text-[10px] font-bold px-1.5 py-0.2 bg-blue-600 text-white rounded uppercase tracking-wider scale-90">
                {t("new")}
              </span>
            </div>
            <Button
              variant="secondary"
              size="sm"
              onClick={() => setActiveTab(TABS.COACH)}
              className="gap-1.5"
            >
              <ExternalLink className="h-3 w-3 text-blue-400" />
              <span>{t("viewDetails")}</span>
            </Button>
          </div>

          {/* Chat conversation listing */}
          <div className="flex-1 overflow-y-auto pr-1 space-y-3">
            {messages.map((m) => (
              <div
                key={m.id}
                className={`flex flex-col ${m.sender === "user" ? "items-end" : "items-start"}`}
              >
                <div className="flex items-center gap-1.5 mb-1">
                  {m.sender === "coach" && (
                    <div className="h-4 w-4 rounded bg-blue-600 flex items-center justify-center text-[10px] text-white">
                      A
                    </div>
                  )}
                  <span className="text-[9px] text-slate-500 font-semibold font-mono">
                    {m.sender === "user" ? userName.split(" ")[0] : t("chatCoach")}
                  </span>
                </div>
                <div className={`p-3 rounded-2xl text-xs max-w-[85%] leading-relaxed whitespace-pre-line ${
                  m.sender === "user"
                    ? "bg-blue-600 text-white rounded-tr-none shadow-[0_4px_10px_rgba(0,102,255,0.25)]"
                    : "bg-surface-raised text-slate-200 rounded-tl-none border border-border-card"
                }`}>
                  {m.text}
                </div>
              </div>
            ))}

            {/* Typing Indicator */}
            {coachTyping && (
              <div className="flex flex-col items-start">
                <div className="flex items-center gap-1.5 mb-1">
                  <div className="h-4 w-4 rounded bg-blue-600 flex items-center justify-center text-[10px] text-white">
                    A
                  </div>
                  <span className="text-[9px] text-slate-500 font-semibold font-mono">{t("chatCoach")}</span>
                </div>
                <div className="p-3 bg-surface-raised text-slate-400 rounded-2xl rounded-tl-none border border-border-card flex items-center gap-1">
                  <span className="h-2 w-2 bg-slate-500 rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                  <span className="h-2 w-2 bg-slate-500 rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                  <span className="h-2 w-2 bg-slate-500 rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
                </div>
              </div>
            )}
            <div ref={chatBottomRef} />
          </div>

          {/* Predefined prompt questions row */}
          <div className="flex gap-2.5 overflow-x-auto pb-1 max-w-full pt-2">
            {coachSuggestions.map((sug) => (
              <Button
                key={sug.keyword}
                variant="ghost"
                size="sm"
                onClick={() => sendToCoach(sug.text)}
                className="whitespace-nowrap gap-1"
              >
                {sug.text}
              </Button>
            ))}
          </div>

          {/* Message input */}
          <div className="flex items-center gap-2 bg-surface-input border border-border-card rounded-xl p-1 shrink-0">
            <input
              type="text"
              value={coachInput}
              onChange={(e) => setCoachInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  sendToCoach(coachInput);
                }
              }}
              placeholder={t("writeMessage")}
              className="flex-1 bg-transparent px-3 py-2 text-xs text-white focus:outline-none placeholder-slate-500"
            />
            <Button
              variant="primary"
              size="icon-sm"
              onClick={() => sendToCoach(coachInput)}
              aria-label={t("sendAria")}
            >
              <Send className="h-3.5 w-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </Button>
          </div>
        </Card>

      </div>
    </motion.div>
  );
}
