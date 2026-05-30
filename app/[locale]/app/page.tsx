"use client";

import React, { useState, useEffect, useRef } from "react";
import { Message, Challenge, RecentActivity, RankingEntry, TABS, CoachSuggestion, SavedPlan } from "@/app/types";
import { motion, AnimatePresence } from "motion/react";
import { Toaster } from "@/app/components/ui/sonner";

import { useLocalStorage } from "@/app/hooks/useLocalStorage";
import { useUserProfile } from "@/app/hooks/useUserProfile";

import Sidebar from "@/app/components/sidebar/Sidebar";
import MobileDrawer from "@/app/components/sidebar/MobileDrawer";
import Header from "@/app/components/header/Header";
import CreateChallengeModal from "@/app/components/modals/CreateChallengeModal";
import AccueilTab from "@/app/components/tabs/AccueilTab";
import DefisPage from "@/app/components/pages/defis-page";
import ActivitePage from "@/app/components/pages/activite-page";
import AmisPage from "@/app/components/pages/amis-page";
import ClassementsPage from "@/app/components/pages/classements-page";
import BadgesPage from "@/app/components/pages/badges-page";
import CoachPage from "@/app/components/coach/CoachPage";
import ProfilPage from "@/app/components/pages/profil-page";

// ─── Default seed data ───────────────────────────────────────────────────────
const DEFAULT_CHALLENGES: Challenge[] = [
  { id: "def1", title: "Pompes en 2 minutes", participants: 5, timeLeft: "2j 14h 32m", image: "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?auto=format&fit=crop&q=80&w=600", category: "Musculation" },
  { id: "def2", title: "Course 5 km", participants: 8, timeLeft: "5j 09h 15m", image: "https://images.unsplash.com/photo-1476480862126-209bfaa8edc8?auto=format&fit=crop&q=80&w=600", category: "Endurance" },
];

const DEFAULT_STREAK: Array<{ day: string; checked: boolean }> = [
  { day: "Lun", checked: true }, { day: "Mar", checked: true }, { day: "Mer", checked: true },
  { day: "Jeu", checked: true }, { day: "Ven", checked: true }, { day: "Sam", checked: true },
  { day: "Dim", checked: false },
];

