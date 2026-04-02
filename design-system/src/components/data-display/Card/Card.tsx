import React from 'react';
import styles from './Card.module.css';

export interface CardProps {
  /** Card content */
  children: React.ReactNode;
  /** Internal padding */
  padding?: 'sm' | 'md' | 'lg';
  /** Shadow elevation */
  shadow?: 'sm' | 'md' | 'lg';
  /** Whether card has hover interaction */
  interactive?: boolean;
  /** Optional header section */
  header?: React.ReactNode;
  /** Optional footer section */
  footer?: React.ReactNode;
  /** Click handler (makes the card behave as a button) */
  onClick?: () => void;
}

export const Card: React.FC<CardProps> = ({
  children,
  padding = 'md',
  shadow = 'sm',
  interactive = false,
  header,
  footer,
  onClick,
}) => {
  const paddingClass = styles[`padding-${padding}`];
  const shadowClass = styles[`shadow-${shadow}`];
  const isClickable = interactive && onClick;

  const rootClassName = [
    styles.root,
    shadowClass,
    interactive ? styles.interactive : '',
  ]
    .filter(Boolean)
    .join(' ');

  const content = (
    <>
      {header && (
        <div className={`${styles.header} ${paddingClass}`}>{header}</div>
      )}
      <div className={paddingClass}>{children}</div>
      {footer && (
        <div className={`${styles.footer} ${paddingClass}`}>{footer}</div>
      )}
    </>
  );

  if (isClickable) {
    return (
      <div
        className={rootClassName}
        role="button"
        tabIndex={0}
        onClick={onClick}
        onKeyDown={(e: React.KeyboardEvent) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            onClick();
          }
        }}
      >
        {content}
      </div>
    );
  }

  return <div className={rootClassName}>{content}</div>;
};
