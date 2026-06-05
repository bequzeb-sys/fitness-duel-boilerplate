"use client";

export function TypingIndicator() {
  return (
    <div role="status" aria-label="Coach is typing" className="flex items-center gap-1">
      <span aria-hidden="true" className="h-2 w-2 bg-slate-500 rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
      <span aria-hidden="true" className="h-2 w-2 bg-slate-500 rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
      <span aria-hidden="true" className="h-2 w-2 bg-slate-500 rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
    </div>
  );
}
