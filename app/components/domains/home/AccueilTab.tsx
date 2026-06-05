"use client";

import { motion } from "motion/react";
import { useTranslations } from "next-intl";
import { Trophy } from "lucide-react";
import { Card } from "@/app/components/ui/card";
import { Button } from "@/app/components/ui/button";
import { useUser } from "@/contexts/UserContext";
import { useChallenges } from "@/contexts/ChallengeContext";
import { HeroCarousel, QuickStatsCard } from "./HeroCarousel";
import { ActivityFeed, ChallengeHighlightList } from "./ActivityFeed";
import { InviteSection } from "./InviteSection";
import { LeaderboardWidget } from "./LeaderboardWidget";
import { MiniBadgeGrid } from "./MiniBadgeGrid";

const MAX_XP = 2500;

interface RankingEntry {
  rank: number;
  name: string;
  score: number;
  isCrown?: boolean;
  isYou?: boolean;
  avatar: string;
}

interface InviteSectionProps {
  inviteUrl: string;
  onCopyLink: () => void;
  onShare: (network: string) => void;
}

interface MiniBadgeGridProps {
  onBadgeClick: (name: string, desc: string) => void;
  onViewAll: () => void;
}

const RANKING_NAMES = ["Thomas", "Camille", "Toi", "Lucas", "Chloé"] as const;
const RANKING_AVATARS = [
  "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=120",
  "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=120",
  "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?auto=format&fit=crop&q=80&w=120",
  "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=120",
  "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=120",
] as const;

const RANKINGS: Record<string, Record<string, readonly number[]>> = {
  Pompes: {
    Semaine: [58, 42, 38, 35, 30] as const,
    Mois: [240, 210, 195, 180, 140] as const,
    "Tout le temps": [1240, 1100, 980, 950, 720] as const,
  },
  Gainage: {
    Semaine: [15, 12, 10, 8, 6] as const,
    Mois: [60, 52, 45, 40, 32] as const,
    "Tout le temps": [310, 280, 250, 220, 180] as const,
  },
  Course: {
    Semaine: [45, 30, 28, 25, 20] as const,
    Mois: [180, 150, 135, 110, 90] as const,
    "Tout le temps": [950, 820, 780, 710, 590] as const,
  },
  Squats: {
    Semaine: [120, 90, 85, 75, 60] as const,
    Mois: [480, 410, 390, 350, 290] as const,
    "Tout le temps": [2400, 2100, 1950, 1800, 1450] as const,
  },
};

interface AccueilTabProps {
  heroSlideIndex: number;
  setHeroSlideIndex: (idx: number) => void;
  inviteUrl: string;
  onCopyLink: () => void;
  rankingTab: "Semaine" | "Mois" | "Tout le temps";
  setRankingTab: (tab: "Semaine" | "Mois" | "Tout le temps") => void;
  setActiveTab: (tab: string) => void;
  selectedLeaderboardDiscipline: string;
}

export default function AccueilTab({
  heroSlideIndex,
  setHeroSlideIndex,
  inviteUrl,
  onCopyLink,
  rankingTab,
  setRankingTab,
  setActiveTab,
  selectedLeaderboardDiscipline,
}: AccueilTabProps) {
  const t = useTranslations("home");
  const { userXp, recentActivities, gainXp } = useUser();
  const { challenges } = useChallenges();

  const levelPercentage = Math.min(100, Math.round((userXp / MAX_XP) * 100));

  const getDynamicRankingsList = (): RankingEntry[] => {
    const discipline = selectedLeaderboardDiscipline as keyof typeof RANKINGS;
    const scores = RANKINGS[discipline]?.["Semaine"] ?? RANKINGS["Pompes"]!["Semaine"]!;
    return RANKING_NAMES.map((name, i) => ({
      rank: i + 1,
      name,
      score: scores[i] ?? 0,
      isCrown: i === 0,
      isYou: name === "Toi",
      avatar: RANKING_AVATARS[i]!,
    }))
      .sort((a, b) => b.score - a.score)
      .map((item, idx) => ({ ...item, rank: idx + 1 }));
  };

  const handleShare = (network: string) => {
    gainXp(15, `Invitation partagée via ${network} !`);
  };

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
          <div className="md:col-span-8">
            <HeroCarousel
              heroSlideIndex={heroSlideIndex}
              setHeroSlideIndex={setHeroSlideIndex}
            />
          </div>
          <div className="md:col-span-4">
            <QuickStatsCard
              userXp={userXp}
              levelPercentage={levelPercentage}
            />
          </div>
        </div>

        {/* ACTIVITY + CHALLENGES GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <ActivityFeed
            recentActivities={recentActivities}
            onViewAll={() => setActiveTab("Activité")}
          />
          <ChallengeHighlightList
            challenges={challenges}
            onViewAll={() => setActiveTab("Défis")}
            onChallengeClick={(title) => gainXp(15, `Défi "${title}" consulté`)}
          />
        </div>

        {/* CENTRAL CTA BANNER */}
        <Card
          padding="xl"
          className="bg-gradient-to-r from-brand-blue to-brand-blue/80 border-border-card/80 shadow-xl"
        >
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-4 text-center sm:text-left">
              <div className="p-3 bg-white/10 rounded-xl flex items-center justify-center shrink-0">
                <Trophy className="h-7 w-7 text-white" />
              </div>
              <div>
                <h3 className="font-display font-extrabold text-brand-cyan text-base sm:text-lg tracking-tight">
                  {t("ctaHeadline")}
                </h3>
                <p className="text-xs text-blue-100 font-medium">{t("ctaSubtitle")}</p>
              </div>
            </div>
            <Button
              variant="whiteCta"
              onClick={() => setActiveTab("Défis")}
            >
              <span>+</span>
              <span>{t("createChallenge")}</span>
            </Button>
          </div>
        </Card>

        {/* BOTTOM DOUBLE BLOCK: INVITE + BADGES */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <InviteSection
            inviteUrl={inviteUrl}
            onCopyLink={onCopyLink}
            onShare={handleShare}
          />
          <MiniBadgeGrid
            onBadgeClick={(name, desc) => gainXp(5, `Badge "${name}" consulté`)}
            onViewAll={() => setActiveTab("Badges")}
          />
        </div>
      </div>

      {/* RIGHT LEADERBOARD + COACH */}
      <div className="lg:col-span-4 space-y-6">
        <LeaderboardWidget
          rankingTab={rankingTab}
          setRankingTab={setRankingTab}
          currentRankings={getDynamicRankingsList()}
          onViewDetails={() => setActiveTab("Classements")}
        />
      </div>
    </motion.div>
  );
}
