import { forwardRef, type ReactNode, type HTMLAttributes } from 'react';
import styles from './ListItem.module.css';

type ListItemSize = 'short' | 'medium' | 'large';
type ListItemType = 'primary' | 'secondary';

export interface ListItemProps extends Omit<HTMLAttributes<HTMLDivElement>, 'type'> {
  /** Content of the list item */
  children: ReactNode;
  /** Size variant */
  size?: ListItemSize;
  /** Visual priority */
  type?: ListItemType;
  /** Whether the item is selected */
  selected?: boolean;
  /** Whether the item is disabled */
  disabled?: boolean;
  /** Error state */
  error?: boolean;
  /** Leading content (icon, avatar, etc.) */
  leading?: ReactNode;
  /** Trailing content (action, badge, etc.) */
  trailing?: ReactNode;
  /** Secondary text line (for medium/large sizes) */
  description?: string;
  /** Click handler */
  onClick?: () => void;
  className?: string;
}

export const ListItem = forwardRef<HTMLDivElement, ListItemProps>(function ListItem(
  {
    children,
    size = 'medium',
    type = 'primary',
    selected = false,
    disabled = false,
    error = false,
    leading,
    trailing,
    description,
    onClick,
    className,
    ...rest
  },
  ref
) {
  const classNames = [
    styles.root,
    styles[size],
    styles[type],
    selected ? styles.selected : '',
    disabled ? styles.disabled : '',
    error ? styles.error : '',
    onClick ? styles.clickable : '',
    className ?? '',
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div
      ref={ref}
      className={classNames}
      role={onClick ? 'button' : undefined}
      tabIndex={onClick && !disabled ? 0 : undefined}
      aria-selected={selected || undefined}
      aria-disabled={disabled || undefined}
      onClick={!disabled ? onClick : undefined}
      onKeyDown={
        onClick && !disabled
          ? (e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                onClick();
              }
            }
          : undefined
      }
      {...rest}
    >
      {leading && <span className={styles.leading}>{leading}</span>}
      <span className={styles.content}>
        <span className={styles.label}>{children}</span>
        {description && size !== 'short' && (
          <span className={styles.description}>{description}</span>
        )}
      </span>
      {trailing && <span className={styles.trailing}>{trailing}</span>}
    </div>
  );
});
