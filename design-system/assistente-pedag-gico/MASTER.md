# Design System Master File

> **LOGIC:** When building a specific page, first check `design-system/pages/[page-name].md`.
> If that file exists, its rules **override** this Master file.
> If not, strictly follow the rules below.

---

**Project:** Assistente Pedagógico
**Generated:** 2026-09-11 13:00:04
**Category:** Educational App
**Design Dials:** Variance 3/10 (Calm / Editorial) | Motion 4/10 (Physical but restrained) | Density 4/10 (Focused)

---

## Global Rules

### Color Palette

| Role | Hex | CSS Variable |
|------|-----|--------------|
| Primary | `#176B61` | `--color-primary` |
| On Primary | `#FFFFFF` | `--color-on-primary` |
| Secondary | `#E4F0EC` | `--color-secondary` |
| On Secondary | `#0F574F` | `--color-on-secondary` |
| Accent/CTA | `#A56B32` | `--color-accent` |
| On Accent/CTA | `#FFFFFF` | `--color-on-accent` |
| Background | `#F7F7F4` | `--color-background` |
| Foreground | `#172522` | `--color-foreground` |
| Card | `#FFFEFA` | `--color-card` |
| Card Foreground | `#172522` | `--color-card-foreground` |
| Muted | `#F0F1ED` | `--color-muted` |
| Muted Foreground | `#687772` | `--color-muted-foreground` |
| Border | `#DDE5E1` | `--color-border` |
| Destructive | `#B45F5F` | `--color-destructive` |
| On Destructive | `#FFFFFF` | `--color-on-destructive` |
| Ring | `#4F46E5` | `--color-ring` |

**Color Notes:** Warm white and charcoal are the canvas. Teal is the single brand accent; ochre is reserved for warnings or occasional emphasis. Do not tint entire cards with the accent.

### Typography

- **Heading Font:** System UI / SF Pro Display equivalent
- **Body Font:** System UI / SF Pro Text equivalent
- **Mood:** calm, precise, warm, editorial, trustworthy
- **Rule:** Do not import display fonts merely to make the app “feel designed”. Hierarchy, line-height and spacing create the voice.

**CSS Import:**
```css
@import url('https://fonts.googleapis.com/css2?family=Fredoka:wght@400;500;600;700&family=Nunito:wght@300;400;500;600;700&display=swap');
```

### Spacing Variables

*Density: 5/10 — Standard*

| Token | Value | Usage |
|-------|-------|-------|
| `--space-xs` | `4px` / `0.25rem` | Tight gaps |
| `--space-sm` | `8px` / `0.5rem` | Icon gaps, inline spacing |
| `--space-md` | `16px` / `1rem` | Standard padding |
| `--space-lg` | `24px` / `1.5rem` | Section padding |
| `--space-xl` | `32px` / `2rem` | Large gaps |
| `--space-2xl` | `48px` / `3rem` | Section margins |
| `--space-3xl` | `64px` / `4rem` | Hero padding |

### Shadow Depths

| Level | Value | Usage |
|-------|-------|-------|
| `--shadow-sm` | `0 1px 2px rgba(0,0,0,0.05)` | Subtle lift |
| `--shadow-md` | `0 4px 6px rgba(0,0,0,0.1)` | Cards, buttons |
| `--shadow-lg` | `0 10px 15px rgba(0,0,0,0.1)` | Modals, dropdowns |
| `--shadow-xl` | `0 20px 25px rgba(0,0,0,0.15)` | Hero images, featured cards |

---

## Component Specs

### Buttons

```css
/* Primary Button */
.btn-primary {
  background: #EA580C;
  color: white;
  padding: 12px 24px;
  border-radius: 8px;
  font-weight: 600;
  transition: all 200ms ease;
  cursor: pointer;
}

.btn-primary:hover {
  opacity: 0.9;
  transform: translateY(-1px);
}

/* Secondary Button */
.btn-secondary {
  background: transparent;
  color: #4F46E5;
  border: 2px solid #4F46E5;
  padding: 12px 24px;
  border-radius: 8px;
  font-weight: 600;
  transition: all 200ms ease;
  cursor: pointer;
}
```

### Cards

```css
.card {
  background: #EEF2FF;
  border-radius: 12px;
  padding: 24px;
  box-shadow: var(--shadow-md);
  transition: all 200ms ease;
  cursor: pointer;
}

.card:hover {
  box-shadow: var(--shadow-lg);
  transform: translateY(-2px);
}
```

