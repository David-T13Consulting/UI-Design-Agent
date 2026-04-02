import { forwardRef, type SelectHTMLAttributes, useId } from 'react';
import { ChevronDown } from 'lucide-react';
import { Icon } from '@/icons';
import styles from './Select.module.css';

export interface SelectOption {
  value: string;
  label: string;
}

export interface SelectProps
  extends Omit<SelectHTMLAttributes<HTMLSelectElement>, 'children'> {
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
      ...rest
    },
    ref
  ) {
    const generatedId = useId();
    const selectId = idProp ?? generatedId;
    const hintId = `${selectId}-hint`;
    const errorId = `${selectId}-error`;
    const hasError = Boolean(error);

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
            {required && <span className={styles.required} aria-hidden="true">*</span>}
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
            aria-describedby={hasError ? errorId : hint ? hintId : undefined}
            value={value}
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
);
