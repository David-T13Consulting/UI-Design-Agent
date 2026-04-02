# Design System Components Reference

> Referenced by `/design-system` skill — Phase 4.
> Full manifest of all 29 components with props, states, and motion specs.

---

## Global Interaction Rules

Apply to EVERY interactive component without exception:

| Rule | Spec |
|------|------|
| **Focus ring** | `var(--color-border-focus)`, 2px width, 2px offset. Never remove outline. |
| **Hover** | Background shift + `cursor:pointer`. Duration: `var(--motion-duration-fast)`. Easing: `var(--motion-ease-productive-standard)`. |
| **Active/press** | `scale(0.98)` + slight darkening. Duration: `var(--motion-duration-instant)`. |
| **Disabled** | `opacity: 0.4`, `cursor: not-allowed`, `pointer-events: none`. |
| **Loading** | Skeleton or spinner replacing content. Never shift layout. |
| **Error** | Red border + icon + message below. Shake on submit failure (`translateX` keyframe, 300ms). |
| **Success** | Green check + scale-up (1 → 1.05 → 1), 200ms, `ease-expressive-bounce`. |
| **Reduced motion** | All motion collapses to `0.01ms`. |

---

## PRIMITIVES (9 components)

### 1. Button

**Variants:** primary, secondary, ghost, destructive, link
**Sizes:** xs, sm, md, lg
**Props:**
- `variant`: primary | secondary | ghost | destructive | link
- `size`: xs | sm | md | lg
- `loading`: boolean — spinner replaces label, maintains width
- `disabled`: boolean
- `iconLeft`: Lucide icon name
- `iconRight`: Lucide icon name
- `fullWidth`: boolean
- `children`: React.ReactNode

**States to cover in stories:**
- All variants × md size
- All sizes × primary variant
- Loading state (spinner replaces label)
- Disabled state
- Icon-only variant
- With left icon, with right icon
- Full width

**Motion:**
- Press: `scale(0.98)`, `var(--motion-duration-instant)`
- Hover: background color shift, `var(--motion-duration-fast)`
- Loading spinner entrance: fade in, `var(--motion-duration-normal)`

### 2. IconButton

**Props:**
- `icon`: Lucide icon name (required)
- `label`: string (aria-label, required)
- `variant`: default | ghost | destructive
- `size`: sm | md | lg

**States:** default, hover, focus, active, disabled, loading

**Motion:** Press `scale(0.94)`, hover opacity shift

### 3. TextInput

**Props:**
- `label`: string
- `placeholder`: string
- `hint`: string
- `error`: string
- `prefix`: React.ReactNode (icon or text)
- `suffix`: React.ReactNode (icon or text)
- `disabled`: boolean
- `required`: boolean
- `type`: text | email | password | number | search

**States:** empty, focused, filled, error, disabled, with-prefix, with-suffix

**Motion:**
- Border color transition: `var(--motion-duration-fast)`
- Error shake on validation fail: `translateX(±4px)`, 300ms, 3 oscillations

### 4. Textarea

**Props:**
- `label`: string
- `hint`: string
- `error`: string
- `rows`: number (default 4)
- `maxLength`: number
- `disabled`: boolean
- `showCount`: boolean

**States:** empty, focused, filled, error, disabled, with-character-count

**Motion:** Border color transition: `var(--motion-duration-fast)`

### 5. Select

**Props:**
- `label`: string
- `options`: Array<{ value: string; label: string }>
- `error`: string
- `hint`: string
- `disabled`: boolean
- `placeholder`: string

**States:** closed, open (dropdown visible), selected, error, disabled

**Motion:**
- Dropdown enter: `translateY(-4px) → 0` + `opacity 0 → 1`, `var(--motion-duration-slow)`, `ease-productive-enter`
- Option hover: background shift
- Option select: brief highlight

### 6. Checkbox

**Props:**
- `label`: string (required)
- `checked`: boolean
- `indeterminate`: boolean
- `disabled`: boolean
- `error`: string

**States:** unchecked, checked, indeterminate, hover, focus, disabled

**Motion:** Checkmark draw via `stroke-dashoffset`, 150ms

### 7. RadioGroup

**Props:**
- `options`: Array<{ value: string; label: string }>
- `value`: string
- `onChange`: (value: string) => void
- `disabled`: boolean
- `error`: string
- `orientation`: horizontal | vertical

**States:** unselected, selected, hover, focus, disabled

**Motion:** Inner dot `scale(0 → 1)`, 150ms, `ease-expressive-bounce`

### 8. Toggle / Switch

**Props:**
- `checked`: boolean
- `label`: string
- `disabled`: boolean
- `size`: sm | md

