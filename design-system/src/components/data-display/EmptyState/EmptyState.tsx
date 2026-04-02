import React from 'react';
import type { LucideIcon } from 'lucide-react';
import styles from './EmptyState.module.css';

export interface EmptyStateAction {
  label: string;
  onClick: () => void;
}

export interface EmptyStateProps {
  /** Large centered icon */
  icon: LucideIcon;
  /** Title text */
  title: string;
  /** Descriptive text below the title */
  description?: string;
  /** Optional action button */
  action?: EmptyStateAction;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  icon: Icon,
  title,
  description,
  action,
}) => {
  return (
    <div className={styles.root} role="status">
      <div className={styles.iconWrapper} aria-hidden="true">
        <Icon size={48} />
      </div>
      <h3 className={styles.title}>{title}</h3>
      {description && <p className={styles.description}>{description}</p>}
      {action && (
        <button
          type="button"
          className={styles.action}
          onClick={action.onClick}
          aria-label={action.label}
        >
          {action.label}
        </button>
      )}
    </div>
  );
};
