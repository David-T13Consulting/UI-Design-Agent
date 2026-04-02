import { useId, useRef, useEffect, type ChangeEvent } from 'react';
import styles from './Checkbox.module.css';

export interface CheckboxProps {
  label: string;
  checked?: boolean;
  indeterminate?: boolean;
  disabled?: boolean;
  error?: string;
  onChange?: (checked: boolean) => void;
}

export function Checkbox({
  label,
  checked = false,
  indeterminate = false,
  disabled = false,
  error,
  onChange,
}: CheckboxProps) {
  const id = useId();
  const errorId = useId();
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.indeterminate = indeterminate;
    }
  }, [indeterminate]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    onChange?.(e.target.checked);
  };

  const rootClassName = [
    styles.root,
    disabled ? styles.disabled : '',
    error ? styles.hasError : '',
  ]
    .filter(Boolean)
    .join(' ');

  const boxClassName = [
    styles.box,
    checked || indeterminate ? styles.boxChecked : '',
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div className={rootClassName}>
      <label className={styles.container} htmlFor={id}>
        <input
          ref={inputRef}
          id={id}
          type="checkbox"
          className={styles.nativeInput}
          checked={checked}
          disabled={disabled}
          onChange={handleChange}
          aria-invalid={error ? true : undefined}
          aria-describedby={error ? errorId : undefined}
        />
        <span className={boxClassName} aria-hidden="true">
          {checked && !indeterminate && (
            <svg
              className={styles.checkIcon}
              viewBox="0 0 12 10"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                className={styles.checkPath}
                d="M1 5.5L4 8.5L11 1.5"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          )}
          {indeterminate && (
            <svg
              className={styles.indeterminateIcon}
              viewBox="0 0 10 2"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M1 1H9"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
          )}
        </span>
        <span className={styles.label}>{label}</span>
      </label>
      {error && (
        <p id={errorId} className={styles.error} role="alert">
          {error}
        </p>
      )}
    </div>
  );
}
