# Design System Evals Reference

> Referenced by `/design-system` skill — Phase 6.
> These are living audit reports rendered inside Storybook, not unit tests.

---

## Eval 1 — Contrast Audit (contrast.eval.ts)

### Purpose
Verify all semantic color token pairs meet WCAG contrast requirements.

### What it renders
A Storybook story that displays a table with:

| Column | Description |
|--------|-------------|
| Token pair | e.g. `color-text-primary` on `color-bg-surface` |
| Foreground hex | Resolved hex value |
| Background hex | Resolved hex value |
| Contrast ratio | Computed using WCAG relative luminance formula |
| WCAG AA | PASS (green) / FAIL (red) — 4.5:1 for normal text, 3:1 for large text |
| WCAG AAA | PASS (green) / FAIL (red) — 7:1 for normal text, 4.5:1 for large text |

### Token pairs to test (minimum)

```typescript
const TOKEN_PAIRS = [
  // Text on surfaces
  { fg: 'color-text-primary', bg: 'color-bg-surface', level: 'normal' },
  { fg: 'color-text-primary', bg: 'color-bg-subtle', level: 'normal' },
  { fg: 'color-text-primary', bg: 'color-bg-sunken', level: 'normal' },
  { fg: 'color-text-secondary', bg: 'color-bg-surface', level: 'normal' },
  { fg: 'color-text-secondary', bg: 'color-bg-subtle', level: 'normal' },
  { fg: 'color-text-disabled', bg: 'color-bg-surface', level: 'normal' },

  // Inverse text
  { fg: 'color-text-inverse', bg: 'color-action-primary', level: 'normal' },

  // Feedback on subtle backgrounds
  { fg: 'color-feedback-success', bg: 'color-feedback-success-subtle', level: 'normal' },
  { fg: 'color-feedback-warning', bg: 'color-feedback-warning-subtle', level: 'large' },
  { fg: 'color-feedback-danger', bg: 'color-feedback-danger-subtle', level: 'normal' },
  { fg: 'color-feedback-info', bg: 'color-feedback-info-subtle', level: 'normal' },

  // Action colors
  { fg: 'color-text-inverse', bg: 'color-action-primary-hover', level: 'normal' },
  { fg: 'color-text-inverse', bg: 'color-action-primary-active', level: 'normal' },

  // Borders (3:1 for UI components)
  { fg: 'color-border-default', bg: 'color-bg-surface', level: 'ui' },
  { fg: 'color-border-strong', bg: 'color-bg-surface', level: 'ui' },
  { fg: 'color-border-focus', bg: 'color-bg-surface', level: 'ui' },
];
```

### Contrast computation

```typescript
function getRelativeLuminance(hex: string): number {
  const rgb = hexToRgb(hex);
  const [r, g, b] = rgb.map((c) => {
    const s = c / 255;
    return s <= 0.03928 ? s / 12.92 : Math.pow((s + 0.055) / 1.055, 2.4);
  });
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

function getContrastRatio(hex1: string, hex2: string): number {
  const l1 = getRelativeLuminance(hex1);
  const l2 = getRelativeLuminance(hex2);
  const lighter = Math.max(l1, l2);
  const darker = Math.min(l1, l2);
  return (lighter + 0.05) / (darker + 0.05);
}
```

### Pass/fail thresholds

| Level | AA minimum | AAA minimum |
|-------|-----------|-------------|
| Normal text | 4.5:1 | 7:1 |
| Large text (≥18pt or ≥14pt bold) | 3:1 | 4.5:1 |
| UI components | 3:1 | 3:1 |

---

## Eval 2 — Motion Audit (motion.eval.ts)

### Purpose
Audit all motion tokens for timing appropriateness and demonstrate reduced-motion behavior.

### What it renders

**Section 1: Token table**

| Column | Description |
|--------|-------------|
| Token name | e.g. `--motion-duration-fast` |
| Value | e.g. `100ms` |
| Easing | Associated easing curve |
| Intended use | From token spec |
| Live preview | Animated box using that exact duration + easing |
| Flags | Warnings for anti-patterns |

**Flags to check:**
- Duration > 500ms → FLAG: "May feel sluggish. Verify this is intentional."
- Linear easing on non-spinner element → FLAG: "Linear easing feels mechanical. Use productive/expressive curves."
- Duration < 50ms → FLAG: "May be imperceptible. Consider if animation adds value."
- Expressive easing on productive interaction → FLAG: "Expressive curves (overshoot/bounce) should only be used for delight moments, not routine interactions."

