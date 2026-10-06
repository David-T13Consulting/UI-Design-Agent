import { User } from 'lucide-react';
import styles from './Avatar.module.css';

type AvatarSize = 16 | 20 | 24 | 28 | 32 | 40 | 52 | 80;

export interface AvatarProps {
  /** Image source URL */
  src?: string;
  /** Alt text for the image */
  alt?: string;
  /** Fallback initials (1-2 chars) */
  initials?: string;
  /** Shape of the avatar */
  shape?: 'circle' | 'rounded' | 'square';
  /** Size in pixels */
  size?: AvatarSize;
  /** Status indicator */
  status?: 'online' | 'offline' | 'busy' | 'away';
  className?: string;
}

const ICON_SIZE_MAP: Record<AvatarSize, number> = {
  16: 10,
  20: 12,
  24: 14,
  28: 16,
  32: 18,
  40: 22,
  52: 28,
  80: 40,
};

const FONT_SIZE_MAP: Record<AvatarSize, number> = {
  16: 8,
  20: 9,
  24: 10,
  28: 11,
  32: 12,
  40: 14,
  52: 18,
  80: 28,
};

const ROUNDED_RADIUS_MAP: Record<AvatarSize, number> = {
  16: 4,
  20: 4,
  24: 4,
  28: 6,
  32: 6,
  40: 6,
  52: 8,
  80: 8,
};

const STATUS_SIZE_MAP: Record<AvatarSize, number> = {
  16: 0,
  20: 0,
  24: 6,
  28: 7,
  32: 8,
  40: 10,
  52: 12,
  80: 16,
};

const STATUS_CLASS_MAP: Record<NonNullable<AvatarProps['status']>, string | undefined> = {
  online: styles.statusOnline,
  offline: styles.statusOffline,
  busy: styles.statusBusy,
  away: styles.statusAway,
};

export function Avatar({
  src,
  alt = '',
  initials,
  shape = 'circle',
  size = 32,
  status,
  className,
}: AvatarProps) {
  const shapeClass =
    shape === 'circle'
      ? styles.shapeCircle
      : shape === 'square'
        ? styles.shapeSquare
        : styles.shapeRounded;

  const rootClassName = [styles.root, shapeClass, className].filter(Boolean).join(' ');

  const borderRadius =
    shape === 'circle'
      ? '50%'
      : shape === 'square'
        ? '0'
        : `${ROUNDED_RADIUS_MAP[size]}px`;

  const showStatus = status && size >= 24;
  const statusDotSize = STATUS_SIZE_MAP[size];

  return (
    <span
      className={rootClassName}
      style={{
        width: size,
        height: size,
        borderRadius,
        fontSize: FONT_SIZE_MAP[size],
      }}
    >
      {src ? (
        <img
          className={styles.image}
          src={src}
          alt={alt}
          style={{ borderRadius }}
        />
      ) : initials ? (
        <span className={styles.initials} aria-label={alt || initials}>
          {initials.slice(0, 2).toUpperCase()}
        </span>
      ) : (
        <User size={ICON_SIZE_MAP[size]} aria-hidden="true" />
      )}

      {showStatus && (
        <span
          className={`${styles.statusDot} ${STATUS_CLASS_MAP[status]}`}
          style={{
            width: statusDotSize,
            height: statusDotSize,
          }}
          aria-label={`Status: ${status}`}
        />
      )}
    </span>
  );
}
