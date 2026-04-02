import {
  forwardRef,
  type TextareaHTMLAttributes,
  useId,
  useState,
  useCallback,
  type ChangeEvent,
} from 'react';
import styles from './Textarea.module.css';

export interface TextareaProps
  extends Omit<TextareaHTMLAttributes<HTMLTextAreaElement>, 'children'> {
  /** Label displayed above the textarea */
  label?: string;
  /** Hint text shown below the textarea */
  hint?: string;
  /** Error message (replaces hint when present) */
  error?: string;
  /** Number of visible text rows */
  rows?: number;
  /** Maximum character length */
  maxLength?: number;
  /** Whether to show a character count indicator */
  showCount?: boolean;
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  function Textarea(
    {
      label,
      hint,
      error,
      rows = 4,
      maxLength,
      showCount = false,
      disabled = false,
      required = false,
      id: idProp,
      className,
      onChange,
      value,
      defaultValue,
      ...rest
    },
    ref
  ) {
    const generatedId = useId();
    const textareaId = idProp ?? generatedId;
    const hintId = `${textareaId}-hint`;
    const errorId = `${textareaId}-error`;
    const hasError = Boolean(error);

    const [charCount, setCharCount] = useState<number>(() => {
      if (typeof value === 'string') return value.length;
      if (typeof defaultValue === 'string') return defaultValue.length;
      return 0;
    });

    const handleChange = useCallback(
      (e: ChangeEvent<HTMLTextAreaElement>) => {
        setCharCount(e.target.value.length);
        onChange?.(e);
      },
      [onChange]
    );

    const textareaClassNames = [
      styles.textarea,
      hasError ? styles.textareaError : '',
      disabled ? styles.textareaDisabled : '',
    ]
      .filter(Boolean)
      .join(' ');

    const showCounter = showCount && maxLength != null;
    const isOverLimit = maxLength != null && charCount > maxLength;

    return (
      <div className={[styles.root, className ?? ''].filter(Boolean).join(' ')}>
        {label && (
          <label htmlFor={textareaId} className={styles.label}>
            {label}
            {required && <span className={styles.required} aria-hidden="true">*</span>}
          </label>
        )}
        <textarea
          ref={ref}
          id={textareaId}
          className={textareaClassNames}
          rows={rows}
          maxLength={maxLength}
          disabled={disabled}
          required={required}
          aria-invalid={hasError || undefined}
          aria-describedby={hasError ? errorId : hint ? hintId : undefined}
          onChange={handleChange}
          value={value}
          defaultValue={defaultValue}
          {...rest}
        />
        <div className={styles.footer}>
          {hasError ? (
            <span id={errorId} className={styles.error} role="alert">
              {error}
            </span>
          ) : hint ? (
            <span id={hintId} className={styles.hint}>
              {hint}
            </span>
          ) : (
            <span />
          )}
          {showCounter && (
            <span
              className={[styles.count, isOverLimit ? styles.countOver : '']
                .filter(Boolean)
                .join(' ')}
              aria-live="polite"
            >
              {charCount}/{maxLength}
            </span>
          )}
        </div>
      </div>
    );
  }
);
