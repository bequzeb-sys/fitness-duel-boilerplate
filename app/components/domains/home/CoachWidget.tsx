"use client";

import { useRef, useEffect } from "react";
import { Send } from "lucide-react";
import { useTranslations } from "next-intl";
import { Card } from "@/app/components/ui/card";
import { Button } from "@/app/components/ui/button";
import { useChat } from "@/contexts/ChatContext";

interface CoachSuggestion {
  text: string;
  keyword: string;
}

interface CoachWidgetProps {
  coachSuggestions: CoachSuggestion[];
  onOpenFull: () => void;
  userName: string;
}

export function CoachWidget({ coachSuggestions, onOpenFull, userName }: CoachWidgetProps) {
  const t = useTranslations("coach");
  const { messages, coachTyping, coachInput, setCoachInput, sendMessage } = useChat();
  const chatBottomRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    chatBottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, coachTyping]);

  return (
    <Card padding="lg" className="flex flex-col justify-between min-h-[420px] sm:h-[390px] sm:min-h-[390px]">
      <div className="flex justify-between items-center pb-2 border-b border-border-card/60">
        <div className="flex items-center gap-2">
          <div className="h-2 w-2 bg-emerald-500 rounded-full animate-pulse" />
          <h3 className="font-display font-bold text-sm text-slate-200 uppercase tracking-wider">
            {t("chatCoach")}
          </h3>
          <span className="text-xs font-bold px-2 py-0.5 bg-brand-blue text-white rounded uppercase tracking-wider">
            {t("live")}
          </span>
        </div>
        <Button variant="secondary" size="sm" onClick={onOpenFull} className="gap-1.5">
          <span className="text-brand-cyan text-xs">{t("viewDetails")}</span>
        </Button>
      </div>

      <div className="flex-1 overflow-y-auto pr-1 space-y-3 custom-scrollbar">
        {messages.map((m) => (
          <div
            key={m.id}
            className={`flex flex-col ${m.sender === "user" ? "items-end" : "items-start"}`}
          >
            <div className="flex items-center gap-1.5 mb-1">
              {m.sender === "coach" && (
                <div className="h-5 w-5 rounded bg-brand-blue flex items-center justify-center text-xs text-white font-bold">
                  A
                </div>
              )}
              <span className="text-xs text-slate-500 font-semibold font-mono">
                {m.sender === "user" ? userName.split(" ")[0] : t("chatCoach")}
              </span>
            </div>
            <div
              className={`p-3 rounded-2xl text-xs max-w-[85%] leading-relaxed whitespace-pre-line ${
                m.sender === "user"
                  ? "bg-brand-blue text-white rounded-tr-none shadow-[0_4px_10px_rgba(0,102,255,0.25)]"
                  : "bg-surface-raised text-slate-200 rounded-tl-none border border-border-card"
              }`}
            >
              {m.text}
            </div>
          </div>
        ))}

        {coachTyping && (
          <div className="flex flex-col items-start">
            <div className="flex items-center gap-1.5 mb-1">
              <div className="h-5 w-5 rounded bg-brand-blue flex items-center justify-center text-xs text-white font-bold">
                A
              </div>
              <span className="text-xs text-slate-500 font-semibold font-mono">
                {t("chatCoach")}
              </span>
            </div>
            <div className="p-3 bg-surface-raised text-slate-400 rounded-2xl rounded-tl-none border border-border-card flex items-center gap-1">
              <span className="h-2 w-2 bg-slate-500 rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
              <span className="h-2 w-2 bg-slate-500 rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
              <span className="h-2 w-2 bg-slate-500 rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
            </div>
          </div>
        )}
        <div ref={chatBottomRef} />
      </div>

      <div className="flex gap-2.5 overflow-x-auto pb-1 max-w-full pt-2">
        {coachSuggestions.map((sug) => (
          <Button
            key={sug.keyword}
            variant="ghost"
            size="sm"
            onClick={() => sendMessage(sug.text, userName)}
            className="whitespace-nowrap gap-1 min-h-10"
          >
            {sug.text}
          </Button>
        ))}
      </div>

      <div className="flex items-center gap-2 bg-surface-input border border-border-card rounded-xl p-1 shrink-0">
        <input
          type="text"
          value={coachInput}
          onChange={(e) => setCoachInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") sendMessage(coachInput, userName);
          }}
          placeholder={t("writeMessage")}
          className="flex-1 bg-transparent px-3 py-2.5 text-sm text-white focus:outline-none placeholder-slate-500"
        />
        <Button
          variant="primary"
          size="icon-sm"
          onClick={() => sendMessage(coachInput, userName)}
          aria-label={t("sendAria")}
        >
          <Send className="h-3.5 w-3.5" />
        </Button>
      </div>
    </Card>
  );
}
