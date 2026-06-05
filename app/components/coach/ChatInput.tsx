"use client";

import { useTranslations } from "next-intl";
import { Send } from "lucide-react";
import { Button } from "@/app/components/ui/button";

interface ChatInputProps {
  value: string;
  onChange: (v: string) => void;
  onSubmit: () => void;
  placeholder?: string;
}

export function ChatInput({ value, onChange, onSubmit, placeholder }: ChatInputProps) {
  const t = useTranslations("coach");

  return (
    <div className="flex items-center gap-2 bg-surface-input border border-border-card rounded-xl p-1.5">
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") onSubmit();
        }}
        placeholder={placeholder ?? t("chatInputPlaceholder")}
        className="flex-1 bg-transparent px-3 py-2 text-xs sm:text-sm text-white focus:outline-none placeholder-slate-600 font-semibold"
      />
      <Button
        variant="primary"
        size="icon-sm"
        onClick={onSubmit}
        className="shrink-0 group"
        aria-label={t("sendAria")}
      >
        <Send className="h-4 w-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
      </Button>
    </div>
  );
}
