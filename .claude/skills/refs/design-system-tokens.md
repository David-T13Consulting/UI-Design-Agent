# Design System Tokens Reference

> Referenced by `/design-system` skill — Phase 2.
> This file contains the full token architecture specification.

---

## Layer 1 — Primitive Tokens (tokens.primitive.json)

Raw values, no semantic meaning. Named by scale, not intent.

### Colors

Generate 10-step scales for each hue: `50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950`

**Required palettes:** primary, neutral, success, warning, danger, info

**Lightness progression (HSL-based):**
```
50:  97% lightness  → background-safe
100: 93% lightness  → background-safe
200: 85% lightness  → background-safe, border-safe
300: 75% lightness  → border-safe
400: 60% lightness  → border-safe (large text safe)
500: 45% lightness  → text-safe on light bg (primary brand)
600: 35% lightness  → text-safe on light bg
700: 25% lightness  → text-safe on light bg
800: 18% lightness  → text-safe on light bg
900: 12% lightness  → text-safe on light bg
950: 7%  lightness  → text-safe on light bg
```

Document WCAG compliance per step:
- **Text-safe** (≥4.5:1 on white): 600-950
- **Large-text-safe** (≥3:1 on white): 500-950
- **Background-safe** (text-primary readable on it): 50-200
- **Border-safe** (≥3:1 UI component contrast): 300-400

**Semantic color hues:**
- Success: HSL 160 (green)
- Warning: HSL 38 (amber)
- Danger: HSL 0 (red)
- Info: HSL 210 (blue)

### Typography

**Font families by visual direction:**
| Direction | Primary | Mono |
|-----------|---------|------|
| Authority | `'IBM Plex Sans', sans-serif` | `'IBM Plex Mono', monospace` |
| Clarity | `'Inter', sans-serif` | `'JetBrains Mono', monospace` |
| Momentum | `'DM Sans', sans-serif` | `'DM Mono', monospace` |

**Fluid type scale (clamp-based):**
```json
{
  "font-size-xs":   "clamp(0.75rem, 0.7rem + 0.25vw, 0.875rem)",
  "font-size-sm":   "clamp(0.875rem, 0.8rem + 0.37vw, 1rem)",
  "font-size-base": "clamp(1rem, 0.9rem + 0.5vw, 1.125rem)",
  "font-size-lg":   "clamp(1.125rem, 1rem + 0.62vw, 1.25rem)",
  "font-size-xl":   "clamp(1.25rem, 1.1rem + 0.75vw, 1.5rem)",
  "font-size-2xl":  "clamp(1.5rem, 1.3rem + 1vw, 1.875rem)",
  "font-size-3xl":  "clamp(1.875rem, 1.5rem + 1.87vw, 2.25rem)",
  "font-size-4xl":  "clamp(2.25rem, 1.8rem + 2.25vw, 3rem)"
}
```

**Font weights:** 400 (regular), 500 (medium), 600 (semibold), 700 (bold)

**Line heights:** tight (1.25), snug (1.375), normal (1.5), relaxed (1.625)

**Letter spacing:** tight (-0.025em), normal (0), wide (0.025em), wider (0.05em)

### Spacing (4px base grid)

```json
{
  "spacing-1": "4px",
  "spacing-2": "8px",
  "spacing-3": "12px",
  "spacing-4": "16px",
  "spacing-5": "20px",
  "spacing-6": "24px",
  "spacing-8": "32px",
  "spacing-10": "40px",
  "spacing-12": "48px",
  "spacing-16": "64px",
  "spacing-20": "80px",
  "spacing-24": "96px",
  "spacing-32": "128px",
  "spacing-40": "160px",
  "spacing-48": "192px",
  "spacing-64": "256px"
}
```

### Border Radius

```json
{
  "radius-none": "0",
  "radius-xs": "2px",
  "radius-sm": "4px",
  "radius-md": "8px",
  "radius-lg": "12px",
  "radius-xl": "16px",
  "radius-2xl": "24px",
  "radius-full": "9999px"
}
```

### Shadows (elevation system)

```json
{
  "shadow-xs": "0 1px 2px rgba(0,0,0,0.05)",
  "shadow-sm": "0 1px 3px rgba(0,0,0,0.10), 0 1px 2px rgba(0,0,0,0.06)",
  "shadow-md": "0 4px 6px rgba(0,0,0,0.07), 0 2px 4px rgba(0,0,0,0.06)",
  "shadow-lg": "0 10px 15px rgba(0,0,0,0.10), 0 4px 6px rgba(0,0,0,0.05)",
  "shadow-xl": "0 20px 25px rgba(0,0,0,0.10), 0 10px 10px rgba(0,0,0,0.04)",
  "shadow-inner": "inset 0 2px 4px rgba(0,0,0,0.06)"
}
```

---

## Layer 2 — Semantic Tokens (tokens.semantic.json)

Intent mapping. Points to primitives. Never hardcodes values.

### Color Semantics (minimum required)

```json
{
  "color-bg-surface": "{neutral-0}",
  "color-bg-subtle": "{neutral-50}",
  "color-bg-sunken": "{neutral-100}",

  "color-text-primary": "{neutral-900}",
  "color-text-secondary": "{neutral-600}",
  "color-text-disabled": "{neutral-400}",
  "color-text-inverse": "{neutral-0}",

  "color-border-default": "{neutral-200}",
  "color-border-strong": "{neutral-400}",
  "color-border-focus": "{primary-500}",

  "color-action-primary": "{primary-600}",
  "color-action-primary-hover": "{primary-700}",
  "color-action-primary-active": "{primary-800}",
  "color-action-secondary": "{neutral-100}",
  "color-action-ghost": "transparent",

  "color-feedback-success": "{success-600}",
  "color-feedback-warning": "{warning-500}",
  "color-feedback-danger": "{danger-600}",
  "color-feedback-info": "{info-600}",
  "color-feedback-success-subtle": "{success-50}",
  "color-feedback-warning-subtle": "{warning-50}",
  "color-feedback-danger-subtle": "{danger-50}",
  "color-feedback-info-subtle": "{info-50}"
}
```