**Section 2: Reduced motion simulation**
A toggle that activates `prefers-reduced-motion: reduce` behavior:
- Shows all animations side by side: normal vs reduced
- Verifies all transitions collapse to near-instant
- Confirms no animation persists when reduced motion is active

---

## Eval 3 — Coverage Report (coverage.eval.ts)

### Purpose
Comprehensive audit of component coverage, token usage, and accessibility.

### What it renders

**Section 1: Component coverage**

| Column | Description |
|--------|-------------|
| Component | Name |
| Has story? | YES (green) / NO (red) |
| States covered | Number of states with stories |
| States expected | From required-states manifest |
| Coverage % | covered / expected |

**Section 2: Token usage audit**

Scan all component `.css` files for raw values that should be tokens:
- Any hex color not from tokens → VIOLATION
- Any `px` value for spacing not from spacing scale → VIOLATION
- Any `px` value for border-radius not from radius scale → VIOLATION
- Any `ms` value for duration not from motion tokens → VIOLATION
- Any font-family not from token → VIOLATION
- Any box-shadow not from shadow tokens → VIOLATION

Report format:
```
TOKEN VIOLATIONS:
  src/components/Button/styles.css:12  →  color: #333  (should use var(--color-text-primary))
  src/components/Card/styles.css:8     →  padding: 16px  (should use var(--spacing-4))
```

**Section 3: Accessibility audit**

Run axe-core against each component's default story:
- Report violations by severity: critical, serious, moderate, minor
- Group by component
- Link to axe-core rule documentation for each violation

### Required-states manifest

```typescript
const REQUIRED_STATES: Record<string, string[]> = {
  // All interactive
  Button: ['default', 'hover', 'focus', 'disabled', 'loading', 'all-variants', 'all-sizes', 'with-icon'],
  IconButton: ['default', 'hover', 'focus', 'disabled', 'loading'],
  TextInput: ['empty', 'focused', 'filled', 'error', 'disabled', 'with-prefix', 'with-suffix'],
  Textarea: ['empty', 'focused', 'filled', 'error', 'disabled', 'with-count'],
  Select: ['closed', 'open', 'selected', 'error', 'disabled'],
  Checkbox: ['unchecked', 'checked', 'indeterminate', 'hover', 'focus', 'disabled'],
  RadioGroup: ['unselected', 'selected', 'hover', 'focus', 'disabled'],
  Toggle: ['off', 'on', 'hover', 'focus', 'disabled'],
  Badge: ['default', 'with-dot', 'dismissible', 'all-variants'],

  // Feedback
  AlertBanner: ['info', 'success', 'warning', 'error', 'dismissible', 'with-action'],
  Toast: ['entering', 'visible', 'exiting', 'with-action'],
  Tooltip: ['hidden', 'visible', 'all-placements'],
  ProgressBar: ['0-percent', '50-percent', '100-percent', 'all-variants'],
  Skeleton: ['text', 'heading', 'circle', 'rect', 'card'],

  // Navigation
  Tabs: ['default', 'active', 'hover', 'disabled', 'overflow', 'line-variant', 'pill-variant'],
  Breadcrumb: ['default', 'current', 'truncated'],
  PageHeader: ['minimal', 'full', 'with-back'],
  NavItem: ['default', 'hover', 'active', 'collapsed', 'with-badge'],

  // Data Display
  StatusBadge: ['success', 'warning', 'danger', 'info', 'neutral'],
  DataTable: ['default', 'loading', 'empty', 'sorted-asc', 'sorted-desc'],
  Card: ['default', 'interactive-hover', 'interactive-active', 'with-header', 'with-footer'],
  StatBlock: ['default', 'positive-delta', 'negative-delta', 'neutral', 'loading'],
  EmptyState: ['default', 'with-action'],

  // Overlays
  Modal: ['closed', 'open', 'all-sizes'],
  Drawer: ['closed', 'open', 'left', 'right'],
  Popover: ['closed', 'open', 'all-placements'],

  // Patterns
  FormField: ['default', 'with-hint', 'with-error', 'required'],
  ConfirmDialog: ['default', 'loading'],
  FilterBar: ['no-filters', 'filters-active'],
};
```
