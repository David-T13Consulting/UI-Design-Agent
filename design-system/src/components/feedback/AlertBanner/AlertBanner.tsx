import React from 'react';
import { Info, CheckCircle, AlertTriangle, AlertCircle, X } from 'lucide-react';
import styles from './AlertBanner.module.css';

export interface AlertBannerAction {
  label: string;
  onClick: () => void;
}

/** Figma alias mapping to canonical variants */
type FigmaAlias = 'informative' | 'validation' | 'problem' | 'negative';
type CanonicalVariant = 'info' | 'success' | 'warning' | 'error';

export interface AlertBannerProps {
  variant: CanonicalVariant | FigmaAlias;
  title: string;
  message: string;
  dismissible?: boolean;
  action?: AlertBannerAction;
  onDismiss?: () => void;
}

const FIGMA_ALIAS_MAP: Record<FigmaAlias, CanonicalVariant> = {
  informative: 'info',
  validation: 'success',
  problem: 'warning',
  negative: 'error',
};

function resolveVariant(variant: CanonicalVariant | FigmaAlias): CanonicalVariant {
  return (FIGMA_ALIAS_MAP as Record<string, CanonicalVariant>)[variant] ?? (variant as CanonicalVariant);
}

const iconMap: Record<CanonicalVariant, typeof Info> = {
  info: Info,
  success: CheckCircle,
  warning: AlertTriangle,
  error: AlertCircle,
};

const variantLabelMap: Record<CanonicalVariant, string> = {
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
  const resolved = resolveVariant(variant);
  const Icon = iconMap[resolved];

  return (
    <div
      className={`${styles.root} ${styles[resolved]}`}
      role="alert"
      aria-label={`${variantLabelMap[resolved]}: ${title}`}
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
