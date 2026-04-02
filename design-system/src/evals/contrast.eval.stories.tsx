import type { Meta, StoryObj } from '@storybook/react';

/* ─── WCAG Contrast Utilities ─── */

function hexToRgb(hex: string): [number, number, number] {
  const clean = hex.replace('#', '');
  return [
    parseInt(clean.slice(0, 2), 16),
    parseInt(clean.slice(2, 4), 16),
    parseInt(clean.slice(4, 6), 16),
  ];
}

function getRelativeLuminance(hex: string): number {
  const linear = hexToRgb(hex).map((c) => {
    const s = c / 255;
    return s <= 0.03928 ? s / 12.92 : Math.pow((s + 0.055) / 1.055, 2.4);
  });
  return 0.2126 * (linear[0] ?? 0) + 0.7152 * (linear[1] ?? 0) + 0.0722 * (linear[2] ?? 0);
}

function getContrastRatio(hex1: string, hex2: string): number {
  const l1 = getRelativeLuminance(hex1);
  const l2 = getRelativeLuminance(hex2);
  const lighter = Math.max(l1, l2);
  const darker = Math.min(l1, l2);
  return (lighter + 0.05) / (darker + 0.05);
}

type ContrastLevel = 'normal' | 'large' | 'ui';

interface TokenPair {
  fg: string;
  fgHex: string;
  bg: string;
  bgHex: string;
  level: ContrastLevel;
}

function getAAThreshold(level: ContrastLevel): number {
  return level === 'normal' ? 4.5 : 3;
}

function getAAAThreshold(level: ContrastLevel): number {
  if (level === 'normal') return 7;
  if (level === 'large') return 4.5;
  return 3;
}

/* ─── Token Pairs ─── */

const TOKEN_PAIRS: TokenPair[] = [
  { fg: 'color-text-primary', fgHex: '#111827', bg: 'color-bg-surface', bgHex: '#ffffff', level: 'normal' },
  { fg: 'color-text-primary', fgHex: '#111827', bg: 'color-bg-subtle', bgHex: '#f9fafb', level: 'normal' },
  { fg: 'color-text-primary', fgHex: '#111827', bg: 'color-bg-sunken', bgHex: '#f3f4f6', level: 'normal' },
  { fg: 'color-text-secondary', fgHex: '#6b7280', bg: 'color-bg-surface', bgHex: '#ffffff', level: 'normal' },
  { fg: 'color-text-secondary', fgHex: '#6b7280', bg: 'color-bg-subtle', bgHex: '#f9fafb', level: 'normal' },
  { fg: 'color-text-disabled', fgHex: '#9ca3af', bg: 'color-bg-surface', bgHex: '#ffffff', level: 'normal' },
  { fg: 'color-text-inverse', fgHex: '#ffffff', bg: 'color-action-primary', bgHex: '#4f46e5', level: 'normal' },
  { fg: 'color-text-inverse', fgHex: '#ffffff', bg: 'color-action-primary-hover', bgHex: '#4338ca', level: 'normal' },
  { fg: 'color-text-inverse', fgHex: '#ffffff', bg: 'color-action-primary-active', bgHex: '#3730a3', level: 'normal' },
  { fg: 'color-feedback-success', fgHex: '#059669', bg: 'color-feedback-success-subtle', bgHex: '#ecfdf5', level: 'normal' },
  { fg: 'color-feedback-warning', fgHex: '#d97706', bg: 'color-feedback-warning-subtle', bgHex: '#fffbeb', level: 'large' },
  { fg: 'color-feedback-danger', fgHex: '#e11d48', bg: 'color-feedback-danger-subtle', bgHex: '#fff1f2', level: 'normal' },
  { fg: 'color-feedback-info', fgHex: '#0284c7', bg: 'color-feedback-info-subtle', bgHex: '#f0f9ff', level: 'normal' },
  { fg: 'color-border-default', fgHex: '#e5e7eb', bg: 'color-bg-surface', bgHex: '#ffffff', level: 'ui' },
  { fg: 'color-border-strong', fgHex: '#d1d5db', bg: 'color-bg-surface', bgHex: '#ffffff', level: 'ui' },
  { fg: 'color-border-focus', fgHex: '#6366f1', bg: 'color-bg-surface', bgHex: '#ffffff', level: 'ui' },
];

