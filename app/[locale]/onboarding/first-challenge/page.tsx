"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

const TEMPLATES = [
  {
    id: "tpl_pompes",
    title: "30 Pompes",
    desc: "2 minutes pour faire 30 pompes",
    category: "Musculation",
    image: "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?auto=format&fit=crop&q=80&w=600",
  },
  {
    id: "tpl_gainage",
    title: "5 min de Gainage",
    desc: "Tiens 5 minutes de planche",
    category: "Gainage",
    image: "https://images.unsplash.com/photo-1541534741688-6078c6bfb5c5?auto=format&fit=crop&q=80&w=600",
  },
  {
    id: "tpl_course",
    title: "Course 2 km",
    desc: "Cours 2 kilomètres",
    category: "Endurance",
    image: "https://images.unsplash.com/photo-1476480862126-209bfaa8edc8?auto=format&fit=crop&q=80&w=600",
  },
];

export default function OnboardingFirstChallengePage() {
  const router = useRouter();
  const [selected, setSelected] = useState<string | null>(null);
  const [started, setStarted] = useState(false);

  const handleSelect = (id: string) => {
    setSelected(id);
    const tpl = TEMPLATES.find((t) => t.id === id);
    if (tpl) {
      const existing = JSON.parse(localStorage.getItem("fitness_duel_challenges") ?? "[]");
      const newChallenge = {
        id: `chal_onboarding_${crypto.randomUUID()}`,
        title: tpl.title,
        participants: 2,
        timeLeft: "3j 00h 00m",
        image: tpl.image,
        category: tpl.category,
      };
      localStorage.setItem("fitness_duel_challenges", JSON.stringify([newChallenge, ...existing]));
    }
  };

  const handleStart = () => {
    // award starting XP
    const currentXp = parseInt(localStorage.getItem("fitness_duel_xp") ?? "0");
    localStorage.setItem("fitness_duel_xp", String(currentXp + 50));
    localStorage.setItem("fitness_duel_onboarding_complete", "true");
    localStorage.setItem("fitness_duel_onboarding_step", "4");
    setStarted(true);
    setTimeout(() => router.push("/fr/app"), 100);
  };

  if (started) {
    return (
      <div className="min-h-screen bg-[#050911] text-sans flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">
            <div className="w-20 h-20 rounded-full bg-gradient-to-br from-blue-600 to-cyan-400 flex items-center justify-center mx-auto mb-6 shadow-[0_0_40px_rgba(0,102,255,0.4)] animate-pulse">
              <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="m14.5 12.5-8 8a2.119 2.119 0 1 1-3-3l8-8" />
                <path d="m16 16 6-6" />
                <path d="m8 8 6-6" />
                <path d="m9 7 8 8" />
                <path d="m21 11-8-8" />
              </svg>
            </div>
          </div>
          <h1 className="font-display text-3xl font-black text-white mb-2">Bienvenue !</h1>
          <p className="text-slate-400">Tu gagnes +50 XP de démarrage !</p>
        </div>
      </div>
    );
  }

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
                    step === 3
                      ? "bg-blue-600 text-white"
                      : "bg-green-600 text-white"
                  }`}
                >
                  {step}
                </div>
                {step < 3 && <div className="w-8 h-px bg-[#1b2333]" />}
              </div>
            ))}
          </div>
          <h1 className="font-display text-2xl font-bold text-white">Lance ton premier défi</h1>
          <p className="text-slate-400 text-sm mt-1">Choisis un défi de démarrage ou commence directement.</p>
        </div>

        {/* Templates */}
        <div className="space-y-3">
          {TEMPLATES.map((tpl) => (
            <button
              key={tpl.id}
              onClick={() => handleSelect(tpl.id)}
              className={`w-full p-4 rounded-xl border transition-all text-left flex items-center gap-4 ${
                selected === tpl.id
                  ? "border-blue-500 bg-blue-600/10 ring-1 ring-blue-500/30"
                  : "border-[#1b2333] bg-[#070b12] hover:border-slate-600"
              }`}
            >
              <div className="relative w-16 h-16 rounded-lg overflow-hidden shrink-0">
                <Image src={tpl.image} alt={tpl.title} fill className="object-cover" sizes="64px" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-white text-sm">{tpl.title}</p>
                <p className="text-xs text-slate-400 mt-0.5">{tpl.desc}</p>
                <span className="inline-block mt-1 text-[10px] px-2 py-0.5 rounded-full bg-blue-600/20 text-blue-400 font-medium">
                  {tpl.category}
                </span>
              </div>
              <div className={`w-5 h-5 rounded-full border-2 shrink-0 flex items-center justify-center transition-colors ${
                selected === tpl.id ? "border-blue-500 bg-blue-500" : "border-slate-600"
              }`}>
                {selected === tpl.id && (
                  <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                )}
              </div>
            </button>
          ))}
        </div>

        <div className="flex flex-col gap-3 mt-8">
          <button
            onClick={handleStart}
            className="w-full py-3.5 bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-bold rounded-xl hover:opacity-90 transition-opacity shadow-[0_0_20px_rgba(0,102,255,0.25)]"
          >
            {selected ? "C'est parti !" : "Commencer sans défi"}
          </button>
          <button
            onClick={() => handleStart()}
            className="w-full py-3.5 border border-[#1b2333] text-slate-400 font-medium rounded-xl hover:border-slate-600 hover:text-slate-300 transition-all text-sm"
          >
            Passer
          </button>
        </div>
      </div>
    </div>
  );
}
