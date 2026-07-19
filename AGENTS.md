# Agent Instructions — Barkhan Animated Site

For all UI and animation work, use the project-local Barkhan UI & Motion skill:

- Codex: `.codex/skills/barkhan-ui-motion/SKILL.md`
- Claude Code: `.claude/skills/barkhan-ui-motion/SKILL.md`

## Non-negotiable rules

- Mobile-first validation at 360–430 px.
- Use Motion for React for coordinated animation and gestures.
- Preserve reduced-motion accessibility.
- Keep the burger assembly scroll-driven, reversible, and smooth.
- Use the photorealistic assets in `src/assets/burger-real.ts`.
- Use shared animation presets from `src/motion/presets.ts`.
- Do not replace verified official order links with guessed URLs.
- Do not declare visual work complete without checking beginning, middle, final assembly, and menu states.

## Visual direction

Premium fast-food campaign, dark roasted environment, warm orange firelight, cream typography, high-contrast food imagery, restrained editorial composition, and minimal generic UI chrome.

## Deployment discipline

Batch related UI changes, then run one clean deployment and verify the public mobile experience before the next visual iteration.
