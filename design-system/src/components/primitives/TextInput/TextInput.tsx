import { forwardRef, type InputHTMLAttributes, type ReactNode, useId } from 'react';
import styles from './TextInput.module.css';

type TextInputType = 'text' | 'email' | 'password' | 'number' | 'search';

export interface TextInputProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type' | 'prefix' | 'size'> {
  /** Label displayed above the input */
  label?: string;
  /** Placeholder text */
  placeholder?: string;
  /** Hint text shown below the input */
  hint?: string;
  /** Error message (replaces hint when present) */
  error?: string;
  /** Content rendered before the input (e.g., icon or currency symbol) */
  prefix?: ReactNode;
  /** Content rendered after the input (e.g., icon or action) */
  suffix?: ReactNode;
  /** HTML input type */
  type?: TextInputType;
}

export const TextInput = forwardRef<HTMLInputElement, TextInputProps>(
  function TextInput(
    {
      label,
      placeholder,
      hint,
      error,
      prefix,
      suffix,
      disabled = false,
      required = false,
      type = 'text',
      id: idProp,
      className,
      ...rest
    },
    ref
  ) {
    const generatedId = useId();
    const inputId = idProp ?? generatedId;
    const hintId = `${inputId}-hint`;
    const errorId = `${inputId}-error`;
    const hasError = Boolean(error);

    const wrapperClassNames = [
      styles.inputWrapper,
      hasError ? styles.inputWrapperError : '',
      disabled ? styles.inputWrapperDisabled : '',
    ]
      .filter(Boolean)
      .join(' ');

    return (
      <div className={[styles.root, className ?? ''].filter(Boolean).join(' ')}>
        {label && (
          <label htmlFor={inputId} className={styles.label}>
            {label}
            {required && <span className={styles.required} aria-hidden="true">*</span>}
          </label>
        )}
        <div className={wrapperClassNames}>
          {prefix && <span className={styles.prefix}>{prefix}</span>}
          <input
            ref={ref}
            id={inputId}
            type={type}
            className={styles.input}
            placeholder={placeholder}
            disabled={disabled}
            required={required}
            aria-invalid={hasError || undefined}
            aria-describedby={hasError ? errorId : hint ? hintId : undefined}
            {...rest}
          />
          {suffix && <span className={styles.suffix}>{suffix}</span>}
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
