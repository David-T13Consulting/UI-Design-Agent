import { useId, type ReactNode } from 'react';
import styles from './FormField.module.css';

export interface FormFieldProps {
  /** Label text for the field */
  label: string;
  /** Hint text displayed below the label */
  hint?: string;
  /** Error message — replaces hint when present */
  error?: string;
  /** Whether the field is required */
  required?: boolean;
  /** The form input element(s) to wrap */
  children: ReactNode;
  /** Associates the label with the input via htmlFor */
  htmlFor?: string;
}

/**
 * FormField wraps any form input with a label, optional hint text, and error
 * message. The child input should set `aria-describedby` to match the hint/error
 * ID generated here: `${htmlFor}-hint` or `${htmlFor}-error`.
 */
export function FormField({
  label,
  hint,
  error,
  required = false,
  children,
  htmlFor: htmlForProp,
}: FormFieldProps) {
  const generatedId = useId();
  const fieldId = htmlForProp ?? generatedId;
  const hintId = `${fieldId}-hint`;
  const errorId = `${fieldId}-error`;
  const hasError = Boolean(error);

  return (
    <div className={styles.root}>
      <label htmlFor={fieldId} className={styles.label}>
        {label}
        {required && (
          <span className={styles.required} aria-hidden="true">
            *
          </span>
        )}
      </label>

      {hasError ? (
        <span id={errorId} className={styles.error} role="alert">
          {error}
        </span>
      ) : hint ? (
        <span id={hintId} className={styles.hint}>
          {hint}
        </span>
      ) : null}

      <div className={styles.inputWrapper}>{children}</div>
    </div>
  );
}
