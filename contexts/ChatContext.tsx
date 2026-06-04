"use client";

import React, { createContext, useContext, useState, useCallback, ReactNode, useRef } from "react";

export interface Message {
  id: string;
  sender: "coach" | "user";
  text: string;
  timestamp: Date;
}

export interface SavedPlan {
  id: string;
  category: string;
  title: string;
  content: string;
  date: string;
}

interface ChatContextValue {
  messages: Message[];
  setMessages: React.Dispatch<React.SetStateAction<Message[]>>;
  coachTyping: boolean;
  setCoachTyping: React.Dispatch<React.SetStateAction<boolean>>;
  coachInput: string;
  setCoachInput: React.Dispatch<React.SetStateAction<string>>;
  savedPlans: SavedPlan[];
  setSavedPlans: React.Dispatch<React.SetStateAction<SavedPlan[]>>;
  planIdRef: React.MutableRefObject<number>;
  sendMessage: (text: string, userName: string) => Promise<void>;
}

const ChatContext = createContext<ChatContextValue | undefined>(undefined);

const DEFAULT_MESSAGES: Message[] = [
  {
    id: "m1",
    sender: "coach",
    text: "Salut Alex ! Je suis ton coach IA. Comment puis-je t'aider aujourd'hui ?",
    timestamp: new Date(),
  },
  {
    id: "m2",
    sender: "user",
    text: "Je veux améliorer mes pompes, tu as des conseils ? 💪",
    timestamp: new Date(),
  },
  {
    id: "m3",
    sender: "coach",
    text:
      "Bien sûr ! Voici mes conseils pour progresser :\n\n" +
      "• Garde le dos droit\n" +
      "• Descends jusqu'à 90°\n" +
      "• Expire en poussant\n" +
      "• Entraîne-toi 3x/semaine",
    timestamp: new Date(),
  },
];

export function ChatProvider({ children }: { children: ReactNode }) {
  const [messages, setMessages] = useState<Message[]>(DEFAULT_MESSAGES);
  const [coachTyping, setCoachTyping] = useState(false);
  const [coachInput, setCoachInput] = useState("");
  const [savedPlans, setSavedPlans] = useState<SavedPlan[]>([]);
  const msgIdRef = useRef(10);
  const planIdRef = useRef(0);

  const sendMessage = useCallback(
    async (text: string, userName: string) => {
      if (!text.trim()) return;
      const nextId = String(msgIdRef.current);
      msgIdRef.current += 2;
      const userMsg: Message = { id: `msg_${nextId}`, sender: "user", text, timestamp: new Date() };
      setMessages((prev) => [...prev, userMsg]);
      setCoachInput("");
      setCoachTyping(true);

      try {
        const resp = await fetch("/api/gemini", {
          method: "POST",
          headers: { "Content-Type": "application/json", "X-User-Name": userName },
          body: JSON.stringify({ message: text }),
        });
        const data = await resp.json();
        setCoachTyping(false);
        setMessages((prev) => [
          ...prev,
          {
            id: `msg_${nextId}_r`,
            sender: "coach",
            text: data.text ?? "Je suis un peu essoufflé, faisons une pause !",
            timestamp: new Date(),
          },
        ]);
      } catch {
        setCoachTyping(false);
        setMessages((prev) => [
          ...prev,
          {
            id: `msg_${nextId}_r`,
            sender: "coach",
            text: "Je n'ai pas pu recevoir ton message. Ajuste tes appuis et réessaie ! 💪",
            timestamp: new Date(),
          },
        ]);
      }
    },
    []
  );

  return (
    <ChatContext.Provider
      value={{
        messages,
        setMessages,
        coachTyping,
        setCoachTyping,
        coachInput,
        setCoachInput,
        savedPlans,
        setSavedPlans,
        planIdRef,
        sendMessage,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
}

export function useChat() {
  const ctx = useContext(ChatContext);
  if (!ctx) throw new Error("useChat must be used within ChatProvider");
  return ctx;
}
