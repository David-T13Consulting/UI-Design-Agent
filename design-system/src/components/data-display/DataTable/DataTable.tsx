import React, { useState, useCallback } from 'react';
import { ChevronUp, ChevronDown, Star } from 'lucide-react';
import styles from './DataTable.module.css';

export type CellType = 'text' | 'avatar' | 'icon' | 'tag' | 'cta' | 'rating' | 'blank';

export interface DataTableColumn {
  key: string;
  label: string;
  sortable?: boolean;
  /** Cell rendering type */
  cellType?: CellType;
}

export interface DataTableProps {
  /** Column definitions */
  columns: DataTableColumn[];
  /** Row data keyed by column key */
  rows: Record<string, React.ReactNode>[];
  /** Whether the table is in a loading state */
  loading?: boolean;
  /** Content to display when rows is empty */
  emptyState?: React.ReactNode;
  /** Callback when a sortable column header is clicked */
  onSort?: (key: string, direction: 'asc' | 'desc') => void;
  /** Enable alternating row background colors */
  striped?: boolean;
  /** Callback when a CTA cell button is clicked (receives row index and column key) */
  onCtaClick?: (rowIndex: number, columnKey: string) => void;
}

const SKELETON_ROW_COUNT = 5;

function renderCellContent(
  content: React.ReactNode,
  cellType: CellType = 'text',
  rowIndex: number,
  columnKey: string,
  onCtaClick?: (rowIndex: number, columnKey: string) => void
): React.ReactNode {
  switch (cellType) {
    case 'avatar':
      return (
        <div className={styles.avatarCell} aria-label={typeof content === 'string' ? content : undefined}>
          <div className={styles.avatar}>{content}</div>
        </div>
      );

    case 'icon':
      return (
        <div className={styles.iconCell}>{content}</div>
      );

    case 'tag':
      return (
        <span className={styles.tag}>{content}</span>
      );

    case 'cta':
      return (
        <button
          type="button"
          className={styles.ctaButton}
          onClick={() => onCtaClick?.(rowIndex, columnKey)}
        >
          {content}
        </button>
      );

    case 'rating': {
      const numericValue = typeof content === 'number' ? content : Number(content);
      const rating = Math.max(0, Math.min(5, Math.round(numericValue || 0)));
      return (
        <div className={styles.ratingCell} role="img" aria-label={`${rating} out of 5 stars`}>
          {Array.from({ length: 5 }, (_, i) => (
            <Star
              key={i}
              size={16}
              className={i < rating ? styles.starFilled : styles.starEmpty}
              fill={i < rating ? 'currentColor' : 'none'}
            />
          ))}
        </div>
      );
    }

    case 'blank':
      return null;

    case 'text':
    default:
      return content;
  }
}

export const DataTable: React.FC<DataTableProps> = ({
  columns,
  rows,
  loading = false,
  emptyState,
  onSort,
  striped = false,
  onCtaClick,
}) => {
  const [sortKey, setSortKey] = useState<string | null>(null);
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');

  const handleSort = useCallback(
    (key: string) => {
      const nextDirection =
        sortKey === key && sortDirection === 'asc' ? 'desc' : 'asc';
      setSortKey(key);
      setSortDirection(nextDirection);
      onSort?.(key, nextDirection);
    },
    [sortKey, sortDirection, onSort]
  );

  const showEmpty = !loading && rows.length === 0;

  return (
    <div className={styles.root} role="region" aria-label="Data table">
      <table className={styles.table}>
        <thead className={styles.thead}>
          <tr>
            {columns.map((col) => (
              <th
                key={col.key}
                className={`${styles.th} ${col.sortable ? styles.sortable : ''}`}
                scope="col"
                aria-sort={
                  sortKey === col.key
                    ? sortDirection === 'asc'
                      ? 'ascending'
                      : 'descending'
                    : undefined
                }
                onClick={
                  col.sortable ? () => handleSort(col.key) : undefined
                }
                onKeyDown={
                  col.sortable
                    ? (e: React.KeyboardEvent) => {
                        if (e.key === 'Enter' || e.key === ' ') {
                          e.preventDefault();
                          handleSort(col.key);
                        }
                      }
                    : undefined
                }
                tabIndex={col.sortable ? 0 : undefined}
                role={col.sortable ? 'button' : undefined}
              >
                <span className={styles.thContent}>
                  {col.label}
                  {col.sortable && (
                    <span className={styles.sortIcon} aria-hidden="true">
                      {sortKey === col.key ? (
                        sortDirection === 'asc' ? (
                          <ChevronUp size={14} />
                        ) : (
                          <ChevronDown size={14} />
                        )
                      ) : (
                        <ChevronDown size={14} />
                      )}
                    </span>
                  )}
                </span>
              </th>
            ))}
          </tr>
        </thead>
        <tbody className={styles.tbody}>
          {loading &&
            Array.from({ length: SKELETON_ROW_COUNT }).map((_, rowIdx) => (
              <tr key={`skeleton-${rowIdx}`} className={styles.tr}>
                {columns.map((col) => (
                  <td key={col.key} className={styles.td}>
                    <div className={styles.skeleton} aria-hidden="true" />
                  </td>
                ))}
              </tr>
            ))}
          {!loading &&
            rows.map((row, rowIdx) => (
              <tr
                key={rowIdx}
                className={[
                  styles.tr,
                  striped && rowIdx % 2 === 1 ? styles.trOdd : '',
                  striped && rowIdx % 2 === 0 ? styles.trEven : '',
                ]
                  .filter(Boolean)
                  .join(' ')}
              >
                {columns.map((col) => (
                  <td key={col.key} className={styles.td}>
                    {renderCellContent(row[col.key], col.cellType, rowIdx, col.key, onCtaClick)}
                  </td>
                ))}
              </tr>
            ))}
        </tbody>
      </table>
      {showEmpty && (
        <div className={styles.empty} role="status">
          {emptyState}
        </div>
      )}
      {loading && (
        <div className={styles.srOnly} role="status" aria-live="polite">
          Loading data...
        </div>
      )}
    </div>
  );
};