### Typography Semantics

```json
{
  "font-display": { "family": "{font-primary}", "size": "{font-size-4xl}", "weight": 700, "lineHeight": "{line-height-tight}", "letterSpacing": "{letter-spacing-tight}" },
  "font-heading": { "family": "{font-primary}", "size": "{font-size-2xl}", "weight": 600, "lineHeight": "{line-height-snug}", "letterSpacing": "{letter-spacing-tight}" },
  "font-body": { "family": "{font-primary}", "size": "{font-size-base}", "weight": 400, "lineHeight": "{line-height-normal}", "letterSpacing": "{letter-spacing-normal}" },
  "font-ui": { "family": "{font-primary}", "size": "{font-size-sm}", "weight": 500, "lineHeight": "{line-height-snug}", "letterSpacing": "{letter-spacing-normal}" },
  "font-code": { "family": "{font-mono}", "size": "{font-size-sm}", "weight": 400, "lineHeight": "{line-height-normal}", "letterSpacing": "{letter-spacing-normal}" },
  "font-caption": { "family": "{font-primary}", "size": "{font-size-xs}", "weight": 400, "lineHeight": "{line-height-normal}", "letterSpacing": "{letter-spacing-wide}" }
}
```

---

## Layer 3 — Component Tokens (tokens.component.json)

Only defined when a component genuinely diverges from semantic tokens.

```json
{
  "button-border-radius": "{radius-md}",
  "button-padding-x": "{spacing-6}",
  "button-padding-y": "{spacing-3}",

  "input-border-radius": "{radius-md}",
  "input-padding-x": "{spacing-4}",
  "input-padding-y": "{spacing-3}",
  "input-border-color": "{color-border-default}",
  "input-border-color-focus": "{color-border-focus}",

  "card-border-radius": "{radius-xl}",
  "card-padding": "{spacing-6}",
  "card-shadow": "{shadow-md}",

  "modal-border-radius": "{radius-xl}",
  "modal-backdrop-color": "rgba(0,0,0,0.5)",

  "toast-border-radius": "{radius-lg}",
  "toast-shadow": "{shadow-lg}",

  "badge-border-radius": "{radius-full}",
  "badge-padding-x": "{spacing-3}",
  "badge-padding-y": "{spacing-1}"
}
```

---

## Motion Tokens (tokens.motion.json)

Based on Carbon Design System's productive/expressive distinction.

### Duration Scale

```json
{
  "duration-instant": "50ms",
  "duration-fast": "100ms",
  "duration-normal": "200ms",
  "duration-slow": "300ms",
  "duration-slower": "400ms",
  "duration-page": "500ms"
}
```

| Token | Use case |
|-------|----------|
| instant | Focus ring, state changes that must feel immediate |
| fast | Button press, checkbox, toggle, small elements |
| normal | Dropdown open, tab switch, standard interactions |
| slow | Card expand, modal enter, medium elements |
| slower | Drawer, side panel, large elements |
| page | Page-level transitions, empty state entry |

### Easing Curves

```json
{
  "ease-productive-enter": "cubic-bezier(0.0, 0.0, 0.2, 1)",
  "ease-productive-exit": "cubic-bezier(0.4, 0.0, 1, 1)",
  "ease-productive-standard": "cubic-bezier(0.4, 0.0, 0.2, 1)",
  "ease-expressive-enter": "cubic-bezier(0.0, 0.0, 0.2, 1.4)",
  "ease-expressive-bounce": "cubic-bezier(0.34, 1.56, 0.64, 1)",
  "ease-linear": "linear"
}
```

| Curve | Use case |
|-------|----------|
| productive-enter | Elements entering: decelerate into view |
| productive-exit | Elements leaving: accelerate out |
| productive-standard | Repositioning, state changes |
| expressive-enter | Overshoot, spring feel for delight |
| expressive-bounce | Confirmations, success states |
| linear | Loading spinners only |

### Reduced Motion

Generate global CSS rule:
```css
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}
```

---

## CSS Generation Rules (tokens.css)

Auto-generate from all 4 JSON files. Namespace by layer:

```css
:root {
  /* === PRIMITIVES === */
  --primitive-blue-50: #eff6ff;
  --primitive-blue-100: #dbeafe;
  /* ... full scales ... */

  /* === SEMANTIC === */
  --color-bg-surface: var(--primitive-neutral-0);
  --color-text-primary: var(--primitive-neutral-900);
  /* ... all semantic tokens ... */

  /* === TYPOGRAPHY === */
  --font-family-primary: 'Inter', sans-serif;
  --font-size-base: clamp(1rem, 0.9rem + 0.5vw, 1.125rem);
  /* ... all type tokens ... */

  /* === SPACING === */
  --spacing-1: 4px;
  --spacing-2: 8px;
  /* ... all spacing ... */

  /* === RADIUS === */
  --radius-md: 8px;
  /* ... all radius ... */

  /* === SHADOWS === */
  --shadow-sm: 0 1px 3px rgba(0,0,0,0.10), 0 1px 2px rgba(0,0,0,0.06);
  /* ... all shadows ... */

  /* === MOTION === */
  --motion-duration-fast: 100ms;
  --motion-ease-productive-standard: cubic-bezier(0.4, 0.0, 0.2, 1);
  /* ... all motion ... */

  /* === COMPONENT OVERRIDES === */
  --button-border-radius: var(--radius-md);
  /* ... all component tokens ... */
}
```