**States:** off, on, hover, focus, disabled

**Motion:**
- Thumb slide: `var(--motion-duration-normal)`, `ease-productive-standard`
- Track color fill: same timing

### 9. Badge / Tag

**Props:**
- `label`: string
- `variant`: neutral | info | success | warning | danger
- `size`: sm | md
- `dismissible`: boolean
- `dot`: boolean (status dot indicator)

**States:** default, with-dot, dismissible (× button on hover), dismissed

**Motion:** Dismiss `scale → 0` + `opacity → 0`, 150ms

---

## FEEDBACK (5 components)

### 10. AlertBanner

**Props:**
- `variant`: info | success | warning | error
- `title`: string
- `message`: string
- `dismissible`: boolean
- `action`: { label: string; onClick: () => void }

**States:** each variant, dismissible, with-action, dismissed

**Motion:**
- Enter from top: `translateY(-8px) → 0` + opacity, `var(--motion-duration-slow)`
- Dismiss: `translateY(-4px)` + `opacity → 0`, `var(--motion-duration-normal)`

### 11. Toast / Notification

**Props:**
- `variant`: info | success | warning | error
- `title`: string
- `message`: string
- `duration`: number (ms, default 4000)
- `action`: { label: string; onClick: () => void }

**States:** entering, visible, exiting, with-action

**Motion:**
- Slide in from right: `translateX(100%) → 0` + opacity, `var(--motion-duration-normal)`, `ease-productive-enter`
- Slide out: `translateX(100%)` + `opacity → 0`, `ease-productive-exit`
- Auto-dismiss progress bar animates width 100% → 0%

### 12. Tooltip

**Props:**
- `content`: string | React.ReactNode
- `placement`: top | bottom | left | right
- `delay`: number (ms, default 200)

**States:** hidden, visible

**Motion:** Fade + `scale(0.95 → 1)`, `var(--motion-duration-fast)`, `ease-productive-enter`

### 13. ProgressBar

**Props:**
- `value`: number (0-100)
- `variant`: default | success | warning | danger
- `label`: string
- `showValue`: boolean

**States:** 0%, 25%, 50%, 75%, 100% (complete)

**Motion:**
- Width transition: 600ms, `ease-productive-standard`
- Completion pulse: brief scale (1 → 1.02 → 1) at 100%

### 14. Skeleton

**Props:**
- `variant`: text | heading | circle | rect | card
- `width`: string | number
- `height`: string | number
- `lines`: number (for text variant)

**States:** loading only (removed when content arrives)

**Motion:** Shimmer sweep animation (gradient), 1.5s, linear, infinite

**Rule:** Skeleton MUST match the exact shape and size of the real content it replaces.

---

## NAVIGATION (4 components)

### 15. Tabs

**Props:**
- `tabs`: Array<{ label: string; value: string; disabled?: boolean }>
- `activeTab`: string
- `onChange`: (value: string) => void
- `variant`: line | pill

**States:** default, active, hover, disabled, overflow (scrollable when many tabs)

**Motion:**
- Active indicator slide: `translateX`, `var(--motion-duration-normal)`, `ease-productive-standard`
- Content fade: 150ms

### 16. Breadcrumb

**Props:**
- `items`: Array<{ label: string; href: string }>
- `separator`: React.ReactNode (icon, default chevron)

**States:** default, current (last item non-clickable), truncated (>4 items collapsed with "...")

### 17. PageHeader

**Props:**
- `title`: string
- `subtitle`: string
- `breadcrumb`: Breadcrumb props
- `actions`: React.ReactNode (slot for buttons)
- `backAction`: () => void

**States:** minimal (title only), full (breadcrumb + subtitle + actions), with-back-button

### 18. Sidebar / NavItem

**Props (NavItem):**
- `label`: string
- `icon`: Lucide icon name
- `href`: string
- `active`: boolean
- `badge`: number (notification count)
- `collapsed`: boolean (icon-only mode)

**States:** default, hover, active, collapsed (icon-only), with-badge

**Motion:**
- Active indicator: background + left border, `var(--motion-duration-fast)`
- Hover background shift
- Collapse/expand: width transition, `var(--motion-duration-slower)`

---

## DATA DISPLAY (5 components)

### 19. StatusBadge

**Props:**
- `status`: string
- `statusMap`: Record<string, 'success' | 'warning' | 'danger' | 'info' | 'neutral'>
- `size`: sm | md

**Stories:** Cover all 5 color mappings (success, warning, danger, info, neutral)

### 20. DataTable (simple)

**Props:**
- `columns`: Array<{ key: string; label: string; sortable?: boolean }>
- `rows`: Array<Record<string, unknown>>
- `loading`: boolean
- `emptyState`: React.ReactNode

