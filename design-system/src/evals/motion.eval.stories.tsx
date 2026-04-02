import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';

/* ─── Motion Token Definitions ─── */

interface MotionToken {
  name: string;
  cssVar: string;
  value: string;
  easing: string;
  easingVar: string;
  intendedUse: string;
}

const MOTION_TOKENS: MotionToken[] = [
  {
    name: 'instant',
    cssVar: '--motion-duration-instant',
    value: '50ms',
    easing: 'productive-standard',
    easingVar: '--motion-ease-productive-standard',
    intendedUse: 'Press feedback, micro-interactions',
  },
  {
    name: 'fast',
    cssVar: '--motion-duration-fast',
    value: '100ms',
    easing: 'productive-standard',
    easingVar: '--motion-ease-productive-standard',
    intendedUse: 'Hover states, toggles, focus rings',
  },
  {
    name: 'normal',
    cssVar: '--motion-duration-normal',
    value: '200ms',
    easing: 'productive-standard',
    easingVar: '--motion-ease-productive-standard',
    intendedUse: 'Dropdowns, tooltips, state changes',
  },
  {
    name: 'slow',
    cssVar: '--motion-duration-slow',
    value: '300ms',
    easing: 'productive-enter',
    easingVar: '--motion-ease-productive-enter',
    intendedUse: 'Modals, alerts, panels entering',
  },
  {
    name: 'slower',
    cssVar: '--motion-duration-slower',
    value: '400ms',
    easing: 'productive-enter',
    easingVar: '--motion-ease-productive-enter',
    intendedUse: 'Drawers, sidebar collapse/expand',
  },
  {
    name: 'page',
    cssVar: '--motion-duration-page',
    value: '500ms',
    easing: 'productive-enter',
    easingVar: '--motion-ease-productive-enter',
    intendedUse: 'Page transitions, empty state entrance',
  },
];

interface EasingToken {
  name: string;
  cssVar: string;
  value: string;
  category: 'productive' | 'expressive';
  use: string;
}

const EASING_TOKENS: EasingToken[] = [
  { name: 'productive-standard', cssVar: '--motion-ease-productive-standard', value: 'cubic-bezier(0.2, 0, 0.38, 0.9)', category: 'productive', use: 'Default for most interactions' },
  { name: 'productive-enter', cssVar: '--motion-ease-productive-enter', value: 'cubic-bezier(0, 0, 0.38, 0.9)', category: 'productive', use: 'Elements entering the screen' },
  { name: 'productive-exit', cssVar: '--motion-ease-productive-exit', value: 'cubic-bezier(0.2, 0, 1, 0.9)', category: 'productive', use: 'Elements leaving the screen' },
  { name: 'expressive-enter', cssVar: '--motion-ease-expressive-enter', value: 'cubic-bezier(0, 0, 0.3, 1)', category: 'expressive', use: 'Delight moments entering' },
  { name: 'expressive-exit', cssVar: '--motion-ease-expressive-exit', value: 'cubic-bezier(0.4, 0, 1, 1)', category: 'expressive', use: 'Delight moments exiting' },
  { name: 'expressive-bounce', cssVar: '--motion-ease-expressive-bounce', value: 'cubic-bezier(0.34, 1.56, 0.64, 1)', category: 'expressive', use: 'Playful overshoot (radio dots, toggles)' },
];

/* ─── Flag Logic ─── */

function getFlags(token: MotionToken): string[] {
  const flags: string[] = [];
  const ms = parseInt(token.value);
  if (ms > 500) flags.push('May feel sluggish');
  if (ms < 50) flags.push('May be imperceptible');
  return flags;
}

/* ─── Motion Audit Component ─── */

