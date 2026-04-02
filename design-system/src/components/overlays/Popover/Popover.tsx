import React, { useState, useRef, useEffect, useCallback, cloneElement, isValidElement } from 'react';
import styles from './Popover.module.css';

export interface PopoverProps {
  trigger: React.ReactElement;
  content: React.ReactNode;
  placement?: 'top' | 'bottom' | 'left' | 'right';
  offset?: number;
  onOpenChange?: (open: boolean) => void;
}

export const Popover: React.FC<PopoverProps> = ({
  trigger,
  content,
  placement = 'bottom',
  offset = 8,
  onOpenChange,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  const updateOpen = useCallback(
    (next: boolean) => {
      setIsOpen(next);
      onOpenChange?.(next);
    },
    [onOpenChange],
  );

  const handleToggle = useCallback(() => {
    updateOpen(!isOpen);
  }, [isOpen, updateOpen]);

  const handleClose = useCallback(() => {
    updateOpen(false);
  }, [updateOpen]);

  // Close on click outside
  useEffect(() => {
    if (!isOpen) return;

    const handleMouseDown = (event: MouseEvent) => {
      if (rootRef.current && !rootRef.current.contains(event.target as Node)) {
        handleClose();
      }
    };

    document.addEventListener('mousedown', handleMouseDown);
    return () => {
      document.removeEventListener('mousedown', handleMouseDown);
    };
  }, [isOpen, handleClose]);

  // Close on ESC
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        handleClose();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, handleClose]);

  const offsetStyle: React.CSSProperties = {};
  switch (placement) {
    case 'top':
      offsetStyle.bottom = '100%';
      offsetStyle.left = '50%';
      offsetStyle.transform = 'translateX(-50%)';
      offsetStyle.marginBottom = `${offset}px`;
      break;
    case 'bottom':
      offsetStyle.top = '100%';
      offsetStyle.left = '50%';
      offsetStyle.transform = 'translateX(-50%)';
      offsetStyle.marginTop = `${offset}px`;
      break;
    case 'left':
      offsetStyle.right = '100%';
      offsetStyle.top = '50%';
      offsetStyle.transform = 'translateY(-50%)';
      offsetStyle.marginRight = `${offset}px`;
      break;
    case 'right':
      offsetStyle.left = '100%';
      offsetStyle.top = '50%';
      offsetStyle.transform = 'translateY(-50%)';
      offsetStyle.marginLeft = `${offset}px`;
      break;
  }

  const triggerElement = isValidElement(trigger)
    ? cloneElement(trigger as React.ReactElement<Record<string, unknown>>, {
        onClick: (event: React.MouseEvent) => {
          handleToggle();
          const originalOnClick = (trigger.props as Record<string, unknown>).onClick;
          if (typeof originalOnClick === 'function') {
            (originalOnClick as (e: React.MouseEvent) => void)(event);
          }
        },
        'aria-expanded': isOpen,
        'aria-haspopup': 'dialog' as const,
      })
    : trigger;

  return (
    <div ref={rootRef} className={styles.root}>
      {triggerElement}
      {isOpen && (
        <div
          ref={contentRef}
          className={styles.content}
          style={offsetStyle}
          role="dialog"
          data-state="open"
          data-placement={placement}
        >
          {content}
        </div>
      )}
    </div>
  );
};
