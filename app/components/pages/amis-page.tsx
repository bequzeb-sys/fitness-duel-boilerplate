"use client";

import React, { useState, useEffect } from "react";
import { Users, Search, MessageSquare, Swords, UserPlus, Plus, Trophy, AlertCircle } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { useTranslations } from "next-intl";
import {
  CommandDialog,
  CommandInput,
  CommandList,
  CommandEmpty,
  CommandGroup,
  CommandItem,
} from "@/app/components/ui/command";
import { Button } from "@/app/components/ui/button";
import { Card } from "@/app/components/ui/card";
import { Avatar } from "@/app/components/ui/avatar";
import { PillBadge } from "@/app/components/ui/badge";

interface Friend {
  name: string;
  score: number;
  level: string;
  status: string;
  avatar: string;
}

interface FriendsPageProps {
  friendsList: Friend[];
  setFriendsList: React.Dispatch<React.SetStateAction<Friend[]>>;
  gainXp: (amount: number, reason: string) => void;
  addToast: (msg: string, type?: "success" | "info" | "xp") => void;
  setNewTargetUser: (name: string) => void;
  setIsCreateChallengeOpen: (open: boolean) => void;
  setDirectMsgFriend: (friend: string | null) => void;
  inviteUrl: string;
  handleCopyLink: () => void;
  inviteCopied: boolean;
}