function MotionAudit() {
  const [playing, setPlaying] = useState<Record<string, boolean>>({});
  const [reducedMotion, setReducedMotion] = useState(false);

  const triggerAnimation = (name: string) => {
    setPlaying((prev) => ({ ...prev, [name]: false }));
    requestAnimationFrame(() => {
      setPlaying((prev) => ({ ...prev, [name]: true }));
    });
  };

  return (
    <div style={{ fontFamily: 'var(--font-family-sans)', padding: 'var(--spacing-6)' }}>
      <h2 style={{ fontSize: 'var(--font-size-2xl)', fontWeight: 'var(--font-weight-bold)', marginBottom: 'var(--spacing-2)' }}>
        Motion Audit
      </h2>
      <p style={{ color: 'var(--color-text-secondary)', marginBottom: 'var(--spacing-6)' }}>
        {MOTION_TOKENS.length} duration tokens | {EASING_TOKENS.length} easing curves
      </p>

      {/* Reduced motion toggle */}
      <div style={{ marginBottom: 'var(--spacing-6)', padding: 'var(--spacing-3) var(--spacing-4)', background: 'var(--color-bg-subtle)', borderRadius: 'var(--radius-lg)', display: 'flex', alignItems: 'center', gap: 'var(--spacing-3)' }}>
        <label style={{ fontWeight: 'var(--font-weight-medium)', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 'var(--spacing-2)' }}>
          <input type="checkbox" checked={reducedMotion} onChange={(e) => setReducedMotion(e.target.checked)} />
          Simulate prefers-reduced-motion
        </label>
        {reducedMotion && (
          <span style={{ color: 'var(--color-feedback-warning)', fontSize: 'var(--font-size-sm)' }}>
            All durations collapse to 0.01ms
          </span>
        )}
      </div>

      {/* Duration tokens table */}
      <h3 style={{ fontSize: 'var(--font-size-lg)', fontWeight: 'var(--font-weight-semibold)', marginBottom: 'var(--spacing-3)' }}>
        Duration Tokens
      </h3>
      <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 'var(--font-size-sm)', marginBottom: 'var(--spacing-8)' }}>
        <thead>
          <tr style={{ borderBottom: '2px solid var(--color-border-default)' }}>
            <th style={thStyle}>Token</th>
            <th style={thStyle}>Value</th>
            <th style={thStyle}>Easing</th>
            <th style={thStyle}>Use</th>
            <th style={thStyle}>Preview</th>
            <th style={thStyle}>Flags</th>
          </tr>
        </thead>
        <tbody>
          {MOTION_TOKENS.map((token) => {
            const flags = getFlags(token);
            const duration = reducedMotion ? '0.01ms' : token.value;
            return (
              <tr key={token.name} style={{ borderBottom: '1px solid var(--color-border-default)' }}>
                <td style={tdStyle}>
                  <code style={{ fontSize: 'var(--font-size-xs)' }}>{token.cssVar}</code>
                </td>
                <td style={{ ...tdStyle, fontFamily: 'var(--font-family-mono)' }}>
                  {reducedMotion ? <s>{token.value}</s> : token.value}
                  {reducedMotion && ' → 0.01ms'}
                </td>
                <td style={tdStyle}>{token.easing}</td>
                <td style={tdStyle}>{token.intendedUse}</td>
                <td style={tdStyle}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-2)' }}>
                    <div
                      style={{
                        width: '200px',
                        height: '8px',
                        background: 'var(--color-bg-sunken)',
                        borderRadius: 'var(--radius-full)',
                        overflow: 'hidden',
                        position: 'relative',
                      }}
                    >
                      <div
                        style={{
                          position: 'absolute',
                          left: 0,
                          top: 0,
                          height: '100%',
                          width: playing[token.name] ? '100%' : '0%',
                          background: 'var(--color-action-primary)',
                          borderRadius: 'var(--radius-full)',
                          transition: `width ${duration} ${token.easingVar ? `var(${token.easingVar})` : 'ease'}`,
                        }}
                      />
                    </div>
                    <button
                      onClick={() => triggerAnimation(token.name)}
                      style={{
                        fontSize: 'var(--font-size-xs)',
                        padding: 'var(--spacing-1) var(--spacing-2)',
                        borderRadius: 'var(--radius-md)',
                        border: '1px solid var(--color-border-default)',
                        background: 'var(--color-bg-surface)',
                        cursor: 'pointer',
                      }}
                    >
                      Play
                    </button>
                  </div>
                </td>
                <td style={tdStyle}>
                  {flags.map((flag) => (
                    <span
                      key={flag}
                      style={{
                        display: 'inline-block',
                        fontSize: 'var(--font-size-xs)',
                        padding: 'var(--spacing-0-5) var(--spacing-2)',
                        background: 'var(--color-feedback-warning-subtle)',
                        color: 'var(--color-feedback-warning)',
                        borderRadius: 'var(--radius-full)',
                      }}
                    >
                      {flag}
                    </span>
                  ))}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>

      {/* Easing curves table */}
      <h3 style={{ fontSize: 'var(--font-size-lg)', fontWeight: 'var(--font-weight-semibold)', marginBottom: 'var(--spacing-3)' }}>
        Easing Curves
      </h3>
      <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 'var(--font-size-sm)' }}>
        <thead>
          <tr style={{ borderBottom: '2px solid var(--color-border-default)' }}>
            <th style={thStyle}>Token</th>
            <th style={thStyle}>Category</th>
            <th style={thStyle}>Value</th>
            <th style={thStyle}>Use</th>
          </tr>
        </thead>
        <tbody>
          {EASING_TOKENS.map((token) => (
            <tr key={token.name} style={{ borderBottom: '1px solid var(--color-border-default)' }}>
              <td style={tdStyle}>
                <code style={{ fontSize: 'var(--font-size-xs)' }}>{token.cssVar}</code>
              </td>
              <td style={tdStyle}>
                <span
                  style={{
                    fontSize: 'var(--font-size-xs)',
                    padding: 'var(--spacing-0-5) var(--spacing-2)',
                    borderRadius: 'var(--radius-full)',
                    background: token.category === 'productive' ? 'var(--color-feedback-info-subtle)' : 'var(--color-feedback-success-subtle)',
                    color: token.category === 'productive' ? 'var(--color-feedback-info)' : 'var(--color-feedback-success)',
                  }}
                >
                  {token.category}
                </span>
              </td>
              <td style={{ ...tdStyle, fontFamily: 'var(--font-family-mono)', fontSize: 'var(--font-size-xs)' }}>
                {token.value}
              </td>
              <td style={tdStyle}>{token.use}</td>
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
  color: 'var(--color-text-secondary)',
};

const tdStyle: React.CSSProperties = {
  padding: 'var(--spacing-2) var(--spacing-3)',
  verticalAlign: 'middle',
};

/* ─── Story ─── */

const meta: Meta = {
  title: 'Evals/Motion Audit',
  component: MotionAudit,
};
export default meta;

type Story = StoryObj<typeof MotionAudit>;

export const Default: Story = {};
