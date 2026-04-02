import React from 'react';
import { ArrowLeft } from 'lucide-react';
import { Breadcrumb } from '../Breadcrumb';
import type { BreadcrumbProps } from '../Breadcrumb';
import styles from './PageHeader.module.css';

export interface PageHeaderProps {
  title: string;
  subtitle?: string;
  breadcrumb?: BreadcrumbProps;
  actions?: React.ReactNode;
  backAction?: () => void;
}

export const PageHeader: React.FC<PageHeaderProps> = ({
  title,
  subtitle,
  breadcrumb,
  actions,
  backAction,
}) => {
  return (
    <header className={styles.root}>
      {breadcrumb && (
        <div className={styles.breadcrumb}>
          <Breadcrumb {...breadcrumb} />
        </div>
      )}
      <div className={styles.content}>
        <div className={styles.titleGroup}>
          {backAction && (
            <button
              type="button"
              className={styles.backButton}
              onClick={backAction}
              aria-label="Go back"
            >
              <ArrowLeft size={20} aria-hidden="true" />
            </button>
          )}
          <div className={styles.text}>
            <h1 className={styles.title}>{title}</h1>
            {subtitle && <p className={styles.subtitle}>{subtitle}</p>}
          </div>
        </div>
        {actions && <div className={styles.actions}>{actions}</div>}
      </div>
    </header>
  );
};