export default function AmisPage({
  friendsList,
  setFriendsList,
  gainXp,
  addToast,
  setNewTargetUser,
  setIsCreateChallengeOpen,
  setDirectMsgFriend,
  inviteUrl,
  handleCopyLink,
  inviteCopied
}: FriendsPageProps) {
  const t = useTranslations("friends");
  const [friendsSearchQuery, setFriendsSearchQuery] = useState("");
  const [newFriendName, setNewFriendName] = useState("");
  const [friendNameError, setFriendNameError] = useState("");
  const [commandOpen, setCommandOpen] = useState(false);

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setCommandOpen((open) => !open);
      }
    };
    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  const handleAddFriend = (e: React.FormEvent) => {
    e.preventDefault();

    if (!newFriendName.trim()) {
      setFriendNameError(t("nameRequired"));
      addToast("Oups ! Le nom de l'ami est requis.", "info");
      return;
    }

    setFriendNameError("");

    const friendExists = friendsList.some(f => f.name.toLowerCase() === newFriendName.toLowerCase());
    if (friendExists) {
      addToast(t("alreadyAdded", { name: newFriendName }), "info");
      return;
    }

    const randomAvatars = [
      "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=120",
      "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?auto=format&fit=crop&q=80&w=120",
      "https://images.unsplash.com/photo-1527980965255-d3b416303d12?auto=format&fit=crop&q=80&w=120"
    ];

    setFriendsList(prev => [...prev, {
      name: newFriendName,
      status: t("online"),
      score: 180,
      level: "Recrue",
      avatar: randomAvatars[Math.floor(Math.random() * randomAvatars.length)] ?? "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=120"
    }]);
    gainXp(25, `Ami "${newFriendName}" ajouté !`);
    setNewFriendName("");
  };

  const filteredFriends = friendsList.filter(f => f.name.toLowerCase().includes(friendsSearchQuery.toLowerCase()));

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -15 }}
      className="space-y-6 text-left"
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">

        {/* Left friends directory list details */}
        <div className="lg:col-span-8">
          <Card padding="lg" className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-display font-bold text-white text-sm uppercase tracking-wider">{t("title")}</h3>
                <p className="text-xs text-slate-400">{t("subtitle")}</p>
              </div>
              <PillBadge variant="pill-tier-count" size="sm">
                {friendsList.length} {t("connected")}
              </PillBadge>
            </div>

            {/* Command palette for friends search */}
            <button
              onClick={() => setCommandOpen(true)}
              className="flex bg-surface-input border border-border-card rounded-xl px-3 py-2 items-center gap-2 w-full hover:border-brand-blue/50 transition-colors text-left"
            >
              <Search className="h-4 w-4 text-slate-500" />
              <span className="text-sm text-slate-500">{t("searchPlaceholder")}</span>
              <span className="ml-auto text-xs text-slate-600 font-mono">Ctrl+K</span>
            </button>

            <CommandDialog open={commandOpen} onOpenChange={setCommandOpen}>
              <CommandInput
                placeholder={t("searchPlaceholder")}
                value={friendsSearchQuery}
                onValueChange={setFriendsSearchQuery}
              />
              <CommandList>
                <CommandEmpty>{t("searchEmpty")}</CommandEmpty>
                <CommandGroup heading={t("groupLabel")}>
                  {friendsList.map((friend) => (
                    <CommandItem
                      key={friend.name}
                      value={friend.name}
                      onSelect={() => {
                        setFriendsSearchQuery(friend.name);
                        setCommandOpen(false);
                      }}
                    >
                      <Users className="mr-2 h-4 w-4" />
                      {friend.name}
                    </CommandItem>
                  ))}
                </CommandGroup>
              </CommandList>
            </CommandDialog>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
              {filteredFriends.map((friend) => (
                <Card key={friend.name} variant="elevated" padding="md" className="flex flex-col justify-between">
                  <div className="flex gap-3 items-center">
                    <Avatar
                      src={friend.avatar}
                      alt={friend.name}
                      size="lg"
                      shape="square"
                      fallback={friend.name.slice(0, 2)}
                    />
                    <div>
                      <h4 className="text-sm font-bold text-white flex items-center gap-1.5">
                        {friend.name}
                        {friend.level === "Maitre" && <span className="text-[9px] font-extrabold px-1.5 py-0.2 bg-gradient-to-r from-amber-600 to-amber-400 text-white rounded">Elite</span>}
                      </h4>
                      <span className="text-[10px] text-slate-500 font-medium block mt-0.5">{friend.status}</span>
                    </div>
                  </div>

                  <div className="mt-4 pt-3 border-t border-border-card/80 flex justify-between items-center">
                    <span className="text-xs font-mono text-slate-400 font-semibold">{friend.score} {t("weeklyXp")}</span>

                    <div className="flex gap-2.5">
                      <Button
                        variant="iconSmall"
                        size="icon-sm"
                        onClick={() => setDirectMsgFriend(friend.name)}
                        title={t("sendMessage")}
                      >
                        <MessageSquare className="h-3.5 w-3.5" />
                      </Button>

                      <Button
                        variant="primary"
                        size="sm"
                        onClick={() => {
                          setNewTargetUser(friend.name);
                          setIsCreateChallengeOpen(true);
                        }}
                      >
                        <Swords className="h-3 w-3" />
                        <span>{t("challenge")}</span>
                      </Button>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </Card>
        </div>

        {/* Right Column: Invite / Add Friend widget panels */}
        <div className="lg:col-span-4 space-y-6">
          <Card padding="lg" className="space-y-4">
            <div className="flex items-center gap-2">
              <UserPlus className="h-5 w-5 text-brand-blue" />
              <h4 className="font-display font-extrabold text-white text-sm uppercase tracking-wider font-sans">{t("addTitle")}</h4>
            </div>

            <form noValidate onSubmit={handleAddFriend} className="space-y-3">
              <p className="text-xs text-slate-400 font-medium leading-relaxed">
                {t("addDescription")}
              </p>
              <input
                type="text"
                value={newFriendName}
                maxLength={30}
                onChange={(e) => {
                  setNewFriendName(e.target.value);
                  if (e.target.value.trim() && friendNameError) {
                    setFriendNameError("");
                  }
                }}
                placeholder={t("placeholder")}
                className={`w-full bg-surface-input border rounded-xl px-3 py-2 text-xs text-white focus:outline-none transition-all placeholder-slate-600 font-medium ${
                  friendNameError
                    ? "border-rose-500/80 focus:border-rose-500 shadow-[0_0_10px_rgba(244,63,94,0.12)]"
                    : "border-border-card focus:border-brand-blue"
                }`}
              />
              <AnimatePresence>
                {friendNameError && (
                  <motion.p
                    initial={{ opacity: 0, y: -4 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -4 }}
                    className="text-rose-400 font-sans font-semibold text-[11px] flex items-center gap-1 mt-1"
                  >
                    <AlertCircle className="h-3.5 w-3.5 shrink-0 text-rose-500" />
                    <span>{friendNameError}</span>
                  </motion.p>
                )}
              </AnimatePresence>
              <Button variant="ghost" size="sm" type="submit" className="w-full">
                <Plus className="h-3.5 w-3.5" />
                <span>{t("addBtn")}</span>
              </Button>
            </form>
          </Card>

          <Card padding="lg" className="space-y-4">
            <div>
              <h3 className="font-display font-bold text-xs text-slate-200 uppercase tracking-wider">{t("referralTitle")}</h3>
            </div>

            <div className="space-y-3">
              <p className="text-xs text-slate-300 leading-relaxed font-medium">
                {t("referralDesc", { xp: 100 })}
              </p>

              <div className="flex bg-surface-input border border-border-card rounded-xl p-1 items-center justify-between">
                <span className="text-xs font-mono text-slate-300 px-3 truncate max-w-[140px]">{inviteUrl}</span>
                <Button
                  variant={inviteCopied ? "primary" : "ghost"}
                  size="sm"
                  onClick={handleCopyLink}
                  className="shrink-0"
                >
                  <span className="text-xs font-bold">{inviteCopied ? t("copied") : t("copy")}</span>
                </Button>
              </div>
            </div>
          </Card>

          <Card variant="overlay" padding="lg" className="text-center space-y-3">
            <Trophy className="h-8 w-8 text-amber-500 mx-auto fill-amber-500/10" />
            <div>
              <h4 className="text-xs font-bold text-slate-200">{t("bonusTitle")}</h4>
              <p className="text-[11px] text-slate-500 mt-1 max-w-sm mx-auto leading-relaxed">
                {t("bonusDesc")}
              </p>
            </div>
          </Card>
        </div>

      </div>
    </motion.div>
  );
}
