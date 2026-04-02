import React, { useState, useRef, useCallback, useId, cloneElement, isValidElement } from 'react';
import styles from './Tooltip.module.css';

export interface TooltipProps {
  content: string;
  placement?: 'top' | 'bottom' | 'left' | 'right';
  delay?: number;
  children: React.ReactElement<React.HTMLAttributes<HTMLElement>>;
}

export const Tooltip: React.FC<TooltipProps> = ({
  content,
  placement = 'top',
  delay = 200,
  children,
}) => {
  const [visible, setVisible] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const tooltipId = useId();

  const show = useCallback(() => {
    timerRef.current = setTimeout(() => {
      setVisible(true);
    }, delay);
  }, [delay]);

  const hide = useCallback(() => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
    setVisible(false);
  }, []);

  if (!isValidElement(children)) {
    return children;
  }

  const childWithProps = cloneElement(children, {
    'aria-describedby': visible ? tooltipId : undefined,
    onMouseEnter: (e: React.MouseEvent<HTMLElement>) => {
      show();
      children.props.onMouseEnter?.(e);
    },
    onMouseLeave: (e: React.MouseEvent<HTMLElement>) => {
      hide();
      children.props.onMouseLeave?.(e);
    },
    onFocus: (e: React.FocusEvent<HTMLElement>) => {
      show();
      children.props.onFocus?.(e);
    },
    onBlur: (e: React.FocusEvent<HTMLElement>) => {
      hide();
      children.props.onBlur?.(e);
    },
  } as React.HTMLAttributes<HTMLElement>);

  return (
    <div className={styles.wrapper}>
      {childWithProps}
      {visible && (
        <div
          id={tooltipId}
          role="tooltip"
          className={`${styles.tooltip} ${styles[placement]}`}
        >
          {content}
          <div className={`${styles.arrow} ${styles[`arrow_${placement}`]}`} />
        </div>
      )}
    </div>
  );
};
