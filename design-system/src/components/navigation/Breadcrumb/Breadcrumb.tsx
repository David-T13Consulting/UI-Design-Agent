import React, { useState } from 'react';
import { ChevronRight } from 'lucide-react';
import styles from './Breadcrumb.module.css';

export interface BreadcrumbItem {
  label: string;
  href: string;
}

export interface BreadcrumbProps {
  items: BreadcrumbItem[];
  separator?: React.ReactNode;
}

const COLLAPSE_THRESHOLD = 4;

export const Breadcrumb: React.FC<BreadcrumbProps> = ({
  items,
  separator,
}) => {
  const [expanded, setExpanded] = useState(false);

  const shouldCollapse = items.length > COLLAPSE_THRESHOLD && !expanded;

  const defaultSeparator = (
    <ChevronRight
      size={14}
      aria-hidden="true"
      className={styles.separatorIcon}
    />
  );

  const renderSeparator = () => (
    <li className={styles.separator} aria-hidden="true">
      {separator ?? defaultSeparator}
    </li>
  );

  const renderItem = (item: BreadcrumbItem, isLast: boolean) => (
    <li key={item.href} className={styles.item}>
      {isLast ? (
        <span className={styles.current} aria-current="page">
          {item.label}
        </span>
      ) : (
        <a href={item.href} className={styles.link}>
          {item.label}
        </a>
      )}
    </li>
  );

  const renderItems = () => {
    if (!shouldCollapse) {
      return items.flatMap((item, index) => {
        const isLast = index === items.length - 1;
        const elements: React.ReactNode[] = [];
        if (index > 0) {
          elements.push(
            <React.Fragment key={`sep-${index}`}>
              {renderSeparator()}
            </React.Fragment>
          );
        }
        elements.push(renderItem(item, isLast));
        return elements;
      });
    }

    const first = items[0];
    const last = items[items.length - 1];
    const elements: React.ReactNode[] = [];

    if (first) elements.push(renderItem(first, false));
    elements.push(
      <React.Fragment key="sep-ellipsis-before">
        {renderSeparator()}
      </React.Fragment>
    );
    elements.push(
      <li key="ellipsis" className={styles.item}>
        <button
          className={styles.ellipsis}
          onClick={() => setExpanded(true)}
          aria-label={`Show ${items.length - 2} hidden breadcrumb items`}
          type="button"
        >
          &hellip;
        </button>
      </li>
    );
    elements.push(
      <React.Fragment key="sep-ellipsis-after">
        {renderSeparator()}
      </React.Fragment>
    );
    if (last) elements.push(renderItem(last, true));

    return elements;
  };

  return (
    <nav aria-label="Breadcrumb" className={styles.root}>
      <ol className={styles.list}>{renderItems()}</ol>
    </nav>
  );
};
