import { useId, type KeyboardEvent } from 'react';
import styles from './Toggle.module.css';

export interface ToggleProps {
  checked?: boolean;
  label?: string;
  disabled?: boolean;
  size?: 'sm' | 'md';
  onChange?: (checked: boolean) => void;
}

export function Toggle({
  checked = false,
  label,
  disabled = false,
  size = 'md',
  onChange,
}: ToggleProps) {
  const id = useId();

  const handleClick = () => {
    if (!disabled) {
      onChange?.(!checked);
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLButtonElement>) => {
    if (e.key === ' ' || e.key === 'Enter') {
      e.preventDefault();
      if (!disabled) {
        onChange?.(!checked);
      }
    }
  };

  const trackClassName = [
    styles.track,
    checked ? styles.trackChecked : '',
    size === 'sm' ? styles.trackSm : styles.trackMd,
    disabled ? styles.trackDisabled : '',
  ]
    .filter(Boolean)
    .join(' ');

  const thumbClassName = [
    styles.thumb,
    checked ? styles.thumbChecked : '',
    size === 'sm' ? styles.thumbSm : styles.thumbMd,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div className={styles.root}>
      <button
        id={id}
        type="button"
        role="switch"
        aria-checked={checked}
        aria-label={label}
        disabled={disabled}
        className={trackClassName}
        onClick={handleClick}
        onKeyDown={handleKeyDown}
      >
        <span className={thumbClassName} aria-hidden="true" />
      </button>
      {label && (
        <label className={[styles.label, disabled ? styles.labelDisabled : ''].filter(Boolean).join(' ')} htmlFor={id}>
          {label}
        </label>
      )}
    </div>
  );
}
