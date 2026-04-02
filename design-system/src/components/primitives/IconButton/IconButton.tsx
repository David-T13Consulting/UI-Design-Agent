import { forwardRef, type ButtonHTMLAttributes } from 'react';
import { type LucideIcon } from 'lucide-react';
import { Icon } from '@/icons';
import styles from './IconButton.module.css';

type IconButtonVariant = 'default' | 'ghost' | 'destructive';
type IconButtonSize = 'sm' | 'md' | 'lg';

const ICON_SIZE_MAP: Record<IconButtonSize, 'sm' | 'md' | 'lg'> = {
  sm: 'sm',
  md: 'md',
  lg: 'md',
};

export interface IconButtonProps
  extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'children'> {
  /** The Lucide icon to render */
  icon: LucideIcon;
  /** Accessible label (required for screen readers) */
  label: string;
  /** Visual style variant */
  variant?: IconButtonVariant;
  /** Size of the icon button */
  size?: IconButtonSize;
}

export const IconButton = forwardRef<HTMLButtonElement, IconButtonProps>(
  function IconButton(
    { icon, label, variant = 'default', size = 'md', className, disabled, ...rest },
    ref
  ) {
    const classNames = [styles.root, styles[variant], styles[size], className ?? '']
      .filter(Boolean)
      .join(' ');

    return (
      <button
        ref={ref}
        className={classNames}
        aria-label={label}
        disabled={disabled}
        {...rest}
      >
        <Icon icon={icon} size={ICON_SIZE_MAP[size]} />
      </button>
    );
  }
);
