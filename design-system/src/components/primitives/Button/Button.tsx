import { forwardRef, type ButtonHTMLAttributes, type ReactNode } from 'react';
import { type LucideIcon } from 'lucide-react';
import { Icon } from '@/icons';
import styles from './Button.module.css';

type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'destructive' | 'link';
type ButtonSize = 'xs' | 'sm' | 'md' | 'lg';

const ICON_SIZE_MAP: Record<ButtonSize, 'xs' | 'sm' | 'md' | 'lg'> = {
  xs: 'xs',
  sm: 'sm',
  md: 'sm',
  lg: 'md',
};

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  /** Visual style variant */
  variant?: ButtonVariant;
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
  children?: ReactNode;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(function Button(
  {
    variant = 'primary',
    size = 'md',
    loading = false,
    disabled = false,
    iconLeft,
    iconRight,
    fullWidth = false,
    children,
    className,
    ...rest
  },
  ref
) {
  const classNames = [
    styles.root,
    styles[variant],
    styles[size],
    fullWidth ? styles.fullWidth : '',
    loading ? styles.loading : '',
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
