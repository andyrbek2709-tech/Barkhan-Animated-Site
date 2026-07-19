# Barkhan UI & Motion Skill

Activate this skill for every UI, UX, responsive-layout, animation, or visual-review task in this repository.

## Product intent

Barkhan is a premium, cinematic burger experience for Aktau. The interface must feel appetizing, tactile, fast, and confident — never like a generic template.

## Required workflow

1. Inspect the current component, relevant CSS, and assets before editing.
2. State the user-visible problem and intended improvement.
3. Design mobile-first for widths 360–430 px, then validate tablet and desktop.
4. Preserve the Barkhan visual language: dark roasted background, warm orange accent, cream typography, food photography, generous negative space.
5. Prefer the current lightweight scroll system and CSS for production changes. Test any new animation library in an isolated branch before merging.
6. Animate `transform` and `opacity` by default. Avoid continuous animation of layout properties.
7. Respect `prefers-reduced-motion`.
8. Keep the main CTA visible, thumb-accessible, and linked to the current official order URL.
9. Test clipping, overflow, text collision, safe-area spacing, and tap-target size.
10. Review beginning, middle, and end screenshots of the scroll story before declaring completion.

## Motion principles

- Ingredient landings use short controlled overshoot.
- Scroll-driven assembly is deterministic and reversible.
- Product-card reveals remain subtle.
- Hover and press interactions stay restrained.
- New animation libraries must pass an isolated Railway build before production merge.

## Quality gates

- No placeholder copy or generic template sections.
- Ingredient layers remain intentionally inside the viewport.
- The assembled burger reads as one coherent product.
- Text never overlaps the burger, packaging, progress rail, or device safe areas.
- Maintain readable contrast through every animation frame.
- Target smooth performance on mid-range Android devices.
- Confirm a successful Railway deployment before completion.
