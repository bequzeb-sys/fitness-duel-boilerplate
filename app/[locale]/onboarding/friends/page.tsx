"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

const FRIEND_AVATARS = [
  "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=120",
  "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?auto=format&fit=crop&q=80&w=120",
  "https://images.unsplash.com/photo-1527980965255-d3b416303d12?auto=format&fit=crop&q=80&w=120",
];

export default function OnboardingFriendsPage() {
  const router = useRouter();
  const userName = localStorage.getItem("fitness_duel_user_name") ?? "Toi";
  const [inviteLink] = useState(`https://fitnessduel.app/invite/${userName.toUpperCase().replace(/\s+/g, "")}`);
  const [copied, setCopied] = useState(false);
  const [friendName, setFriendName] = useState("");
  const [addedFriends, setAddedFriends] = useState<string[]>([]);

  const handleCopy = () => {
    navigator.clipboard.writeText(inviteLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleAddFriend = () => {
    if (!friendName.trim()) return;
    if (addedFriends.some((f) => f.toLowerCase() === friendName.toLowerCase())) return;
    setAddedFriends((prev) => [...prev, friendName]);
    setFriendName("");
  };

  const handleContinue = () => {
    // add friends to localStorage if any
    if (addedFriends.length > 0) {
      const existing = JSON.parse(localStorage.getItem("fitness_duel_friends") ?? "[]");
      const newFriends = addedFriends.map((name, i) => ({
        name,
        status: "En ligne 🟢",
        score: 180,
        level: "Recrue",
        avatar: FRIEND_AVATARS[i % FRIEND_AVATARS.length]!,
      }));
      localStorage.setItem("fitness_duel_friends", JSON.stringify([...existing, ...newFriends]));
    }
    localStorage.setItem("fitness_duel_onboarding_step", "3");
    router.push("/fr/onboarding/first-challenge");
  };

  return (
    <div className="min-h-screen bg-bg-dark text-sans flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-lg">
        {/* Logo */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-3 mb-3">
            <div className="p-2.5 bg-brand-blue rounded-xl shadow-brand">
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
                    step === 2
                      ? "bg-brand-blue text-bg-dark"
                      : step < 2
                      ? "bg-green-600 text-white"
                      : "bg-[#2d343d] text-slate-500"
                  }`}
                >
                  {step}
                </div>
                {step < 3 && <div className="w-8 h-px bg-[#2d343d]" />}
              </div>
            ))}
          </div>
          <h1 className="font-display text-2xl font-bold text-white">Invite tes amis</h1>
          <p className="text-slate-400 text-sm mt-1">Défie tes proches pour rester motivé. Plus tu as d&apos;amis actifs, plus la compétition est amusante !</p>
        </div>

        <div className="space-y-6">
          {/* Invite link */}
          <div className="p-5 rounded-xl border border-[#2d343d] bg-surface-input">
            <p className="text-sm font-medium text-slate-300 mb-3">{"Ton lien d'invitation"}</p>
            <div className="flex gap-2">
              <input
                type="text"
                value={inviteLink}
                readOnly
                className="flex-1 px-4 py-2.5 rounded-lg bg-bg-dark border border-[#2d343d] text-slate-400 text-sm"
              />
              <button
                onClick={handleCopy}
                className="px-4 py-2.5 rounded-lg bg-brand-blue text-bg-dark text-sm font-medium hover:opacity-90 transition-colors shrink-0"
              >
                {copied ? "Copié !" : "Copier"}
              </button>
            </div>
            <p className="text-xs text-slate-500 mt-2">Tu gagnes 100 XP pour chaque ami qui s&apos;inscrit via ton lien.</p>
          </div>

          {/* Divider */}
          <div className="flex items-center gap-4">
            <div className="flex-1 h-px bg-[#2d343d]" />
            <span className="text-xs text-slate-600">ou</span>
            <div className="flex-1 h-px bg-[#2d343d]" />
          </div>

          {/* Add friend */}
          <div>
            <p className="text-sm font-medium text-slate-300 mb-3">Ajoute un ami par pseudo</p>
            <div className="flex gap-2">
              <input
                type="text"
                value={friendName}
                onChange={(e) => setFriendName(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleAddFriend()}
                placeholder="Pseudo (ex: Julien, Sarah)"
                className="flex-1 px-4 py-3 rounded-xl bg-surface-input border border-[#2d343d] text-white placeholder-slate-600 focus:outline-none focus:border-brand-blue transition-colors"
              />
              <button
                onClick={handleAddFriend}
                className="px-5 py-3 rounded-xl bg-brand-blue text-bg-dark text-sm font-medium hover:opacity-90 transition-colors shrink-0"
              >
                Ajouter
              </button>
            </div>
            {addedFriends.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-3">
                {addedFriends.map((f) => (
                  <span key={f} className="px-3 py-1 rounded-full bg-brand-blue/20 border border-brand-blue/30 text-brand-blue text-xs font-medium">
                    {f}
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="flex flex-col gap-3 mt-8">
          <button
            onClick={handleContinue}
            className="w-full py-3.5 bg-brand-blue text-bg-dark font-bold rounded-xl hover:opacity-90 transition-opacity shadow-brand"
          >
            Continuer
          </button>
          <button
            onClick={() => router.push("/fr/onboarding/first-challenge")}
            className="w-full py-3.5 border border-[#2d343d] text-slate-400 font-medium rounded-xl hover:border-slate-600 hover:text-slate-300 transition-all text-sm"
          >
            Passer cette étape
          </button>
        </div>
      </div>
    </div>
  );
}
