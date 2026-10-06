import React, {
  useState,
  useRef,
  useEffect,
  useCallback,
  useMemo,
  cloneElement,
  isValidElement,
  type ReactNode,
  type ReactElement,
} from 'react';
import { Search, Check } from 'lucide-react';
import { type LucideIcon } from 'lucide-react';
import { Icon } from '@/icons';
import styles from './Dropdown.module.css';

export interface DropdownOption {
  id: string;
  label: string;
  /** Option type determines how it renders */
  type?: 'simple' | 'checkbox' | 'icon' | 'toggle' | 'divider';
  icon?: LucideIcon;
  checked?: boolean;
  disabled?: boolean;
  description?: string;
  shortcut?: string;
}

export interface DropdownProps {
  /** The trigger element */
  trigger: ReactNode;
  /** Menu options */
  options: DropdownOption[];
  /** Callback when an option is clicked */
  onSelect?: (id: string) => void;
  /** Callback when a checkbox/toggle option is toggled */
  onToggle?: (id: string, checked: boolean) => void;
  /** Searchable — adds a search input at the top */
  searchable?: boolean;
  /** Width of the dropdown */
  width?: number | 'auto' | 'trigger';
  /** Alignment relative to trigger */
  align?: 'start' | 'end' | 'center';
  className?: string;
}

export const Dropdown: React.FC<DropdownProps> = ({
  trigger,
  options,
  onSelect,
  onToggle,
  searchable = false,
  width = 'auto',
  align = 'start',
  className,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState('');
  const rootRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);

  const handleToggleOpen = useCallback(() => {
    setIsOpen((prev) => {
      if (prev) setSearch('');
      return !prev;
    });
  }, []);

  const handleClose = useCallback(() => {
    setIsOpen(false);
    setSearch('');
  }, []);

  // Focus search input when opening
  useEffect(() => {
    if (isOpen && searchable && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [isOpen, searchable]);

  // Close on click outside
  useEffect(() => {
    if (!isOpen) return;

    const handleMouseDown = (event: MouseEvent) => {
      if (rootRef.current && !rootRef.current.contains(event.target as Node)) {
        handleClose();
      }
    };

    document.addEventListener('mousedown', handleMouseDown);
    return () => {
      document.removeEventListener('mousedown', handleMouseDown);
    };
  }, [isOpen, handleClose]);

  // Close on Escape
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        handleClose();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, handleClose]);

  const filteredOptions = useMemo(() => {
    if (!search) return options;
    const query = search.toLowerCase();
    return options.filter(
      (opt) => opt.type === 'divider' || opt.label.toLowerCase().includes(query)
    );
  }, [options, search]);

  const handleOptionClick = (option: DropdownOption) => {
    if (option.disabled) return;

    if (option.type === 'checkbox' || option.type === 'toggle') {
      onToggle?.(option.id, !option.checked);
    } else {
      onSelect?.(option.id);
      handleClose();
    }
  };

  // Build width style
  const panelStyle: React.CSSProperties = {};
  if (typeof width === 'number') {
    panelStyle.width = `${width}px`;
  } else if (width === 'trigger') {
    panelStyle.width = '100%';
  }

  // Trigger element
  const triggerElement = isValidElement(trigger)
    ? cloneElement(trigger as ReactElement<Record<string, unknown>>, {
        onClick: (event: React.MouseEvent) => {
          handleToggleOpen();
          const originalOnClick = (trigger as ReactElement<Record<string, unknown>>).props.onClick;
          if (typeof originalOnClick === 'function') {
            (originalOnClick as (e: React.MouseEvent) => void)(event);
          }
        },
        'aria-expanded': isOpen,
        'aria-haspopup': 'menu' as const,
      })
    : trigger;

  const rootClassNames = [styles.root, className ?? ''].filter(Boolean).join(' ');

  return (
    <div ref={rootRef} className={rootClassNames}>
      {triggerElement}
      {isOpen && (
        <div
          className={[styles.panel, styles[`align-${align}`]].join(' ')}
          style={panelStyle}
          role="menu"
          data-state="open"
        >
          {searchable && (
            <div className={styles.searchWrapper}>
              <span className={styles.searchIcon} aria-hidden="true">
                <Icon icon={Search} size="sm" />
              </span>
              <input
                ref={searchInputRef}
                className={styles.searchInput}
                type="text"
                placeholder="Search..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                aria-label="Search options"
              />
            </div>
          )}
          <div className={styles.optionsList}>
            {filteredOptions.map((option) => {
              if (option.type === 'divider') {
                return <div key={option.id} className={styles.divider} role="separator" />;
              }

              const optionClassNames = [
                styles.option,
                option.disabled ? styles.optionDisabled : '',
              ]
                .filter(Boolean)
                .join(' ');

              return (
                <div
                  key={option.id}
                  className={optionClassNames}
                  role="menuitem"
                  aria-disabled={option.disabled || undefined}
                  onClick={() => handleOptionClick(option)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      handleOptionClick(option);
                    }
                  }}
                  tabIndex={option.disabled ? -1 : 0}
                >
                  {/* Checkbox */}
                  {option.type === 'checkbox' && (
                    <span className={[styles.checkbox, option.checked ? styles.checkboxChecked : ''].filter(Boolean).join(' ')} aria-hidden="true">
                      {option.checked && (
                        <Icon icon={Check} size="xs" />
                      )}
                    </span>
                  )}

                  {/* Icon */}
                  {option.type === 'icon' && option.icon && (
                    <span className={styles.optionIcon} aria-hidden="true">
                      <Icon icon={option.icon} size="sm" />
                    </span>
                  )}

                  {/* Label + Description */}
                  <span className={styles.optionContent}>
                    <span className={styles.optionLabel}>{option.label}</span>
                    {option.description && (
                      <span className={styles.optionDescription}>{option.description}</span>
                    )}
                  </span>

                  {/* Shortcut */}
                  {option.shortcut && (
                    <span className={styles.shortcut}>{option.shortcut}</span>
                  )}

                  {/* Toggle */}
                  {option.type === 'toggle' && (
                    <span
                      className={[styles.toggle, option.checked ? styles.toggleChecked : ''].filter(Boolean).join(' ')}
                      aria-hidden="true"
                    >
                      <span className={styles.toggleThumb} />
                    </span>
                  )}
                </div>
              );
            })}
            {filteredOptions.length === 0 && (
              <div className={styles.emptyState}>No results</div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
