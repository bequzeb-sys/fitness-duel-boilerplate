"use client";

import { useTranslations } from "next-intl";
import { Copy, Bookmark } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/app/components/ui/button";
import { Avatar } from "@/app/components/ui/avatar";

interface ChatBubbleProps {
  text: string;
  isUser: boolean;
  senderName: string;
  onCopy?: () => void;
  onSave?: () => void;
}

export function ChatBubble({ text, isUser, senderName, onCopy, onSave }: ChatBubbleProps) {
  const t = useTranslations("coach");

  return (
    <div className={cn("flex flex-col group", isUser ? "items-end" : "items-start")}>
      <div className="flex items-center gap-1.5 mb-1.5">
        {!isUser && (
          <Avatar
            size="xs"
            shape="circle"
            fallback="A"
            className="bg-blue-600 text-white font-bold text-[10px]"
          />
        )}
        <span className="text-[10px] text-slate-500 font-bold font-mono">{senderName}</span>
      </div>

      <div className="relative max-w-[85%]">
        <div
          className={cn(
            "p-4 rounded-2xl text-xs sm:text-sm leading-relaxed whitespace-pre-line",
            isUser
              ? "bg-blue-600 text-white rounded-tr-none shadow-[0_4px_12px_rgba(37,99,235,0.25)] font-medium"
              : "bg-surface-raised text-slate-200 rounded-tl-none border border-border-card"
          )}
        >
          {text}

          {!isUser && (
            <div className="mt-3.5 pt-2 border-t border-border-card/80 flex items-center justify-between gap-4">
              <span className="text-[9px] text-slate-500 font-medium italic">
                {t("chatBubbleTooltip")}
              </span>
              <div className="flex items-center gap-1.5">
                {onCopy && (
                  <Button
                    variant="iconSmall"
                    size="icon-xs"
                    onClick={onCopy}
                    title={t("copyPlan")}
                    className="text-slate-500 hover:text-white"
                  >
                    <Copy className="h-2.5 w-2.5" />
                  </Button>
                )}
                {onSave && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={onSave}
                    title={t("savePlan")}
                    className="text-blue-400 hover:text-white text-[9px]"
                  >
                    <Bookmark className="h-2.5 w-2.5 fill-current" />
                    <span>{t("save")}</span>
                  </Button>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
