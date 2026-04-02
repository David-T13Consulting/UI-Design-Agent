import { useId } from 'react';
import styles from './RadioGroup.module.css';

export interface RadioOption {
  value: string;
  label: string;
}

export interface RadioGroupProps {
  options: RadioOption[];
  value?: string;
  onChange?: (value: string) => void;
  disabled?: boolean;
  error?: string;
  orientation?: 'horizontal' | 'vertical';
}

export function RadioGroup({
  options,
  value,
  onChange,
  disabled = false,
  error,
  orientation = 'vertical',
}: RadioGroupProps) {
  const groupName = useId();
  const errorId = useId();

  const rootClassName = [
    styles.root,
    disabled ? styles.disabled : '',
  ]
    .filter(Boolean)
    .join(' ');

  const listClassName = [
    styles.list,
    orientation === 'horizontal' ? styles.horizontal : styles.vertical,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <fieldset
      className={rootClassName}
      aria-invalid={error ? true : undefined}
      aria-describedby={error ? errorId : undefined}
      disabled={disabled}
    >
      <div className={listClassName} role="radiogroup">
        {options.map((option) => {
          const optionId = `${groupName}-${option.value}`;
          const isSelected = value === option.value;

          return (
            <label key={option.value} className={styles.option} htmlFor={optionId}>
              <input
                id={optionId}
                type="radio"
                className={styles.nativeInput}
                name={groupName}
                value={option.value}
                checked={isSelected}
                disabled={disabled}
                onChange={() => onChange?.(option.value)}
              />
              <span
                className={[styles.circle, error ? styles.circleError : '']
                  .filter(Boolean)
                  .join(' ')}
                aria-hidden="true"
              >
                <span
                  className={[styles.dot, isSelected ? styles.dotSelected : '']
                    .filter(Boolean)
                    .join(' ')}
                />
              </span>
              <span className={styles.label}>{option.label}</span>
            </label>
          );
        })}
      </div>
      {error && (
        <p id={errorId} className={styles.error} role="alert">
          {error}
        </p>
      )}
    </fieldset>
  );
}
