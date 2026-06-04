# FitnessDuel — Refactor & Cleanup Guide

Use this skill when the user asks to refactor, clean up, or optimize existing code — or when you encounter code that violates the project's coding standards.

## When This Skill Activates

- "Refactor this"
- "Clean up the code"
- "Fix [issue]"
- Any code that contains hardcoded colors, magic numbers, inline `<button>`, or prop drilling

## Hardcoded Color → CSS Variable Mapping

| Found | Replace With |
|---|---|
| `bg-slate-900` | `bg-surface-raised` |
| `bg-slate-950/50` | `bg-bg-dark/50` |
| `bg-slate-800/40` | `bg-surface-overlay` |
| `border-slate-700/40` | `border-border-card` |
| `border-slate-700/60` | `border-border-card` |
| `text-slate-500` | semantic text class |
| `text-[#050911]` | `text-bg-dark` |
| `from-[#050911]` | `from-bg-dark` |
| `via-[#050911]/75` | `via-bg-dark/75` |
| `fill-blue-400/20` | `fill-brand-cyan/20` |
| `bg-blue-600` | `bg-brand-blue` |
| `bg-blue-600/10` | `bg-brand-blue/10` |

## Magic Number Extraction Workflow

1. Identify the magic number in context
2. Determine its semantic meaning (e.g., `2500` = `XP_PER_LEVEL`)
3. Check `lib/constants.ts` — if the constant exists, use it
4. If not, add it to `lib/constants.ts` with a descriptive name
5. Replace the magic number in the source file with the import

### Common Magic Numbers in This Project

```typescript
// lib/constants.ts
export const XP_PER_LEVEL = 2500
export const XP_THRESHOLD_LEVEL_2 = 1000
export const XP_THRESHOLD_LEVEL_3 = 2000
export const XP_LOG_WORKOUT_MULTIPLIER_BEAST = 2
export const XP_LOG_WORKOUT_MULTIPLIER_MEDIUM = 1.2
export const XP_CHALLENGE_COMPLETED = 75
export const XP_FRIEND_ADDED = 25
export const XP_CHALLENGE_CREATED = 50
export const XP_COACH_INTERACTION = 15
export const XP_STREAK_UPDATE = 10
export const CHALLENGE_MIN_PARTICIPANTS = 2
export const CHALLENGE_MAX_PARTICIPANTS = 100
export const DEFAULT_CHALLENGE_TIME = "3j 00h 00m"
```

## Prop Drilling → Context Workflow

1. Identify props that are passed through 3+ intermediate components
2. Determine which Context the data belongs to:
   - XP, streak, activities → `UserContext`
   - Challenges → `ChallengeContext`
   - Friends → `FriendsContext`
   - Chat messages → `ChatContext`
3. Move state into the Context using `useLocalStorage`
4. Consume via the matching `use*` hook in the leaf component
5. Remove the prop from all intermediate components

## Hook Usage Rules

### NEVER do these

```tsx
// WRONG: useState inside useEffect dependency array
useEffect(() => {
  doSomething(setState); // setState in deps causes infinite loop
}, [setState]);

// WRONG: hooks inside conditionals
if (condition) {
  const value = useHook(); // breaks Rules of Hooks
}

// WRONG: hooks inside handlers
const handleClick = () => {
  const value = useLocalStorage(...); // breaks Rules of Hooks
};

// WRONG: reading localStorage in useState initializer (causes SSR mismatch)
const [value, setValue] = useState(() => JSON.parse(localStorage.getItem(key))); // BAD

// CORRECT: useEffect sync pattern
const [value, setValue] = useState(initialValue);
const hasSynced = useRef(false);
useEffect(() => {
  if (hasSynced.current) return;
  hasSynced.current = true;
  setValue(readStorage(key, initialValue));
}, [key, initialValue]);
```

## React Query / useEffect Anti-Patterns

### Infinite re-render loop pattern (the bug to avoid)

The `useLocalStorage` bug in the original boilerplate code caused infinite re-renders:

```tsx
// WRONG: reads localStorage during SSR (hydration mismatch) AND causes re-render loops
const [value, setValue] = useState(() => {
  if (typeof window === "undefined") return initialValue;
  return JSON.parse(localStorage.getItem(key) ?? "null") ?? initialValue;
});
// useEffect that sets state on every render → infinite loop

// CORRECT: server renders with initialValue, client syncs once
const [value, setValue] = useState(initialValue); // server: initialValue
const hasSynced = useRef(false);
useEffect(() => {
  if (hasSynced.current) return; // guard: run only once
  hasSynced.current = true;
  setValue(readStorage(key, initialValue)); // client: sync from storage
}, [key, initialValue]);
```

## Refactoring Checklist

- [ ] No hardcoded colors (use semantic CSS variable classes)
- [ ] No magic numbers (extract to `lib/constants.ts`)
- [ ] No inline `<button>` (use `<Button>` from `@/app/components/ui/button`)
- [ ] No prop drilling beyond 2 levels
- [ ] Hooks not called conditionally or inside handlers
- [ ] `useLocalStorage` uses `hasSynced` ref pattern (not `useState` initializer)
- [ ] `forwardRef` + `displayName` on all exported components
- [ ] `npx tsc --noEmit` passes
- [ ] `npm run lint` passes (or documented exceptions)
