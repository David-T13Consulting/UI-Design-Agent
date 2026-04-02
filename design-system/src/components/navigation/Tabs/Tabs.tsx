import React from 'react';
import styles from './Tabs.module.css';

export interface TabItem {
  label: string;
  value: string;
  disabled?: boolean;
}

export interface TabsProps {
  tabs: TabItem[];
  activeTab: string;
  onChange: (value: string) => void;
  variant?: 'line' | 'pill';
}

export const Tabs: React.FC<TabsProps> = ({
  tabs,
  activeTab,
  onChange,
  variant = 'line',
}) => {
  const handleKeyDown = (
    event: React.KeyboardEvent<HTMLButtonElement>,
    index: number
  ) => {
    const enabledTabs = tabs
      .map((tab, i) => ({ tab, index: i }))
      .filter(({ tab }) => !tab.disabled);

    const currentEnabledIndex = enabledTabs.findIndex(
      ({ index: i }) => i === index
    );

    let nextEnabledIndex: number | undefined;

    if (event.key === 'ArrowRight') {
      event.preventDefault();
      nextEnabledIndex =
        enabledTabs[(currentEnabledIndex + 1) % enabledTabs.length]?.index;
    } else if (event.key === 'ArrowLeft') {
      event.preventDefault();
      nextEnabledIndex =
        enabledTabs[
          (currentEnabledIndex - 1 + enabledTabs.length) % enabledTabs.length
        ]?.index;
    } else if (event.key === 'Home') {
      event.preventDefault();
      nextEnabledIndex = enabledTabs[0]?.index;
    } else if (event.key === 'End') {
      event.preventDefault();
      nextEnabledIndex = enabledTabs[enabledTabs.length - 1]?.index;
    }

    if (nextEnabledIndex !== undefined) {
      const button = event.currentTarget
        .closest('[role="tablist"]')
        ?.querySelectorAll('[role="tab"]')[nextEnabledIndex] as
        | HTMLButtonElement
        | undefined;
      button?.focus();
      const tab = tabs[nextEnabledIndex];
      if (tab) onChange(tab.value);
    }
  };

  return (
    <div
      className={`${styles.root} ${variant === 'pill' ? styles.pill : styles.line}`}
      role="tablist"
      aria-orientation="horizontal"
    >
      {tabs.map((tab, index) => {
        const isActive = tab.value === activeTab;
        return (
          <button
            key={tab.value}
            role="tab"
            aria-selected={isActive}
            aria-disabled={tab.disabled || undefined}
            tabIndex={isActive ? 0 : -1}
            disabled={tab.disabled}
            className={`${styles.tab} ${isActive ? styles.active : ''} ${tab.disabled ? styles.disabled : ''}`}
            onClick={() => {
              if (!tab.disabled) {
                onChange(tab.value);
              }
            }}
            onKeyDown={(e) => handleKeyDown(e, index)}
          >
            {tab.label}
          </button>
        );
      })}
    </div>
  );
};
