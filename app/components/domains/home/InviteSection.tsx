"use client";

import { Copy, Check, Share2 } from "lucide-react";
import { useState } from "react";
import { useTranslations } from "next-intl";
import { Card } from "@/app/components/ui/card";
import { Button } from "@/app/components/ui/button";
import { Icon } from "@/components/ui/icon";

type SocialShare = {
  name: string;
  color: string;
  link?: string;
  action?: true;
};

const SOCIAL_SHARES: SocialShare[] = [
  {
    name: "WhatsApp",
    color: "bg-[#25D366]/10 text-[#25D366] hover:bg-[#25D366]/20 border-[#25D366]/30",
    link: "https://whatsapp.com",
  },
  {
    name: "Instagram",
    color: "bg-[#E1306C]/10 text-[#E1306C] hover:bg-[#E1306C]/20 border-[#E1306C]/30",
    link: "https://instagram.com",
  },
  {
    name: "Facebook",
    color: "bg-[#1877F2]/10 text-[#1877F2] hover:bg-[#1877F2]/20 border-[#1877F2]/30",
    link: "https://facebook.com",
  },
  {
    name: "Plus",
    color: "bg-brand-blue/10 text-brand-blue hover:bg-brand-blue/20 border-brand-blue/30",
    action: true,
  },
];

interface InviteSectionProps {
  inviteUrl: string;
  onCopyLink: () => void;
  onShare: (network: string) => void;
}

export function InviteSection({ inviteUrl, onCopyLink, onShare }: InviteSectionProps) {
  const t = useTranslations("home");
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    onCopyLink();
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <Card padding="lg" className="space-y-4">
      <div className="pb-1">
        <h3 className="font-display font-bold text-sm text-slate-200 uppercase tracking-wider">
          {t("inviteFriends")}
        </h3>
      </div>

      <div className="space-y-3">
        <p className="text-xs text-slate-300 leading-relaxed font-medium">
          {t("inviteDescFull")}
        </p>

        <div className="flex bg-surface-input border border-border-card rounded-xl p-1 items-center justify-between">
          <span className="text-xs font-mono text-slate-300 px-3 truncate">{inviteUrl}</span>
          <Button
            variant={copied ? "primary" : "ghost"}
            size="sm"
            onClick={handleCopy}
            className="shrink-0"
          >
            {copied ? (
              <Icon icon={Check} size="sm" strokeWidth={3.5} />
            ) : (
              <Icon icon={Copy} size="sm" />
            )}
          </Button>
        </div>

        <div className="space-y-2 pt-2">
          <p className="text-xs text-slate-500 font-semibold uppercase tracking-wider">
            {t("shareOrCopy")}
          </p>

          <div className="grid grid-cols-4 gap-2.5">
            {SOCIAL_SHARES.map((net) => (
              <Button
                key={net.name}
                variant="social"
                size="sm"
                onClick={() => {
                  if (net.action) {
                    if (navigator.share) {
                      navigator.share({ title: "Fitness Duel", text: "Join me on Fitness Duel !", url: "" });
                    } else {
                      handleCopy();
                    }
                  } else {
                    onShare(net.name);
                  }
                }}
                className={`min-h-11 p-2.5 border rounded-xl flex flex-col items-center justify-center gap-1.5 text-xs font-bold hover:scale-[1.03] active:scale-95 ${net.color}`}
              >
                <Share2 className="h-4 w-4" />
                <span>{net.name}</span>
              </Button>
            ))}
          </div>
        </div>
      </div>
    </Card>
  );
}
