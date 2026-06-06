# Fitness Frontend Workflow Reference

Detailed reference for the `fitness-frontend-workflow` skill.
Use this file when the task needs extra help deciding where code belongs, whether to reuse or extend shared UI, or how to structure a frontend refactor.

---

## Quick decision tree

### 1. Should this go in `components/ui`?
Put it in `components/ui` if most of these are true:
- the visual pattern will likely appear in more than one feature
- the component is mostly presentational
- the API can be expressed with reusable props and variants
- the same markup/styling would otherwise be copied across files
- the component represents a design-system building block or a repeatable composed block

Examples:
- new button variant
- reusable stats tile
- generic empty state
- badge/pill styles
- common content row pattern

### 2. Should this stay in a feature folder?
Keep it in `components/pages`, `components/coach`, `components/modals`, `components/sidebar`, `components/header`, or `components/tabs` if most of these are true:
- the UI is specific to one feature surface
- it depends on feature-specific props or domain logic
- the naming only makes sense in one screen or flow
- reuse is uncertain or unlikely
- extracting it to shared UI would create vague or overgeneralized props

Examples:
- challenge creation panel
- coach response cluster
- leaderboard podium section
- profile hero content block

### 3. Should this stay in the page container or a hook?
Keep logic outside low-level UI when:
- state is shared across sections
- the code manages side effects, persistence, or orchestration
- the component would become hard to test or reason about if rendering and state stay mixed

---

## Reuse vs extend vs local custom implementation

### Reuse an existing shared component when
- the visual and behavioral fit is already close
- only content changes
- only a small `className` adjustment is needed

### Extend a shared component when
- the pattern is clearly repeatable
- multiple screens already want the same variant
- the current component API is too narrow for a legitimate design-system need

### Keep it local when
- the pattern is unique to one screen
- extracting it would introduce too many feature-specific props
- the abstraction would be harder to understand than the local markup

Rule of thumb:
- one screen only -> local
- likely repeated -> shared
- already repeated -> shared now

---

## Preferred frontend workflow by task type

### Page rebuild
1. Read the full page/component tree involved.
2. Identify repeated sections, cards, actions, and content rows.
3. Replace repeated visual patterns with shared primitives first.
4. Extract feature-only subsections only when it improves clarity.
5. Keep shared state and orchestration in the page container or hooks.
6. Validate translations, semantic tokens, responsiveness, and interaction states.

### New component creation
1. Decide whether the component is shared or feature-specific.
2. Inspect existing `components/ui` for overlap before naming or building anything.
3. Prefer composition of existing primitives over inventing a new base primitive.
4. If adding a shared component, keep the prop API small and intentional.
5. Avoid adding props that only one caller needs unless reuse is imminent.

### UI refactor
1. Preserve behavior first; change structure second.
2. Replace duplicate styling with shared primitives or extracted local components.
3. Remove hardcoded text and visual tokens while refactoring.
4. Review mobile, hover, empty, disabled, and loading states before finishing.

---

## Shared UI checklist

Before introducing custom markup, check for:
- `Button`
- `Card`
- `Avatar`
- `Badge`, `PillBadge`, `TierBadge`
- `Icon`
- `Input`, `Textarea`, `Select`, `Switch`
- `Heading`, `Body`, `Label`, `Caption`
- `StatCard`
- `FriendRow`
- `ActivityItem`
- `FeatureCard`
- `EmptyState`
- `CtaBanner`
- `PageSkeleton`

If a task is mostly replacing inline buttons/cards/avatars/badges, read the `migrate-shared-ui` reference too.

---

## Anti-patterns to avoid

- creating a new shared component before checking whether an existing one can be composed
- pushing one-off feature markup into `components/ui`
- copying Tailwind class bundles between screens instead of reusing primitives
- hardcoding user-visible French strings in JSX
- using hardcoded visual tokens when semantic tokens already exist
- letting low-level UI primitives own feature orchestration state
- making a shared component API so flexible that it becomes a style dump

---

## Good prompt add-ons for frontend work

Use these phrases when you want stronger compliance from the agent:
- "Use the `fitness-frontend-workflow` skill for this task."
- "Prefer shared UI primitives before custom styling."
- "Decide explicitly whether each extracted piece belongs in `components/ui` or a feature folder."
- "Move visible text to translations and preserve semantic token usage."
- "Call out any place where a shared primitive should be extended instead of duplicated."

---

## Finish criteria

Frontend work is not done until:
- structure placement makes sense
- shared primitives were reused where appropriate
- visible strings were handled through translations
- hardcoded styling was reduced or removed
- mobile and interaction states still work
- typecheck/lint/dev validation is complete