const DEFAULT_ACTIVITIES: RecentActivity[] = [
  { id: "act1", type: "challenge_made", user: "Thomas", target: "toi", detail: "Pompes en 2 minutes", time: "Il y a 2h", avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=120" },
  { id: "act2", type: "challenge_taken", user: "Camille", target: "ton", detail: "Gainage max", time: "Il y a 4h", avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=120" },
  { id: "act3", type: "challenge_won", user: "Lucas", target: "le", detail: "Squats en 3 min", time: "Il y a 6h", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=120" },
];

const DEFAULT_FRIENDS = [
  { name: "Thomas", status: "En entraînement 🏃‍♂️", score: 580, level: "Maître", avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=120" },
  { name: "Camille", status: "En ligne 🟢", score: 380, level: "Guerrier", avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=120" },
  { name: "Lucas", status: "Inactif 🔴", score: 350, level: "Recrue", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=120" },
  { name: "Chloé", status: "En ligne 🟢", score: 300, level: "Recrue", avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=120" },
];

// ─── Rankings seed data ───────────────────────────────────────────────────────
const RANKINGS = {
  Pompes: {
    Semaine:     [58, 42, 38, 35, 30] as const,
    Mois:        [240, 210, 195, 180, 140] as const,
    "Tout le temps": [1240, 1100, 980, 950, 720] as const,
  },
  Gainage: {
    Semaine:     [15, 12, 10, 8, 6] as const,
    Mois:        [60, 52, 45, 40, 32] as const,
    "Tout le temps": [310, 280, 250, 220, 180] as const,
  },
  Course: {
    Semaine:     [45, 30, 28, 25, 20] as const,
    Mois:        [180, 150, 135, 110, 90] as const,
    "Tout le temps": [950, 820, 780, 710, 590] as const,
  },
  Squats: {
    Semaine:     [120, 90, 85, 75, 60] as const,
    Mois:        [480, 410, 390, 350, 290] as const,
    "Tout le temps": [2400, 2100, 1950, 1800, 1450] as const,
  },
};

const RANKING_NAMES = ["Thomas", "Camille", "Toi", "Lucas", "Chloé"] as const;
const RANKING_AVATARS = [
  "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=120",
  "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=120",
  "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?auto=format&fit=crop&q=80&w=120",
  "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=120",
  "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=120",
] as const;

const INVITE_URL = "fitnessduel.app/invite/ALEX";
const MAX_XP = 2500;

// ─── Page component ──────────────────────────────────────────────────────────
export default function Dashboard() {
  // Navigation — string so TABS constants can be passed without type mismatch
  const [activeTab, setActiveTab] = useState<string>(TABS.HOME);

  // Persisted state
  const [userXp, setUserXp] = useLocalStorage("fitness_duel_xp", 2150);
  const [challenges, setChallenges] = useLocalStorage("fitness_duel_challenges", DEFAULT_CHALLENGES);
  const [streakDays, setStreakDays] = useLocalStorage("fitness_duel_streak", DEFAULT_STREAK);
  const [friendsList, setFriendsList] = useLocalStorage("fitness_duel_friends", DEFAULT_FRIENDS);
  const [recentActivities, setRecentActivities] = useLocalStorage("fitness_duel_activities", DEFAULT_ACTIVITIES);
  const [savedPlans, setSavedPlans] = useLocalStorage<SavedPlan[]>("fitness_duel_coach_plans", []);

  // Non-persisted: ID refs, modals, form state, UI state
  const msgIdRef = useRef(10);
  const challengeIdRef = useRef(10);
  const planIdRef = useRef(0);

  const [isCreateChallengeOpen, setIsCreateChallengeOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);

  const [newTitle, setNewTitle] = useState("");
  const [newCategory, setNewCategory] = useState("Musculation");
  const [newParticipants, setNewParticipants] = useState(2);
  const [newTargetUser, setNewTargetUser] = useState("Thomas");
  const [createChallengeErrors, setCreateChallengeErrors] = useState<{ title?: string; participants?: string }>({});

  const [activityFilter, setActivityFilter] = useState<"all" | "mine" | "friends">("all");
  const [logExerciseType, setLogExerciseType] = useState("Pompes");
  const [logValue, setLogValue] = useState(30);
  const [logIntensity, setLogIntensity] = useState("Medium");

  const [heroSlideIndex, setHeroSlideIndex] = useState(0);

  const [defisCategory, setDefisCategory] = useState("Tous");
  const [defisSearchQuery, setDefisSearchQuery] = useState("");
  const [selectedChallengeToTake, setSelectedChallengeToTake] = useState<Challenge | null>(null);
  const [challengeResultInput, setChallengeResultInput] = useState("");

  const [friendsSearchQuery, setFriendsSearchQuery] = useState("");
  const [directMsgFriend, setDirectMsgFriend] = useState<string | null>(null);
  const [directMsgText, setDirectMsgText] = useState("");
  const [newFriendName, setNewFriendName] = useState("");

  const [rankingTab, setRankingTab] = useState<"Semaine" | "Mois" | "Tout le temps">("Semaine");
  const [selectedLeaderboardDiscipline, setSelectedLeaderboardDiscipline] = useState("Pompes");

  // Chat / coach state
  const chatBottomRef = useRef<HTMLDivElement>(null);
  const isFirstRender = useRef(true);
  const [mounted, setMounted] = useState(false);
  // Safe: setMounted=true after hydration resolves the next-themes dark-mode flash
  // eslint-disable-next-line react-hooks/set-state-in-effect
  useEffect(() => { setMounted(true); }, []);
  const [coachInput, setCoachInput] = useState("");
  const [coachTyping, setCoachTyping] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { id: "m1", sender: "coach", text: "Salut Alex ! Je suis ton coach IA. Comment puis-je t'aider aujourd'hui ?", timestamp: new Date() },
    { id: "m2", sender: "user", text: "Je veux améliorer mes pompes, tu as des conseils ? 💪", timestamp: new Date() },
    { id: "m3", sender: "coach", text: "Bien sûr ! Voici mes conseils pour progresser :\n\n• Garde le dos droit\n• Descends jusqu'à 90°\n• Expire en poussant\n• Entraîne-toi 3x/semaine", timestamp: new Date() },
  ]);

  const coachSuggestions: CoachSuggestion[] = [
    { text: "Je veux améliorer mes pompes 💪", keyword: "pompes" },
    { text: "Comment créer un défi ? 🏆", keyword: "defis" },
    { text: "Donne-moi un conseil du jour, Coach ! ⭐", keyword: "hello" },
  ];

  // User profile
  const { userName, userEmail, addToast, userWeight, setUserWeight, userHeight, setUserHeight,
          userBio, setUserBio, userStatus, setUserStatus, dailyXpGoal, setDailyXpGoal } = useUserProfile();

  const levelPercentage = Math.min(100, Math.round((userXp / MAX_XP) * 100));

  // ─── Handlers ──────────────────────────────────────────────────────────────
  const gainXp = (amount: number, reason: string) => {
    setUserXp((prev) => {
      const next = prev + amount;
      if (next >= MAX_XP) {
        addToast(`Félicitations ! Tu passes au niveau LÉGENDE ! 👑 +${amount} XP`, "xp");
        return next - MAX_XP;
      }
      addToast(`+${amount} XP : ${reason}`, "xp");
      return next;
    });
  };

  const toggleStreakDay = (index: number) => {
    const updated = [...streakDays];
    if (!updated[index]) return;
    updated[index]!.checked = !updated[index]!.checked;
    setStreakDays(updated);
    if (updated[index]!.checked) gainXp(10, "Série quotidienne mise à jour ! 🔥");
  };

  const handleLogWorkout = (e: React.FormEvent) => {
    e.preventDefault();
    const isBeast = logIntensity === "Beast";
    const xpReward = isBeast ? logValue * 2 : Math.round(logValue * 1.2);
    const calories = isBeast ? logValue * 10 : logValue * 7;
    const unit = logExerciseType === "Course" ? "min" : "reps";
    const nextId = String(Date.now());
    setRecentActivities((prev) => [
      { id: nextId, type: "challenge_taken", user: "Toi", target: "ton", detail: `Séance de ${logExerciseType} (${logValue} ${unit}) - Mode ${logIntensity}`, time: "À l'instant", avatar: RANKING_AVATARS[2] },
      ...prev,
    ]);
    gainXp(xpReward, `${logExerciseType} validé ! 💪 (+${calories} kcal)`);
  };

  const handleCompleteChallenge = (chal: Challenge) => {
    const userReps = Number(challengeResultInput) || 45;
    gainXp(75, `Défi "${chal.title}" complété avec ${userReps} reps ! 🎉`);
    const nextId = String(Date.now());
    setRecentActivities((prev) => [
      { id: nextId, type: "challenge_won", user: "Toi", target: "le", detail: `A battu "${chal.title}" (${userReps} reps)`, time: "À l'instant", avatar: RANKING_AVATARS[2] },
      ...prev,
    ]);
    setChallenges((prev) => prev.filter((c) => c.id !== chal.id));
    setSelectedChallengeToTake(null);
    setChallengeResultInput("");
  };

  const handleAddFriend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newFriendName.trim()) return;
    if (friendsList.some((f) => f.name.toLowerCase() === newFriendName.toLowerCase())) {
      addToast(`${newFriendName} est déjà dans ta liste d'amis !`, "info");
      return;
    }
    const avatars = [
      "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=120",
      "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?auto=format&fit=crop&q=80&w=120",
      "https://images.unsplash.com/photo-1527980965255-d3b416303d12?auto=format&fit=crop&q=80&w=120",
    ];
    setFriendsList((prev) => [
      ...prev,
      { name: newFriendName, status: "En ligne 🟢", score: 180, level: "Recrue", avatar: avatars[Math.floor(Math.random() * avatars.length)] ?? avatars[0]! },
    ]);
    gainXp(25, `Ami "${newFriendName}" ajouté ! 🤝`);
    setNewFriendName("");
  };

  const handleSendDirectMsg = (friendName: string) => {
    if (!directMsgText.trim()) return;
    addToast(`Message direct envoyé à ${friendName} ! 💪`, "success");
    setDirectMsgText("");
    setDirectMsgFriend(null);
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(INVITE_URL);
    addToast("Lien d'invitation copié avec succès !");
  };

  const handleCreateChallenge = (e: React.FormEvent) => {
    e.preventDefault();
    const errors: { title?: string; participants?: string } = {};
    if (!newTitle.trim()) errors.title = "Le titre du défi est obligatoire.";
    if (!newParticipants || newParticipants < 2) errors.participants = "Minimum 2 participants requis.";
    else if (newParticipants > 100) errors.participants = "Maximum 100 participants.";
    if (Object.keys(errors).length > 0) {
      setCreateChallengeErrors(errors);
      addToast("Oups ! Veuillez corriger les erreurs du formulaire.", "info");
      return;
    }
    setCreateChallengeErrors({});
    const images: Record<string, string> = {
      Musculation: "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&q=80&w=600",
      Endurance: "https://images.unsplash.com/photo-1476480862126-209bfaa8edc8?auto=format&fit=crop&q=80&w=600",
      Gainage: "https://images.unsplash.com/photo-1541534741688-6078c6bfb5c5?auto=format&fit=crop&q=80&w=600",
      Squats: "https://images.unsplash.com/photo-1574680096145-d05b474e2155?auto=format&fit=crop&q=80&w=600",
    };
    const chal: Challenge = { id: `chal_${challengeIdRef.current++}`, title: newTitle, participants: newParticipants, timeLeft: "3j 00h 00m", image: images[newCategory] ?? images["Musculation"]!, category: newCategory };
    const act: RecentActivity = { id: `act_${Date.now()}`, type: "challenge_made", user: "Toi", target: newTargetUser, detail: newTitle, time: "À l'instant", avatar: RANKING_AVATARS[2] };
    setChallenges((prev) => [chal, ...prev]);
    setRecentActivities((prev) => [act, ...prev]);
    setNewTitle("");
    setIsCreateChallengeOpen(false);
    gainXp(50, `Défi "${newTitle}" lancé à ${newTargetUser} ! 👊`);
  };

  const sendToCoach = async (text: string) => {
    if (!text.trim()) return;
    const nextId = String(msgIdRef.current);
    msgIdRef.current += 2;
    const userMsg: Message = { id: `msg_${nextId}`, sender: "user", text, timestamp: new Date() };
    setMessages((prev) => [...prev, userMsg]);
    setCoachInput("");
    setCoachTyping(true);

    try {
      const resp = await fetch("/api/gemini", {
        method: "POST",
        headers: { "Content-Type": "application/json", "X-User-Name": userName },
        body: JSON.stringify({ message: text }),
      });
      const data = await resp.json();
      setCoachTyping(false);
      setMessages((prev) => [
        ...prev,
        { id: `msg_${nextId}_r`, sender: "coach", text: data.text ?? "Je suis un peu essoufflé, faisons une pause !", timestamp: new Date() },
      ]);
      gainXp(15, "Interaction Coach IA !");
    } catch {
      setCoachTyping(false);
      setMessages((prev) => [
        ...prev,
        { id: `msg_${nextId}_r`, sender: "coach", text: "Je n'ai pas pu recevoir ton message. Ajuste tes appuis et réessaie ! 💪", timestamp: new Date() },
      ]);
    }
  };

  const getDynamicRankingsList = () => {
    const discipline = selectedLeaderboardDiscipline as keyof typeof RANKINGS;
    const period = rankingTab as keyof typeof RANKINGS.Pompes;
    const scores = RANKINGS[discipline]?.[period] ?? RANKINGS.Pompes.Semaine;
    return RANKING_NAMES.map((name, i) => ({
      rank: i + 1,
      name,
      score: scores[i] ?? 0,
      isCrown: i === 0,
      isYou: name === "Toi",
      avatar: RANKING_AVATARS[i]!,
    })).sort((a, b) => b.score - a.score).map((item, idx) => ({ ...item, rank: idx + 1 }));
  };

  // ─── Effects ────────────────────────────────────────────────────────────────
  useEffect(() => {
    if (isFirstRender.current) { isFirstRender.current = false; return; }
    chatBottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, coachTyping]);

  useEffect(() => {
    const timer = setInterval(() => setHeroSlideIndex((p) => (p + 1) % 3), 6000);
    return () => clearInterval(timer);
  }, []);

  // ─── Render ────────────────────────────────────────────────────────────────
  return (
    <div className="flex bg-[#050911] text-sans max-w-[1920px] mx-auto h-[100dvh] relative overflow-hidden">

      <MobileDrawer
        isOpen={isMobileNavOpen}
        onClose={() => setIsMobileNavOpen(false)}
        activeTab={activeTab}
        setActiveTab={(tab) => { setActiveTab(tab); setIsMobileNavOpen(false); }}
        userXp={mounted ? userXp : 2150}
        levelPercentage={mounted ? levelPercentage : 86}
        streakDays={streakDays}
        toggleStreakDay={toggleStreakDay}
      />

      <Sidebar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        streakDays={streakDays}
        toggleStreakDay={toggleStreakDay}
      />

      <div className="flex-1 flex flex-col min-h-0 overflow-hidden">
        <Header
          userName={mounted ? userName : "Alex GUERRIER"}
          userEmail={mounted ? userEmail : "utilisateur@example.com"}
          onOpenCreateChallenge={() => setIsCreateChallengeOpen(true)}
          notificationsOpen={notificationsOpen}
          setNotificationsOpen={setNotificationsOpen}
          gainXp={gainXp}
          addToast={addToast}
          setUserXp={setUserXp}
          onMobileMenuOpen={() => setIsMobileNavOpen(true)}
        />

        <div className="flex-1 overflow-y-auto custom-scrollbar">
          <main className="p-4 sm:p-8 space-y-6 min-w-0">
            <AnimatePresence mode="wait">

            {activeTab === TABS.HOME && (
              <motion.div key="accueil" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                <AccueilTab
                  heroSlideIndex={heroSlideIndex}
                  setHeroSlideIndex={setHeroSlideIndex}
                  userXp={mounted ? userXp : 2150}
                  levelPercentage={mounted ? levelPercentage : 86}
                  recentActivities={mounted ? recentActivities : DEFAULT_ACTIVITIES}
                  challenges={mounted ? challenges : DEFAULT_CHALLENGES}
                  setIsCreateChallengeOpen={setIsCreateChallengeOpen}
                  addToast={addToast}
                  inviteUrl={INVITE_URL}
                  inviteCopied={false}
                  handleCopyLink={handleCopyLink}
                  rankingTab={rankingTab}
                  setRankingTab={setRankingTab}
                  currentRankings={getDynamicRankingsList()}
                  messages={messages}
                  userName={mounted ? userName : "Alex GUERRIER"}
                  coachTyping={coachTyping}
                  chatBottomRef={chatBottomRef}
                  coachInput={coachInput}
                  setCoachInput={setCoachInput}
                  coachSuggestions={coachSuggestions}
                  sendToCoach={sendToCoach}
                  setActiveTab={setActiveTab}
                />
              </motion.div>
            )}

            {activeTab === TABS.DEFIS && (
              <motion.div key="defis" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                <DefisPage
                  challenges={challenges}
                  setChallenges={setChallenges}
                  setSelectedChallengeToTake={setSelectedChallengeToTake}
                  setIsCreateChallengeOpen={setIsCreateChallengeOpen}
                  addToast={addToast}
                  gainXp={gainXp}
                />
              </motion.div>
            )}

            {activeTab === TABS.ACTIVITY && (
              <motion.div key="activite" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                <ActivitePage
                  recentActivities={mounted ? recentActivities : DEFAULT_ACTIVITIES}
                  setRecentActivities={setRecentActivities}
                  gainXp={gainXp}
                  addToast={addToast}
                />
              </motion.div>
            )}

            {activeTab === TABS.FRIENDS && (
              <motion.div key="amis" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                <AmisPage
                  friendsList={mounted ? friendsList : DEFAULT_FRIENDS}
                  setFriendsList={setFriendsList}
                  gainXp={gainXp}
                  addToast={addToast}
                  setNewTargetUser={setNewTargetUser}
                  setIsCreateChallengeOpen={setIsCreateChallengeOpen}
                  setDirectMsgFriend={setDirectMsgFriend}
                  inviteUrl={INVITE_URL}
                  handleCopyLink={handleCopyLink}
                  inviteCopied={false}
                />
              </motion.div>
            )}

            {activeTab === TABS.RANKINGS && (
              <motion.div key="classements" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                <ClassementsPage
                  rankingTab={rankingTab}
                  setRankingTab={setRankingTab}
                  selectedLeaderboardDiscipline={selectedLeaderboardDiscipline}
                  setSelectedLeaderboardDiscipline={setSelectedLeaderboardDiscipline}
                  getDynamicRankingsList={getDynamicRankingsList}
                />
              </motion.div>
            )}

            {activeTab === TABS.BADGES && (
              <motion.div key="badges" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                <BadgesPage addToast={addToast} levelPercentage={levelPercentage} />
              </motion.div>
            )}

            {activeTab === TABS.COACH && (
              <motion.div key="coach" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                <CoachPage
                  messages={messages}
                  coachTyping={coachTyping}
                  coachInput={coachInput}
                  setCoachInput={setCoachInput}
                  sendToCoach={sendToCoach}
                  coachSuggestions={coachSuggestions}
                  chatBottomRef={chatBottomRef}
                  userName={mounted ? userName : "Alex GUERRIER"}
                  savedPlans={savedPlans}
                  setSavedPlans={setSavedPlans}
                  planIdRef={planIdRef}
                />
              </motion.div>
            )}

            {activeTab === TABS.PROFIL && (
              <motion.div key="profil" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                <ProfilPage
                  userName={mounted ? userName : "Alex GUERRIER"}
                  userWeight={userWeight}
                  setUserWeight={setUserWeight}
                  userHeight={userHeight}
                  setUserHeight={setUserHeight}
                  userBio={userBio}
                  setUserBio={setUserBio}
                  userStatus={userStatus}
                  setUserStatus={setUserStatus}
                  dailyXpGoal={dailyXpGoal}
                  setDailyXpGoal={setDailyXpGoal}
                  addToast={addToast}
                />
              </motion.div>
            )}

          </AnimatePresence>
          </main>
        </div>
      </div>

      <CreateChallengeModal
        isOpen={isCreateChallengeOpen}
        onClose={() => setIsCreateChallengeOpen(false)}
        newTitle={newTitle}
        setNewTitle={setNewTitle}
        newCategory={newCategory}
        setNewCategory={setNewCategory}
        newParticipants={newParticipants}
        setNewParticipants={setNewParticipants}
        newTargetUser={newTargetUser}
        setNewTargetUser={setNewTargetUser}
        errors={createChallengeErrors}
        setErrors={setCreateChallengeErrors}
        onSubmit={handleCreateChallenge}
      />

      <Toaster position="bottom-right" richColors closeButton />
    </div>
  );
}
