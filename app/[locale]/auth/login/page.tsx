"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !password.trim()) {
      setError("Veuillez remplir tous les champs.");
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError("Adresse email invalide.");
      return;
    }
    // localStorage-only auth: store email and check onboarding state
    localStorage.setItem("fitness_duel_logged_in", "true");
    localStorage.setItem("fitness_duel_user_email", email);

    const onboardingStep = localStorage.getItem("fitness_duel_onboarding_step");
    if (!onboardingStep || onboardingStep === "1") {
      router.push("/fr/onboarding/profile");
    } else {
      router.push("/fr/app");
    }
  };

  return (
    <div className="min-h-screen bg-[#050911] text-sans flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-3 mb-4">
            <div className="p-3 bg-brand-blue rounded-xl shadow-brand">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="m14.5 12.5-8 8a2.119 2.119 0 1 1-3-3l8-8" />
                <path d="m16 16 6-6" />
                <path d="m8 8 6-6" />
                <path d="m9 7 8 8" />
                <path d="m21 11-8-8" />
              </svg>
            </div>
            <span className="font-display text-2xl font-black text-white">Fitness Duel</span>
          </div>
          <h1 className="font-display text-2xl font-bold text-white">Connexion</h1>
          <p className="text-slate-400 text-sm mt-1">Accède à ton tableau de bord</p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          {error && (
            <div className="p-3 rounded-lg bg-rose-600/10 border border-rose-600/30 text-rose-400 text-sm">
              {error}
            </div>
          )}

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-slate-300 mb-2">
              Adresse email
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="alex@example.com"
              autoComplete="email"
              className="w-full px-4 py-3 rounded-xl bg-surface-input border border-[#2d343d] text-white placeholder-slate-600 focus:outline-none focus:border-brand-blue transition-colors"
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-slate-300 mb-2">
              Mot de passe
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Ton mot de passe"
              autoComplete="current-password"
              className="w-full px-4 py-3 rounded-xl bg-surface-input border border-[#2d343d] text-white placeholder-slate-600 focus:outline-none focus:border-brand-blue transition-colors"
            />
          </div>

          <button
            type="submit"
            className="w-full py-3.5 bg-brand-blue text-bg-dark font-bold rounded-xl hover:opacity-90 transition-opacity shadow-brand"
          >
            Se connecter
          </button>
        </form>

        <p className="text-center text-sm text-slate-500 mt-6">
          Pas encore de compte ?{" "}
          <Link href="/fr/auth/register" className="text-brand-blue hover:text-brand-blue/80 transition-colors font-medium">
            Créer un compte
          </Link>
        </p>
      </div>
    </div>
  );
}
