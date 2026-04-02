import React from 'react';
import { Info, CheckCircle, AlertTriangle, AlertCircle, X } from 'lucide-react';
import styles from './AlertBanner.module.css';

export interface AlertBannerAction {
  label: string;
  onClick: () => void;
}

export interface AlertBannerProps {
  variant: 'info' | 'success' | 'warning' | 'error';
  title: string;
  message: string;
  dismissible?: boolean;
  action?: AlertBannerAction;
  onDismiss?: () => void;
}

const iconMap = {
  info: Info,
  success: CheckCircle,
  warning: AlertTriangle,
  error: AlertCircle,
} as const;

const variantLabelMap: Record<AlertBannerProps['variant'], string> = {
  info: 'Information',
  success: 'Success',
  warning: 'Warning',
  error: 'Error',
};

export const AlertBanner: React.FC<AlertBannerProps> = ({
  variant,
  title,
  message,
  dismissible = false,
  action,
  onDismiss,
}) => {
  const Icon = iconMap[variant];

  return (
    <div
      className={`${styles.root} ${styles[variant]}`}
      role="alert"
      aria-label={`${variantLabelMap[variant]}: ${title}`}
    >
      <div className={styles.iconWrapper} aria-hidden="true">
        <Icon className={styles.icon} size={20} />
      </div>

      <div className={styles.content}>
        <p className={styles.title}>{title}</p>
        <p className={styles.message}>{message}</p>
      </div>

      {action && (
        <button
          type="button"
          className={styles.actionButton}
          onClick={action.onClick}
          aria-label={action.label}
        >
          {action.label}
        </button>
      )}

      {dismissible && onDismiss && (
        <button
          type="button"
          className={styles.dismissButton}
          onClick={onDismiss}
          aria-label="Dismiss alert"
        >
          <X size={16} />
        </button>
      )}
    </div>
  );
};