### Inputs

```css
.input {
  padding: 12px 16px;
  border: 1px solid #E2E8F0;
  border-radius: 8px;
  font-size: 16px;
  transition: border-color 200ms ease;
}

.input:focus {
  border-color: #4F46E5;
  outline: none;
  box-shadow: 0 0 0 3px #4F46E520;
}
```

### Modals

```css
.modal-overlay {
  background: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(4px);
}

.modal {
  background: white;
  border-radius: 16px;
  padding: 32px;
  box-shadow: var(--shadow-xl);
  max-width: 500px;
  width: 90%;
}
```

---

## Style Guidelines

**Style:** Calm native editorial

**Keywords:** warm neutral canvas, restrained teal accent, grouped lists, clear typography, continuous corners, subtle material, touch-first controls

**Best For:** A professional teacher workspace used throughout a school day on a phone

**Key Effects:** One-pixel separators, small elevation only where a surface needs lift, 0.97 press feedback, interruptible springs for direct manipulation, no decorative gradients

### Page Pattern

**Pattern Name:** Focused daily workspace

- **Strategy:** Show what needs attention now, then make the next action obvious.
- **Navigation:** Five top-level destinations maximum. Secondary tools belong in grouped settings-style lists.
- **Home:** one current class context, one current action, one agenda preview, then compact shortcuts. Do not repeat the same plan in multiple cards.
- **Planning:** one primary day surface; library and filters are secondary, visually quieter.
- **More:** grouped rows with descriptions, not a grid of mini dashboards.

---

## Motion

**Press and transition** (Subtle) — Trigger: direct manipulation | Duration: 140-220ms | Easing: `cubic-bezier(.22,1,.36,1)`

```js
gsap.from(el, { opacity: 0, y: 12, duration: 0.35, ease: 'power1.out', scrollTrigger: { trigger: el, start: 'top 90%', toggleActions: 'play none none reverse' } });
```

**Framework notes:** Requires the ScrollTrigger plugin registered once via gsap.registerPlugin(ScrollTrigger); Use matchMedia('(prefers-reduced-motion: reduce)') to skip non-essential motion and render the final state immediately

- ✅ Keep the y offset small (8-16px) so it reads as a fade, not a slide
- ❌ Don't reveal below-the-fold content needed for SEO/crawlers as invisible-by-default without a no-JS fallback
- ⚡ toggleActions 'play none none reverse' avoids re-triggering on every scroll direction change

---

## Anti-Patterns (Do NOT Use)

- ❌ Dark modes
- ❌ Complex jargon

### Additional Forbidden Patterns

- ❌ **Emojis as icons** — Use SVG icons (Heroicons, Lucide, Simple Icons)
- ❌ **Missing cursor:pointer** — All clickable elements must have cursor:pointer
- ❌ **Layout-shifting hovers** — Avoid scale transforms that shift layout
- ❌ **Low contrast text** — Maintain 4.5:1 minimum contrast ratio
- ❌ **Instant state changes** — Always use transitions (150-300ms)
- ❌ **Invisible focus states** — Focus states must be visible for a11y
- ❌ **Card soup** — Do not put every section in a separate colored rounded rectangle
- ❌ **Accent everywhere** — Teal is for actions, selection, focus and small status cues
- ❌ **Pill-shaped navigation** — Active bottom navigation uses a compact icon treatment, never a large button background
- ❌ **AI-default gradients** — No gradient backgrounds, glass blobs, neon colors or oversized decorative icons
- ❌ **Desktop dashboard patterns** — This product is mobile-only; prioritize one-handed scanning and native-feeling lists

---

## Pre-Delivery Checklist

Before delivering any UI code, verify:

- [ ] No emojis used as icons (use SVG instead)
- [ ] All icons from consistent icon set (Heroicons/Lucide)
- [ ] `cursor-pointer` on all clickable elements
- [ ] Hover states with smooth transitions (150-300ms)
- [ ] Light mode: text contrast 4.5:1 minimum
- [ ] Focus states visible for keyboard navigation
- [ ] `prefers-reduced-motion` respected
- [ ] Responsive: 375px, 768px, 1024px, 1440px
- [ ] No content hidden behind fixed navbars
- [ ] No horizontal scroll on mobile
