import { forwardRef, type InputHTMLAttributes, type ReactNode, useId } from 'react';
import { Search } from 'lucide-react';
import { Icon } from '@/icons';
import styles from './TextInput.module.css';

type TextInputType = 'text' | 'email' | 'password' | 'number' | 'search' | 'tel' | 'url';
type TextInputVariant = 'standard' | 'optional' | 'mandatory' | 'search' | 'withIcon';

export interface TextInputProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type' | 'prefix' | 'size'> {
  /** Label displayed above the input */
  label?: string;
  /** Form field variant */
  variant?: TextInputVariant;
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
      variant = 'standard',
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

    const showAsterisk = required || variant === 'mandatory';
    const showOptional = variant === 'optional';
    const resolvedPrefix = variant === 'search'
      ? <Icon icon={Search} size="sm" />
      : prefix;
    const resolvedType = variant === 'search' ? 'search' : type;

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
            {showAsterisk && <span className={styles.required} aria-hidden="true">*</span>}
            {showOptional && <span className={styles.optionalTag}>(optional)</span>}
          </label>
        )}
        <div className={wrapperClassNames}>
          {resolvedPrefix && <span className={styles.prefix}>{resolvedPrefix}</span>}
          <input
            ref={ref}
            id={inputId}
            type={resolvedType}
            className={styles.input}
            placeholder={placeholder}
            disabled={disabled}
            required={showAsterisk}
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
