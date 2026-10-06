import React from 'react';
import styles from './MessagePreview.module.css';

export interface MessagePreviewProps {
  /** Sender name */
  sender: string;
  /** Message subject/title */
  subject: string;
  /** Preview text */
  preview: string;
  /** Timestamp */
  timestamp: string;
  /** Whether the message is unread */
  unread?: boolean;
  /** Whether the message is selected */
  selected?: boolean;
  /** Avatar URL for sender */
  avatarSrc?: string;
  /** Sender initials (fallback if no avatar) */
  avatarInitials?: string;
  /** Tags/labels */
  tags?: Array<{ label: string; color?: string }>;
  /** Click handler */
  onClick?: () => void;
  className?: string;
}

export const MessagePreview: React.FC<MessagePreviewProps> = ({
  sender,
  subject,
  preview,
  timestamp,
  unread = false,
  selected = false,
  avatarSrc,
  avatarInitials,
  tags,
  onClick,
  className,
}) => {
  const rootClass = [
    styles.root,
    unread ? styles.unread : '',
    selected ? styles.selected : '',
    onClick ? styles.clickable : '',
    className ?? '',
  ]
    .filter(Boolean)
    .join(' ');

  const initials =
    avatarInitials ??
    sender
      .split(' ')
      .map((n) => n[0])
      .join('')
      .slice(0, 2)
      .toUpperCase();

  return (
    <div
      className={rootClass}
      onClick={onClick}
      role={onClick ? 'button' : undefined}
      tabIndex={onClick ? 0 : undefined}
      onKeyDown={
        onClick
          ? (e: React.KeyboardEvent) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                onClick();
              }
            }
          : undefined
      }
    >
      {/* Avatar */}
      <div className={styles.avatar}>
        {avatarSrc ? (
          <img
            src={avatarSrc}
            alt={sender}
            className={styles.avatarImage}
          />
        ) : (
          <span className={styles.avatarInitials}>{initials}</span>
        )}
      </div>

      {/* Content */}
      <div className={styles.content}>
        <div className={styles.topRow}>
          <span className={`${styles.sender} ${unread ? styles.senderUnread : ''}`}>
            {sender}
          </span>
          <span className={styles.timestamp}>{timestamp}</span>
        </div>
        <div className={styles.subjectRow}>
          <span className={styles.subject}>{subject}</span>
          {tags &&
            tags.length > 0 &&
            tags.map((tag, idx) => (
              <span
                key={idx}
                className={styles.tag}
                style={
                  tag.color
                    ? { backgroundColor: tag.color, color: '#fff' }
                    : undefined
                }
              >
                {tag.label}
              </span>
            ))}
        </div>
        <p className={styles.preview}>{preview}</p>
      </div>

      {/* Unread indicator */}
      {unread && <span className={styles.unreadDot} aria-label="Unread" />}
    </div>
  );
};
