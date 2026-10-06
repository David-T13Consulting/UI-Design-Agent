import React, { useState, type ReactNode } from 'react';
import type { LucideIcon } from 'lucide-react';
import { ChevronDown, ChevronLeft, ChevronRight } from 'lucide-react';
import styles from './Sidebar.module.css';

export interface SidebarItem {
  id: string;
  label: string;
  icon?: LucideIcon;
  badge?: string | number;
  children?: SidebarItem[];
}

export interface SidebarProps {
  /** Navigation items */
  items: SidebarItem[];
  /** Currently active item ID */
  activeId?: string;
  /** Callback when an item is clicked */
  onSelect?: (id: string) => void;
  /** Display mode */
  mode?: 'large' | 'short';
  /** Whether the sidebar is collapsible */
  collapsible?: boolean;
  /** Header content (e.g., logo) */
  header?: ReactNode;
  /** Footer content (e.g., user info) */
  footer?: ReactNode;
  className?: string;
}

interface SidebarItemRowProps {
  item: SidebarItem;
  activeId?: string;
  onSelect?: (id: string) => void;
  mode: 'large' | 'short';
  depth?: number;
}

const SidebarItemRow: React.FC<SidebarItemRowProps> = ({
  item,
  activeId,
  onSelect,
  mode,
  depth = 0,
}) => {
  const [expanded, setExpanded] = useState(false);
  const hasChildren = item.children && item.children.length > 0;
  const isActive = activeId === item.id;
  const isShort = mode === 'short';
  const IconComponent = item.icon;

  const handleClick = () => {
    if (hasChildren && !isShort) {
      setExpanded(!expanded);
    }
    if (onSelect) {
      onSelect(item.id);
    }
  };

  const rootClass = [
    styles.item,
    isActive ? styles.itemActive : '',
    isShort ? styles.itemShort : '',
  ]
    .filter(Boolean)
    .join(' ');

  const paddingLeft = isShort ? undefined : `calc(var(--spacing-3) + ${depth * 16}px)`;

  return (
    <>
      <button
        type="button"
        className={rootClass}
        onClick={handleClick}
        title={isShort ? item.label : undefined}
        aria-current={isActive ? 'page' : undefined}
        style={{ paddingLeft }}
      >
        {IconComponent && (
          <span className={styles.itemIcon}>
            <IconComponent size={20} aria-hidden="true" />
          </span>
        )}
        {!isShort && (
          <>
            <span className={styles.itemLabel}>{item.label}</span>
            {item.badge !== undefined && (
              <span className={styles.badge}>
                {typeof item.badge === 'number' && item.badge > 99
                  ? '99+'
                  : item.badge}
              </span>
            )}
            {hasChildren && (
              <span
                className={`${styles.chevron} ${expanded ? styles.chevronExpanded : ''}`}
              >
                <ChevronDown size={16} aria-hidden="true" />
              </span>
            )}
          </>
        )}
        {isShort && item.badge !== undefined && (
          <span className={styles.badgeDot} aria-label={`${item.badge}`} />
        )}
      </button>
      {hasChildren && expanded && !isShort && (
        <div className={styles.children}>
          {item.children!.map((child) => (
            <SidebarItemRow
              key={child.id}
              item={child}
              activeId={activeId}
              onSelect={onSelect}
              mode={mode}
              depth={depth + 1}
            />
          ))}
        </div>
      )}
    </>
  );
};

export const Sidebar: React.FC<SidebarProps> = ({
  items,
  activeId,
  onSelect,
  mode: controlledMode,
  collapsible = false,
  header,
  footer,
  className,
}) => {
  const [internalMode, setInternalMode] = useState<'large' | 'short'>(
    controlledMode ?? 'large'
  );

  const mode = controlledMode ?? internalMode;

  const toggleMode = () => {
    setInternalMode((prev) => (prev === 'large' ? 'short' : 'large'));
  };

  const rootClass = [
    styles.root,
    mode === 'short' ? styles.short : styles.large,
    className ?? '',
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <nav className={rootClass} aria-label="Sidebar navigation">
      {header && <div className={styles.header}>{header}</div>}

      <div className={styles.content}>
        {items.map((item) => (
          <SidebarItemRow
            key={item.id}
            item={item}
            activeId={activeId}
            onSelect={onSelect}
            mode={mode}
          />
        ))}
      </div>

      {footer && <div className={styles.footer}>{footer}</div>}

      {collapsible && !controlledMode && (
        <button
          type="button"
          className={styles.collapseButton}
          onClick={toggleMode}
          aria-label={mode === 'large' ? 'Collapse sidebar' : 'Expand sidebar'}
        >
          {mode === 'large' ? (
            <ChevronLeft size={16} />
          ) : (
            <ChevronRight size={16} />
          )}
        </button>
      )}
    </nav>
  );
};
