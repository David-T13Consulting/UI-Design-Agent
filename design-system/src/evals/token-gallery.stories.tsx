import type { Meta, StoryObj } from '@storybook/react';

/* ─── Token Gallery ─── */

const COLORS = {
  'Neutral': [
    { name: '--raw-neutral-0', hex: '#ffffff' },
    { name: '--raw-neutral-50', hex: '#f9fafb' },
    { name: '--raw-neutral-100', hex: '#f3f4f6' },
    { name: '--raw-neutral-200', hex: '#e5e7eb' },
    { name: '--raw-neutral-300', hex: '#d1d5db' },
    { name: '--raw-neutral-400', hex: '#9ca3af' },
    { name: '--raw-neutral-500', hex: '#6b7280' },
    { name: '--raw-neutral-600', hex: '#4b5563' },
    { name: '--raw-neutral-700', hex: '#374151' },
    { name: '--raw-neutral-800', hex: '#1f2937' },
    { name: '--raw-neutral-900', hex: '#111827' },
    { name: '--raw-neutral-950', hex: '#030712' },
  ],
  'Primary (Indigo)': [
    { name: '--raw-primary-50', hex: '#eef2ff' },
    { name: '--raw-primary-100', hex: '#e0e7ff' },
    { name: '--raw-primary-200', hex: '#c7d2fe' },
    { name: '--raw-primary-300', hex: '#a5b4fc' },
    { name: '--raw-primary-400', hex: '#818cf8' },
    { name: '--raw-primary-500', hex: '#6366f1' },
    { name: '--raw-primary-600', hex: '#4f46e5' },
    { name: '--raw-primary-700', hex: '#4338ca' },
    { name: '--raw-primary-800', hex: '#3730a3' },
    { name: '--raw-primary-900', hex: '#312e81' },
  ],
  'Success': [
    { name: '--raw-success-50', hex: '#ecfdf5' },
    { name: '--raw-success-100', hex: '#d1fae5' },
    { name: '--raw-success-500', hex: '#10b981' },
    { name: '--raw-success-600', hex: '#059669' },
    { name: '--raw-success-700', hex: '#047857' },
  ],
  'Warning': [
    { name: '--raw-warning-50', hex: '#fffbeb' },
    { name: '--raw-warning-100', hex: '#fef3c7' },
    { name: '--raw-warning-500', hex: '#f59e0b' },
    { name: '--raw-warning-600', hex: '#d97706' },
    { name: '--raw-warning-700', hex: '#b45309' },
  ],
  'Danger': [
    { name: '--raw-danger-50', hex: '#fff1f2' },
    { name: '--raw-danger-100', hex: '#ffe4e6' },
    { name: '--raw-danger-500', hex: '#f43f5e' },
    { name: '--raw-danger-600', hex: '#e11d48' },
    { name: '--raw-danger-700', hex: '#be123c' },
  ],
  'Info': [
    { name: '--raw-info-50', hex: '#f0f9ff' },
    { name: '--raw-info-100', hex: '#e0f2fe' },
    { name: '--raw-info-500', hex: '#0ea5e9' },
    { name: '--raw-info-600', hex: '#0284c7' },
    { name: '--raw-info-700', hex: '#0369a1' },
  ],
};

const SPACING = [
  { token: '--spacing-0', value: '0' },
  { token: '--spacing-px', value: '1px' },
  { token: '--spacing-0-5', value: '0.125rem' },
  { token: '--spacing-1', value: '0.25rem' },
  { token: '--spacing-1-5', value: '0.375rem' },
  { token: '--spacing-2', value: '0.5rem' },
  { token: '--spacing-3', value: '0.75rem' },
  { token: '--spacing-4', value: '1rem' },
  { token: '--spacing-5', value: '1.25rem' },
  { token: '--spacing-6', value: '1.5rem' },
  { token: '--spacing-8', value: '2rem' },
  { token: '--spacing-10', value: '2.5rem' },
  { token: '--spacing-12', value: '3rem' },
  { token: '--spacing-16', value: '4rem' },
  { token: '--spacing-20', value: '5rem' },
  { token: '--spacing-24', value: '6rem' },
];

const RADII = [
  { token: '--radius-none', value: '0' },
  { token: '--radius-sm', value: '0.25rem' },
  { token: '--radius-md', value: '0.375rem' },
  { token: '--radius-lg', value: '0.5rem' },
  { token: '--radius-xl', value: '0.75rem' },
  { token: '--radius-2xl', value: '1rem' },
  { token: '--radius-3xl', value: '1.5rem' },
  { token: '--radius-full', value: '9999px' },
];

const SHADOWS = [
  { token: '--shadow-xs', label: 'xs' },
  { token: '--shadow-sm', label: 'sm' },
  { token: '--shadow-md', label: 'md' },
  { token: '--shadow-lg', label: 'lg' },
  { token: '--shadow-xl', label: 'xl' },
];

const TYPE_SCALE = [
  { token: '--font-size-xs', size: '0.75rem', label: 'xs' },
  { token: '--font-size-sm', size: '0.875rem', label: 'sm' },
  { token: '--font-size-base', size: '1rem', label: 'base' },
  { token: '--font-size-lg', size: '1.125rem', label: 'lg' },
  { token: '--font-size-xl', size: '1.25rem', label: 'xl' },
  { token: '--font-size-2xl', size: '1.5rem', label: '2xl' },
  { token: '--font-size-3xl', size: '1.875rem', label: '3xl' },
  { token: '--font-size-4xl', size: '2.25rem', label: '4xl' },
];

