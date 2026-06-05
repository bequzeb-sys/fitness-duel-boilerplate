"use client";

import { ReactNode } from "react";
import { UserProvider } from "@/contexts/UserContext";
import { ChallengeProvider } from "@/contexts/ChallengeContext";
import { FriendsProvider } from "@/contexts/FriendsContext";
import { ChatProvider } from "@/contexts/ChatContext";

export function AppProviders({ children }: { children: ReactNode }) {
  return (
    <UserProvider>
      <ChallengeProvider>
        <FriendsProvider>
          <ChatProvider>{children}</ChatProvider>
        </FriendsProvider>
      </ChallengeProvider>
    </UserProvider>
  );
}