**States:** default, loading (skeleton rows), empty, sorted-asc, sorted-desc

**Motion:**
- Sort indicator flip: 180deg, `var(--motion-duration-fast)`
- Row hover: background shift

### 21. Card

**Props:**
- `children`: React.ReactNode
- `padding`: sm | md | lg
- `shadow`: sm | md | lg
- `interactive`: boolean
- `header`: React.ReactNode
- `footer`: React.ReactNode

**States:** default, interactive-hover, interactive-active

**Motion (interactive only):**
- Hover: `translateY(-2px)` + shadow-lg, `var(--motion-duration-normal)`, `ease-productive-standard`

### 22. Stat / KPI Block

**Props:**
- `label`: string
- `value`: string | number
- `delta`: { value: number; direction: 'up' | 'down' }
- `icon`: Lucide icon name
- `loading`: boolean

**States:** default, positive-delta (green), negative-delta (red), neutral-delta, loading (skeleton)

**Motion:** Number count-up on mount (respects `prefers-reduced-motion`)

### 23. EmptyState

**Props:**
- `icon`: Lucide icon name
- `title`: string
- `description`: string
- `action`: { label: string; onClick: () => void }

**States:** default, with-action

**Motion:** Entrance: `opacity 0 → 1` + `translateY(16px → 0)`, `var(--motion-duration-page)`, `ease-productive-enter`

---

## OVERLAYS (3 components)

### 24. Modal / Dialog

**Props:**
- `open`: boolean
- `title`: string
- `description`: string
- `children`: React.ReactNode
- `footer`: React.ReactNode
- `size`: sm | md | lg | full
- `onClose`: () => void

**States:** closed, opening, open, closing

**Motion:**
- Backdrop: `opacity 0 → 1`, `var(--motion-duration-slow)`
- Panel: `scale(0.95) → 1` + `opacity`, `var(--motion-duration-slow)`, `ease-expressive-enter`
- Close: reverse of enter

**Behavior:** Trap focus. ESC to close. Click backdrop to close.

### 25. Drawer / Side Panel

**Props:**
- `open`: boolean
- `placement`: left | right
- `title`: string
- `children`: React.ReactNode
- `footer`: React.ReactNode
- `width`: string (default '400px')
- `onClose`: () => void

**States:** closed, open

**Motion:**
- Slide from placement side: `translateX(±100%) → 0`, `var(--motion-duration-slower)`, `ease-productive-enter/exit`
- Backdrop fade

### 26. Popover / Dropdown

**Props:**
- `trigger`: React.ReactNode (slot)
- `content`: React.ReactNode (slot)
- `placement`: top | bottom | left | right
- `offset`: number

**States:** closed, open

**Motion:** Fade + `scale(0.95 → 1)` + `translateY(-4px → 0)`, `var(--motion-duration-fast)`, `ease-productive-enter`

---

## PATTERNS (3 multi-component compositions)

### 27. FormField

**Wraps:** TextInput | Select | Textarea + Label + Hint + Error

**Behavior:** Automatically wires `aria-describedby` between input and hint/error. Propagates validation state to child input.

**Props:**
- `label`: string
- `hint`: string
- `error`: string
- `required`: boolean
- `children`: React.ReactNode (the input element)

### 28. ConfirmDialog

**Wraps:** Modal + two Buttons (confirm + cancel)

**Props:**
- `open`: boolean
- `title`: string
- `description`: string
- `confirmLabel`: string (default "Confirm")
- `confirmVariant`: 'primary' | 'destructive'
- `onConfirm`: () => void | Promise<void>
- `onCancel`: () => void

**States:** default, loading (confirm button shows spinner while async onConfirm runs)

### 29. FilterBar

**Wraps:** Row of Select + Search TextInput + Badge (active filter count)

**Props:**
- `filters`: Array<{ key: string; label: string; options: SelectOption[] }>
- `searchPlaceholder`: string
- `onFilterChange`: (filters: Record<string, string>) => void
- `onSearchChange`: (query: string) => void

**States:** no filters active, filters active (shows count badge + "Clear all" button)

---

## Required States Manifest

For eval coverage checking, every component must cover these minimum states:

| Category | Required states |
|----------|----------------|
| **All interactive** | default, hover, focus-visible, disabled |
| **Form inputs** | + empty, filled, error, loading |
| **Feedback** | + all variant stories (info, success, warning, error) |
| **Overlays** | + opening animation, closing animation |
| **Data display** | + loading (skeleton), empty |

This manifest is consumed by `coverage.eval.ts` to audit state completeness.
