import { X } from 'lucide-react';
import { Icon } from '../../../icons/Icon';
import styles from './Badge.module.css';

export interface BadgeProps {
  label: string;
  variant?: 'neutral' | 'info' | 'success' | 'warning' | 'danger';
  size?: 'sm' | 'md';
  dismissible?: boolean;
  dot?: boolean;
  onDismiss?: () => void;
}

const VARIANT_CLASS_MAP: Record<NonNullable<BadgeProps['variant']>, string | undefined> = {
  neutral: styles.variantNeutral,
  info: styles.variantInfo,
  success: styles.variantSuccess,
  warning: styles.variantWarning,
  danger: styles.variantDanger,
};

export function Badge({
  label,
  variant = 'neutral',
  size = 'md',
  dismissible = false,
  dot = false,
  onDismiss,
}: BadgeProps) {
  const rootClassName = [
    styles.root,
    VARIANT_CLASS_MAP[variant],
    size === 'sm' ? styles.sizeSm : styles.sizeMd,
    dismissible ? styles.dismissible : '',
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <span className={rootClassName}>
      {dot && <span className={styles.dot} aria-hidden="true" />}
      <span className={styles.label}>{label}</span>
      {dismissible && (
        <button
          type="button"
          className={styles.dismissButton}
          onClick={onDismiss}
          aria-label={`Dismiss ${label}`}
        >
          <Icon icon={X} size="xs" />
        </button>
      )}
    </span>
  );
}
