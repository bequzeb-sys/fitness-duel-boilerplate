"use client";

import { useState, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useTranslations } from "next-intl";
import Image from "next/image";

interface OnboardingProfileData {
  avatar: string;
  name: string;
  goal: string;
  level: string;
  weight: string;
  height: string;
}

export default function OnboardingProfilePage() {
  const router = useRouter();
  const t = useTranslations("onboarding");
  const pathname = usePathname();
  const locale = pathname.split("/")[1] ?? "fr";

  const AVATARS = [
    "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?auto=format&fit=crop&q=80&w=120",
    "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=120",
    "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?auto=format&fit=crop&q=80&w=120",
    "https://images.unsplash.com/photo-1527980965255-d3b416303d12?auto=format&fit=crop&q=80&w=120",
    "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=120",
    "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=120",
  ];

  const GOALS = [
    { value: "muscle", labelKey: t("goalMuscle") },
    { value: "weight", labelKey: t("goalWeight") },
    { value: "endurance", labelKey: t("goalEndurance") },
    { value: "maintenance", labelKey: t("goalMaintenance") },
  ];

  const LEVELS = [
    { value: "debutant", labelKey: t("levelBeginner") },
    { value: "intermediaire", labelKey: t("levelIntermediate") },
    { value: "avance", labelKey: t("levelAdvanced") },
  ];

  const [profile, setProfile] = useState<OnboardingProfileData>({
    avatar: AVATARS[0]!,
    name: "",
    goal: "",
    level: "",
    weight: "",
    height: "",
  });

  useEffect(() => {
    setProfile((p) => ({ ...p, name: localStorage.getItem("fitness_duel_user_name") ?? "" }));
  }, []);

  const saveProfile = () => {
    localStorage.setItem("fitness_duel_onboarding_profile", JSON.stringify(profile));
    localStorage.setItem("fitness_duel_user_name", profile.name);
    localStorage.setItem("fitness_duel_onboarding_step", "2");
    // sync weight/height for the profile page
    if (profile.weight) localStorage.setItem("fitness_duel_user_weight", profile.weight);
    if (profile.height) localStorage.setItem("fitness_duel_user_height", profile.height);
    router.push(`/${locale}/onboarding/friends`);
  };

  const canContinue = profile.name.trim().length > 0;

  return (
    <div className="min-h-screen bg-[#050911] text-sans flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-lg">
        {/* Logo */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-3 mb-3">
            <div className="p-2.5 bg-gradient-to-br from-blue-600 to-cyan-400 rounded-xl shadow-[0_0_20px_rgba(0,102,255,0.4)]">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="m14.5 12.5-8 8a2.119 2.119 0 1 1-3-3l8-8" />
                <path d="m16 16 6-6" />
                <path d="m8 8 6-6" />
                <path d="m9 7 8 8" />
                <path d="m21 11-8-8" />
              </svg>
            </div>
            <span className="font-display text-xl font-black text-white">Fitness Duel</span>
          </div>
          {/* Step indicator */}
          <div className="flex items-center justify-center gap-2 mb-6">
            {[1, 2, 3].map((step) => (
              <div key={step} className="flex items-center gap-2">
                <div
                  className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold transition-colors ${
                    step === 1
                      ? "bg-blue-600 text-white"
                      : "bg-[#1b2333] text-slate-500"
                  }`}
                >
                  {step}
                </div>
                {step < 3 && (
                  <div className="w-8 h-px bg-[#1b2333]" />
                )}
              </div>
            ))}
          </div>
          <h1 className="font-display text-2xl font-bold text-white">{t("configureTitle")}</h1>
          <p className="text-slate-400 text-sm mt-1">{t("configureSubtitle")}</p>
        </div>

        <div className="space-y-6">
          {/* Avatar */}
          <div>
            <p className="block text-sm font-medium text-slate-300 mb-3">{t("chooseAvatar")}</p>
            <div className="flex gap-3 flex-wrap">
              {AVATARS.map((avatar) => (
                <button
                  key={avatar}
                  onClick={() => setProfile((p) => ({ ...p, avatar }))}
                  className={`relative rounded-full overflow-hidden border-2 transition-all w-14 h-14 shrink-0 ${
                    profile.avatar === avatar
                      ? "border-blue-500 ring-2 ring-blue-500/30"
                      : "border-[#1b2333] hover:border-slate-600"
                  }`}
                >
                  <Image src={avatar} alt="avatar" width={56} height={56} className="object-cover" />
                </button>
              ))}
            </div>
          </div>

          {/* Name */}
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-slate-300 mb-2">
              {t("usernameLabel")} <span className="text-rose-400">*</span>
            </label>
            <input
              id="name"
              type="text"
              value={profile.name}
              onChange={(e) => setProfile((p) => ({ ...p, name: e.target.value }))}
              placeholder={t("usernamePlaceholder")}
              maxLength={30}
              className="w-full px-4 py-3 rounded-xl bg-[#070b12] border border-[#1b2333] text-white placeholder-slate-600 focus:outline-none focus:border-blue-500 transition-colors"
            />
          </div>

          {/* Goal */}
          <div>
            <p className="block text-sm font-medium text-slate-300 mb-2">{t("goalLabel")}</p>
            <div className="grid grid-cols-2 gap-2">
              {GOALS.map((g) => (
                <button
                  key={g.value}
                  onClick={() => setProfile((p) => ({ ...p, goal: g.value }))}
                  className={`px-4 py-2.5 rounded-xl border text-sm font-medium transition-all ${
                    profile.goal === g.value
                      ? "border-blue-500 bg-blue-600/20 text-blue-400"
                      : "border-[#1b2333] text-slate-400 hover:border-slate-600"
                  }`}
                >
                  {g.labelKey}
                </button>
              ))}
            </div>
          </div>

          {/* Level */}
          <div>
            <p className="block text-sm font-medium text-slate-300 mb-2">{t("levelLabel")}</p>
            <div className="grid grid-cols-3 gap-2">
              {LEVELS.map((l) => (
                <button
                  key={l.value}
                  onClick={() => setProfile((p) => ({ ...p, level: l.value }))}
                  className={`px-3 py-2.5 rounded-xl border text-sm font-medium transition-all ${
                    profile.level === l.value
                      ? "border-blue-500 bg-blue-600/20 text-blue-400"
                      : "border-[#1b2333] text-slate-400 hover:border-slate-600"
                  }`}
                >
                  {l.labelKey}
                </button>
              ))}
            </div>
          </div>

          {/* Weight / Height */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="weight" className="block text-sm font-medium text-slate-300 mb-2">{t("weightLabel")}</label>
              <input
                id="weight"
                type="number"
                value={profile.weight}
                onChange={(e) => setProfile((p) => ({ ...p, weight: e.target.value }))}
                placeholder={t("weightPlaceholder")}
                min="30"
                max="300"
                className="w-full px-4 py-3 rounded-xl bg-[#070b12] border border-[#1b2333] text-white placeholder-slate-600 focus:outline-none focus:border-blue-500 transition-colors"
              />
            </div>
            <div>
              <label htmlFor="height" className="block text-sm font-medium text-slate-300 mb-2">{t("heightLabel")}</label>
              <input
                id="height"
                type="number"
                value={profile.height}
                onChange={(e) => setProfile((p) => ({ ...p, height: e.target.value }))}
                placeholder={t("heightPlaceholder")}
                min="100"
                max="250"
                className="w-full px-4 py-3 rounded-xl bg-[#070b12] border border-[#1b2333] text-white placeholder-slate-600 focus:outline-none focus:border-blue-500 transition-colors"
              />
            </div>
          </div>
        </div>

        <button
          onClick={saveProfile}
          disabled={!canContinue}
          className={`w-full mt-8 py-3.5 font-bold rounded-xl transition-all ${
            canContinue
              ? "bg-gradient-to-r from-blue-600 to-cyan-500 text-white shadow-[0_0_20px_rgba(0,102,255,0.25)] hover:opacity-90"
              : "bg-[#1b2333] text-slate-600 cursor-not-allowed"
          }`}
        >
          {t("continueToFriends")}
        </button>
      </div>
    </div>
  );
}
