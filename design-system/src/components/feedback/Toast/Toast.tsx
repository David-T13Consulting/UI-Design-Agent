import React, { useEffect, useRef, useState, useCallback } from 'react';
import { Info, CheckCircle, AlertTriangle, AlertCircle, X } from 'lucide-react';
import styles from './Toast.module.css';

export interface ToastAction {
  label: string;
  onClick: () => void;
}

export interface ToastProps {
  variant: 'info' | 'success' | 'warning' | 'error';
  title: string;
  message: string;
  duration?: number;
  action?: ToastAction;
  onClose: () => void;
}

const iconMap = {
  info: Info,
  success: CheckCircle,
  warning: AlertTriangle,
  error: AlertCircle,
} as const;

const variantLabelMap: Record<ToastProps['variant'], string> = {
  info: 'Information',
  success: 'Success',
  warning: 'Warning',
  error: 'Error',
};

export const Toast: React.FC<ToastProps> = ({
  variant,
  title,
  message,
  duration = 4000,
  action,
  onClose,
}) => {
  const Icon = iconMap[variant];
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [isPaused, setIsPaused] = useState(false);
  const [remaining, setRemaining] = useState(duration);
  const startTimeRef = useRef(Date.now());

  const startTimer = useCallback(() => {
    startTimeRef.current = Date.now();
    timerRef.current = setTimeout(() => {
      onClose();
    }, remaining);
  }, [remaining, onClose]);

  const pauseTimer = useCallback(() => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
    const elapsed = Date.now() - startTimeRef.current;
    setRemaining((prev) => Math.max(0, prev - elapsed));
  }, []);

  useEffect(() => {
    startTimer();
    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, [startTimer]);

  const handleMouseEnter = () => {
    setIsPaused(true);
    pauseTimer();
  };

  const handleMouseLeave = () => {
    setIsPaused(false);
    startTimer();
  };

  return (
    <div
      className={`${styles.root} ${styles[variant]}`}
      role="alert"
      aria-live="assertive"
      aria-label={`${variantLabelMap[variant]}: ${title}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className={styles.body}>
        <div className={styles.iconWrapper} aria-hidden="true">
          <Icon className={styles.icon} size={20} />
        </div>

        <div className={styles.content}>
          <p className={styles.title}>{title}</p>
          <p className={styles.message}>{message}</p>
        </div>

        {action && (
          <button
            type="button"
            className={styles.actionButton}
            onClick={action.onClick}
            aria-label={action.label}
          >
            {action.label}
          </button>
        )}

        <button
          type="button"
          className={styles.closeButton}
          onClick={onClose}
          aria-label="Close notification"
        >
          <X size={16} />
        </button>
      </div>

      <div className={styles.progressTrack}>
        <div
          className={`${styles.progressBar} ${styles[`progress_${variant}`]}`}
          style={{
            animationDuration: `${duration}ms`,
            animationPlayState: isPaused ? 'paused' : 'running',
          }}
        />
      </div>
    </div>
  );
};
