import React from 'react';
import type { LucideIcon } from 'lucide-react';
import styles from './NavItem.module.css';

export interface NavItemProps {
  label: string;
  icon: LucideIcon;
  href: string;
  active?: boolean;
  badge?: number;
  collapsed?: boolean;
  onClick?: () => void;
}

export const NavItem: React.FC<NavItemProps> = ({
  label,
  icon: Icon,
  href,
  active = false,
  badge,
  collapsed = false,
  onClick,
}) => {
  const showBadge = badge !== undefined && badge > 0;

  return (
    <a
      href={href}
      className={`${styles.root} ${active ? styles.active : ''} ${collapsed ? styles.collapsed : ''}`}
      onClick={onClick}
      aria-current={active ? 'page' : undefined}
      title={collapsed ? label : undefined}
    >
      <span className={styles.iconWrapper}>
        <Icon size={20} aria-hidden="true" className={styles.icon} />
        {showBadge && collapsed && (
          <span className={styles.badgeDot} aria-label={`${badge} notifications`} />
        )}
      </span>
      {!collapsed && (
        <>
          <span className={styles.label}>{label}</span>
          {showBadge && (
            <span className={styles.badge} aria-label={`${badge} notifications`}>
              {badge > 99 ? '99+' : badge}
            </span>
          )}
        </>
      )}
    </a>
  );
};
