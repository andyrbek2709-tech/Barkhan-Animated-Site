# Barkhan UI & Motion Skill

Use this skill automatically for every UI, UX, responsive-layout, animation, or visual-review task in this repository.

## Product intent

Barkhan is a premium, cinematic burger experience for Aktau. The interface must feel appetizing, tactile, fast, and confident — never like a generic template.

## Required workflow

1. Inspect the current component, relevant CSS, and assets before editing.
2. Define the user-visible problem in one sentence.
3. Design mobile-first for widths 360–430 px, then validate tablet and desktop.
4. Reuse the existing Barkhan visual language: dark roasted background, warm orange accent, cream typography, food photography, generous negative space.
5. Prefer the current lightweight scroll system and CSS for production changes. Test any new animation library in an isolated branch before merging.
6. Animate `transform` and `opacity` by default. Avoid layout-thrashing animation of `top`, `left`, `width`, or `height` during continuous motion.
7. Respect `prefers-reduced-motion`.
8. Keep the main CTA visible, thumb-accessible, and linked to the current official order URL.
9. Test visual hierarchy, clipping, overflow, text collision, safe-area spacing, and tap-target size.
10. Review the final result from screenshots at the beginning, middle, and end of the scroll story before declaring completion.

## Motion principles

- Ingredient landings: short controlled overshoot.
- Scroll-driven assembly: deterministic and reversible; never continue independently after the user stops scrolling.
- Product-card reveals: subtle and restrained.
- Hover and press: small scale or translation only; no distracting rotation.
- Keep simultaneous large animations to a minimum on mobile.

## Visual quality gates

- No placeholder copy or stock-template sections.
- No ingredient layer may leave the viewport unintentionally.
- The assembled burger must read as one coherent product, not unrelated images.
- Text must not overlap the burger, packaging, progress rail, browser safe areas, or bottom navigation.
- Primary text contrast must remain readable over every animation frame.
- Images must use optimized formats and predictable intrinsic dimensions.

## Performance gates

- Target smooth interaction on mid-range Android devices.
- Avoid unnecessary React state updates during scroll.
- Do not add overlapping animation libraries.
- Lazy-load below-the-fold media where practical.
- Preserve a functional static experience when motion is reduced.
- Confirm a successful Railway build before calling the iteration complete.
