"use client";

import React from "react";
import { useTranslations } from "next-intl";
import { motion, AnimatePresence } from "motion/react";
import { Swords, X, AlertCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/app/components/ui/button";

interface CreateChallengeModalProps {
  isOpen: boolean;
  onClose: () => void;
  newTitle: string;
  setNewTitle: (v: string) => void;
  newCategory: string;
  setNewCategory: (v: string) => void;
  newParticipants: number;
  setNewParticipants: (v: number) => void;
  newTargetUser: string;
  setNewTargetUser: (v: string) => void;
  errors: { title?: string; participants?: string };
  setErrors: (e: { title?: string; participants?: string }) => void;
  onSubmit: (e: React.FormEvent) => void;
}

const CATEGORIES = ["Musculation", "Endurance", "Gainage", "Squats"];
const FRIENDS = ["Thomas", "Camille", "Lucas", "Chloé"];

export default function CreateChallengeModal({
  isOpen,
  onClose,
  newTitle,
  setNewTitle,
  newCategory,
  setNewCategory,
  newParticipants,
  setNewParticipants,
  newTargetUser,
  setNewTargetUser,
  errors,
  setErrors,
  onSubmit,
}: CreateChallengeModalProps) {
  const t = useTranslations("challenge");

  const clearError = (field: "title" | "participants") => {
    if (errors[field]) setErrors({ ...errors, [field]: undefined });
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-bg-dark/90 backdrop-blur-sm"
            onClick={onClose}
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="w-full max-w-lg bg-bg-card border border-border-card rounded-3xl p-6 relative z-10 space-y-6 shadow-[0_10px_30px_rgba(0,0,0,0.5)]"
          >
            {/* Header */}
            <div className="flex justify-between items-center pb-3 border-b border-border-card">
              <div className="flex items-center gap-2.5">
                <div className="p-2 bg-blue-600/10 border border-blue-500/20 text-blue-400 rounded-lg">
                  <Swords className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="font-display font-extrabold text-white text-base">{t("createTitle")}</h3>
                  <p className="text-xs text-slate-400">{t("createSubtitle")}</p>
                </div>
              </div>
              <Button variant="iconSmall" size="icon-sm" onClick={onClose}>
                <X className="h-4 w-4" />
              </Button>
            </div>

            <form noValidate onSubmit={onSubmit} className="space-y-4">
              {/* Title */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold uppercase tracking-wider text-slate-400 block">{t("challengeTitle")}</label>
                <input
                  type="text"
                  value={newTitle}
                  maxLength={100}
                  onChange={(e) => { setNewTitle(e.target.value); clearError("title"); }}
                  placeholder={t("titlePlaceholder")}
                  className={cn(
                    "w-full bg-surface-input border rounded-xl px-4 py-3 text-sm text-white focus:outline-none transition-all placeholder-slate-600 font-medium",
                    errors.title
                      ? "border-rose-500/80 focus:border-rose-500 shadow-[0_0_12px_rgba(244,63,94,0.15)] animate-shake"
                      : "border-border-card focus:border-blue-500"
                  )}
                />
                <AnimatePresence>
                  {errors.title && (
                    <motion.p
                      initial={{ opacity: 0, y: -4 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -4 }}
                      className="text-rose-400 font-sans font-semibold text-xs flex items-center gap-1.5 mt-1.5"
                    >
                      <AlertCircle className="h-4 w-4 shrink-0 text-rose-500" />
                      <span>{errors.title}</span>
                    </motion.p>
                  )}
                </AnimatePresence>
              </div>

              {/* Category + Participants */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold uppercase tracking-wider text-slate-400 block">{t("category")}</label>
                  <select
                    value={newCategory}
                    onChange={(e) => setNewCategory(e.target.value)}
                    className="w-full bg-surface-input border border-border-card rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-blue-500 font-medium cursor-pointer"
                  >
                    {CATEGORIES.map((cat) => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold uppercase tracking-wider text-slate-400 block">{t("participants")}</label>
                  <input
                    type="number"
                    value={newParticipants}
                    onChange={(e) => {
                      const val = Number(e.target.value);
                      setNewParticipants(val);
                      if (val >= 2 && val <= 100) clearError("participants");
                    }}
                    className={cn(
                      "w-full bg-surface-input border rounded-xl px-4 py-3 text-sm text-white focus:outline-none transition-all font-mono font-bold",
                      errors.participants
                        ? "border-rose-500/80 focus:border-rose-500 shadow-[0_0_12px_rgba(244,63,94,0.15)]"
                        : "border-border-card focus:border-blue-500"
                    )}
                  />
                  <AnimatePresence>
                    {errors.participants && (
                      <motion.p
                        initial={{ opacity: 0, y: -4 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -4 }}
                        className="text-rose-400 font-sans font-semibold text-xs flex items-center gap-1.5"
                      >
                        <AlertCircle className="h-4 w-4 shrink-0 text-rose-500" />
                        <span>{errors.participants}</span>
                      </motion.p>
                    )}
                  </AnimatePresence>
                </div>
              </div>

              {/* Target friend */}
              <div className="space-y-1.5 pt-1">
                <label className="text-xs font-semibold uppercase tracking-wider text-slate-400 block">{t("friendToChallenge")}</label>
                <div className="grid grid-cols-4 gap-2">
                  {FRIENDS.map((friend) => (
                    <Button
                      key={friend}
                      variant={newTargetUser === friend ? "primary" : "secondary"}
                      size="sm"
                      onClick={() => setNewTargetUser(friend)}
                    >
                      {friend}
                    </Button>
                  ))}
                </div>
              </div>

              {/* Actions */}
              <div className="pt-4 flex justify-end gap-3 border-t border-border-card/60">
                <Button variant="ghost" size="sm" onClick={onClose}>
                  {t("cancel")}
                </Button>
                <Button variant="primary" size="sm" onClick={onSubmit}>
                  <Swords className="h-4 w-4" />
                  <span>{t("launchDuel")}</span>
                </Button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
