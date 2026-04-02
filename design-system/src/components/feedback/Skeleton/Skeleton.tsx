import React from 'react';
import styles from './Skeleton.module.css';

export interface SkeletonProps {
  variant?: 'text' | 'heading' | 'circle' | 'rect' | 'card';
  width?: string | number;
  height?: string | number;
  lines?: number;
}

const resolveSize = (value: string | number | undefined): string | undefined => {
  if (value === undefined) return undefined;
  return typeof value === 'number' ? `${value}px` : value;
};

const TextLines: React.FC<{ count: number }> = ({ count }) => {
  const lineElements: React.ReactElement[] = [];
  for (let i = 0; i < count; i++) {
    const isLast = i === count - 1 && count > 1;
    lineElements.push(
      <div
        key={i}
        className={`${styles.bone} ${styles.textLine}`}
        style={isLast ? { width: '70%' } : undefined}
        aria-hidden="true"
      />
    );
  }
  return <>{lineElements}</>;
};

export const Skeleton: React.FC<SkeletonProps> = ({
  variant = 'text',
  width,
  height,
  lines = 3,
}) => {
  const w = resolveSize(width);
  const h = resolveSize(height);

  if (variant === 'text') {
    return (
      <div
        className={styles.root}
        style={{ width: w }}
        role="status"
        aria-label="Loading content"
        aria-busy="true"
      >
        <TextLines count={lines} />
      </div>
    );
  }

  if (variant === 'heading') {
    return (
      <div
        className={`${styles.bone} ${styles.heading}`}
        style={{ width: w, height: h }}
        role="status"
        aria-label="Loading content"
        aria-busy="true"
      />
    );
  }

  if (variant === 'circle') {
    return (
      <div
        className={`${styles.bone} ${styles.circle}`}
        style={{
          width: w || '48px',
          height: h || w || '48px',
        }}
        role="status"
        aria-label="Loading content"
        aria-busy="true"
      />
    );
  }

  if (variant === 'rect') {
    return (
      <div
        className={`${styles.bone} ${styles.rect}`}
        style={{
          width: w || '100%',
          height: h || '120px',
        }}
        role="status"
        aria-label="Loading content"
        aria-busy="true"
      />
    );
  }

  /* variant === 'card' */
  return (
    <div
      className={styles.card}
      style={{ width: w }}
      role="status"
      aria-label="Loading content"
      aria-busy="true"
    >
      <div className={`${styles.bone} ${styles.cardHeader}`} />
      <div className={styles.cardBody}>
        <TextLines count={3} />
      </div>
    </div>
  );
};