function TokenGallery() {
  return (
    <div style={{ fontFamily: 'var(--font-family-sans)', padding: 'var(--spacing-6)', maxWidth: '1200px' }}>
      <h1 style={{ fontSize: 'var(--font-size-3xl)', fontWeight: 'var(--font-weight-bold)', marginBottom: 'var(--spacing-2)' }}>
        Starter Design Tokens
      </h1>
      <p style={{ color: 'var(--color-text-secondary)', marginBottom: 'var(--spacing-8)' }}>
        Visual direction: Clarity | Primary: Indigo | Font: Inter
      </p>

      {/* ─── Colors ─── */}
      <section style={{ marginBottom: 'var(--spacing-12)' }}>
        <h2 style={sectionTitle}>Colors</h2>
        {Object.entries(COLORS).map(([group, swatches]) => (
          <div key={group} style={{ marginBottom: 'var(--spacing-6)' }}>
            <h3 style={{ fontSize: 'var(--font-size-sm)', fontWeight: 'var(--font-weight-semibold)', color: 'var(--color-text-secondary)', marginBottom: 'var(--spacing-2)' }}>
              {group}
            </h3>
            <div style={{ display: 'flex', gap: 'var(--spacing-1)', flexWrap: 'wrap' }}>
              {swatches.map((s) => (
                <div key={s.name} style={{ textAlign: 'center' }}>
                  <div
                    style={{
                      width: 64,
                      height: 48,
                      backgroundColor: s.hex,
                      borderRadius: 'var(--radius-lg)',
                      border: '1px solid var(--color-border-default)',
                    }}
                  />
                  <div style={{ fontSize: 'var(--font-size-xs)', color: 'var(--color-text-secondary)', marginTop: 'var(--spacing-1)' }}>
                    {s.hex}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </section>

      {/* ─── Typography ─── */}
      <section style={{ marginBottom: 'var(--spacing-12)' }}>
        <h2 style={sectionTitle}>Typography</h2>
        {TYPE_SCALE.map((t) => (
          <div key={t.label} style={{ display: 'flex', alignItems: 'baseline', gap: 'var(--spacing-4)', marginBottom: 'var(--spacing-3)' }}>
            <code style={{ fontSize: 'var(--font-size-xs)', color: 'var(--color-text-secondary)', width: 160, flexShrink: 0 }}>
              {t.token}
            </code>
            <span style={{ fontSize: `var(${t.token})`, fontWeight: 'var(--font-weight-medium)' }}>
              The quick brown fox ({t.size})
            </span>
          </div>
        ))}
      </section>

      {/* ─── Spacing ─── */}
      <section style={{ marginBottom: 'var(--spacing-12)' }}>
        <h2 style={sectionTitle}>Spacing</h2>
        {SPACING.filter((s) => s.value !== '0').map((s) => (
          <div key={s.token} style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-4)', marginBottom: 'var(--spacing-2)' }}>
            <code style={{ fontSize: 'var(--font-size-xs)', color: 'var(--color-text-secondary)', width: 160, flexShrink: 0 }}>
              {s.token}
            </code>
            <div
              style={{
                width: `var(${s.token})`,
                height: 16,
                background: 'var(--color-action-primary)',
                borderRadius: 'var(--radius-sm)',
              }}
            />
            <span style={{ fontSize: 'var(--font-size-xs)', color: 'var(--color-text-secondary)' }}>
              {s.value}
            </span>
          </div>
        ))}
      </section>

      {/* ─── Radius ─── */}
      <section style={{ marginBottom: 'var(--spacing-12)' }}>
        <h2 style={sectionTitle}>Border Radius</h2>
        <div style={{ display: 'flex', gap: 'var(--spacing-4)', flexWrap: 'wrap' }}>
          {RADII.map((r) => (
            <div key={r.token} style={{ textAlign: 'center' }}>
              <div
                style={{
                  width: 64,
                  height: 64,
                  background: 'var(--color-bg-sunken)',
                  border: '2px solid var(--color-border-strong)',
                  borderRadius: `var(${r.token})`,
                }}
              />
              <code style={{ fontSize: 'var(--font-size-xs)', color: 'var(--color-text-secondary)', display: 'block', marginTop: 'var(--spacing-1)' }}>
                {r.token.replace('--radius-', '')}
              </code>
            </div>
          ))}
        </div>
      </section>

      {/* ─── Shadows ─── */}
      <section style={{ marginBottom: 'var(--spacing-12)' }}>
        <h2 style={sectionTitle}>Shadows</h2>
        <div style={{ display: 'flex', gap: 'var(--spacing-6)', flexWrap: 'wrap' }}>
          {SHADOWS.map((s) => (
            <div key={s.token} style={{ textAlign: 'center' }}>
              <div
                style={{
                  width: 96,
                  height: 64,
                  background: 'var(--color-bg-surface)',
                  borderRadius: 'var(--radius-xl)',
                  boxShadow: `var(${s.token})`,
                }}
              />
              <code style={{ fontSize: 'var(--font-size-xs)', color: 'var(--color-text-secondary)', display: 'block', marginTop: 'var(--spacing-2)' }}>
                {s.label}
              </code>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

const sectionTitle: React.CSSProperties = {
  fontSize: 'var(--font-size-xl)',
  fontWeight: 'var(--font-weight-semibold)' as never,
  marginBottom: 'var(--spacing-4)',
  paddingBottom: 'var(--spacing-2)',
  borderBottom: '1px solid var(--color-border-default)',
};

/* ─── Story ─── */

const meta: Meta = {
  title: 'Foundations/Token Gallery',
  component: TokenGallery,
};
export default meta;

type Story = StoryObj<typeof TokenGallery>;

export const Default: Story = {};