/* ─── Contrast Audit Component ─── */

function ContrastAudit() {
  const results = TOKEN_PAIRS.map((pair) => {
    const ratio = getContrastRatio(pair.fgHex, pair.bgHex);
    const aaThreshold = getAAThreshold(pair.level);
    const aaaThreshold = getAAAThreshold(pair.level);
    return {
      ...pair,
      ratio,
      aaPass: ratio >= aaThreshold,
      aaaPass: ratio >= aaaThreshold,
    };
  });

  const aaPassCount = results.filter((r) => r.aaPass).length;
  const aaaPassCount = results.filter((r) => r.aaaPass).length;

  return (
    <div style={{ fontFamily: 'var(--font-family-sans)', padding: 'var(--spacing-6)' }}>
      <h2 style={{ fontSize: 'var(--font-size-2xl)', fontWeight: 'var(--font-weight-bold)', marginBottom: 'var(--spacing-2)' }}>
        Contrast Audit
      </h2>
      <p style={{ color: 'var(--color-text-secondary)', marginBottom: 'var(--spacing-6)' }}>
        WCAG AA: {aaPassCount}/{results.length} pass | WCAG AAA: {aaaPassCount}/{results.length} pass
      </p>
      <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 'var(--font-size-sm)' }}>
        <thead>
          <tr style={{ borderBottom: '2px solid var(--color-border-default)' }}>
            <th style={thStyle}>Token Pair</th>
            <th style={thStyle}>Preview</th>
            <th style={thStyle}>Ratio</th>
            <th style={thStyle}>Level</th>
            <th style={thStyle}>AA</th>
            <th style={thStyle}>AAA</th>
          </tr>
        </thead>
        <tbody>
          {results.map((r, i) => (
            <tr key={i} style={{ borderBottom: '1px solid var(--color-border-default)' }}>
              <td style={tdStyle}>
                <code style={{ fontSize: 'var(--font-size-xs)' }}>
                  {r.fg}<br />on {r.bg}
                </code>
              </td>
              <td style={tdStyle}>
                <span
                  style={{
                    display: 'inline-block',
                    padding: 'var(--spacing-1) var(--spacing-3)',
                    backgroundColor: r.bgHex,
                    color: r.fgHex,
                    borderRadius: 'var(--radius-md)',
                    fontWeight: 'var(--font-weight-medium)',
                    border: '1px solid var(--color-border-default)',
                  }}
                >
                  Sample
                </span>
              </td>
              <td style={{ ...tdStyle, fontFamily: 'var(--font-family-mono)' }}>
                {r.ratio.toFixed(2)}:1
              </td>
              <td style={tdStyle}>{r.level}</td>
              <td style={tdStyle}>
                <span style={{ color: r.aaPass ? 'var(--color-feedback-success)' : 'var(--color-feedback-danger)', fontWeight: 'var(--font-weight-semibold)' }}>
                  {r.aaPass ? 'PASS' : 'FAIL'}
                </span>
              </td>
              <td style={tdStyle}>
                <span style={{ color: r.aaaPass ? 'var(--color-feedback-success)' : 'var(--color-feedback-danger)', fontWeight: 'var(--font-weight-semibold)' }}>
                  {r.aaaPass ? 'PASS' : 'FAIL'}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

const thStyle: React.CSSProperties = {
  textAlign: 'left',
  padding: 'var(--spacing-2) var(--spacing-3)',
  fontWeight: 'var(--font-weight-semibold)' as never,
  color: 'var(--color-text-secondary)',
};

const tdStyle: React.CSSProperties = {
  padding: 'var(--spacing-2) var(--spacing-3)',
  verticalAlign: 'middle',
};

/* ─── Story ─── */

const meta: Meta = {
  title: 'Evals/Contrast Audit',
  component: ContrastAudit,
};
export default meta;

type Story = StoryObj<typeof ContrastAudit>;

export const Default: Story = {};
