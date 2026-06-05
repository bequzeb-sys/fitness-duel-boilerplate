"use client";

import { useTranslations } from "next-intl";
import { Sparkles } from "lucide-react";
import { Card } from "@/app/components/ui/card";
import { toast } from "sonner";

interface CoachIntroProps {
  userName: string;
}

export function CoachIntro({ userName }: CoachIntroProps) {
  const t = useTranslations("coach");

  return (
    <div onClick={() => toast(t("coachIntroClicked"), { icon: "💡" })}>
      <Card padding="md" className="bg-brand-blue/5 border border-brand-blue/10 space-y-2 mb-2 cursor-pointer">
        <div className="flex items-center gap-1.5">
          <Sparkles className="h-4 w-4 text-brand-blue" />
          <span className="text-xs font-bold text-blue-300 uppercase tracking-wider">{t("proAdvisor")}</span>
        </div>
        <p className="text-xs text-slate-300 leading-relaxed font-medium">
          {t("introP1", { name: userName.split(" ")[0] ?? userName })}
        </p>
        <p className="text-[11px] text-slate-500">
          {t("introP2")}
        </p>
      </Card>
    </div>
  );
}
