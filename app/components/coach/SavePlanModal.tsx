"use client";

import React from "react";
import { motion, AnimatePresence } from "motion/react";
import { useTranslations } from "next-intl";
import { Bookmark, X, Check } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/app/components/ui/button";

interface HelpAxis {
  id: string;
  name: string;
  icon: React.ComponentType<{ className?: string }>;
}

interface SavePlanModalProps {
  isOpen: boolean;
  onClose: () => void;
  planText: string;
  title: string;
  setTitle: (v: string) => void;
  category: string;
  setCategory: (v: string) => void;
  axes: HelpAxis[];
  onConfirm: () => void;
}

export function SavePlanModal({
  isOpen,
  onClose,
  planText,
  title,
  setTitle,
  category,
  setCategory,
  axes,
  onConfirm,
}: SavePlanModalProps) {
  const t = useTranslations("coach");

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 bg-bg-dark/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 15 }}
            className="bg-bg-card border border-border-card rounded-2xl w-full max-w-lg p-5 space-y-4 shadow-[0_15px_40px_rgba(0,0,0,0.6)]"
          >
            <div className="flex justify-between items-center pb-2 border-b border-border-card/80">
              <div className="flex items-center gap-2 text-indigo-400">
                <Bookmark className="h-4.5 w-4.5" />
                <h4 className="font-display font-bold text-sm uppercase text-slate-200 tracking-wide">{t("modalSaveTitle")}</h4>
              </div>
              <Button variant="ghost" size="icon-sm" onClick={onClose} className="text-slate-400 hover:text-white">
                <X className="h-4 w-4" />
              </Button>
            </div>

            <div className="space-y-1.5">
              <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest font-mono">{t("modalCustomTitle")}</label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder={t("modalTitlePlaceholder")}
                className="w-full bg-surface-input border border-border-card rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-slate-100 placeholder-slate-600 focus:outline-none focus:border-brand-blue transition-colors font-semibold"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest font-mono">{t("modalAxis")}</label>
              <div className="grid grid-cols-2 gap-2">
                {axes.map((ax) => {
                  const AxIcon = ax.icon;
                  return (
                    <Button
                      key={ax.id}
                      variant={category === ax.id ? "primary" : "secondary"}
                      size="sm"
                      onClick={() => setCategory(ax.id)}
                      className="justify-start"
                    >
                      <AxIcon className="h-3.5 w-3.5" />
                      <span>{t(ax.name)}</span>
                    </Button>
                  );
                })}
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest font-mono">{t("modalContent")}</label>
              <div className="bg-surface-input p-3 rounded-xl border border-border-card text-xs max-h-[120px] overflow-y-auto text-slate-300 font-mono whitespace-pre-wrap leading-relaxed custom-scrollbar">
                {planText}
              </div>
            </div>

            <div className="flex justify-end gap-2.5 pt-2 border-t border-border-card/80">
              <Button variant="ghost" size="sm" onClick={onClose}>
                {t("modalCancel")}
              </Button>
              <Button variant="primary" size="sm" onClick={onConfirm}>
                <Check className="h-3.5 w-3.5" />
                <span>{t("modalSave")}</span>
              </Button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
