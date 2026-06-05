"use client";

import React, { useState, useEffect } from "react";
import {
  Dumbbell,
  Flame,
  Heart,
  Apple,
  ChevronRight,
  Sparkles,
  Trash2,
  Copy,
  Info,
  Plus,
  Bookmark,
  MessageSquare,
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { useTranslations } from "next-intl";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

import { ChatBubble } from "./ChatBubble";
import { ChatInput } from "./ChatInput";
import { TypingIndicator } from "./TypingIndicator";
import { CoachSuggestions } from "./CoachSuggestions";
import { CoachIntro } from "./CoachIntro";
import { SavePlanModal } from "./SavePlanModal";
import { Button } from "@/app/components/ui/button";
import { Card } from "@/app/components/ui/card";
import { PillBadge } from "@/app/components/ui/badge";
import { SavedPlan } from "@/app/types";

export interface Message {
  id: string;
  sender: "coach" | "user";
  text: string;
}

export interface CoachSuggestion {
  text: string;
  keyword: string;
}

export const HELP_AXES_IDS = ["force", "cardio", "recup", "nutrition"] as const;
export type HelpAxisId = typeof HELP_AXES_IDS[number];

export interface HelpAxis {
  id: HelpAxisId;
  name: string;
  icon: React.ComponentType<{ className?: string }>;
  color: string;
  badgeBg: string;
  hoverColor: string;
  glow: string;
  shortDesc: string;
  programs: Array<{ titleKey: string; descKey: string; promptKey: string; duration: string; xp: string }>;
}

export const HELP_AXES: HelpAxis[] = [
  {
    id: "force",
    name: "axesForce",
    icon: Dumbbell,
    color: "text-brand-blue bg-brand-blue/5 border-brand-blue/20",
    badgeBg: "bg-brand-blue/10 text-brand-blue",
    hoverColor: "hover:border-brand-blue/40 hover:bg-brand-blue/10",
    glow: "shadow-[0_0_15px_rgba(0,221,255,0.15)]",
    shortDesc: "axesForceShort",
    programs: [
      { titleKey: "programForce1Title", descKey: "programForce1Desc", promptKey: "programForce1Prompt", duration: "30-40 min", xp: "+15 XP" },
      { titleKey: "programForce2Title", descKey: "programForce2Desc", promptKey: "programForce2Prompt", duration: "5-10 min", xp: "+15 XP" },
      { titleKey: "programForce3Title", descKey: "programForce3Desc", promptKey: "programForce3Prompt", duration: "20 min", xp: "+15 XP" },
      { titleKey: "programForce4Title", descKey: "programForce4Desc", promptKey: "programForce4Prompt", duration: "15 min", xp: "+15 XP" },
    ],
  },
  {
    id: "cardio",
    name: "axesCardio",
    icon: Flame,
    color: "text-amber-400 bg-amber-400/5 border-amber-400/20",
    badgeBg: "bg-amber-400/10 text-amber-400",
    hoverColor: "hover:border-amber-400/40 hover:bg-amber-400/10",
    glow: "shadow-[0_0_15px_rgba(251,191,36,0.15)]",
    shortDesc: "axesCardioShort",
    programs: [
      { titleKey: "programCardio1Title", descKey: "programCardio1Desc", promptKey: "programCardio1Prompt", duration: "15 min", xp: "+15 XP" },
      { titleKey: "programCardio2Title", descKey: "programCardio2Desc", promptKey: "programCardio2Prompt", duration: "45 min", xp: "+15 XP" },
      { titleKey: "programCardio3Title", descKey: "programCardio3Desc", promptKey: "programCardio3Prompt", duration: "20 min", xp: "+15 XP" },
      { titleKey: "programCardio4Title", descKey: "programCardio4Desc", promptKey: "programCardio4Prompt", duration: "30 min", xp: "+15 XP" },
    ],
  },
  {
    id: "recup",
    name: "axesRecup",
    icon: Heart,
    color: "text-emerald-400 bg-emerald-400/5 border-emerald-400/20",
    badgeBg: "bg-emerald-400/10 text-emerald-400",
    hoverColor: "hover:border-emerald-400/40 hover:bg-emerald-400/10",
    glow: "shadow-[0_0_15px_rgba(52,211,153,0.15)]",
    shortDesc: "axesRecupShort",
    programs: [
      { titleKey: "programRecup1Title", descKey: "programRecup1Desc", promptKey: "programRecup1Prompt", duration: "10 min", xp: "+15 XP" },
      { titleKey: "programRecup2Title", descKey: "programRecup2Desc", promptKey: "programRecup2Prompt", duration: "15 min", xp: "+15 XP" },
      { titleKey: "programRecup3Title", descKey: "programRecup3Desc", promptKey: "programRecup3Prompt", duration: "5 min", xp: "+15 XP" },
      { titleKey: "programRecup4Title", descKey: "programRecup4Desc", promptKey: "programRecup4Prompt", duration: "5 min", xp: "+15 XP" },
    ],
  },
  {
    id: "nutrition",
    name: "axesNutrition",
    icon: Apple,
    color: "text-purple-400 bg-purple-400/5 border-purple-400/20",
    badgeBg: "bg-purple-400/10 text-purple-400",
    hoverColor: "hover:border-purple-400/40 hover:bg-purple-400/10",
    glow: "shadow-[0_0_15px_rgba(192,132,252,0.15)]",
    shortDesc: "axesNutritionShort",
    programs: [
      { titleKey: "programNutrition1Title", descKey: "programNutrition1Desc", promptKey: "programNutrition1Prompt", duration: "5 min", xp: "+15 XP" },
      { titleKey: "programNutrition2Title", descKey: "programNutrition2Desc", promptKey: "programNutrition2Prompt", duration: "5 min", xp: "+15 XP" },
      { titleKey: "programNutrition3Title", descKey: "programNutrition3Desc", promptKey: "programNutrition3Prompt", duration: "5 min", xp: "+15 XP" },
      { titleKey: "programNutrition4Title", descKey: "programNutrition4Desc", promptKey: "programNutrition4Prompt", duration: "8 min", xp: "+15 XP" },
    ],
  },
];

interface CoachPageProps {
  messages: Message[];
  coachTyping: boolean;
  coachInput: string;
  setCoachInput: (v: string) => void;
  sendToCoach: (msg: string) => void;
  coachSuggestions: CoachSuggestion[];
  chatBottomRef: React.RefObject<HTMLDivElement | null>;
  userName: string;
  savedPlans: SavedPlan[];
  setSavedPlans: React.Dispatch<React.SetStateAction<SavedPlan[]>>;
  planIdRef: React.MutableRefObject<number>;
}

export default function CoachPage({
  messages,
  coachTyping,
  coachInput,
  setCoachInput,
  sendToCoach,
  coachSuggestions,
  chatBottomRef,
  userName,
  savedPlans,
  setSavedPlans,
  planIdRef,
}: CoachPageProps) {
  const t = useTranslations("coach");
  const [activeSubTab, setActiveSubTab] = useState("coach-ia");
  const [activeAxisId, setActiveAxisId] = useState<HelpAxisId>("force");
  const [planToSave, setPlanToSave] = useState<{ text: string; fallbackCategory: string } | null>(null);
  const [savePlanTitle, setSavePlanTitle] = useState("");
  const [savePlanCategory, setSavePlanCategory] = useState("force");

  useEffect(() => {
    if (savedPlans.length === 0) {
      setSavedPlans([
        { id: "seed-1", category: "force", title: t("seedPlan1Title"), content: t("seedPlan1Content"), date: new Date().toLocaleDateString("fr-FR") },
        { id: "seed-2", category: "nutrition", title: t("seedPlan2Title"), content: t("seedPlan2Content"), date: new Date().toLocaleDateString("fr-FR") },
      ]);
    }
    // Safe: intentionally runs once on mount — setSavedPlans omitted from deps to prevent infinite re-renders
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const persistPlans = (updated: SavedPlan[]) => {
    setSavedPlans(updated);
  };

  const autoDetectCategory = (text: string): string => {
    const low = text.toLowerCase();
    if (low.includes("cardio") || low.includes("hiit") || low.includes("course")) return "cardio";
    if (low.includes("étirement") || low.includes("mobilité") || low.includes("respiration") || low.includes("récup")) return "recup";
    if (low.includes("manger") || low.includes("protéine") || low.includes("sommeil") || low.includes("nutrition")) return "nutrition";
    return "force";
  };

  const triggerSaveProposal = (text: string) => {
    const cat = autoDetectCategory(text);
    setPlanToSave({ text, fallbackCategory: cat });
    setSavePlanTitle(text.split(" ").slice(0, 5).join(" ") + "...");
    setSavePlanCategory(cat);
  };

  const handleConfirmSavePlan = () => {
    if (!planToSave || !savePlanTitle.trim()) {
      toast.error(t("toastValidTitle"));
      return;
    }
    const newPlan: SavedPlan = {
      id: `plan-${planIdRef.current++}`,
      category: savePlanCategory,
      title: savePlanTitle.trim(),
      content: planToSave.text,
      date: new Date().toLocaleDateString("fr-FR"),
    };
    persistPlans([newPlan, ...savedPlans]);
    setPlanToSave(null);
    const axis = HELP_AXES.find((a) => a.id === savePlanCategory);
    toast.success(t("toastPlanSaved", { axis: t(axis?.name ?? "axesForce") }));
  };

  const handleDeletePlan = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    persistPlans(savedPlans.filter((p) => p.id !== id));
    toast.info(t("toastPlanDeleted"));
  };

  const copyToClipboard = (txt: string) => {
    try { navigator.clipboard.writeText(txt); toast.success(t("toastTextCopied")); }
    catch { toast.error(t("toastCopyFailed")); }
  };

  const handleLaunchSavedPlan = (content: string) => {
    setActiveSubTab("coach-ia");
    sendToCoach("Rappelle-moi les détails de ce plan :\n" + content);
  };

  const activeAxis = (HELP_AXES.find((a) => a.id === activeAxisId) ?? HELP_AXES[0])!;
  const ActiveIcon = activeAxis.icon;

  return (
    <div className="space-y-6 text-left">

      {/* Save plan modal */}
      <SavePlanModal
        isOpen={!!planToSave}
        onClose={() => setPlanToSave(null)}
        planText={planToSave?.text ?? ""}
        title={savePlanTitle}
        setTitle={setSavePlanTitle}
        category={savePlanCategory}
        setCategory={setSavePlanCategory}
        axes={HELP_AXES}
        onConfirm={handleConfirmSavePlan}
      />

      {/* Sub-tab switcher */}
      <div className="bg-bg-card border border-border-card p-1.5 rounded-2xl flex flex-wrap gap-2 overflow-x-auto max-w-full custom-scrollbar z-10 select-none">
        <Button
          variant={activeSubTab === "coach-ia" ? "primary" : "secondary"}
          size="sm"
          onClick={() => setActiveSubTab("coach-ia")}
          className={cn(
            "gap-2 whitespace-nowrap",
            activeSubTab === "coach-ia"
              ? "bg-brand-blue shadow-brand"
              : "text-slate-400 hover:text-slate-200"
          )}
        >
          <MessageSquare className="h-4 w-4 shrink-0" />
          <span>{t("chatTab")}</span>
          <span className="text-[11px] px-2 py-0.5 bg-white/20 text-white font-mono font-bold rounded-full">{t("live")}</span>
        </Button>
        <div className="w-px bg-border-card my-1 ml-0.5" />
        {HELP_AXES.map((ax) => {
          const Icon = ax.icon;
          return (
            <Button
              key={ax.id}
              variant={activeSubTab === ax.id ? "primary" : "secondary"}
              size="sm"
              onClick={() => setActiveSubTab(ax.id)}
              className={cn(
                "gap-2 whitespace-nowrap",
                activeSubTab === ax.id ? `${ax.color} border border-border-card/80 bg-brand-blue/5` : "text-slate-400 hover:text-slate-200"
              )}
            >
              <Icon className="h-4 w-4 shrink-0 text-current" />
              <span>{t(ax.name)}</span>
              {savedPlans.filter((p) => p.category === ax.id).length > 0 && (
                <PillBadge variant="pill-tier-count" size="xs">
                  {savedPlans.filter((p) => p.category === ax.id).length}
                </PillBadge>
              )}
            </Button>
          );
        })}
      </div>

      {/* ── CHAT VIEW ──────────────────────────────────────────────────── */}
      {activeSubTab === "coach-ia" && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
          className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch min-h-[600px]"
        >
          {/* Chat column */}
          <div className="lg:col-span-7">
            <Card padding="lg" className="flex flex-col justify-between min-h-[560px] lg:h-[630px] lg:min-h-[630px] space-y-4">
              {/* Header */}
              <div className="flex items-center justify-between pb-3.5 border-b border-border-card/80">
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <div className="h-10 w-10 rounded-full bg-brand-blue flex items-center justify-center font-display font-black text-bg-dark shadow-brand">CA</div>
                    <div className="absolute bottom-0 right-0 h-3 w-3 bg-emerald-500 rounded-full border-2 border-bg-card" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="font-display font-extrabold text-white text-sm uppercase tracking-wide">{t("chatCoach")}</h3>
                      <PillBadge variant="pill-xp" size="xs">{t("online")}</PillBadge>
                    </div>
                    <p className="text-xs text-slate-400 font-medium">{t("assistant")}</p>
                  </div>
                </div>
                <span className="text-xs font-mono text-emerald-400 font-bold bg-emerald-500/10 px-2 py-1 rounded flex items-center gap-1">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-ping" />
                  {t("realTime")}
                </span>
              </div>

              {/* Messages */}
              <div className="flex-1 overflow-y-auto max-h-[420px] lg:max-h-[440px] pr-1.5 space-y-4 custom-scrollbar">
                <CoachIntro userName={userName} />
                {messages.map((m) => (
                  <ChatBubble
                    key={m.id}
                    text={m.text}
                    isUser={m.sender === "user"}
                    senderName={m.sender === "user" ? (userName.split(" ")[0] ?? userName) : t("chatCoach")}
                    onCopy={m.sender === "coach" ? () => copyToClipboard(m.text) : undefined}
                    onSave={m.sender === "coach" ? () => triggerSaveProposal(m.text) : undefined}
                  />
                ))}
                {coachTyping && (
                  <div className="flex flex-col items-start">
                    <div className="flex items-center gap-1.5 mb-1.5">
                      <div className="h-6 w-6 rounded bg-brand-blue flex items-center justify-center text-xs text-bg-dark font-bold">A</div>
                      <span className="text-xs text-slate-500 font-bold font-mono">{t("chatCoach")}</span>
                    </div>
                    <div className="p-3.5 bg-surface-raised text-slate-400 rounded-2xl rounded-tl-none border border-border-card">
                      <TypingIndicator />
                    </div>
                  </div>
                )}
                <div ref={chatBottomRef} />
              </div>

              {/* Input */}
              <div className="space-y-3 pt-2">
                <CoachSuggestions suggestions={coachSuggestions} onSelect={sendToCoach} />
                <ChatInput value={coachInput} onChange={setCoachInput} onSubmit={() => sendToCoach(coachInput)} />
              </div>
            </Card>
          </div>

          {/* Programs column */}
          <div className="lg:col-span-5">
            <Card padding="lg" className="flex flex-col justify-between min-h-[560px] lg:h-[630px] lg:min-h-[630px] space-y-4">
              <div className="space-y-4 flex-1 flex flex-col">
                <div className="pb-2 border-b border-border-card/80 flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <Sparkles className="h-4 w-4 text-amber-400" style={{ animation: "spin 6s linear infinite" }} />
                    <h4 className="font-display font-extrabold text-white text-xs uppercase tracking-wider">{t("recommendedPlans")}</h4>
                  </div>
                  <span className="text-xs font-bold text-slate-500 font-mono">{HELP_AXES.length} {t("categories")}</span>
                </div>

                <p className="text-xs text-slate-400 leading-relaxed font-semibold">
                  {t("axisInstruction")}
                </p>

                <div className="grid grid-cols-2 gap-2.5">
                  {HELP_AXES.map((ax) => {
                    const AxIcon = ax.icon;
                    return (
                      <Button
                        key={ax.id}
                        variant={activeAxisId === ax.id ? "primary" : "secondary"}
                        size="sm"
                        onClick={() => setActiveAxisId(ax.id)}
                        className={cn(
                          "p-3 border rounded-xl flex flex-col items-start gap-1 transition-all duration-300 text-left relative",
                          activeAxisId === ax.id
                            ? `${ax.color} border-current ${ax.glow} scale-[1.01]`
                            : "border-border-card bg-surface-raised text-slate-400 hover:text-slate-200"
                        )}
                      >
                        <div className="flex items-center justify-between w-full">
                          <div className="p-1.5 rounded-lg bg-surface-raised border border-border-card/60 flex items-center justify-center">
                            <AxIcon className="h-4 w-4" />
                          </div>
                        </div>
                          <h5 className="font-display font-bold text-xs sm:text-[11px] mt-1 text-slate-200 leading-tight">{t(ax.name)}</h5>
                      </Button>
                    );
                  })}
                </div>

                <div className="p-3.5 bg-surface-raised border border-border-card/80 rounded-xl flex items-center gap-3">
                  <div className={`p-1.5 rounded-lg border ${activeAxis.color}`}>
                    <ActiveIcon className="h-3.5 w-3.5" />
                  </div>
                  <div>
                    <p className="text-xs font-display font-bold text-white uppercase tracking-wider">{t(activeAxis.name)}</p>
                    <p className="text-xs text-slate-400 leading-tight mt-0.5">{t(activeAxis.shortDesc)}</p>
                  </div>
                </div>

                <div className="flex-1 overflow-y-auto max-h-[160px] lg:max-h-[190px] space-y-2 custom-scrollbar pr-1">
                  {activeAxis.programs.map((prog) => (
                    <Button
                      key={prog.titleKey}
                      variant="secondary"
                      size="sm"
                      onClick={() => sendToCoach(t(prog.promptKey))}
                      className="w-full text-left p-3 border hover:border-brand-blue/30 rounded-xl"
                    >
                      <div className="flex justify-between items-start gap-1 w-full">
                        <div>
                          <h6 className="text-xs font-bold text-slate-200 leading-snug">{t(prog.titleKey)}</h6>
                          <p className="text-xs text-slate-500 leading-tight mt-0.5 font-medium line-clamp-2">{t(prog.descKey)}</p>
                        </div>
                        <span className="text-[11px] font-mono text-slate-500 shrink-0">{prog.duration}</span>
                      </div>
                    </Button>
                  ))}
                </div>
              </div>

              <div className="p-3.5 bg-gradient-to-r from-[#112240] to-transparent border border-[#1d355c] rounded-xl flex items-center gap-3">
                <Sparkles className="h-4 w-4 text-amber-500" />
                <p className="text-xs text-slate-300 font-semibold">
                  {t("saveTip")}
                </p>
              </div>
            </Card>
          </div>
        </motion.div>
      )}

      {/* ── AXIS VIEWS ─────────────────────────────────────────────────── */}
      {activeSubTab !== "coach-ia" && (
        <motion.div
          initial={{ opacity: 0, scale: 0.99 }}
          animate={{ opacity: 1, scale: 1 }}
          className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch"
        >
          {/* Saved plans column */}
          <div className="lg:col-span-8">
            <Card padding="xl" className="flex flex-col justify-between min-h-[580px] space-y-6">
              <div className="space-y-6 flex-1 flex flex-col">
                {/* Axis header */}
                {(() => {
                  const axis = HELP_AXES.find((a) => a.id === activeSubTab);
                  if (!axis) return null;
                  const AxisIcon = axis.icon;
                  return (
                    <div className="pb-4 border-b border-border-card/80 flex items-center gap-3.5">
                      <div className={`p-2.5 rounded-xl border flex items-center justify-center ${axis.color}`}>
                        <AxisIcon className="h-5 w-5" />
                      </div>
                      <div>
                        <h3 className="font-display font-black text-white text-base uppercase tracking-tight">{t(axis.name)}</h3>
                        <p className="text-xs text-slate-400 font-medium">{t(axis.shortDesc)}</p>
                      </div>
                      <div className="ml-auto">
                        <PillBadge variant="pill-xp" size="sm">{t("axisStrategic")}</PillBadge>
                      </div>
                    </div>
                  );
                })()}

                {/* Saved plans */}
                <div className="space-y-4 flex-1 flex flex-col">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Bookmark className="h-4 w-4 text-brand-cyan fill-brand-cyan/20" />
                      <h4 className="text-xs font-display font-extrabold text-slate-200 uppercase tracking-widest">
                        {t("myPlans")} ({savedPlans.filter((p) => p.category === activeSubTab).length})
                      </h4>
                    </div>
                    <Button
                      variant="secondary"
                      size="sm"
                      onClick={() => triggerSaveProposal("--- Programme personnalisé ---\nFormat :\n- Exercice 1 : 4x10 reps\n- Exercice 2 : 3x12 reps")}
                      className="gap-1"
                    >
                      <Plus className="h-3 w-3" />
                      <span>{t("addPlan")}</span>
                    </Button>
                  </div>

                  <div className="flex-1 overflow-y-auto max-h-[360px] space-y-3.5 custom-scrollbar pr-1">
                    {savedPlans.filter((p) => p.category === activeSubTab).length === 0 ? (
                      <div className="p-8 bg-surface-raised border border-border-card/80 rounded-2xl flex flex-col items-center justify-center text-center space-y-3 mt-4">
                        <div className="p-3 bg-surface-overlay rounded-full border border-border-card text-slate-500">
                          <Bookmark className="h-6 w-6" />
                        </div>
                        <div className="max-w-md">
                          <p className="text-xs font-bold text-slate-300">{t("noPlanSaved")}</p>
                          <p className="text-[11px] text-slate-500 leading-relaxed mt-1.5">
                            {t("noPlanSavedTip")}
                          </p>
                        </div>
                        <Button variant="primary" size="sm" onClick={() => setActiveSubTab("coach-ia")}>
                          {t("goToChat")}
                        </Button>
                      </div>
                    ) : (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {savedPlans.filter((p) => p.category === activeSubTab).map((plan) => (
                          <Card key={plan.id} variant="elevated" padding="md" className="flex flex-col justify-between space-y-3 relative group">
                            <div className="space-y-1.5">
                              <div className="flex items-start justify-between">
                                <h5 className="text-xs font-black text-slate-100 uppercase tracking-wide group-hover:text-brand-blue transition-colors">{plan.title}</h5>
                                <span className="text-xs font-mono text-slate-500 shrink-0">{plan.date}</span>
                              </div>
                              <p className="text-[11px] text-slate-400 leading-relaxed font-mono whitespace-pre-wrap break-words line-clamp-5 max-h-[140px] overflow-y-auto custom-scrollbar p-2 bg-bg-dark rounded-lg border border-border-card/40">
                                {plan.content}
                              </p>
                            </div>
                            <div className="pt-2 border-t border-border-card/80 flex justify-between items-center gap-2">
                              <Button
                                variant="destructive"
                                size="icon-xs"
                                onClick={(e) => handleDeletePlan(plan.id, e)}
                                title={t("deletePlan")}
                              >
                                <Trash2 className="h-3.5 w-3.5" />
                              </Button>
                              <div className="flex items-center gap-1.5">
                                <Button variant="secondary" size="sm" onClick={() => copyToClipboard(plan.content)} className="text-xs">
                                  {t("copy")}
                                </Button>
                                <Button variant="primary" size="sm" onClick={() => handleLaunchSavedPlan(plan.content)} className="gap-0.5">
                                  <span>{t("lancer")}</span>
                                  <ChevronRight className="h-3 w-3" />
                                </Button>
                              </div>
                            </div>
                          </Card>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <div className="p-4 bg-brand-blue/5 border border-brand-blue/20 rounded-xl flex items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <Info className="h-4 w-4 text-brand-blue shrink-0" />
                  <p className="text-[11px] text-slate-300 font-semibold leading-relaxed">
                    {t("aiAccessible")}
                  </p>
                </div>
                <Button variant="secondary" size="sm" onClick={() => setActiveSubTab("coach-ia")} className="shrink-0">
                  {t("openChat")}
                </Button>
              </div>
            </Card>
          </div>

          {/* Programs sidebar */}
          <div className="lg:col-span-4">
            <Card padding="lg" className="flex flex-col justify-between min-h-[580px] space-y-4">
              <div className="space-y-4 flex-1 flex flex-col">
                <div className="pb-2 border-b border-border-card/80 flex items-center gap-2">
                  <Sparkles className="h-4 w-4 text-emerald-400" />
                  <h4 className="font-display font-black text-white text-xs uppercase tracking-wider">{t("officialPrograms")}</h4>
                </div>
                <p className="text-[11px] text-slate-400 font-medium leading-relaxed">
                  {t("launchScenario")}
                </p>
                <div className="space-y-3 flex-1 overflow-y-auto max-h-[380px] custom-scrollbar pr-1">
                  {(HELP_AXES.find((a) => a.id === activeSubTab)?.programs ?? []).map((prog) => (
                    <Card key={prog.titleKey} variant="elevated" padding="md" className="space-y-3 relative group">
                      <div className="space-y-1">
                        <h5 className="text-xs font-bold text-slate-100 leading-tight">{t(prog.titleKey)}</h5>
                        <p className="text-xs text-slate-400 leading-relaxed font-semibold">{t(prog.descKey)}</p>
                      </div>
                      <div className="pt-2 border-t border-border-card/60 flex items-center justify-between text-xs font-mono">
                        <span className="text-brand-blue bg-brand-blue/10 px-1.5 py-0.2 rounded font-mono font-bold">{prog.xp}</span>
                        <Button
                          variant="secondary"
                          size="sm"
                          onClick={() => { setActiveSubTab("coach-ia"); sendToCoach(t(prog.promptKey)); }}
                          className="gap-0.5"
                        >
                          <span>{t("lancer")}</span>
                          <ChevronRight className="h-3 w-3" />
                        </Button>
                      </div>
                    </Card>
                  ))}
                </div>
              </div>
              <div className="bg-gradient-to-tr from-[#120f26] to-bg-bg-dark border border-[#2b214d] p-3.5 rounded-xl text-xs text-indigo-300">
                <p className="font-bold text-slate-200">{t("performanceRule")}</p>
                <p className="text-xs text-slate-400 font-semibold mt-1 leading-snug">
                  {t("performanceTip")}
                </p>
              </div>
            </Card>
          </div>
        </motion.div>
      )}
    </div>
  );
}
