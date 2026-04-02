import React from 'react';
import styles from './StatusBadge.module.css';

type StatusVariant = 'success' | 'warning' | 'danger' | 'info' | 'neutral';

export interface StatusBadgeProps {
  /** The status string to display */
  status: string;
  /** Maps status strings to color variants */
  statusMap: Record<string, StatusVariant>;
  /** Badge size */
  size?: 'sm' | 'md';
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({
  status,
  statusMap,
  size = 'md',
}) => {
  const variant: StatusVariant = statusMap[status] ?? 'neutral';

  return (
    <span
      className={`${styles.root} ${styles[size]} ${styles[variant]}`}
      role="status"
      aria-label={`Status: ${status}`}
    >
      <span className={styles.dot} aria-hidden="true" />
      <span className={styles.text}>{status}</span>
    </span>
  );
};
