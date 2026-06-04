"use client";

import Image from "next/image";
import {
  Swords,
  Bell,
  Plus,
  Menu,
  ChevronDown,
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { useTranslations } from "next-intl";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/app/components/ui/dropdown-menu";
import { Button } from "@/app/components/ui/button";
import { Card } from "@/app/components/ui/card";
import { Icon } from "@/components/ui/icon";

interface HeaderProps {
  userName: string;
  userEmail: string;
  onOpenCreateChallenge: () => void;
  notificationsOpen: boolean;
  setNotificationsOpen: (v: boolean) => void;
  gainXp: (amount: number, reason: string) => void;
  addToast: (msg: string, type?: "success" | "error" | "info" | "xp") => void;
  setUserXp: React.Dispatch<React.SetStateAction<number>>;
  onMobileMenuOpen: () => void;
}

export default function Header({
  userName,
  userEmail,
  onOpenCreateChallenge,
  notificationsOpen,
  setNotificationsOpen,
  gainXp,
  addToast,
  setUserXp,
  onMobileMenuOpen,
}: HeaderProps) {
  const t = useTranslations("header");
  const tc = useTranslations("coach");
  const firstName = userName.split(" ")[0];
  const lastName = userName.split(" ")[1] ?? "";

  return (
    <header className="px-4 sm:px-8 py-4 border-b border-border-card/80 bg-bg-dark/90 backdrop-blur sticky top-0 z-[var(--z-sticky)] flex items-center justify-between gap-4">

      {/* Left: logo + title */}
      <div className="flex items-center gap-4">
        <div className="flex lg:hidden items-center gap-2.5">
          <Button
            variant="iconSmall"
            size="icon-sm"
            onClick={onMobileMenuOpen}
            aria-label={t("openMenu")}
          >
            <Icon icon={Menu} size="md" />
          </Button>
          <div
            className="p-2 bg-brand-blue rounded-lg shadow-brand flex items-center justify-center cursor-pointer"
            onClick={() => {}}
          >
            <Swords className="h-4 w-4 text-white" />
          </div>
          <span className="font-display font-extrabold text-xs tracking-tight text-white uppercase sm:inline hidden cursor-pointer">
            {t("fitnessDuel")}
          </span>
        </div>

        <div className="space-y-0.5">
          <div className="flex items-center gap-2">
            <h1 className="font-display font-extrabold text-xl sm:text-2xl text-white tracking-tight">
              {t("greeting", { name: firstName ?? userName })}
            </h1>
            <span>💪</span>
          </div>
          <p className="text-xs sm:text-sm text-slate-400 font-medium">{t("subtitle")}</p>
        </div>
      </div>

      {/* Right: actions */}
      <div className="flex items-center gap-3 sm:gap-4 shrink-0">
        {/* Create challenge */}
        <Button
          variant="primary"
          onClick={onOpenCreateChallenge}
          className="shrink-0 shadow-[0_0_15px_rgba(0,102,255,0.35)] hover:shadow-[0_0_20px_rgba(0,102,255,0.5)]"
        >
          <Icon icon={Plus} size="md" strokeWidth={2.5} />
          <span className="hidden sm:inline">{t("createChallenge")}</span>
        </Button>

        {/* Notifications */}
        <div className="relative">
          <Button
            variant="icon"
            size="icon-md"
            onClick={() => setNotificationsOpen(!notificationsOpen)}
            className="relative"
          >
            <Icon icon={Bell} size="lg" />
            <span className="absolute top-1.5 right-1.5 h-2 w-2 bg-red-500 rounded-full ring-2 ring-border-card animate-ping" />
            <span className="absolute top-1.5 right-1.5 h-2 w-2 bg-red-500 rounded-full ring-2 ring-border-card" />
          </Button>

          <AnimatePresence>
            {notificationsOpen && (
              <>
                <div className="fixed inset-0 z-[var(--z-overlay)]" onClick={() => setNotificationsOpen(false)} />
                <motion.div
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 10, scale: 0.95 }}
                  className="absolute right-0 mt-2.5 z-[var(--z-overlay)]"
                >
                  <Card padding="md" className="w-80 shadow-[0_10px_30px_rgba(0,0,0,0.5)] space-y-3">
                  <div className="flex justify-between items-center pb-2 border-b border-border-card/80">
                    <span className="text-xs font-bold text-slate-300 uppercase tracking-wider">{t("notifications", { count: 1 })}</span>
                    <Button variant="ghostText" size="sm" className="text-[10px]">{t("markAllRead")}</Button>
                  </div>
                  <div className="space-y-2.5">
                    <div className="p-2.5 rounded-lg bg-brand-blue/10 border border-brand-blue/20 flex gap-2.5 items-start">
                      <Swords className="h-4 w-4 text-brand-blue mt-0.5 shrink-0" />
                      <div>
                        <p className="text-xs text-slate-200">
                          <strong className="text-white font-semibold">Thomas</strong> {t("notifDefied", { user: "Thomas", challenge: "Pompes en 2 minutes" })}
                        </p>
                        <span className="text-[9px] text-slate-500 font-mono mt-0.5 block">{t("timeAgo", { hours: 2 })}</span>
                      </div>
                    </div>
                  </div>
                  </Card>
                </motion.div>
              </>
            )}
          </AnimatePresence>
        </div>

        {/* Profile dropdown */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button
              id="profile-dropdown-btn"
              className="flex items-center gap-2 p-1 pr-2 bg-bg-card hover:bg-hover-active rounded-xl border border-border-card transition-colors cursor-pointer text-left"
            >
              <div className="h-8 w-8 relative overflow-hidden rounded-lg border border-border-card shrink-0">
                <Image
                  src="https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?auto=format&fit=crop&q=80&w=150"
                  alt={userName}
                  fill
                  sizes="32px"
                  className="object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="hidden md:block">
                <p className="text-xs font-bold text-slate-200 leading-none">{firstName}</p>
                <p className="text-[9px] text-slate-500 font-sans tracking-wide leading-tight">{lastName}</p>
              </div>
              <ChevronDown className="h-4 w-4 text-slate-500" />
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <div className="px-4 py-3 border-b border-border-card">
              <p className="text-xs text-slate-500">{t("connectedAs")}</p>
              <p className="text-sm font-bold text-white mt-0.5">{userName}</p>
              <p className="text-[10px] text-slate-400 font-mono">{userEmail}</p>
            </div>
            <div className="p-2">
              <p className="text-[10px] font-bold text-slate-500 uppercase px-2 py-1 tracking-wider">{t("devSimulator")}</p>
              <DropdownMenuItem
                onSelect={() => { gainXp(100, tc("challengeCompleteReason")); }}
                className="flex items-center justify-between"
              >
                <span>{t("gainXp100")}</span>
                <span className="text-[10px] font-bold text-brand-blue">+100 XP</span>
              </DropdownMenuItem>
              <DropdownMenuItem
                onSelect={() => { gainXp(250, tc("weeklyWorkoutReason")); }}
                className="flex items-center justify-between"
              >
                <span>{t("gainXp250")}</span>
                <span className="text-[10px] font-bold text-brand-blue">+250 XP</span>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onSelect={() => { setUserXp(2150); addToast(t("resetXp", { amount: 2150 }), "info"); }}
                className="text-slate-500 text-[10px]"
              >
                {t("resetXp", { amount: 2150 })}
              </DropdownMenuItem>
            </div>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
