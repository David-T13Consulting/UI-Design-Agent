import { type LucideIcon } from 'lucide-react';
import styles from './IconBadge.module.css';

export interface IconBadgeProps {
  icon: LucideIcon;
  /** Container style */
  variant?: 'outline' | 'filled';
  /** Container shape */
  shape?: 'circle' | 'square' | 'normal';
  /** Size */
  size?: 'sm' | 'lg';
  /** Color variant */
  color?: 'primary' | 'success' | 'warning' | 'danger' | 'info' | 'neutral';
  /** Accessible label */
  label?: string;
  className?: string;
}

const ICON_SIZE_MAP: Record<NonNullable<IconBadgeProps['size']>, number> = {
  sm: 14,
  lg: 20,
};

const COLOR_CLASS_MAP: Record<NonNullable<IconBadgeProps['color']>, string | undefined> = {
  primary: styles.colorPrimary,
  success: styles.colorSuccess,
  warning: styles.colorWarning,
  danger: styles.colorDanger,
  info: styles.colorInfo,
  neutral: styles.colorNeutral,
};

const VARIANT_CLASS_MAP: Record<NonNullable<IconBadgeProps['variant']>, string | undefined> = {
  outline: styles.variantOutline,
  filled: styles.variantFilled,
};

const SHAPE_CLASS_MAP: Record<NonNullable<IconBadgeProps['shape']>, string | undefined> = {
  circle: styles.shapeCircle,
  square: styles.shapeSquare,
  normal: styles.shapeNormal,
};

const SIZE_CLASS_MAP: Record<NonNullable<IconBadgeProps['size']>, string | undefined> = {
  sm: styles.sizeSm,
  lg: styles.sizeLg,
};

export function IconBadge({
  icon: LucideIcon,
  variant = 'filled',
  shape = 'circle',
  size = 'sm',
  color = 'primary',
  label,
  className,
}: IconBadgeProps) {
  const rootClassName = [
    styles.root,
    VARIANT_CLASS_MAP[variant],
    SHAPE_CLASS_MAP[shape],
    SIZE_CLASS_MAP[size],
    COLOR_CLASS_MAP[color],
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <span
      className={rootClassName}
      role={label ? 'img' : 'presentation'}
      aria-label={label}
      aria-hidden={!label}
    >
      <LucideIcon size={ICON_SIZE_MAP[size]} />
    </span>
  );
}
