"use client";

import { Sparkle } from "lucide-react";
import { Button } from "@/app/components/ui/button";

interface Suggestion {
  text: string;
  keyword: string;
}

interface CoachSuggestionsProps {
  suggestions: Suggestion[];
  onSelect: (text: string) => void;
}

export function CoachSuggestions({ suggestions, onSelect }: CoachSuggestionsProps) {
  return (
    <div className="flex gap-2.5 overflow-x-auto pb-1.5 max-w-full custom-scrollbar">
      {suggestions.map((sug) => (
        <Button
          key={sug.keyword}
          variant="ghost"
          size="sm"
          onClick={() => onSelect(sug.text)}
          className="whitespace-nowrap gap-1"
        >
          <Sparkle className="h-2.5 w-2.5" />
          <span>{sug.text}</span>
        </Button>
      ))}
    </div>
  );
}
