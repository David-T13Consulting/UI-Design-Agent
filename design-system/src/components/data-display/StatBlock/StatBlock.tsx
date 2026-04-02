import React from 'react';
import { ArrowUp, ArrowDown } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import styles from './StatBlock.module.css';

export interface StatBlockDelta {
  value: number;
  direction: 'up' | 'down';
}

export interface StatBlockProps {
  /** KPI label displayed above the value */
  label: string;
  /** The primary value to display */
  value: string | number;
  /** Optional change indicator */
  delta?: StatBlockDelta;
  /** Optional icon displayed in the top-right corner */
  icon?: LucideIcon;
  /** Whether to show skeleton placeholders */
  loading?: boolean;
}

export const StatBlock: React.FC<StatBlockProps> = ({
  label,
  value,
  delta,
  icon: Icon,
  loading = false,
}) => {
  if (loading) {
    return (
      <div className={styles.root} aria-busy="true" aria-label={`Loading ${label}`}>
        <div className={styles.topRow}>
          <div className={styles.skeletonLabel} aria-hidden="true" />
          <div className={styles.skeletonIcon} aria-hidden="true" />
        </div>
        <div className={styles.skeletonValue} aria-hidden="true" />
        <div className={styles.skeletonDelta} aria-hidden="true" />
      </div>
    );
  }

  const DeltaIcon = delta?.direction === 'up' ? ArrowUp : ArrowDown;

  return (
    <div className={styles.root}>
      <div className={styles.topRow}>
        <span className={styles.label}>{label}</span>
        {Icon && (
          <span className={styles.icon} aria-hidden="true">
            <Icon size={20} />
          </span>
        )}
      </div>
      <span className={styles.value}>{value}</span>
      {delta && (
        <span
          className={`${styles.delta} ${styles[delta.direction]}`}
          aria-label={`${delta.direction === 'up' ? 'Increased' : 'Decreased'} by ${delta.value}%`}
        >
          <DeltaIcon size={14} aria-hidden="true" />
          <span>{delta.value}%</span>
        </span>
      )}
    </div>
  );
};
