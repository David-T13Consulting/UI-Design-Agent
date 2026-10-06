import {
  forwardRef,
  type SelectHTMLAttributes,
  useId,
  useState,
  useRef,
  useEffect,
  useCallback,
} from 'react';
import { ChevronDown, Search, Check, type LucideIcon } from 'lucide-react';
import { Icon } from '@/icons';
import styles from './Select.module.css';

export interface SelectOption {
  value: string;
  label: string;
  /** Optional icon for 'icon' option type */
  icon?: LucideIcon;
}

export type OptionType = 'simple' | 'checkbox' | 'icon';

export interface SelectProps
  extends Omit<SelectHTMLAttributes<HTMLSelectElement>, 'children' | 'multiple'> {
  /** Label displayed above the select */
  label?: string;
  /** Array of options to display */
  options: SelectOption[];
  /** Error message (replaces hint when present) */
  error?: string;
  /** Hint text shown below the select */
  hint?: string;
  /** Placeholder text shown when no value is selected */
  placeholder?: string;
  /** Enable search/filter input in the dropdown */
  searchable?: boolean;
  /** Option rendering type */
  optionType?: OptionType;
  /** Enable multi-select (used with optionType='checkbox') */
  multiple?: boolean;
  /** Selected values for multi-select mode */
  selectedValues?: string[];
  /** Callback for multi-select value changes */
  onSelectedValuesChange?: (values: string[]) => void;
}

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  function Select(
    {
      label,
      options,
      error,
      hint,
      disabled = false,
      required = false,
      placeholder,
      value,
      id: idProp,
      className,
      searchable = false,
      optionType = 'simple',
      multiple = false,
      selectedValues = [],
      onSelectedValuesChange,
      onChange,
      ...rest
    },
    ref
  ) {
    const generatedId = useId();
    const selectId = idProp ?? generatedId;
    const hintId = `${selectId}-hint`;
    const errorId = `${selectId}-error`;
    const hasError = Boolean(error);

    // Custom dropdown state (used when searchable or checkbox/icon option type)
    const useCustomDropdown = searchable || optionType === 'checkbox' || optionType === 'icon';
    const [isOpen, setIsOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [activeIndex, setActiveIndex] = useState(-1);
    const containerRef = useRef<HTMLDivElement>(null);
    const searchInputRef = useRef<HTMLInputElement>(null);
    const listboxRef = useRef<HTMLUListElement>(null);

    const filteredOptions = searchable
      ? options.filter((opt) =>
          opt.label.toLowerCase().includes(searchTerm.toLowerCase())
        )
      : options;

    // Get display label for single select
    const selectedOption = options.find((opt) => opt.value === value);
    const displayLabel = multiple
      ? selectedValues.length > 0
        ? `${selectedValues.length} selected`
        : placeholder ?? ''
      : selectedOption?.label ?? placeholder ?? '';

    const isPlaceholderShown = multiple
      ? selectedValues.length === 0
      : !selectedOption;

    // Close dropdown on outside click
    useEffect(() => {
      if (!isOpen) return;
      const handleClickOutside = (e: MouseEvent) => {
        if (
          containerRef.current &&
          !containerRef.current.contains(e.target as Node)
        ) {
          setIsOpen(false);
          setSearchTerm('');
        }
      };
      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [isOpen]);

    // Focus search input when dropdown opens
    useEffect(() => {
      if (isOpen && searchable && searchInputRef.current) {
        searchInputRef.current.focus();
      }
    }, [isOpen, searchable]);

    // Reset active index when filtered options change
    useEffect(() => {
      setActiveIndex(-1);
    }, [searchTerm]);

    const toggleDropdown = useCallback(() => {
      if (disabled) return;
      setIsOpen((prev) => {
        if (prev) setSearchTerm('');
        return !prev;
      });
    }, [disabled]);

    const handleOptionSelect = useCallback(
      (optionValue: string) => {
        if (multiple) {
          const next = selectedValues.includes(optionValue)
            ? selectedValues.filter((v) => v !== optionValue)
            : [...selectedValues, optionValue];
          onSelectedValuesChange?.(next);
        } else {
          // Simulate a native-like onChange by creating a synthetic-ish event
          onChange?.({
            target: { value: optionValue },
          } as React.ChangeEvent<HTMLSelectElement>);
          setIsOpen(false);
          setSearchTerm('');
        }
      },
      [multiple, selectedValues, onSelectedValuesChange, onChange]
    );

    const handleKeyDown = useCallback(
      (e: React.KeyboardEvent) => {
        if (!isOpen) {
          if (e.key === 'Enter' || e.key === ' ' || e.key === 'ArrowDown') {
            e.preventDefault();
            setIsOpen(true);
          }
          return;
        }

        switch (e.key) {
          case 'Escape':
            e.preventDefault();
            setIsOpen(false);
            setSearchTerm('');
            break;
          case 'ArrowDown':
            e.preventDefault();
            setActiveIndex((prev) =>
              prev < filteredOptions.length - 1 ? prev + 1 : 0
            );
            break;
          case 'ArrowUp':
            e.preventDefault();
            setActiveIndex((prev) =>
              prev > 0 ? prev - 1 : filteredOptions.length - 1
            );
            break;
          case 'Enter':
          case ' ':
            e.preventDefault();
            if (activeIndex >= 0 && activeIndex < filteredOptions.length) {
              const opt = filteredOptions[activeIndex]; if (opt) handleOptionSelect(opt.value);
            }
            break;
        }
      },
      [isOpen, filteredOptions, activeIndex, handleOptionSelect]
    );

    // Scroll active item into view
    useEffect(() => {
      if (activeIndex >= 0 && listboxRef.current) {
        const items = listboxRef.current.querySelectorAll('[role="option"]');
        items[activeIndex]?.scrollIntoView({ block: 'nearest' });
      }
    }, [activeIndex]);

    // Native select rendering (when not using custom dropdown)
    if (!useCustomDropdown) {
      const selectClassNames = [
        styles.select,
        hasError ? styles.selectError : '',
        disabled ? styles.selectDisabled : '',
        value === '' || value === undefined ? styles.selectPlaceholder : '',
      ]
        .filter(Boolean)
        .join(' ');

      return (
        <div className={[styles.root, className ?? ''].filter(Boolean).join(' ')}>
          {label && (
            <label htmlFor={selectId} className={styles.label}>
              {label}
              {required && (
                <span className={styles.required} aria-hidden="true">
                  *
                </span>
              )}
            </label>
          )}
          <div className={styles.selectWrapper}>
            <select
              ref={ref}
              id={selectId}
              className={selectClassNames}
              disabled={disabled}
              required={required}
              aria-invalid={hasError || undefined}
              aria-describedby={
                hasError ? errorId : hint ? hintId : undefined
              }
              value={value}
              onChange={onChange}
              {...rest}
            >
              {placeholder && (
                <option value="" disabled>
                  {placeholder}
                </option>
              )}
              {options.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
            <span className={styles.chevron} aria-hidden="true">
              <Icon icon={ChevronDown} size="sm" />
            </span>
          </div>
          {hasError ? (
            <span id={errorId} className={styles.error} role="alert">
              {error}
            </span>
          ) : hint ? (
            <span id={hintId} className={styles.hint}>
              {hint}
            </span>
          ) : null}
        </div>
      );
    }

    // Custom dropdown rendering
    const triggerClassNames = [
      styles.customTrigger,
      hasError ? styles.selectError : '',
      disabled ? styles.selectDisabled : '',
      isPlaceholderShown ? styles.selectPlaceholder : '',
      isOpen ? styles.customTriggerOpen : '',
    ]
      .filter(Boolean)
      .join(' ');

    const listboxId = `${selectId}-listbox`;

    return (
      <div
        ref={containerRef}
        className={[styles.root, className ?? ''].filter(Boolean).join(' ')}
        onKeyDown={handleKeyDown}
      >
        {label && (
          <label id={`${selectId}-label`} className={styles.label}>
            {label}
            {required && (
              <span className={styles.required} aria-hidden="true">
                *
              </span>
            )}
          </label>
        )}
        <div className={styles.selectWrapper}>
          <button
            type="button"
            id={selectId}
            className={triggerClassNames}
            disabled={disabled}
            aria-haspopup="listbox"
            aria-expanded={isOpen}
            aria-labelledby={label ? `${selectId}-label` : undefined}
            aria-invalid={hasError || undefined}
            aria-describedby={
              hasError ? errorId : hint ? hintId : undefined
            }
            onClick={toggleDropdown}
          >
            <span className={styles.customTriggerText}>{displayLabel}</span>
            <span
              className={[
                styles.chevron,
                styles.chevronInline,
                isOpen ? styles.chevronOpen : '',
              ]
                .filter(Boolean)
                .join(' ')}
              aria-hidden="true"
            >
              <Icon icon={ChevronDown} size="sm" />
            </span>
          </button>

          {isOpen && (
            <div className={styles.dropdown} role="presentation">
              {searchable && (
                <div className={styles.searchWrapper}>
                  <span className={styles.searchIcon} aria-hidden="true">
                    <Icon icon={Search} size="sm" />
                  </span>
                  <input
                    ref={searchInputRef}
                    type="text"
                    className={styles.searchInput}
                    placeholder="Search..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    aria-label="Search options"
                    aria-controls={listboxId}
                  />
                </div>
              )}
              <ul
                ref={listboxRef}
                id={listboxId}
                className={styles.optionList}
                role="listbox"
                aria-multiselectable={multiple || undefined}
                aria-labelledby={label ? `${selectId}-label` : undefined}
              >
                {filteredOptions.length === 0 && (
                  <li className={styles.noResults} role="presentation">
                    No results found
                  </li>
                )}
                {filteredOptions.map((option, idx) => {
                  const isSelected = multiple
                    ? selectedValues.includes(option.value)
                    : option.value === value;
                  const isActive = idx === activeIndex;

                  return (
                    <li
                      key={option.value}
                      role="option"
                      aria-selected={isSelected}
                      className={[
                        styles.option,
                        isSelected ? styles.optionSelected : '',
                        isActive ? styles.optionActive : '',
                      ]
                        .filter(Boolean)
                        .join(' ')}
                      onClick={() => handleOptionSelect(option.value)}
                    >
                      {optionType === 'checkbox' && (
                        <span
                          className={[
                            styles.checkbox,
                            isSelected ? styles.checkboxChecked : '',
                          ]
                            .filter(Boolean)
                            .join(' ')}
                          aria-hidden="true"
                        >
                          {isSelected && <Icon icon={Check} size="xs" />}
                        </span>
                      )}
                      {optionType === 'icon' && option.icon && (
                        <span className={styles.optionIcon} aria-hidden="true">
                          <Icon icon={option.icon} size="sm" />
                        </span>
                      )}
                      <span className={styles.optionLabel}>{option.label}</span>
                      {optionType === 'simple' && isSelected && !multiple && (
                        <span className={styles.checkMark} aria-hidden="true">
                          <Icon icon={Check} size="sm" />
                        </span>
                      )}
                    </li>
                  );
                })}
              </ul>
            </div>
          )}
        </div>
        {hasError ? (
          <span id={errorId} className={styles.error} role="alert">
            {error}
          </span>
        ) : hint ? (
          <span id={hintId} className={styles.hint}>
            {hint}
          </span>
        ) : null}
      </div>
    );
  }
);
