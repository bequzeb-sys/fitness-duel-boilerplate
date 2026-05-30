"use client";

import { Settings, Heart } from "lucide-react";
import { motion } from "motion/react";
import { useTranslations } from "next-intl";
import { Progress } from "@/app/components/ui/progress";
import { Separator } from "@/app/components/ui/separator";
import { Button } from "@/app/components/ui/button";
import { Card } from "@/app/components/ui/card";
import { Avatar } from "@/app/components/ui/avatar";

interface ProfilPageProps {
  userName: string;
  userWeight: number;
  setUserWeight: (v: number) => void;
  userHeight: number;
  setUserHeight: (v: number) => void;
  userBio: string;
  setUserBio: (v: string) => void;
  userStatus: string;
  setUserStatus: (v: string) => void;
  dailyXpGoal: number;
  setDailyXpGoal: (v: number) => void;
  addToast: (msg: string, type?: "success" | "info" | "xp") => void;
}

const BMI_CATEGORIES = [
  { max: 18.5, key: "imcLow" },
  { max: 25,   key: "imcNormal" },
  { max: 30,   key: "imcOver" },
  { max: Infinity, key: "imcObese" },
] as const;

export default function ProfilPage({
  userName,
  userWeight,
  setUserWeight,
  userHeight,
  setUserHeight,
  userBio,
  setUserBio,
  userStatus,
  setUserStatus,
  dailyXpGoal,
  setDailyXpGoal,
  addToast,
}: ProfilPageProps) {
  const t = useTranslations("profil");

  const heightInMeters = userHeight / 100;
  const bmiScore = heightInMeters > 0 ? (userWeight / (heightInMeters * heightInMeters)).toFixed(1) : "0";

  const getBmiText = (scoreNum: number) => {
    const match = BMI_CATEGORIES.find(c => scoreNum < c.max);
    return t(match?.key ?? "imcObese");
  };

  const getBmiColor = (scoreNum: number) => {
    if (scoreNum < 18.5) return "text-amber-400";
    if (scoreNum < 25)   return "text-emerald-400";
    if (scoreNum < 30)   return "text-orange-400";
    return "text-red-400";
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -15 }}
      className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start text-left"
    >
      {/* Left Column Profile info & details form */}
      <div className="lg:col-span-8 space-y-6">

        {/* Avatar card setup */}
        <Card padding="xl" className="flex flex-col sm:flex-row items-center gap-5 justify-between">
          <div className="flex flex-col sm:flex-row items-center gap-4 text-center sm:text-left">
            <Avatar
              src="https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?auto=format&fit=crop&q=80&w=150"
              alt="avatar"
              size="2xl"
              shape="square"
              borderColor="border-blue-500"
              borderWidth="border-2"
              shadow="shadow-2xl"
            />
            <div className="space-y-1">
              <h3 className="font-display font-black text-white text-xl uppercase tracking-tight">{userName}</h3>
              <p className="text-xs text-slate-400 font-medium">{t("memberSince")}</p>

              <div className="flex items-center bg-surface-input border border-border-card px-3 py-1.5 rounded-xl gap-2 mt-2 self-start max-w-sm">
                <span className="text-[10px] text-emerald-400 animate-pulse">&#x25CF;</span>
                <input
                  type="text"
                  value={userStatus}
                  maxLength={50}
                  onChange={(e) => setUserStatus(e.target.value)}
                  className="bg-transparent text-xs text-slate-300 focus:outline-none placeholder-slate-600 font-medium w-full"
                  placeholder={t("statusPlaceholder")}
                />
              </div>
            </div>
          </div>

          <Button
            variant="primary"
            size="sm"
            onClick={() => addToast(t("statusSaved", { name: userName }), "success")}
          >
            {t("saveStatus")}
          </Button>
        </Card>

        {/* Body indices settings form (Height / Weight / daily target) */}
        <Card padding="xl" className="space-y-6">
          <div className="pb-2">
            <div className="flex items-center gap-2 mb-3">
              <Settings className="h-5 w-5 text-slate-400" />
              <h4 className="font-display font-extrabold text-white text-sm uppercase tracking-wider font-sans">{t("settingsTitle")}</h4>
            </div>
            <Separator />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="space-y-1.5">
              <label className="text-xs font-semibold uppercase tracking-wider text-slate-400">{t("weight")}</label>
              <input
                type="number"
                value={userWeight}
                onChange={(e) => setUserWeight(Number(e.target.value))}
                className="w-full bg-surface-input border border-border-card rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-blue-500 font-mono font-bold"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold uppercase tracking-wider text-slate-400 font-sans">{t("height")}</label>
              <input
                type="number"
                value={userHeight}
                onChange={(e) => setUserHeight(Number(e.target.value))}
                className="w-full bg-surface-input border border-border-card rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-blue-500 font-mono font-bold"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-1">
            <div className="space-y-1.5">
              <label className="text-xs font-semibold uppercase tracking-wider text-slate-400">{t("dailyGoal")}</label>
              <input
                type="number"
                value={dailyXpGoal}
                onChange={(e) => setDailyXpGoal(Number(e.target.value))}
                className="w-full bg-surface-input border border-border-card rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-blue-500 font-mono font-bold"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold uppercase tracking-wider text-slate-400 block font-sans">{t("bio")}</label>
              <textarea
                value={userBio}
                onChange={(e) => setUserBio(e.target.value)}
                maxLength={200}
                rows={2}
                className="w-full bg-surface-input border border-border-card rounded-xl px-3 py-2.5 text-xs text-slate-200 focus:outline-none focus:border-blue-500 font-sans"
              />
            </div>
          </div>

          {/* LIVE IMC CALCULATOR */}
          <div className="p-4 bg-gradient-to-r from-[#040c1a] to-bg-surface-input border border-border-card rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-brand-cyan/10 rounded-xl text-brand-cyan border border-brand-cyan/20 flex items-center justify-center">
                <Heart className="h-5 w-5 fill-brand-cyan/10 animate-pulse" />
              </div>
              <div>
                <p className="text-[10px] uppercase font-bold text-slate-400 font-mono">{t("imcTitle")}</p>
                <p className="text-xs text-slate-300 font-medium mt-0.5 font-sans">{t("imcSubtitle")}</p>
              </div>
            </div>

            <div className="flex items-center gap-4 text-right">
              <div>
                <span className="block text-[10px] text-slate-500 font-mono uppercase">{t("imcIndex")}</span>
                <span className="text-base font-mono font-black text-brand-cyan mt-0.5">{bmiScore}</span>
              </div>
              <div className="border-l border-border-card pl-4">
                <span className="block text-[10px] uppercase font-mono text-slate-500">{t("imcDiagnostic")}</span>
                <span className={`text-xs font-extrabold mt-0.5 ${getBmiColor(Number(bmiScore))}`}>
                  {getBmiText(Number(bmiScore))}
                </span>
              </div>
            </div>
          </div>

        </Card>
      </div>

      {/* Right Column */}
      <div className="lg:col-span-4 space-y-6">

        <Card variant="overlay" padding="lg" className="space-y-3">
          <div className="flex justify-between items-center text-xs font-bold text-slate-300 pb-1">
            <span>{t("activeHours")}</span>
            <span className="text-blue-400 font-mono font-bold">{t("hoursProgress", { hours: 14.5, total: 20 })}</span>
          </div>
          <Progress value={72.5} />
          <p className="text-[10px] text-slate-500 text-right">{t("weeklyReport")}</p>
        </Card>

      </div>
    </motion.div>
  );
}
