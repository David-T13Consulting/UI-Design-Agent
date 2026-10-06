import { forwardRef, type ButtonHTMLAttributes, type ReactNode } from 'react';
import { type LucideIcon } from 'lucide-react';
import { Icon } from '@/icons';
import styles from './Button.module.css';

type ButtonVariant = 'filled' | 'outlined' | 'text';
type ButtonColor = 'primary' | 'destructive' | 'neutral';
type ButtonSize = 'xs' | 'sm' | 'md' | 'lg';

const ICON_SIZE_MAP: Record<ButtonSize, 'xs' | 'sm' | 'md' | 'lg'> = {
  xs: 'xs',
  sm: 'sm',
  md: 'sm',
  lg: 'md',
};

const COLOR_CLASS_MAP: Record<ButtonColor, string> = {
  primary: styles.colorPrimary ?? '',
  destructive: styles.colorDestructive ?? '',
  neutral: styles.colorNeutral ?? '',
};

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  /** Visual style variant */
  variant?: ButtonVariant;
  /** Color scheme applied to the variant */
  color?: ButtonColor;
  /** Size of the button */
  size?: ButtonSize;
  /** Shows a loading spinner and disables interaction */
  loading?: boolean;
  /** Icon displayed before children */
  iconLeft?: LucideIcon;
  /** Icon displayed after children */
  iconRight?: LucideIcon;
  /** Stretches button to full container width */
  fullWidth?: boolean;
  /** Controlled pressed appearance */
  pressed?: boolean;
  children?: ReactNode;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(function Button(
  {
    variant = 'filled',
    color = 'primary',
    size = 'md',
    loading = false,
    disabled = false,
    iconLeft,
    iconRight,
    fullWidth = false,
    pressed = false,
    children,
    className,
    ...rest
  },
  ref
) {
  const classNames = [
    styles.root,
    styles[variant],
    COLOR_CLASS_MAP[color],
    styles[size],
    fullWidth ? styles.fullWidth : '',
    loading ? styles.loading : '',
    pressed ? styles.pressed : '',
    className ?? '',
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <button
      ref={ref}
      className={classNames}
      disabled={disabled || loading}
      aria-busy={loading || undefined}
      aria-disabled={disabled || loading || undefined}
      aria-pressed={pressed || undefined}
      {...rest}
    >
      {iconLeft && (
        <span className={styles.iconLeft}>
          <Icon icon={iconLeft} size={ICON_SIZE_MAP[size]} />
        </span>
      )}
      {children}
      {iconRight && (
        <span className={styles.iconRight}>
          <Icon icon={iconRight} size={ICON_SIZE_MAP[size]} />
        </span>
      )}
      {loading && (
        <span className={styles.spinner} aria-hidden="true">
          <span className={styles.spinnerIcon} />
        </span>
      )}
    </button>
  );
});
