import { useState, useRef, useEffect, useCallback } from 'react';
import { Modal } from '../../overlays/Modal';
import { Button } from '../../primitives/Button';
import styles from './ConfirmDialog.module.css';

export interface ConfirmDialogProps {
  /** Whether the dialog is open */
  open: boolean;
  /** Dialog title */
  title: string;
  /** Description text explaining the action */
  description: string;
  /** Label for the confirm button */
  confirmLabel?: string;
  /** Visual variant for the confirm button */
  confirmVariant?: 'primary' | 'destructive';
  /** Called when the user confirms — may return a Promise for async loading state */
  onConfirm: () => void | Promise<void>;
  /** Called when the user cancels */
  onCancel: () => void;
}

export function ConfirmDialog({
  open,
  title,
  description,
  confirmLabel = 'Confirm',
  confirmVariant = 'primary',
  onConfirm,
  onCancel,
}: ConfirmDialogProps) {
  const [loading, setLoading] = useState(false);
  const cancelRef = useRef<HTMLButtonElement>(null);

  // Focus the cancel button when the dialog opens (safer default for destructive actions)
  useEffect(() => {
    if (open) {
      // Use requestAnimationFrame to wait for Modal's portal to render
      const raf = requestAnimationFrame(() => {
        cancelRef.current?.focus();
      });
      return () => window.cancelAnimationFrame(raf);
    }
  }, [open]);

  // Reset loading state when dialog closes
  useEffect(() => {
    if (!open) {
      setLoading(false);
    }
  }, [open]);

  const handleConfirm = useCallback(async () => {
    const result = onConfirm();
    if (result instanceof Promise) {
      setLoading(true);
      try {
        await result;
      } finally {
        setLoading(false);
      }
    }
  }, [onConfirm]);

  const footer = (
    <div className={styles.footer}>
      <Button
        ref={cancelRef}
        variant="secondary"
        onClick={onCancel}
        disabled={loading}
      >
        Cancel
      </Button>
      <Button
        variant={confirmVariant}
        onClick={handleConfirm}
        loading={loading}
      >
        {confirmLabel}
      </Button>
    </div>
  );

  return (
    <Modal
      open={open}
      title={title}
      description={description}
      onClose={onCancel}
      size="sm"
      footer={footer}
    >
      {/* Modal body is intentionally empty — description is in the header */}
      <span />
    </Modal>
  );
}
